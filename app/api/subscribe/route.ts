import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await prisma.subscribers.create({
      data: {
        email,
      },
    });
    return NextResponse.json(email + " subscribed successfully!");
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
}
