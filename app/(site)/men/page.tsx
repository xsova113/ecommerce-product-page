import { client } from "@/sanity/lib/client";
import React from "react";
import CollectionModal from "../components/modal/collectionModal";
import BannerModal from "../components/modal/BannerModal";

const Men = async () => {
  const { products } =
    await client.fetch(`*[_type == "category" && name == "Men"] {
    products[] -> {...}
}[0]`);
  const banner = await client.fetch(`*[_type == "banner" && name == "men"][0]`);

  return (
    <section className="pt-32 flex flex-col items-center">
      <BannerModal
        banner={banner}
        customContainerStyle="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-200"
      />
      <CollectionModal title="Sneakers for Men" category={products} />
    </section>
  );
};

export default Men;
