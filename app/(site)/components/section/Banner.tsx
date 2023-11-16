import { urlFor } from "@/sanity/lib/image";
import { BannerType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BannerProps {
  bannerData: BannerType;
}

const Banner = ({ bannerData }: BannerProps) => {
  return (
    <section className="md:p-10 mt-20 px-4 py-8 bg-gradient-to-br from-violet-800 via-purple-700 to-blue-700 rounded-2xl mb-14 w-full shadow-xl text-gray-200">
      <div className="flex flex-col md:flex-row gap-8 md:gap-20 justify-center">
        <div className="flex flex-col lg:w-1/2 md:w-2/3 w-full max-md:items-center ">
          <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl max-md:text-center font-extrabold pb-12 lg:leading-[80px]">
            {bannerData.largeText1}
          </h1>
          <p className="text-lg pb-14 w-3/4 text-gray-300">{bannerData.desc}</p>
          <Link
            href={"/collections"}
            className="bg-red-500 w-fit py-4 px-8 text-2xl text-white hover:bg-red-500/70 transition rounded-lg"
          >
            {bannerData.buttonText}
          </Link>
        </div>
        <div className="relative w-[300px] h-[300px] self-center md:flex-1">
          <Image
            //@ts-ignore
            src={urlFor(bannerData.image[0]).toString()}
            alt="banner image"
            priority
            fill
            className="object-contain rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
