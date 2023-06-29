import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
// import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gotzyoih",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

export const urlFor = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
