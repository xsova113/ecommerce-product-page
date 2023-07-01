import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputsProps {
  label: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  id: string;
}

const Inputs = ({ label, type, register, id }: InputsProps) => {
  return (
    <div className="flex items-center w-full gap-4 justify-between">
      <input
        {...register(id)}
        type={type}
        className="py-2 px-4 w-full border rounded-full autofill:active:transition delay-[9000000s]"
        placeholder={label}
      />
    </div>
  );
};

export default Inputs;
