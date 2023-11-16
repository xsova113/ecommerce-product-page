/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartBox from "./CartBox";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserBox from "./UserBox";
import {
  LgScreenNavItems,
  MobileNavItems,
} from "../collections/[slug]/components";
import { useStateContext } from "../../context/StateContext";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { CartItem } from "@prisma/client";
import { GuestCartItemType } from "@/types";
import getCartitem from "../../action/getCartItem";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const navItems = ["Collections", "Men", "Women", "About", "Contact"];
  const [avatarOpen, setAvatarOpen] = useState(false);
  const user = useAuth();
  const router = useRouter();

  const {
    qty,
    cartOpen,
    setCartOpen,
    setOpen,
    setQty,
    cartItems,
    fetchCartItem,
    guestCartItems,
    setGuestCartItems,
  } = useStateContext();

  const handleClick = () => {
    setAvatarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user.userId) {
      const sum = cartItems
        .map((item: CartItem) => item.qty)
        .reduce((a: number, b: number) => a + b, 0);

      setQty(sum);
    } else {
      const sum = guestCartItems
        .map((item: GuestCartItemType) => item.qty)
        .reduce((a: number, b: number) => a + b, 0);

      setQty(sum);
    }
  }, [user, cartItems, guestCartItems, setQty]);

  useEffect(() => {
    setGuestCartItems(
      JSON.parse(localStorage.getItem("guestCartItems") || "[]"),
    );
  }, [user.userId, getCartitem]);

  return (
    <header>
      <div
        className={`absolute inset-0 ${cartOpen ? "block" : "hidden"}`}
        onClick={() => setCartOpen(false)}
      />
      <Toaster />
      <nav className="fixed inset-0 z-50 h-20 rounded-b-3xl border border-white bg-black/30 px-4 pt-6 shadow-xl backdrop-blur sm:mx-12 sm:px-12">
        <div className="pb-6">
          <MobileNavItems navItems={navItems} />
          <div className="flex items-center">
            <Image
              src={"/images/icon-menu.svg"}
              alt="menu"
              width={55}
              height={55}
              className="mr-4 block h-auto w-auto cursor-pointer sm:mr-6 sm:h-[25px] sm:w-[30px] lg:hidden"
              onClick={() => {
                router.push("/");
                setOpen(true);
              }}
            />
            <Link
              href={"/"}
              className="relative h-[20px] w-[120px] sm:h-[25px] sm:w-[300px]"
            >
              <Image src={"/images/logo.svg"} alt="logo" fill />
            </Link>

            <LgScreenNavItems navItems={navItems} />

            <div className="flex w-full items-baseline justify-end gap-6 sm:gap-10">
              <div className="relative">
                <button
                  onClick={() => {
                    fetchCartItem();
                    setCartOpen((preValue: boolean) => !preValue);
                  }}
                >
                  <AiOutlineShoppingCart
                    size={30}
                    className="text-white transition hover:fill-gray-500"
                  />
                  <span
                    className={`absolute -right-1 -top-1 flex items-center justify-center rounded-xl bg-red-500 px-2 text-[11px] text-white ${
                      user.isSignedIn && cartItems.length === 0 && "hidden"
                    }`}
                  >
                    {qty}
                  </span>
                </button>
                <div
                  className={`absolute -right-[200%] top-[85px] z-50 hidden rounded-2xl border border-white bg-zinc-500/90 shadow-2xl backdrop-blur sm:-right-[130px] sm:top-14 sm:block ${
                    cartOpen
                      ? "z-50 translate-y-0"
                      : "-translate-y-[500%] opacity-0"
                  } duration-500 ease-in-out`}
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
                      className="h-auto w-auto cursor-pointer rounded-full ring-2 ring-transparent transition hover:ring-[#FF7D1A]"
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
          <div className="flex justify-center sm:hidden">
            <div
              className={`block h-60 w-[90%] rounded-xl border border-white bg-stone-600/90 shadow-2xl ${
                cartOpen
                  ? "absolute top-[100px] translate-y-0 opacity-100"
                  : "absolute -z-50 -translate-y-[500%] opacity-0"
              } transition duration-300`}
            >
              <CartBox />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
