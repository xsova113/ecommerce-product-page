"use server";

import { CartItem } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function checkout(userCartItems: [CartItem]) {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [{ shipping_rate: "shr_1NOCD9KvSQnPs5Ewh4bWTjts" }],
      line_items: userCartItems.map((item: any) => {
        // const img = item.image[0].asset._ref;
        // const newImage = img
        //   .replace(
        //     "image-",
        //     `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`
        //   )
        //   .replace("-webp", ".webp");

        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
                // images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      mode: "payment",
      success_url: `${process.env.HOST_NAME || "http://localhost:3000"}/success`,
      cancel_url: `${process.env.HOST_NAME || "http://localhost:3000"}/?canceled=true`,
    });
    return session;
  } catch (err: any) {
    return err.message;
  }
}
