import Image from "next/image";
import Link from "next/link";
import { AiFillDownCircle } from "react-icons/ai";
import { CollectionBanner } from "@/types";
import { urlFor } from "@/sanity/lib/image";

const ReadMore = ({ banner }: { banner: CollectionBanner }) => {
  return (
    <section className="md:p-10 mt-14 px-4 py-8 bg-gradient-to-br from-violet-200 via-purple-200 to-blue-200 rounded-2xl mb-14 w-full shadow-lg text-gray-700">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center text-center justify-center">
        <div className="md:snap-y snap-x snap-mandatory gap-32 md:py-12 overflow-y-scroll flex flex-col h-[400px] md:flex-1">
          {banner.image.map((image) => (
            <div
              key={image._key}
              className="snap-center relative md:w-full md:h-[400px] w-[300px] min-h-[300px]"
            >
              <Image // @ts-ignore
                src={urlFor(image).url()}
                alt="readmore image"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <span className="self-start animate-bounce absolute left-[360px]">
          <AiFillDownCircle size={35} />
        </span>
        <div className="flex flex-col md:flex-1 text-center md:text-start md:gap-12 gap-8 justify-end">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
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
