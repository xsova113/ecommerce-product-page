"use client";

import { SignUp } from "@clerk/nextjs";
import { useStateContext } from "@/app/context/StateContext";

const Register = () => {
  const { cartOpen } = useStateContext();

  return (
    <div
      className={`relative ${
        cartOpen && "-z-50"
      } min-h-screen flex justify-center md:mt-10 w-full`}
    >
       <SignUp />
    </div>
   
  );
};

export default Register;
