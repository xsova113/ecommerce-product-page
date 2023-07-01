"use client";

import { SignIn } from "@clerk/nextjs";
import { useStateContext } from "@/app/context/StateContext";

const Signin = () => {
  const { cartOpen } = useStateContext();

  return (
    <div
      className={`relative ${
        cartOpen && "-z-50"
      } min-h-screen flex justify-center md:mt-10 w-full`}
    >
      <SignIn />
    </div>
  );
};

export default Signin;
