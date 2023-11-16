"use client";

import { useStateContext } from "@/app/context/StateContext";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavItems = ({ navItems }: { navItems: string[] }) => {
  const { open, setOpen } = useStateContext();
  const router = useRouter();

  return (
    <div className="md:hidden">
      <div
        className={cn(
          "fixed inset-0 bg-[#000000]/75 duration-300 ease-in-out",
          open ? "-z-10 opacity-100" : "invisible",
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed -left-4 top-0 h-screen w-[60%] space-y-4 bg-white via-zinc-100 pl-8 pt-10 duration-300 ease-in-out ${
          open ? "z-20 translate-x-0" : "-translate-x-[2000px]"
        }`}
      >
        <Image
          src={"/images/icon-close.svg"}
          alt="icon-close"
          width={30}
          height={30}
          className="mb-14 h-auto w-auto cursor-pointer"
          onClick={() => {
            router.push("/");
            setOpen(false);
          }}
        />
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col font-bold `}
          >
            <Link
              href={`/${item.toLowerCase()}`}
              className={`text-[18px] transition delay-300 duration-700 ${
                open
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              {item}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavItems;
