const stripe = require('stripe')('sk_test_51P3xwm2NiEIW0LjhaXvRftS3psOA5OIexSy5JCZYgU0a9lnAixsarbCliQmMneJ9ZaC7GmpgYaNPxpBmZ5L4MBm50007SqrP39');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
    const {price, imageUrl, quantity, name, client_id, ad_space_id} = req.body;

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
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/spaces',
            cancel_url: 'http://localhost:3000/spaces',
        });

        const checkoutUrl = session.url;

        const transfer = await stripe.transfers.create({
            amount: price * quantity * 90,
            currency: 'pln',
            destination: 'acct_1PCNQqRpSmnLP3ok',
        });

        console.log('Transfer to Space Owner Completed:', transfer);

        const bookingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(ad_space_id)

        const payload = {
            client: client_id,
            adSpace: ad_space_id,
            bookingDate: bookingDate,
            status: 1,
        };

        console.log('Sending booking request to Django backend with payload:', payload);

        const bookingResponse = await fetch('http://127.0.0.1:8000/api/new-booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            timeout: 5000,
        });

        console.log('Received response from Django backend');

        if (!bookingResponse.ok) {
            const errorText = await bookingResponse.text();
            console.error('Booking request failed:', errorText);
            throw new Error('Failed to create booking');
        }

        console.log('Booking created successfully:', await bookingResponse.json());

        res.json({checkoutUrl});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
