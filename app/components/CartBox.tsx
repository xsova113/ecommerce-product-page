"use client";

import Image from "next/image";
import removeItem from "../server/removeItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import getCartitem from "../server/getCartItem";
import getStripe from "@/libs/getStripe";
import axios from "axios";
import { checkout } from "../server/checkout";

const CartBox = () => {
  const { cartItem, setQty } = useStateContext();
  const [userCartItems, setUserCartItems] = useState<CartItem[] | any>([]);
  const { userId } = useAuth();

  const queryCartItems = useCallback(() => {
    const filteredItems = cartItem.filter(
      (item: CartItem) => item.userId === userId
    );
    setUserCartItems(filteredItems);
  }, [cartItem, userId]);

  useEffect(() => {
    queryCartItems();
  }, [queryCartItems]);

  const totalPrice = userCartItems
    .map((item: CartItem) => (item.price / 2) * item.qty)
    .reduce((a: number, b: number) => a + b, 0);

  const handleCheckout = async () => {
    const stripe = await getStripe();
    checkout(userCartItems)
      .then((data) => {
        stripe.redirectToCheckout({ sessionId: data.id });
        toast.loading("Redirecting...");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="bg-white rounded-xl md:w-[400px] w-[300px]">
      <div className="flex flex-col py-4 px-5">
        <h1 className="font-bold">Cart</h1>
      </div>
      <hr className="w-full" />

      {userCartItems.length >= 1 ? (
        userCartItems.map((item: CartItem | any) => (
          <div key={item.id} className="border-b">
            <div className="flex flex-col">
              <div className="flex py-4 px-4 items-center justify-between">
                <Image
                  src={urlFor(item.image).url()}
                  alt="thumbnail"
                  width={55}
                  height={55}
                  className="rounded-md"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500/90">{}</span>
                  <span className="text-sm text-gray-500/90">
                    {item.name} x {item.qty}&nbsp;
                    <span className="text-black font-bold">
                      ${(item.price / 2) * (item.qty || 0)}
                    </span>
                  </span>
                </div>
                <button>
                  <FaTrashAlt
                    className="fill-black/50 hover:fill-black cursor-pointer"
                    onClick={() => {
                      removeItem(item.id).then((res) => toast.success(res));
                      if (userId) {
                        getCartitem(userId)
                          .then((res) => {
                            setUserCartItems(res);
                            setQty((prev: number) => prev - item.qty);
                          })
                          .catch((err) => toast.error(err));
                      }
                    }}
                  />
                </button>
              </div>
            </div>
            <div />
          </div>
        ))
      ) : (
        <div className="flex justify-center py-[70px]">
          <h1 className="text-gray-500 font-bold text-lg">
            Your cart is empty.
          </h1>
        </div>
      )}

      {userCartItems.length > 0 && (
        <div className="flex flex-col mt-4">
          <div className="flex justify-center gap-2">
            <h1 className="text-sm font-bold">Total Price:</h1>
            <span className="text-sm text-gray-700">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="w-full flex pb-5 justify-center">
            <button
              className="py-3 px-14 mt-4 text-white rounded-lg font-semibold bg-[#FF7D1A] hover:scale-110 active:bg-[#FF7D1A]/80 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartBox;
