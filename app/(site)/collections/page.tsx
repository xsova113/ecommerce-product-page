import { client } from "@/sanity/lib/client";
import React from "react";
import { Banner } from "./components";
import CollectionModal from "../components/modal/collectionModal";

const Collections = async () => {
  const sneakers = await client.fetch(`*[_type == "product"]{...}`);
  const banner = await client.fetch(
    `*[_type == "banner" && name == "collection banner"][0]`
  );
  return (
    <section className="mt-20 flex flex-col items-center">
      <Banner banner={banner} />
      <CollectionModal title={"Our Collections"} category={sneakers} />
    </section>
  );
};

export default Collections;
