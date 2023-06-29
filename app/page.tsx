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
  const bannerData = await client.fetch(`*[_type == "banner"][0]`);
  const { products: newRelease } =
    await client.fetch(`*[_type == "newRelease"] {
    ...,
    products[] -> {...}
  }[0]`);

  return (
    <main>
      <Banner bannerData={bannerData} />
      <Perks />
      <Collection products={products} />
      <ReadMore />
      <NewRelease newRelease={newRelease} />
      <Subscribe />
    </main>
  );
};

export default Home;
