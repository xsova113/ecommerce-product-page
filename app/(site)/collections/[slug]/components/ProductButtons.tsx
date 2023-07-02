"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "@/app/context/StateContext";
import updateCartitems from "@/app/action/updateCartItems";
import additemsToCart from "@/app/action/addItemsToCart";
import { GuestCartItemType } from "@/types";

const ProductButtons = ({ price, image }: any) => {
  const [itemQty, setItemQty] = useState(1);
  const { setGuestCartItems, cartItems, fetchCartItem, guestCartItems } =
    useStateContext();
  const params = useParams();
  const user = useAuth();

  const handleMinus = () => {
    if (itemQty === 1) return;
    setItemQty((prev: number) => --prev);
  };

  const handlePlus = () => {
    setItemQty((prev: number) => ++prev);
  };

  /////// add items to cart ///////
  const addToCart = () => {
    //////// add guest or none-user items to cart //////////
    if (!user.userId || !user.isSignedIn) {
      /////// find already existed item and update quantity //////
      localStorage.setItem("qty", JSON.stringify(itemQty));
      const qty = JSON.parse(localStorage.getItem("qty") || "");

      if (
        guestCartItems.find(
          (item: GuestCartItemType) => item.name === params?.slug
        )
      ) {
        const newGuestItems = guestCartItems.map((item: GuestCartItemType) => {
          if (item.name === params?.slug) {
            return { ...item, qty };
          }
          return item;
        });
        localStorage.setItem("guestCartItems", JSON.stringify(newGuestItems));
        setGuestCartItems(newGuestItems);
        toast.success("item updated successfully");
      } else {
        /////// Add new item to guest Cart //////////
        localStorage.setItem(
          "guestCartItems",
          JSON.stringify([...guestCartItems, { name: params?.slug, qty, image, price }])
        );

        setGuestCartItems((prev: GuestCartItemType[]) => [
          ...prev,
          { name: params?.slug, qty, image, price },
        ]);

        toast.success("Item added successfully");
      }
    } else {
      //////// add signed-in user items to cart ////////
      const existedCartItem = cartItems.find(
        (item: any) => item.name === params?.slug
      );

      if (existedCartItem) {
        updateCartitems(existedCartItem.id, itemQty)
          .then((data) => {
            toast.success(data);
            fetchCartItem();
          })
          .catch((err) => toast.error(err));
      } else {
        additemsToCart({ params, itemQty, userId: user.userId, price, image })
          .then((data) => {
            toast.success(data);
            fetchCartItem();
          })
          .catch((err) => toast.error(err));
      }
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [user.userId, fetchCartItem]);

  return (
    <div className="flex flex-col sm:flex-row pt-5 gap-3">
      <Toaster />
      <div className="lg:p-1 max-sm:py-2 px-4 bg-[#F7F8FD] rounded-lg flex flex-1 items-center justify-between sm:max-w-[150px]">
        <button className="p-2" onClick={handleMinus}>
          <Image
            src={"/images/icon-minus.svg"}
            alt="minus-icon"
            width={10}
            height={10}
          />
        </button>
        <span className="font-bold">{itemQty}</span>
        <button className="p-2" onClick={handlePlus}>
          <Image
            src={"/images/icon-plus.svg"}
            alt="plus-icon"
            width={10}
            height={10}
          />
        </button>
      </div>
      <button
        className="flex flex-1 items-center py-3 px-8 bg-red-500 rounded-lg text-white justify-center gap-2 shadow-xl shadow-[#FF7D1A]/30 active:bg-red-500/80 transition"
        onClick={addToCart}
      >
        <AiOutlineShoppingCart />
        <span className="font-bold">Add to cart</span>
      </button>
    </div>
  );
};

export default ProductButtons;
