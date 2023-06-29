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
    <div className="flex pt-20 items-center">
      <div className="flex flex-col flex-1">
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
      <div className="relative h-[500px] flex-1">
        <Image
          src={urlFor(bannerData.image).url()}
          alt="banner image"
          priority
          fill
          className="object-contain rounded-3xl -z-10"
        />
      </div>
    </div>
  );
};

export default Banner;
