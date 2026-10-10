
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: Request) {
  try {
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is missing");
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const baseUrl = new URL(req.url).origin;
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const lineItems = items.map(
      (item: { name: string; price: number }) => {
        const price = Number(item.price);

        if (
          typeof item.name !== "string" ||
          !Number.isFinite(price) ||
          price <= 0
        ) {
          throw new Error("Invalid cart item.");
        }

        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        };
      }
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 }
    );
  }
}