"use client";

import { SignIn } from "@clerk/nextjs";
import { useStateContext } from "@/app/context/StateContext";

const Signin = () => {
  const { cartOpen } = useStateContext();

  return (
    <div
      className={`relative ${
        cartOpen && "-z-50"
      } min-h-screen flex justify-center mt-28 md:mt-32 w-full`}
    >
      <SignIn />
    </div>
  );
};

export default Signin;
