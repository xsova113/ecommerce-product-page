import Image from "next/image";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface LightBoxProps {
  setIsOpen: (value: boolean) => void;
}

const LightBox: React.FC<LightBoxProps> = ({ setIsOpen }) => {
  const images = [
    "/images/image-product-1-thumbnail.jpg",
    "/images/image-product-2-thumbnail.jpg",
    "/images/image-product-3-thumbnail.jpg",
    "/images/image-product-4-thumbnail.jpg",
  ];

  const [selectedImg, setSelectedImg] = useState(1);
  const [isSelected, setIsSelected] = useState(0);

  return (
    <>
      <div
        className="absolute inset-0 bg-gray-950/60"
        onClick={() => setIsOpen(false)}
      />
      <div className={`flex justify-center`}>
        <div className={`absolute bottom-12`}>
          <div className="flex justify-end">
            <IoClose
              size={30}
              className="fill-white hover:fill-[#FF7D1A] transition cursor-pointer mb-2"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex items-center">
            <Image
              src={`/images/image-product-${isSelected + 1}.jpg`}
              alt="product-image"
              height={700}
              width={400}
              className="sm:rounded-xl sm:w-[500px] w-[700px]"
            />

            <BiChevronRight
              size={40}
              className="absolute fill-black hover:fill-[#FF7D1A] -right-5 bg-white rounded-full p-2 w-12 h-12 cursor-pointer transition select-none"
              onClick={() => {
                if (isSelected >= 3) {
                  setIsSelected(-1);
                }
                // setSelectedImg((prev) => prev + 1);
                setIsSelected((prev) => ++prev);
              }}
            />

            <BiChevronLeft
              size={40}
              className="absolute fill-black hover:fill-[#FF7D1A] -left-5 bg-white rounded-full p-2 w-12 h-12 cursor-pointer transition select-none"
              onClick={() => {
                if (isSelected < 1) {
                  setIsSelected(4);
                }
                setIsSelected(prev => --prev );
              }}
            />
          </div>

          <div className="flex lg:gap-7 gap-8 justify-center pt-6">
            {images.map((image, index) => (
              <div
                key={index}
                className={`ring-transparent ring-2 ${
                  isSelected === index && "sm:ring-[#FF7D1A]"
                } rounded-lg transition`}
              >
                <div className=" bg-white rounded-lg">
                  <Image
                    src={image}
                    alt="image-thumbnail"
                    width={80}
                    height={80}
                    className={`rounded-lg hidden sm:flex filter ${
                      isSelected === index && "opacity-40"
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
    </>
  );
};

export default LightBox;
