import Stripe from 'stripe';

type Props = { searchParams: { session_id?: string } };

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;
  let status = 'unknown';
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    status = session.payment_status ?? 'unknown';
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Takk for bestillingen!</h1>
      <p className="mt-2 text-gray-600">Betalingsstatus: {status}</p>
      <p className="mt-6">Du får ordrebekreftelse på e-post.</p>
    </div>
  );
}
