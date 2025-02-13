// utility/stripeUtil.js
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.SECRET_KEY);  // Replace with your actual secret key

export const createPaymentIntent = async (amount) => {
  try {
    // Create a payment intent with the amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (Stripe uses cents)
      currency: 'usd', // Currency (change to your local currency if needed)
      metadata: { integration_check: 'accept_a_payment' },
    });

    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};
