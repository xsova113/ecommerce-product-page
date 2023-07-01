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
    <div className="flex flex-col items-center gap-20 bg-gradient-to-b from-red-500 via-orange-500 to-amber-400 mt-14 rounded-3xl shadow-2xl pb-24 pt-32">
      <Toaster />
      <h1 className="text-white text-6xl max-md:text-3xl text-center font-semibold max-md:self-center">
        Subscribe to Our Newsletter
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full sm:flex-row sm:justify-between items-center rounded-md"
      >
        <div className="flex flex-col sm:flex-row mx-auto sm:w-1/2 items-center sm:bg-white bg-transparent rounded-lg">
          <input
            type="email"
            {...register("email", {
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Enter your email"
            className="py-4 w-full px-4 rounded-lg outline-none"
            id="email"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white max-sm:mt-4 bg-red-500 rounded-md hover:bg-red-500/70 w-fit transition px-8 h-10 mr-2 max-sm:mr-0"
            disabled={!emailInput && !!!errors.email?.message}
          >
            SUBSCRIBE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
