"use client";

import { useState } from "react";
import Image from "next/image";
import { useStateContext } from "@/app/context/StateContext";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { ProductType } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ProductImagesProps {
  setIsOpen: (value: boolean) => void;
  screenSize: number;
  disabled: boolean;
  product?: ProductType | any;
  isOpen: boolean;
}

const ProductImages = ({
  setIsOpen,
  screenSize,
  disabled,
  isOpen,
  product,
}: ProductImagesProps) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const { cartOpen, open } = useStateContext();

  return (
    <div className="flex flex-col items-center sm:items-start gap-6 flex-initial">
      <div
        className={`max-sm:relative flex items-center ${
          (cartOpen || open) && "-z-20"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          disabled={screenSize < 640 && disabled}
          className="sm:w-auto sm:h-auto sm:block max-sm:w-screen max-sm:-z-10"
        >
          <div className={`relative h-[400px] w-[400px] ${isOpen && "-z-10"}`}>
            <Image
              priority
              src={
                product?.image
                  ? urlFor(product.image[selectedImg]).url()
                  : "/images/blur-img.png"
              }
              alt="product-image"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </button>

        {/* left / right buttons for mobile view  */}
        <BiChevronRight
          size={40}
          className={`absolute fill-black hover:fill-[#FF7D1A] -right-0 max-sm:mr-4 sm:-right-5 bg-white rounded-full p-2 sm:w-12 sm:h-12 cursor-pointer transition select-none sm:hidden`}
          onClick={() => {
            if (selectedImg >= product?.image?.length - 1) {
              setSelectedImg(0);
              return;
            }
            setSelectedImg((prev) => prev + 1);
          }}
        />

        <BiChevronLeft
          size={40}
          className={`absolute fill-black hover:fill-[#FF7D1A] -left-0 max-sm:ml-4 sm:-left-5 bg-white rounded-full p-2 sm:w-12 sm:h-12 cursor-pointer transition select-none sm:hidden`}
          onClick={() => {
            if (selectedImg <= 0) {
              setSelectedImg(product?.image?.length - 1);
              return;
            }
            setSelectedImg((prev) => prev - 1);
          }}
        />
      </div>

      <div className={`flex lg:gap-7 gap-8`}>
        {product?.image?.map((image: any, index: number) => (
          <div
            key={index}
            className={`ring-transparent ring-2 ${
              selectedImg === index && "sm:ring-[#FF7D1A]"
            } rounded-lg transition cursor-pointer relative w-[80px] h-[80px]`}
          >
            <Image
              src={urlFor(image).url()}
              alt="image-thumbnail"
              fill
              className={`rounded-lg hidden sm:flex filte ${
                index === selectedImg && "opacity-30"
              } transition object-cover`}
              onClick={() => {
                setSelectedImg(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
