import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="flex flex-col pt-32 items-center">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-[350px] sm:flex-1 h-[350px] sm:h-[450px] md:h-[550px] bg-gradient-to-tr from-slate-500 via-stone-500 to-sky-950 rounded-2xl shadow-2xl p-4">
          <Image
            src={"/images/sneakerlogo.png"}
            alt="about image"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-gray-800 flex-1">
          <h1 className="text-3xl font-bold uppercase tracking-wider pb-2 mb-10 border-b ">
            Introducing Sneakers – Unleash Your Full Potential
          </h1>
          <p className="text-gray-600 w-4/5">
            At Sneakers, we believe that every step you take is a chance to
            break boundaries, redefine limits, and push towards excellence. We
            understand the relentless dedication of athletes, both men and
            women, who strive for greatness day in and day out. That&apos;s why
            we&apos;ve crafted a sneaker brand that aligns with your unwavering
            commitment to performance and style.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
