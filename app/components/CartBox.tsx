"use client";

import Image from "next/image";
import removeItem from "../server/removeItem";
import { FaTrashAlt } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import getCartitem from "../server/getCartItem";
import getStripe from "@/libs/getStripe";
import { checkout } from "../server/checkout";
import { GuestCartItemType } from "@/types";

const CartBox = () => {
  const imagePlaceholder: any =
    "image-0d148d1bbc95e16131db4781fe1fa188de6f80bd-1000x1000-jpg";
  const { cartItems, setQty, setCartItems, guestCartItems, setGuestCartItems } =
    useStateContext();
  const { userId } = useAuth();

  const totalPrice = cartItems
    .map((item: CartItem) => (item.price / 2) * item.qty)
    .reduce((a: number, b: number) => a + b, 0);

  const totalGuestPrice = guestCartItems
    .map((item: GuestCartItemType) => (item.price / 2) * item.qty)
    .reduce((a: number, b: number) => a + b, 0);

  const handleRemove = (item: any) => {
    removeItem(item.id).then((res) => toast.success(res));
    if (userId) {
      getCartitem(userId)
        .then((res) => {
          setCartItems(res);
          setQty((prev: number) => prev - item.qty);
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleGuestItemRemove = (index: number) => {
    const newGuestItems = [...guestCartItems];
    if (index >= 0) {
      newGuestItems.splice(index, 1);
      toast.success("Items removed successfully");
    } else {
      toast.error("Removing item failed");
    }
    setGuestCartItems(newGuestItems);
    localStorage.setItem("guestCartItems", JSON.stringify(newGuestItems));
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    checkout(userId ? cartItems : guestCartItems)
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

      {(userId && cartItems.length) ||
      (!userId && guestCartItems.length) > 0 ? (
        (userId ? cartItems : guestCartItems).map(
          (item: CartItem | GuestCartItemType | any, index: number) => (
            <div key={item.id || index} className="border-b">
              <div className="flex flex-col">
                <div className="flex py-4 px-4 items-center justify-between">
                  <Image
                    src={urlFor(item.image || imagePlaceholder).url()}
                    alt="thumbnail"
                    width={55}
                    height={55}
                    className="rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500/90"></span>
                    <span className="text-sm text-gray-500/90">
                      {item.name} x {item.qty}&nbsp;
                      <span className="text-black font-bold">
                        ${((item.price / 2) * item.qty).toFixed(2) || 0}
                      </span>
                    </span>
                  </div>
                  <button>
                    <FaTrashAlt
                      className="fill-black/50 hover:fill-black cursor-pointer"
                      onClick={() => {
                        if (userId) {
                          handleRemove(item);
                        } else {
                          handleGuestItemRemove(index);
                        }
                      }}
                    />
                  </button>
                </div>
              </div>
              <div />
            </div>
          )
        )
      ) : (
        <div className="flex justify-center py-[70px]">
          <h1 className="text-gray-500 font-bold text-lg">
            Your cart is empty.
          </h1>
        </div>
      )}

      {((userId && cartItems.length) || (!userId && guestCartItems.length)) >
        0 && (
        <div className="flex flex-col mt-4">
          <div className="flex justify-center gap-2">
            <h1 className="text-sm font-bold">Total Price:</h1>
            <span className="text-sm text-gray-700">
              ${userId ? totalPrice.toFixed(2) : totalGuestPrice.toFixed(2)}
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
