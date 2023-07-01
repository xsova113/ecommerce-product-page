import { ProductType } from "@/types";

const ProductDescriptions = ({ product }: { product?: ProductType }) => {
  return (
    <>
      <span className="text-[#FF7D1A] font-bold text-xs pb-5">
        SNEAKER COMPANY
      </span>
      <h1 className="text-5xl font-bold pb-8">{product?.name}</h1>
      <p className="text-gray-500/80 pb-20">{product?.details}</p>
      <div className="flex flex-row lg:flex-col justify-between">
        <div className="flex gap-2 items-center pb-2">
          <span className="font-bold text-2xl">
            ${product?.price ? Math.floor(product.price * 0.5 * 100) / 100 : "Not available"}
          </span>
          <span className="text-[#FF7D1A] bg-[#FFEDE0] px-2 py-1 rounded-md text-sm font-bold">
            50%
          </span>
        </div>
        <span className="text-gray-400/80 line-through text-sm font-bold">
          ${product?.price}
        </span>
      </div>
    </>
  );
};

export default ProductDescriptions;
