type ProductRecord = {
  id: number;
  title: string;
  price: number | string;
  description: string;
  category: string;
  image: string;
  gallery?: string[];
  ratingRate: number | string;
  ratingCount: number;
  featured?: boolean;
};

export default () => ({
  async find(query: Record<string, unknown> = {}) {
    const products = await strapi.db.query("api::product.product").findMany({
      where: buildFilters(query),
      orderBy: { id: "asc" },
    });

    return products.map(formatProduct);
  },

  async findOne(id: string) {
    const product = await strapi.db.query("api::product.product").findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      return null;
    }

    return formatProduct(product);
  },

  async categories() {
    const products = await strapi.db.query("api::product.product").findMany({
      select: ["category"],
      orderBy: { category: "asc" },
    });

    return [...new Set(products.map((product: { category: string }) => product.category))];
  },
});

function buildFilters(query: Record<string, unknown>) {
  const filters: Record<string, unknown> = {};

  if (typeof query.category === "string" && query.category !== "all") {
    filters.category = query.category;
  }

  if (typeof query.featured === "string") {
    filters.featured = query.featured === "true";
  }

  return filters;
}

function formatProduct(product: ProductRecord) {
  return {
    id: product.id,
    title: product.title,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    image: product.image,
    gallery:
      Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery
        : [product.image, product.image],
    rating: {
      rate: Number(product.ratingRate),
      count: Number(product.ratingCount),
    },
    featured: Boolean(product.featured),
  };
}
