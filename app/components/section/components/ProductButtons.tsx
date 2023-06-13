"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductButtons = ({ setQty }: { setQty: (value: number) => void }) => {
  const [itemNumber, setItemNumber] = useState(0);

  const handleMinus = () => {
    if (itemNumber === 0) return;
    setItemNumber((prev: number) => --prev);
  };

  return (
    <div className="flex flex-col sm:flex-row pt-5 gap-3">
      <div className="lg:p-1 max-sm:py-2 px-4 bg-[#F7F8FD] rounded-lg flex flex-1 items-center justify-between sm:max-w-[150px]">
        <button className="p-2" onClick={handleMinus}>
          <Image
            src={"./images/icon-minus.svg"}
            alt="minus-icon"
            width={10}
            height={10}
          />
        </button>

        <span className="font-bold">{itemNumber}</span>

        <button
          className="p-2"
          onClick={() => setItemNumber((prev: number) => ++prev)}
        >
          <Image
            src={"./images/icon-plus.svg"}
            alt="plus-icon"
            width={10}
            height={10}
          />
        </button>
      </div>
      <button
        className="flex flex-1 items-center py-3 px-8 bg-[#FF7D1A] rounded-lg text-white justify-center gap-2 shadow-xl shadow-[#FF7D1A]/30 active:bg-[#FF7D1A]/80 transition"
        onClick={() => {
          setQty(itemNumber);
          localStorage.setItem("itemQty", JSON.stringify(itemNumber));
        }}
      >
        <AiOutlineShoppingCart />
        <span className="font-bold">Add to cart</span>
      </button>
    </div>
  );
};

export default ProductButtons;
