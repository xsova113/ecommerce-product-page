import { urlFor } from "@/sanity/lib/image";
import product from "@/sanity/product";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductType } from "@/types";

const Collection = ({
  products,
}: {
  products: typeof product.fields | any;
}) => {
  return (
    <section className="flex flex-col mt-14 bg-gradient-to-tr from-purple-400 via-blue-300 to-fuchsia-300 md:p-10 px-8 py-8 rounded-2xl shadow-lg text-gray-700">
      <h1 className="text-5xl font-semibold mx-auto pb-20 tracking-wider max-md:text-center">
        Our Collection
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-16 sm:gap-8">
        {products.map((product: ProductType | any) => (
          <Link
            href={`/collections/${product.slug?.current}`}
            key={product._id}
            className="text-center space-y-5 max-md:mb-10"
          >
            <div className="relative w-full h-64 bg-orange-300/50 rounded-2xl shadow-lg overflow-hidden">
              <Image
                loading="lazy"
                src={
                  product.image
                    ? urlFor(product.image[0]).url()
                    : "/images/blur-img.png"
                }
                fill
                alt="product image"
                className="object-cover hover:scale-125 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg tracking-wider text-slate-800 font-semibold">
                {product.name}
              </h1>
              <span className="text-slate-700">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full flex justify-center md:mt-14 mt-6">
        <Link
          href={"/collections"}
          className="flex items-center justify-center font-semibold gap-2 "
        >
          <span className="text-white text-lg font-bold">SEE ALL</span>
          <FaArrowRight className="animate-bounce" color="white" size={20} />
        </Link>
      </div>
    </section>
  );
};

export default Collection;
