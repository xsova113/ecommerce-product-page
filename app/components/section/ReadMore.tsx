import Image from "next/image";
import Link from "next/link";

const ReadMore = () => {
  return (
    <section className="pt-40 flex flex-col-reverse md:flex-row gap-12 md:items-center justify-center">
      <div className="relative md:w-full md:h-[400px] w-[300px] h-[300px] md:flex-1 ">
        <Image
          src={"/images/sneakerlogo.png"}
          alt="readmore image"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col flex-1 gap-8 max-md:text-center max-md:items-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold">
          Dedicated to quality and result
        </h1>
        <p className="w-3/4 text-gray-500">
          Providing the best sneakers of various type and designed them for true
          shoe lovers. Hottest trend&apos;s styles and multi-cultural!
        </p>
        <Link
          href={"/about"}
          className="bg-orange-500 w-fit py-3 px-5 text-lg text-white rounded-lg hover:bg-orange-500/70 transition"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default ReadMore;
