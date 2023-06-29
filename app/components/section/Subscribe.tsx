"use client";

import axios from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

const Subscribe = () => {
  const [emailInput, setEmailInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/subscribe", data)
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex flex-col items-center gap-20 bg-orange-500 mt-40 rounded-3xl shadow-2xl pb-24 pt-32">
      <Toaster />
      <h1 className="text-white text-6xl max-md:text-3xl font-semibold max-md:self-center">
        Subscribe to Our Newsletter
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex w-1/2 justify-between items-center rounded-md"
      >
        <input
          type="email"
          {...register("email", {
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Enter your email"
          className="py-4 ml-4 w-full outline-none"
          id="email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white rounded-md hover:bg-orange-500/70 w-fit transition px-8 h-10 mr-2"
          disabled={!emailInput && !!!errors.email?.message}
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
