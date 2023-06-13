"use server";

import { useAuth } from "@clerk/nextjs";

export async function getCurrentUser() {
  const user =  useAuth();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  return user;
}
