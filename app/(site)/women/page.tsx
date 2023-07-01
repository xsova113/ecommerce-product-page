import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Women = async () => {
  const women =
    await client.fetch(`*[_type == "category" && name == "Women"] {
    products[] -> {...}
}[0]`);

  return (
    <section className="mt-20 flex flex-col items-center">
      <h1 className="text-5xl font-semibold mb-28">Sneakers for Women</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10 gap-6">
        {women.products.map((item: ProductType | any) => (
          <Link
            href={`/collections/${item.slug?.current}`}
            key={item._id}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative rounded-2xl lg:w-64 lg:h-64 w-52 h-52 overflow-hidden">
              <Image
                src={
                  item.image
                    ? urlFor(item.image[0]).url()
                    : "/images/blur-img.png"
                }
                alt="sneaker image"
                loading="lazy"
                fill
                className="object-cover bg-orange-200 shadow-lg hover:scale-125 transition"
              />
            </div>
            <h1 className="font-bold text-lg">{item.name}</h1>
            <span className="text-gray-600">${item.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Women;
