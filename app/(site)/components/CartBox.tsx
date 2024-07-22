"use client";

import Image from "next/image";
import removeItem from "../../action/removeItem";
import { FaTrashAlt } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";
import getCartitem from "../../action/getCartItem";
import getStripe from "@/libs/getStripe";
import { checkout } from "../../action/checkout";
import { GuestCartItemType } from "@/types";

const CartBox = () => {
  const imagePlaceholder: any =
    "image-0d148d1bbc95e16131db4781fe1fa188de6f80bd-1000x1000-jpg";
  const { cartItems, setQty, setCartItems, guestCartItems, setGuestCartItems } =
    useStateContext();
  const { userId } = useAuth();

  const totalPrice = (cartItems as Array<any>)
    ?.map((item: CartItem) => (item.price / 2) * item.qty)
    .reduce((a: number, b: number) => a + b, 0);

  const totalGuestPrice = (guestCartItems as Array<any>)
    ?.map((item: GuestCartItemType) => (item.price / 2) * item.qty)
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

    localStorage.setItem("guestCartItems", JSON.stringify(newGuestItems));
    setGuestCartItems(newGuestItems);
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
    <div className="rounded-xl text-white sm:w-[400px]">
      <div className="flex flex-col px-5 py-4">
        <h1 className="font-bold text-white">Cart</h1>
      </div>
      <hr className="w-full" />

      {(userId && cartItems.length) ||
      (!userId && guestCartItems.length) > 0 ? (
        (userId ? cartItems : guestCartItems).map(
          (item: CartItem | GuestCartItemType | any, index: number) => (
            <div key={item.id || index} className="border-b">
              <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 py-4">
                  <Image
                    src={urlFor(item.image || imagePlaceholder).url()}
                    alt="thumbnail"
                    width={55}
                    height={55}
                    className="rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold capitalize text-gray-100">
                      {item.name.replace("-", " ")}
                    </span>
                    <span className="text-sm text-gray-100">
                      {item.price / 2} x {item.qty}&nbsp;
                      <span className="font-bold text-white">
                        ${((item.price / 2) * item.qty).toFixed(2) || 0}
                      </span>
                    </span>
                  </div>
                  <button>
                    <FaTrashAlt
                      className="cursor-pointer fill-white transition hover:fill-gray-200"
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
          ),
        )
      ) : (
        <div className="flex justify-center py-[70px]">
          <h1 className="text-lg font-bold text-gray-100">
            Your cart is empty.
          </h1>
        </div>
      )}

      {((userId && cartItems.length) || (!userId && guestCartItems.length)) >
        0 && (
        <div className="mt-4 flex flex-col">
          <div className="flex justify-center gap-2">
            <h1 className="text-sm font-bold">Total Price:</h1>
            <span className="text-sm text-gray-100">
              $
              {userId
                ? totalPrice.toFixed(2)
                : Number(totalGuestPrice).toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-center pb-5">
            <button
              className="mt-4 rounded-lg bg-red-500 px-14 py-3 font-semibold text-white transition hover:scale-110 active:bg-red-500/80"
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
