const stripe = require('stripe')('sk_test_51P3xwm2NiEIW0LjhaXvRftS3psOA5OIexSy5JCZYgU0a9lnAixsarbCliQmMneJ9ZaC7GmpgYaNPxpBmZ5L4MBm50007SqrP39');
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
            unit_amount: price *100, 
          },
          quantity: quantity, // Use the quantity passed from the frontend
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/spaces',
      cancel_url: 'http://localhost:3000/spaces',
    });
    const checkoutUrl = session.url
      // Transfer funds to customer balance
    const transfer = await stripe.transfers.create({
      amount: price * quantity * 90, // 90% of the total amount as a simulated payout
      currency: 'pln',
      destination: 'acct_1PCNQqRpSmnLP3ok', // Sample Space Owner Account
    });

    console.log('Transfer to Space Owner Completed:', transfer);
    res.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Make request to payment model
app.listen(4242, () => console.log('Server running on port 4242'));
