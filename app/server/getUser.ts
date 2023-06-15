"use server";

import { prisma } from "@/prisma/client";
import { UserResource } from "@clerk/types";

export async function getUser(user: UserResource) {
  try {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });
    return await prisma.user.findMany({});
  } catch (error: any) {
    throw new Error(error.message);
  }
}
