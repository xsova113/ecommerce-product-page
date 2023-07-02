import { client } from "@/sanity/lib/client";
import BannerModal from "../components/modal/BannerModal";
import CollectionModal from "../components/modal/collectionModal";

const Women = async () => {
  const banner = await client.fetch(
    `*[_type == "banner" && name == "women"][0]`
  );
  const { products } =
    await client.fetch(`*[_type == "category" && name == "Women"] {
    products[] -> {...}
}[0]`);

  return (
    <section className="pt-32 flex flex-col items-center bg-">
      <BannerModal
        banner={banner}
        customContainerStyle="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500"
      />
      <CollectionModal title={"Sneakers for Women"} category={products} />
    </section>
  );
};

export default Women;
