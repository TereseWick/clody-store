import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

  const origin = process.env.SITE_URL ?? req.headers.get('origin') ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'bancontact', 'ideal', 'p24'],
    line_items: [
      // Placeholder example line_item to test flow; replace with server-side pricing in production
      { price_data: { currency: 'nok', product_data: { name: 'Handlekurv' }, unit_amount: 20000 }, quantity: 1 }
    ],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
