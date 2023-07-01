import Image from "next/image";
import Link from "next/link";

const ReadMore = () => {
  return (
    <section className="md:p-10 mt-14 px-4 py-8 bg-gradient-to-br from-violet-200 via-purple-200 to-blue-200 rounded-2xl mb-14 w-full shadow-lg text-gray-700">
      <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center text-center justify-center">
        <div className="relative md:w-full md:h-[400px] w-[300px] h-[300px] md:flex-1 ">
          <Image
            src={"/images/sneakerlogo.png"}
            alt="readmore image"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col md:flex-1 text-center md:text-start md:gap-12 gap-8 justify-end">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold">
            Dedicated to quality and result
          </h1>
          <p className="w-3/4 text-gray-500 max-md:self-center">
            Providing the best sneakers of various type and designed them for
            true shoe lovers. Hottest trend&apos;s styles and multi-cultural!
          </p>
          <Link
            href={"/about"}
            className="bg-red-500 w-fit py-3 px-5 text-lg max-md:self-center text-white rounded-lg hover:bg-red-500/70 transition"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadMore;
