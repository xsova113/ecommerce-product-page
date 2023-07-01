import { client } from "@/sanity/lib/client";
import React from "react";
import CollectionModal from "../components/modal/collectionModal";
import BannerModal from "../components/modal/BannerModal";

const Men = async () => {
  const { products } =
    await client.fetch(`*[_type == "category" && name == "Men"] {
    products[] -> {...}
}[0]`);
  const banner = await client.fetch(
    `*[_type == "banner" && name == "collection banner"][0]`
  );

  return (
    <section className="mt-20 flex flex-col items-center">
      <BannerModal banner={banner} />
      <CollectionModal title="Sneakers for Men" category={products} />
    </section>
  );
};

export default Men;
