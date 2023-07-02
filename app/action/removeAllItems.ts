"use server";

import { prisma } from "@/prisma/client";

export default async function removeAllItems(userId: string) {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    console.log("Delete all items successfully");
  } catch (error: any) {
    return error.message;
  }
}
