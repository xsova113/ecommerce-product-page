import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import banner from "./banner";
import newRelease from "./newRelease";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner, newRelease],
};
