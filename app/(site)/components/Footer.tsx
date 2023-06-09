import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="flex flex-col pb-20">
      <div className="footer max-md:gap-8 max-md:text-center max-md:items-center flex flex-col md:flex-row mt-32 justify-between">
        <div className="relative w-2/4 sm:w-1/4 h-[100px]">
          <Image
            src={"/images/logo2.svg"}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-base font-semibold">About</h1>
          <Link href={"/about"}>About Us</Link>
          <Link href={"#"}>Features</Link>
          <Link href={"#"}>News & Blog</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-base font-semibold">Connect</h1>
          <Link href={"#"}>Linkdin</Link>
          <Link href={"#"}>Facebook</Link>
          <Link href={"#"}>Twitter</Link>
          <Link href={"#"}>Instagram</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-base font-semibold">Support</h1>
          <Link href={"#"}>FAQs</Link>
          <Link href={"#"}>Support Center</Link>
          <Link href={"/contact"}>Contact US</Link>
        </div>
      </div>
      <span className="text-center text-sm mt-12 text-gray-600">
        Copyright © {currentYear} Sneakers. All rights reserved
      </span>
    </section>
  );
};

export default Footer;
