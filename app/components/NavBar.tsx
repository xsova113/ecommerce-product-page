"use client";

import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartBox from "./CartBox";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import UserBox from "./UserBox";
import {
  LgScreenNavItems,
  MobileNavItems,
} from "../collections/[slug]/components";
import { useStateContext } from "../context/StateContext";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CartItem } from "@prisma/client";

const NavBar = () => {
  const navItems = ["Collections", "Men", "Women", "About", "Contact"];
  const [avatarOpen, setAvatarOpen] = useState(false);
  const user = useUser();

  const { qty, cartOpen, setCartOpen, setOpen, setCartItem, cartItem, setQty } =
    useStateContext();

  const handleClick = () => {
    setAvatarOpen((prev) => !prev);
  };

  const getCartItem = useCallback(() => {
    axios
      .get("/api/getCartItem")
      .then((res) => {
        setCartItem(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, [setCartItem]);

  useEffect(() => {
    if (user.user?.id) {
      const sum = cartItem
        .filter((item: CartItem) => item.userId === user.user?.id)
        .map((item: CartItem) => item.qty)
        .reduce((a: number, b: number) => a + b, 0);

      setQty(sum);
    } else {
      const sum = cartItem
        .filter((item: CartItem) => !item.userId)
        .map((item: CartItem) => item.qty)
        .reduce((a: number, b: number) => a + b, 0);

      setQty(sum);
    }
  }, [setQty, user.user?.id, getCartItem, cartItem]);

  return (
    <header>
      <Toaster />
      <nav>
        <div
          className={`absolute inset-0 ${cartOpen ? "block z-20" : "hidden"}`}
          onClick={() => setCartOpen(false)}
        />
        <div className="pb-8">
          <MobileNavItems navItems={navItems} />
          <div className="flex items-center">
            <Image
              src={"/images/icon-menu.svg"}
              alt="menu"
              width={20}
              height={20}
              className="lg:hidden sm:w-[30px] sm:h-[25px] block mr-4 sm:mr-6 w-auto h-auto cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <Link
              href={"/"}
              className="relative sm:w-[300px] sm:h-[25px] w-[120px] h-[20px]"
            >
              <Image src={"/images/logo.svg"} alt="logo" fill />
            </Link>

            <LgScreenNavItems navItems={navItems} />
            <div className="flex w-full sm:gap-10 gap-6 justify-end items-center">
              <div className="relative">
                <div
                  onClick={() => {
                    getCartItem();
                    setCartOpen((preValue: boolean) => !preValue);
                  }}
                  className="cursor-pointer"
                >
                  <AiOutlineShoppingCart
                    size={30}
                    className="hover:fill-black text-gray-500"
                  />
                  <div
                    className={`flex justify-center text-[11px] items-center rounded-xl absolute px-2 bg-[#FF7D1A] -top-1 -right-1 text-white ${
                      cartItem.length === 0 && "hidden"
                    }`}
                  >
                    {qty}
                  </div>
                </div>
                <div
                  className={`hidden sm:block absolute rounded-2xl -right-[200%] top-[85px] sm:top-14 sm:-right-[130px] bg-white shadow-2xl ${
                    cartOpen
                      ? "translate-y-0 opacity-100 z-50"
                      : "-translate-y-[300%] opacity-0"
                  } ease-in-out duration-500`}
                >
                  <CartBox />
                </div>
              </div>

              <div className="ml-5">
                {!user.isSignedIn && (
                  <>
                    <Image
                      src={"/images/user_placeholder.jpg"}
                      alt="avatar"
                      height={30}
                      width={30}
                      className="w-auto h-auto hover:ring-[#FF7D1A] ring-2 ring-transparent rounded-full cursor-pointer transition"
                      onClick={handleClick}
                    />
                  </>
                )}
                <UserBox
                  isOpen={avatarOpen}
                  closeAvatar={() => setAvatarOpen(false)}
                />

                <UserButton />
              </div>
            </div>
          </div>

          {/* Carb Box Mobile view */}
          <div className="sm:hidden flex justify-center">
            <div
              className={`block w-[90%] h-60 bg-white shadow-2xl rounded-xl ${
                cartOpen
                  ? "absolute translate-y-0 top-[120px] opacity-100"
                  : "absolute -translate-y-full opacity-0 -z-50"
              } transition duration-300`}
            >
              <CartBox />
            </div>
          </div>
        </div>
        <hr className="hidden sm:block" />
      </nav>
    </header>
  );
};

export default NavBar;
