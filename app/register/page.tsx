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
      {/* <div className="flex flex-col justify-between items-center gap-4 p-12 shadow-xl border rounded-xl w-full md:w-1/2 h-[400px] relative">
        <h1 className="-mt-9 font-semibold">Log in or sign up</h1>
        <hr className="absolute w-full" />
        <Registration />
        <div className="flex items-center w-full gap-4">
          <hr className="w-full" />
          <span className="text-sm text-center text-gray-400">Or</span>
          <hr className="w-full" />
        </div>

        <SocialButtons />
      </div> */}
       <SignUp />
    </div>
   
  );
};

export default Register;
