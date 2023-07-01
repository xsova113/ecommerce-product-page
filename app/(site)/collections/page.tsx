import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Banner } from "./components";

const Collections = async () => {
  const sneakers = await client.fetch(`*[_type == "product"]{...}`);
  const banner = await client.fetch(
    `*[_type == "banner" && name == "collection banner"][0]`
  );
  return (
    <section className="mt-20 flex flex-col items-center">
      <Banner banner={banner} />
      <div className="grid mt-14 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10 gap-6">
        {sneakers.map((sneaker: ProductType | any) => (
          <Link
            href={`/collections/${sneaker.slug?.current}`}
            key={sneaker._id}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative rounded-2xl sm:w-64 lg:h-64 w-80 h-72 overflow-hidden">
              <Image
                src={
                  sneaker.image
                    ? urlFor(sneaker.image[0]).url()
                    : "/images/blur-img.png"
                }
                alt="sneaker image"
                loading="lazy"
                fill
                className="object-cover bg-orange-200 shadow-lg hover:scale-125 transition"
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
