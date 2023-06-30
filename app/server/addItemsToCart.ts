"use server";

import { prisma } from "@/prisma/client";

interface AddToCartProps {
  params: any;
  itemQty: number;
  userId: string;
  price: number;
  image: string;
}

export default async function additemsToCart({
  params,
  itemQty,
  userId,
  price,
  image,
}: AddToCartProps) {
  try {
    await prisma.cartItem.create({
      data: {
        name: params.slug,
        userId,
        qty: itemQty,
        price,
        image,
      },
    });
    return "Item added successfully";
  } catch (error: any) {
    return error.message;
  }
}
