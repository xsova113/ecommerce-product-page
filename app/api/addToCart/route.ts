import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { params, itemNumber, userId, price, image } =
      await req.json();
    await prisma.cartItem.create({
      data: {
        name: params.slug,
        userId,
        qty: itemNumber,
        price,
        image,
      },
    });
    return NextResponse.json("Item added successfully");
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
}
