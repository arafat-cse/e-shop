import type { Core } from "@strapi/strapi";

const seedProducts = [
  {
    title: "Aether Wireless Headphones",
    price: 149.99,
    description:
      "Immersive over-ear headphones with adaptive noise cancellation, 40-hour battery life, and a premium aluminum finish.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.8,
    ratingCount: 342,
    featured: true,
  },
  {
    title: "Summit Performance Jacket",
    price: 119.5,
    description:
      "Weather-resistant outerwear with thermal lining, breathable panels, and an urban athletic silhouette.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.6,
    ratingCount: 188,
    featured: true,
  },
  {
    title: "Halo Skin Serum",
    price: 38,
    description:
      "Brightening vitamin serum with hyaluronic acid, designed for daily hydration and a smooth finish.",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.7,
    ratingCount: 271,
    featured: true,
  },
  {
    title: "Luna Ceramic Lamp",
    price: 84,
    description:
      "Textured ceramic table lamp with warm ambient glow, linen shade, and a sculptural silhouette for modern interiors.",
    category: "home decor",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.5,
    ratingCount: 94,
    featured: false,
  },
  {
    title: "Strata Smartwatch",
    price: 199.99,
    description:
      "AMOLED smartwatch with health tracking, Bluetooth calling, GPS workout modes, and interchangeable straps.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.9,
    ratingCount: 521,
    featured: true,
  },
  {
    title: "Vale Leather Tote",
    price: 132.75,
    description:
      "Structured everyday tote in smooth leather with a padded laptop sleeve and refined hardware details.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.4,
    ratingCount: 116,
    featured: false,
  },
  {
    title: "Crest Coffee Maker",
    price: 89.2,
    description:
      "Compact brewer with programmable timer, thermal carafe, and precision extraction for rich morning coffee.",
    category: "home appliances",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.3,
    ratingCount: 76,
    featured: false,
  },
  {
    title: "Orbit Gaming Mouse",
    price: 59,
    description:
      "Ergonomic gaming mouse with custom DPI profiles, lightweight frame, and responsive tactile switches.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?auto=format&fit=crop&w=900&q=80"
    ],
    ratingRate: 4.6,
    ratingCount: 203,
    featured: false,
  }
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const existingProducts = await strapi.db.query("api::product.product").count();

    if (existingProducts > 0) {
      return;
    }

    for (const product of seedProducts) {
      await strapi.db.query("api::product.product").create({ data: product });
    }
  },
};
