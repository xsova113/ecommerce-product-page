"use client";

import { useStateContext } from "@/app/context/StateContext";
import Image from "next/image";

const NavItems = ({ navItems }: { navItems: string[] }) => {
  const { open, setOpen } = useStateContext();
  return (
    <>
      <div
        className={`bg-[#000000]/75 absolute inset-0 -z-10 ${
          open ? "opacity-100 z-10" : "opacity-0"
        } ease-in-out duration-300`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`bg-white pt-10 pl-8 fixed space-y-4 left-0 top-0 h-screen w-[60%] ease-in-out duration-300 via-zinc-100 ${
          open ? "translate-x-0 z-20" : "-translate-x-full"
        }`}
      >
        <Image
          src={"/images/icon-close.svg"}
          alt="icon-close"
          width={30}
          height={30}
          className="mb-14 cursor-pointer h-auto w-auto"
          onClick={() => setOpen(false)}
        />
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col font-bold cursor-pointer `}
          >
            <span
              className={`text-[18px] transition delay-300 duration-700 ${
                open
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavItems;
