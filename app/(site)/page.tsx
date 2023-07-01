import { client } from "@/sanity/lib/client";
import {
  Perks,
  Collection,
  Banner,
  ReadMore,
  NewRelease,
  Subscribe,
} from "./components/section";

const Home = async () => {
  const products = await client.fetch('*[_type == "product"]');
  const bannerData = await client.fetch(
    `*[_type == "banner" && name == "home banner"][0]`
  );
  const readMoreBanner = await client.fetch(
    `*[_type == "banner" && name == "read more"][0]`
  );
  const { products: newRelease } =
    await client.fetch(`*[_type == "category" && name == "New Release"] {
    products[] -> {...}
}[0]`);

  return (
    <main className="pt-12">
      <Banner bannerData={bannerData} />
      <Perks />
      <Collection products={products} />
      <ReadMore banner={readMoreBanner} />
      <NewRelease newRelease={newRelease} />
      <Subscribe />
    </main>
  );
};

export default Home;
