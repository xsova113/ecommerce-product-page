import { defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
  ],
});
