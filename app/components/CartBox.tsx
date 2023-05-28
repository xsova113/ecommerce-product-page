"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useStateContext } from "../context/StateContext";

interface dataType {
  products: [
    {
      title: string;
      price: number;
    }
  ];
}

const CartBox = () => {
  const [data, setData] = useState<dataType>();
  const { qty, setQty } = useStateContext();

  const getData = () => {
    axios
      .get("./data.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col py-4 px-5">
        <h1 className="font-bold">Cart</h1>
      </div>
      <hr className="w-full" />

      {/* Empty cart message */}
      {qty >= 1 ? (
        <div className="flex flex-col">
          <div className="flex py-4 px-4 mt-2 items-center justify-between">
            <Image
              src="/images/image-product-1-thumbnail.jpg"
              alt="thumbnail"
              width={55}
              height={55}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500/90">
                {data?.products[0].title}
              </span>
              <span className="text-sm text-gray-500/90">
                ${data?.products[0].price} x {qty}&nbsp;
                <span className="text-black font-bold">
                  ${data?.products && data.products[0].price * qty}
                </span>
              </span>
            </div>
            <button>
              <FaTrashAlt
                className="fill-black/50 hover:fill-black cursor-pointer"
                onClick={() => setQty(0)}
              />
            </button>
          </div>
          <button className="py-3 mx-8 mt-4 text-white rounded-lg font-semibold bg-[#FF7D1A] hover:scale-110 active:bg-[#FF7D1A]/80 transition">
            Checkout
          </button>
        </div>
      ) : (
        <div className="flex justify-center pt-[70px]">
          <h1 className="text-gray-500 font-bold text-lg">
            Your cart is empty.
          </h1>
        </div>
      )}
    </>
  );
};

export default CartBox;
