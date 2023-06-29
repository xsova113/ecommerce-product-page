"use server";

import { prisma } from "@/prisma/client";

export default async function getCartitem(userId: string) {
  try {
    const cartItem = await prisma.cartItem.findMany({
      where: {
        userId,
      },
    });
    return cartItem;
  } catch (error: any) {
    return error.message;
  }
}
