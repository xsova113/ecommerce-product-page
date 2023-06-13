"use client";

import { useStateContext } from "../../context/StateContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LightBox from "../LightBox";
import { DataType } from "@/types";
import {
  ProductButtons,
  ProductDescription,
  ProductImages,
} from "./components";

const HeroSection = () => {
  const { setQty } = useStateContext();
  const [data, setData] = useState<DataType>();
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(0);
  const [disabled, setDisabled] = useState(false);

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
  }, [setQty]);

  return (
    <>
      <LightBox isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col lg:flex-row items-center sm:pt-10 sm:px-8 gap-20 pb-14">
        <ProductImages
          setIsOpen={setIsOpen}
          screenSize={screenSize}
          disabled={disabled}
        />

        <div className="flex flex-col lg:max-w-[450px]">
          <ProductDescription data={data!} />
          <ProductButtons setQty={setQty} />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
