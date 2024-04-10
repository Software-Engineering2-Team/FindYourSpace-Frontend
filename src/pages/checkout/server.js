const stripe = require('stripe')('sk_test_51P3xwm2NiEIW0Ljh7HGqbruwygEffvNnVVkS3ez4vkSLomhI7lptmlWg6GmSrDs8oN6BJViE5pxi4KGRHOC97P7R00UlXUnVZ1');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  const { price, imageUrl, quantity, name } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: name,
              images: [imageUrl],
            },
            unit_amount: price * 100, 
          },
          quantity: quantity, // Use the quantity passed from the frontend
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/spaces',
      cancel_url: 'http://localhost:3000/spaces',
    });
    const checkoutUrl = session.url
    res.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
