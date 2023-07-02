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
            how it started
          </h1>
          <p className="text-gray-600 w-4/5">
            Adipisicing Lorem sunt sit nulla pariatur. Ut proident dolore dolore
            nulla. Excepteur amet labore pariatur voluptate quis nulla sint
            aliqua sit labore cillum labore.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
