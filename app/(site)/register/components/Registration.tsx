import React from "react";
import Inputs from "./Inputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col pt-4 gap-6"
    >
      <Inputs id="email" register={register} label={"Email"} type={"email"} />
      <Inputs
        id="password"
        register={register}
        label={"Password"}
        type={"password"}
      />
      <button className="rounded-lg py-2 text-white transition hover:bg-orange-400 bg-orange-500">
        Sign Up
      </button>
      <Toaster />
    </form>
  );
};

export default Registration;
