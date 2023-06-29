import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cartItem = await prisma.cartItem.findMany({});
    return NextResponse.json(cartItem);
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
}
