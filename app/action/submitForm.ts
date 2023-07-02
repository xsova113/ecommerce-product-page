"use server";

import { prisma } from "@/prisma/client";
import { SubmissionForm } from "@prisma/client";

export default async function submitForm(data: SubmissionForm) {
  try {
    await prisma.submissionForm.create({
      data,
    });
    
    return "Form submitted successfully";
  } catch (error: any) {
    return error.message;
  }
}
