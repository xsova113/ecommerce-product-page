import { client } from "@/sanity/lib/client";
import BannerModal from "../components/modal/BannerModal";
import CollectionModal from "../components/modal/collectionModal";

const Women = async () => {
  const banner = await client.fetch(
    `*[_type == "banner" && name == "collection banner"][0]`
  );
  const { products } =
    await client.fetch(`*[_type == "category" && name == "Women"] {
    products[] -> {...}
}[0]`);

  return (
    <section className="pt-32 flex flex-col items-center">
      <BannerModal banner={banner} />
      <CollectionModal title={"Sneakers for Women"} category={products} />
    </section>
  );
};

export default Women;
