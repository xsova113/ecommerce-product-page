export default {
  name: "newRelease",
  title: "New Release",
  type: "document",
  fields: [
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{type: "product"}] }],
    },
  ],
};
