"use server";

import { prisma } from "@/prisma/client";

export default async function removeItem(id: number) {
  try {
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });
    return "Deleted successfully"
  } catch (error: any) {
    throw new Error(error.message);
  }
}
