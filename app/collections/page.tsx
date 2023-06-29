import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const sneakers = await client.fetch(`*[_type == "product"]{...}`);

  return (
    <section className="mt-20 flex flex-col items-center">
      <h1 className="text-5xl font-semibold mb-20">Expore All Sneakers</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10 gap-6">
        {sneakers.map((sneaker: ProductType | any) => (
          <Link href={`/collections/${sneaker.slug?.current}`} key={sneaker._id} className="flex flex-col items-center gap-3">
            <div className="relative lg:w-64 lg:h-64 w-52 h-52">
              <Image
                src={
                  sneaker.image
                    ? urlFor(sneaker.image[0]).url()
                    : "/images/blur-img.png"
                }
                alt="sneaker image"
                loading="lazy"
                fill
                className="object-cover rounded-2xl bg-orange-200 shadow-lg"
              />
            </div>
            <h1 className="font-bold text-lg">{sneaker.name}</h1>
            <span className="text-gray-600">${sneaker.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collections;
