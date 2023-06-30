"use server";

import { prisma } from "@/prisma/client";

export default async function updateCartitems(id: number, qty: number) {
  try {
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        qty,
      },
    });

    return "Cart item updated";
  } catch (error: any) {
    return error.message;
  }
}
