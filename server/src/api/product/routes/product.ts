export default {
  routes: [
    {
      method: "GET",
      path: "/store/products",
      handler: "product.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/store/products/:id",
      handler: "product.findOne",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/store/categories",
      handler: "product.categories",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
