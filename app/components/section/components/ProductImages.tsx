"use client";

import { images } from "@/libs/constants";
import { useState } from "react";
import Image from "next/image";
import { useStateContext } from "@/app/context/StateContext";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface ProductImagesProps {
  setIsOpen: (value: boolean) => void;
  screenSize: number;
  disabled: boolean;
}

const ProductImages = ({
  setIsOpen,
  screenSize,
  disabled,
}: ProductImagesProps) => {
  const [selectedImg, setSelectedImg] = useState(1);
  const { cartOpen, open } = useStateContext();
  const [isSelected, setIsSelected] = useState(0);

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
          <Image
            src={`/images/image-product-${selectedImg}.jpg`}
            alt="product-image"
            height={700}
            width={400}
            className="sm:rounded-xl sm:w-[450px] w-[700px]"
          />
        </button>
        <BiChevronRight
          size={40}
          className={`absolute fill-black hover:fill-[#FF7D1A] -right-0 max-sm:mr-4 sm:-right-5 bg-white rounded-full p-2 sm:w-12 sm:h-12 cursor-pointer transition select-none sm:hidden`}
          onClick={() => {
            if (selectedImg >= 4) {
              setSelectedImg(0);
            }
            setSelectedImg((prev) => prev + 1);
          }}
        />

        <BiChevronLeft
          size={40}
          className={`absolute fill-black hover:fill-[#FF7D1A] -left-0 max-sm:ml-4 sm:-left-5 bg-white rounded-full p-2 sm:w-12 sm:h-12 cursor-pointer transition select-none sm:hidden`}
          onClick={() => {
            if (selectedImg <= 1) {
              setSelectedImg(5);
            }
            setSelectedImg((prev) => prev - 1);
          }}
        />
      </div>

      <div className="flex lg:gap-7 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`ring-transparent ring-2 ${
              isSelected === index && "sm:ring-[#FF7D1A]"
            } rounded-lg transition cursor-pointer`}
          >
            <Image
              src={image}
              alt="image-thumbnail"
              width={90}
              height={80}
              className={`rounded-lg hidden sm:flex filte ${
                index === isSelected && "opacity-30"
              } transition`}
              onClick={() => {
                setSelectedImg(index + 1);
                setIsSelected(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
