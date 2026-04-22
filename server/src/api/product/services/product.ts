type ProductRecord = {
  id: number;
  title: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  description: string;
  category?: string | null;
  image?: string | null;
  imageFile?: { url: string } | null;
  gallery?: string[];
  galleryFiles?: Array<{ url: string }> | null;
  ratingRate: number | string;
  ratingCount: number;
  featured?: boolean;
  stockQuantity?: number | null;
  productCategory?: {
    name: string;
  } | null;
};

export default () => ({
  async find(query: Record<string, unknown> = {}) {
    const products = await strapi.db.query("api::product.product").findMany({
      where: buildFilters(query),
      populate: ["imageFile", "galleryFiles", "productCategory"],
      orderBy: { id: "asc" },
    });

    return products.map(formatProduct);
  },

  async findOne(id: string) {
    const product = await strapi.db.query("api::product.product").findOne({
      where: { id: Number(id) },
      populate: ["imageFile", "galleryFiles", "productCategory"],
    });

    if (!product) {
      return null;
    }

    return formatProduct(product);
  },

  async categories() {
    const categories = await strapi.db.query("api::category.category").findMany({
      where: { isActive: true },
      select: ["name", "sortOrder"],
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    return categories.map((category: { name: string }) => category.name);
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
  const category = product.productCategory?.name ?? product.category ?? "Uncategorized";
  const image = resolveImage(product);
  const gallery = resolveGallery(product, image);

  return {
    id: product.id,
    title: product.title,
    price: Number(product.price),
    compareAtPrice:
      product.compareAtPrice === null || typeof product.compareAtPrice === "undefined"
        ? null
        : Number(product.compareAtPrice),
    description: product.description,
    category,
    image,
    gallery,
    rating: {
      rate: Number(product.ratingRate),
      count: Number(product.ratingCount),
    },
    featured: Boolean(product.featured),
    stockQuantity: Number(product.stockQuantity ?? 0),
  };
}

function resolveImage(product: ProductRecord) {
  if (product.imageFile?.url) {
    return toAbsoluteMediaUrl(product.imageFile.url);
  }

  return product.image ?? "";
}

function resolveGallery(product: ProductRecord, fallbackImage: string) {
  if (Array.isArray(product.galleryFiles) && product.galleryFiles.length > 0) {
    return product.galleryFiles
      .map((file) => toAbsoluteMediaUrl(file.url))
      .filter((item): item is string => Boolean(item));
  }

  if (Array.isArray(product.gallery) && product.gallery.length > 0) {
    return product.gallery;
  }

  return fallbackImage ? [fallbackImage, fallbackImage] : [];
}

function toAbsoluteMediaUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = (process.env.PUBLIC_URL ?? process.env.STRAPI_PUBLIC_URL ?? "http://localhost:1337").replace(/\/$/, "");
  return `${baseUrl}${url}`;
}
