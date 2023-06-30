"use client";

import { useEffect, useState } from "react";
import {
  ProductButtons,
  ProductDescription,
  ProductImages,
} from "./components";
import LightBox from "./components/LightBox";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/types";

const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const params = useParams();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setDisabled(true);
      }
    });
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "product" && slug.current == $params.slug][0]
  `,
        { params }
      )
      .then((data) => setProduct(data));
  }, []);

  return (
    <>
      <LightBox product={product} isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col lg:flex-row items-center sm:pt-10 sm:px-8 gap-20 mt-12 pb-14">
        <ProductImages
          setIsOpen={setIsOpen}
          screenSize={screenSize}
          disabled={disabled}
          product={product}
          isOpen={isOpen}
        />

        <div className="flex flex-col lg:max-w-[450px]">
          <ProductDescription product={product} />
          <ProductButtons
            price={product?.price}
            image={
              product?.image
                ? product?.image[0].asset._ref
                : "/images/blur-img.png"
            }
          />
        </div>
      </div>
    </>
  );
};

export default Product;
