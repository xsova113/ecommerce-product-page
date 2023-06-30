import { urlFor } from "@/sanity/lib/image";
import { BannerType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BannerProps {
  bannerData: BannerType | any;
}

const Banner = ({ bannerData }: BannerProps) => {
  return (
    <div className="flex pt-20 items-center max-sm:text-center">
      <div className="flex flex-col lg:w-1/2 md:w-2/3 w-full max-md:items-center ">
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-extrabold pb-12 lg:leading-[80px]">
          Find your dream sneakers
        </h1>
        <p className="text-lg pb-14 w-3/4 text-gray-500">{bannerData.desc}</p>
        <Link
          href={"/collections"}
          className="bg-orange-500 w-fit py-3 px-5 text-lg text-white hover:bg-orange-500/70 transition rounded-lg"
        >
          {bannerData.buttonText}
        </Link>
      </div>
      <div className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] right-20 top-44 -z-50">
        <Image
          src={urlFor(bannerData.image).url()}
          alt="banner image"
          priority
          fill
          className="object-contain rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Banner;
