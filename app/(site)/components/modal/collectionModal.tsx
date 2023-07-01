import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CollectionModalProps {
  title: string;
  category: any;
}

const CollectionModal = ({ title, category }: CollectionModalProps) => {
  return (
    <section className="flex flex-col mt-14 max-md:items-center bg-gradient-to-tr from-purple-400 via-blue-300 to-fuchsia-300 md:p-12 w-full px-8 py-8 rounded-2xl shadow-lg text-gray-700">
      <h1 className="text-5xl font-bold mx-auto pb-20 tracking-wider max-md:text-center">
        {title}
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-16 sm:gap-8">
        {category.map((product: ProductType) => (
          <Link
            href={`/collections/${product.slug?.current}`}
            key={product._id}
            className="text-center space-y-5 max-md:mb-6"
          >
            <div className="relative max-md:w-72 max-md:h-72 w-64 h-64 bg-white/30 rounded-2xl shadow-lg overflow-hidden">
              <Image
                loading="lazy"
                src={
                  product.image // @ts-ignore
                    ? urlFor(product.image[0]).url()
                    : "/images/blur-img.png"
                }
                fill
                alt="product image"
                className="object-contain hover:scale-125 transition"
              />
            </div>
            <div className="flex flex-col">
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

export default CollectionModal;
