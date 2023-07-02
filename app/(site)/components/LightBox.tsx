import Image from "next/image";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Transition } from "@headlessui/react";
import { ProductType } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface LightBoxProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  product?: ProductType;
}

const LightBox: React.FC<LightBoxProps> = ({ isOpen, setIsOpen, product }) => {
  const [isSelected, setIsSelected] = useState(0);

  return (
    <Transition
      appear
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`absolute h-[120%] inset-0 bg-gray-950/60`}
        onClick={() => setIsOpen(false)}
      />

      <div className="flex justify-center">
        <div className={`z-50 absolute bottom-6`}>
          <div className="flex justify-end">
            <IoClose
              size={30}
              className="fill-white hover:fill-[#FF7D1A] transition cursor-pointer mb-2"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex items-center">
            <div className="relative w-[500px] h-[500px] sm:rounded-lg bg-white/30 backdrop-blur">
              <Image
                src={
                  product?.image
                    ? // @ts-ignore
                      urlFor(product.image[isSelected]).url()
                    : "/images/blur-img.png"
                }
                alt="product-image"
                fill
                className="sm:rounded-xl object-contain"
              />
            </div>

            <BiChevronRight
              size={40}
              className="absolute fill-black hover:fill-[#FF7D1A] -right-5 bg-white rounded-full p-2 w-12 h-12 cursor-pointer transition select-none"
              onClick={() => {
                if (product?.image) {
                  if (isSelected >= product?.image?.length - 1) {
                    setIsSelected(0);
                    return;
                  }
                  setIsSelected((prev) => ++prev);
                }
              }}
            />

            <BiChevronLeft
              size={40}
              className="absolute fill-black hover:fill-[#FF7D1A] -left-5 bg-white rounded-full p-2 w-12 h-12 cursor-pointer transition select-none"
              onClick={() => {
                if (product?.image) {
                  if (isSelected < product?.image?.length) {
                    setIsSelected(product?.image?.length);
                  }
                  setIsSelected((prev) => --prev);
                }
              }}
            />
          </div>

          <div className="flex lg:gap-7 gap-8 justify-center pt-6">
            {product?.image?.map((image: any, index: number) => (
              <div
                key={index}
                className={`ring-transparent ring-2 ${
                  isSelected === index && "sm:ring-[#FF7D1A]"
                } rounded-lg transition`}
              >
                <div className="relative bg-white rounded-lg w-[80px] h-[80px]">
                  <Image
                    src={image ? urlFor(image).url() : "/images/blur-img.png"}
                    alt="image-thumbnail"
                    fill
                    loading="lazy"
                    className={`rounded-lg hidden sm:flex ${
                      isSelected === index && "opacity-60"
                    } transition cursor-pointer hover:opacity-60`}
                    onClick={() => {
                      setIsSelected(index);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default LightBox;
