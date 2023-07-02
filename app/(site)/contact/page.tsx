"use client";

import submitForm from "@/app/action/submitForm";
import { error } from "console";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    submitForm(data)
      .then((res) => toast.success(res))
      .catch((err) => toast.error(err));
  };

  return (
    <section className="mt-32 flex flex-col text-white bg-slate-700 p-8 rounded-2xl shadow-xl items-center">
      <Toaster />
      <h1 className="text-4xl text-white font-bold pb-12">Submit a Request</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-8"
      >
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-lg">
            Your email address&nbsp;<span className="text-red-500">*</span>
          </label>
          <input
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            id="email"
            type="email"
            className="rounded-md py-3 px-4 w-full text-gray-600 outline-none"
          />
          {errors.email && (
            <span className="text-sm text-red-500 font-bold">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-lg">Subject</label>
          <input
            {...register("subject")}
            id="subject"
            type="text"
            className="rounded-md py-3 px-4 w-full text-gray-600 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-lg">
            Description&nbsp;<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: "This field is required" })}
            id="description"
            className="rounded-md py-3 px-4 w-full text-gray-600 outline-none"
            rows={4}
          />
          {errors.description && (
            <span className="text-sm text-red-500 font-bold">
              {errors.description.message?.toString()}
            </span>
          )}
        </div>

        <button
          className="mb-8 px-8 py-3 bg-red-500 rounded-lg font-semibold text-white hover:bg-red-500/80 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
