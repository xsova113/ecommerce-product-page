"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "@/app/context/StateContext";

const ProductButtons = ({ price, image }: any) => {
  const [itemNumber, setItemNumber] = useState(1);
  const { setQty } = useStateContext();
  const params = useParams();
  const { userId } = useAuth();

  const handleMinus = () => {
    if (itemNumber === 1) return;
    setItemNumber((prev: number) => --prev);
  };

  const handlePlus = () => {
    setItemNumber((prev: number) => ++prev);
  };

  const addToCart = () => {
    axios
      .post("/api/addToCart", { params, itemNumber, userId, price, image })
      .then((res) => {
        toast.success(res.data);
        setQty((prev: number) => prev + itemNumber);
      })
      .catch((err) => toast.error(err));
  };

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
        <span className="font-bold">{itemNumber}</span>
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
        className="flex flex-1 items-center py-3 px-8 bg-[#FF7D1A] rounded-lg text-white justify-center gap-2 shadow-xl shadow-[#FF7D1A]/30 active:bg-[#FF7D1A]/80 transition"
        onClick={addToCart}
      >
        <AiOutlineShoppingCart />
        <span className="font-bold">Add to cart</span>
      </button>
    </div>
  );
};

export default ProductButtons;
