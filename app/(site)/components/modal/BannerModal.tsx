import { urlFor } from "@/sanity/lib/image";
import { CollectionBanner } from "@/types";
import Image from "next/image";

const BannerModal = ({ banner }: { banner: CollectionBanner }) => {
  return (
    <section className="md:p-10 px-4 py-8 bg-gradient-to-br from-violet-200 via-purple-200 to-blue-200 rounded-2xl w-full shadow-lg text-gray-700">
      <div className="flex flex-col md:flex-row md:gap-20 justify-center items-center">
        <div className="md:snap-y snap-x snap-mandatory gap-32 md:py-12 overflow-y-scroll flex flex-col h-[400px] md:flex-1">
          {banner.image.map((image, index) => (
            <div
              key={index}
              className="snap-center relative md:w-full md:h-[400px] w-[300px] min-h-[300px]"
            >
              <Image
                // @ts-ignore
                src={urlFor(image).url()}
                alt="banner-image"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-1 text-center md:text-start justify-end">
          <h1 className="md:text-6xl text-4xl font-black uppercase tracking-widest md:mb-20 mb-12">
            {banner.largeText1}
          </h1>
          <span className="md:text-4xl text-3xl mb-8">
            <span className="text-red-500 font-extrabold">
              {banner.discount}
            </span>
            &nbsp;OFF
          </span>
          <p className="md:text-2xl text-lg">{banner.largeText2}</p>
        </div>
      </div>
    </section>
  );
};

export default BannerModal;
