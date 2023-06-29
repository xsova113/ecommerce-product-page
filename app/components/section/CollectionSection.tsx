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
    <section className="flex flex-col">
      <h1 className="text-5xl font-semibold mx-auto pb-40">Our Collection</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-16 sm:gap-8">
        {products.map((product: ProductType | any) => (
          <Link
            href={`/collections/${product.slug?.current}`}
            key={product._id}
            className="text-center space-y-5"
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
              <span className="text-slate-600">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={"/collections"}
        className="flex items-center justify-center pt-24 font-semibold gap-2"
      >
        See All
        <FaArrowRight className="animate-bounce" />
      </Link>
    </section>
  );
};

export default Collection;