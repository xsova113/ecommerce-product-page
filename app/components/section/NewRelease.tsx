import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const NewRelease = ({ newRelease }: any) => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-5xl font-semibold pt-40 pb-28">New Release</h1>
      <div className="grid w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-16 sm:gap-8">
        {newRelease.map((product: any) => (
          <Link
            href={`/collections/${product.slug?.current}`}
            key={product._id}
            className="text-center space-y-5"
          >
            <div className="relative w-full h-64 bg-orange-300/50 rounded-2xl shadow-lg overflow-hidden">
              <Image
                loading="lazy"
                src={
                  product.image
                    ? urlFor(product.image[0]).url()
                    : "/images/blur-img.png"
                }
                fill
                alt="product image"
                className="object-cover hover:scale-125 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg tracking-wider text-slate-800 font-semibold">
                {product.name}
              </h1>
              <span className="text-slate-600">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewRelease;
