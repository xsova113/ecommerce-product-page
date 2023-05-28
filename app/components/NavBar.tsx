"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartBox from "./CartBox";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  const navItems = ["Collections", "Men", "Women", "About", "Contact"];
  const [open, setOpen] = useState(false);
  // const [cartOpen, setCartOpen] = useState(false);
  const { qty, cartOpen, setCartOpen } = useStateContext();

  return (
    <>
      <div
        className={`absolute inset-0 ${cartOpen ? "block" : "hidden"}`}
        onClick={() => setCartOpen(false)}
      />
      <div className="pb-8">
        <div
          className={`bg-[#000000]/75 absolute inset-0 -z-10 ${
            open ? "opacity-100" : "opacity-0"
          } ease-in-out duration-300`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`bg-white pt-10 pl-8 fixed space-y-4 left-0 top-0 h-screen w-[60%] ease-in-out duration-300 via-zinc-100 ${
            open ? "translate-x-0" : "-translate-x-full"
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
        <nav className="flex items-center">
          <Image
            src={"/images/icon-menu.svg"}
            alt="menu"
            width={20}
            height={20}
            className="lg:hidden sm:w-[30px] sm:h-[25px] block mr-4 sm:mr-6 w-auto h-auto cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <Image
            src={"/images/logo.svg"}
            alt="logo"
            width={150}
            height={50}
            className="sm:w-[150px] sm:h-[20px] w-[120px] h-[20px] cursor-pointer"
          />

          <div className="hidden lg:flex ml-20 gap-7">
            {navItems.map((item, index) => (
              <div key={index}>
                <span className="text-black/60 hover:text-black cursor-pointer border-b-4 border-transparent hover:border-[#FF7D1A] pb-11 transition">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex w-full sm:gap-10 gap-6 justify-end items-center">
            <div className="relative">
              <div
                onClick={() => setCartOpen((preValue: number) => !preValue)}
                className="cursor-pointer"
              >
                <AiOutlineShoppingCart
                  size={30}
                  className="hover:fill-black text-gray-500"
                />
                <div
                  className={`flex justify-center text-[11px] items-center rounded-xl absolute px-2 bg-[#FF7D1A] -top-1 -right-1 text-white ${
                    qty === 0 && "hidden"
                  }`}
                >
                  {qty}
                </div>
              </div>

              {/* Cart Box */}
              <div
                className={`hidden sm:block absolute w-80 h-60 -right-[200%] top-[85px] sm:top-14 sm:-right-[130px] bg-white shadow-2xl rounded-xl ${
                  cartOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-[150%] opacity-0"
                } ease-in-out duration-500`}
              >
                <CartBox />
              </div>
            </div>

            <Image
              src={"/images/image-avatar.png"}
              alt="avatar"
              height={40}
              width={40}
              className="w-auto h-auto hover:ring-[#FF7D1A] ring-2 ring-transparent rounded-full cursor-pointer transition"
            />
          </div>
        </nav>

        {/* Carb Box Mobile view */}
        <div className="sm:hidden flex justify-center">
          <div
            className={`block w-[90%] h-60 bg-white shadow-2xl rounded-xl ${
              cartOpen
                ? "absolute translate-y-0 top-[120px] opacity-100"
                : "absolute -translate-y-full opacity-0 -z-10"
            } transition duration-300`}
          >
            <CartBox />
          </div>
        </div>
      </div>
      <hr className="hidden sm:block" />
    </>
  );
};

export default NavBar;
