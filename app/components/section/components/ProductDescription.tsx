import { DataType } from "@/types";

const ProductDescriptions = ({ data }: {data: DataType}) => {
  return (
    <>
      <span className="text-[#FF7D1A] font-bold text-xs pb-5">
        SNEAKER COMPANY
      </span>
      <h1 className="text-5xl font-bold pb-8">Fall Limited Edition Sneakers</h1>
      <p className="text-gray-500/80 pb-6">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they&apos;ll withstand everything
        the weather can offer.
      </p>
      <div className="flex flex-row lg:flex-col justify-between">
        <div className="flex gap-2 items-center pb-2">
          <span className="font-bold text-2xl">
            $
            {data?.products[0]
              ? Math.floor(data?.products[0].price * 0.5 * 100) / 100
              : 0}
          </span>
          <span className="text-[#FF7D1A] bg-[#FFEDE0] px-2 py-1 rounded-md text-sm font-bold">
            50%
          </span>
        </div>
        <span className="text-gray-400/80 line-through text-sm font-bold">
          ${data?.products[0].price}
        </span>
      </div>
    </>
  );
};

export default ProductDescriptions;
