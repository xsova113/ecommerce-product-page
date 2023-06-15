"use server";

import { prisma } from "@/prisma/client";
import { UserResource } from "@clerk/types";

export async function getItem(userId: string) {
  try {
    await prisma.item.create({
      data: {
        name: "Sneaker",
        description: "hahaha",
        price: 10,
        userId,
      },
    });
    return await prisma.item.findMany({});
  } catch (error: any) {
    throw new Error(error.message);
  }
}
