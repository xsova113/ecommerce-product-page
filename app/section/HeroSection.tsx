"use client";

import Image from "next/image";
import { useStateContext } from "../context/StateContext";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import LightBox from "../components/LightBox";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface dataType {
  products: [
    {
      title: string;
      price: number;
    }
  ];
}

const HeroSection = () => {
  const images = [
    "/images/image-product-1-thumbnail.jpg",
    "/images/image-product-2-thumbnail.jpg",
    "/images/image-product-3-thumbnail.jpg",
    "/images/image-product-4-thumbnail.jpg",
  ];

  const { qty, setQty, cartOpen } = useStateContext();
  const [data, setData] = useState<dataType>();
  const [itemNumber, setItemNumber] = useState(0);
  const [selectedImg, setSelectedImg] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setDisabled(true);
      }
    });
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    const storedQty = localStorage.getItem("itemQty");
    if (storedQty) {
      setQty(JSON.parse(storedQty));
    }
    console.log(storedQty);
  }, [setQty]);

  const handleMinus = () => {
    if (itemNumber === 0) return;
    setItemNumber((prev: number) => --prev);
  };

  return (
    <>
      {isOpen && <LightBox setIsOpen={setIsOpen} />}

      <div className="flex flex-col lg:flex-row items-center sm:pt-10 sm:px-8 gap-10">
        <div className="flex flex-col items-center sm:items-start gap-6 flex-initial">
          <div
            className={`max-sm:relative flex items-center ${
              cartOpen && "-z-10"
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
                className="sm:rounded-xl sm:w-[400px] w-[700px]"
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
                  width={80}
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
        <div className="flex flex-col flex-1">
          <span className="text-[#FF7D1A] font-bold text-xs pb-5">
            SNEAKER COMPANY
          </span>
          <h1 className="text-5xl font-bold pb-8">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-gray-500/80 pb-6">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they&apos;ll withstand
            everything the weather can offer.
          </p>
          <div className="flex flex-row lg:flex-col justify-between">
            <div className="flex gap-2 items-center pb-2">
              <span className="font-bold text-2xl">
                $
                {data?.products[0]
                  ? Math.floor(data?.products[0].price * 0.5 * 100) / 100
                  : 0}
              </span>
              <span className="text-[#FF7D1A] bg-[#FFEDE0] px-2 py-1 rounded-md text-sm font-bold">
                50%
              </span>
            </div>
            <span className="text-gray-400/80 line-through text-sm font-bold">
              ${data?.products[0].price}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row pt-5 gap-3">
            <div className="lg:p-1 max-sm:py-2 px-4 bg-[#F7F8FD] rounded-lg flex flex-1 items-center justify-between sm:max-w-[150px]">
              <button className="p-2" onClick={handleMinus}>
                <Image
                  src={"./images/icon-minus.svg"}
                  alt="minus-icon"
                  width={10}
                  height={10}
                />
              </button>

              <span className="font-bold">{itemNumber}</span>

              <button
                className="p-2"
                onClick={() => setItemNumber((prev: number) => ++prev)}
              >
                <Image
                  src={"./images/icon-plus.svg"}
                  alt="plus-icon"
                  width={10}
                  height={10}
                />
              </button>
            </div>
            <button
              className="flex flex-1 items-center py-3 px-8 bg-[#FF7D1A] rounded-lg text-white justify-center gap-2 shadow-xl shadow-[#FF7D1A]/30 active:bg-[#FF7D1A]/80 transition"
              onClick={() => {
                setQty(itemNumber);
                localStorage.setItem("itemQty", JSON.stringify(itemNumber));
              }}
            >
              <AiOutlineShoppingCart />
              <span className="font-bold">&nbsp;Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
