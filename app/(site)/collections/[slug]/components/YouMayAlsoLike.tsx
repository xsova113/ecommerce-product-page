"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

const YouMayAlsoLike = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const selectedItem = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "product"]`);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col mt-8">
      <h1 className="font-bold text-2xl tracking-wider text-center">
        YOU MAY ALSO LIKE
      </h1>
      <div
        ref={selectedItem}
        className="flex overflow-scroll w-screen gap-6 px-12 no-scrollbar"
      >
        {products.map((item) => (
          <div key={item._id} className="flex flex-col mb-8">
            <div className="relative w-[250px] h-[300px] border rounded-lg bg-gray-100 shadow-lg mt-6 mb-2">
              <Image // @ts-ignore
                src={urlFor(item.image[0]).url()}
                alt="product image"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-semibold text-gray-800">{item.name}</h1>
            <span className="text-sm text-gray-600">${item.price}</span>
          </div>
        ))}
        <button
          className="absolute right-12 text-red-700/80 self-center"
          onClick={() => {
            selectedItem.current?.scrollBy({ left: 350, behavior: "smooth" });
          }}
        >
          <AiFillRightCircle size={50} />
        </button>
        <button className="absolute left-12 text-red-700/80 self-center">
          <AiFillLeftCircle
            size={50}
            onClick={() => {
              selectedItem.current?.scrollBy({
                left: -350,
                behavior: "smooth",
              });
            }}
          />
        </button>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
