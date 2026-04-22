export default {
  async afterCreate(event: { result?: { id?: number } }) {
    await syncProductMediaFields(event.result?.id);
  },

  async afterUpdate(event: { result?: { id?: number } }) {
    await syncProductMediaFields(event.result?.id);
  }
};

type MediaFile = {
  url: string;
};

type ProductWithMedia = {
  id: number;
  category?: string | null;
  image?: string | null;
  gallery?: string[] | null;
  imageFile?: MediaFile | null;
  galleryFiles?: MediaFile[] | null;
  productCategory?: {
    name: string;
  } | null;
};

async function syncProductMediaFields(productId?: number) {
  if (!productId) {
    return;
  }

  const product = (await strapi.db.query("api::product.product").findOne({
    where: { id: productId },
    populate: ["imageFile", "galleryFiles", "productCategory"]
  })) as ProductWithMedia | null;

  if (!product) {
    return;
  }

  const imageFromMedia = product.imageFile ? resolveMediaUrl(product.imageFile) : null;
  const galleryFromMedia =
    Array.isArray(product.galleryFiles) && product.galleryFiles.length > 0
      ? product.galleryFiles.map(resolveMediaUrl).filter(Boolean)
      : [];

  const nextImage = imageFromMedia ?? product.image ?? "";
  const nextGallery =
    galleryFromMedia.length > 0
      ? galleryFromMedia
      : Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery
        : nextImage
          ? [nextImage, nextImage]
          : [];
  const nextCategory = product.productCategory?.name ?? product.category ?? "";

  const hasImageChanged = nextImage !== (product.image ?? "");
  const hasGalleryChanged = JSON.stringify(nextGallery) !== JSON.stringify(product.gallery ?? []);
  const hasCategoryChanged = nextCategory !== (product.category ?? "");

  if (!hasImageChanged && !hasGalleryChanged && !hasCategoryChanged) {
    return;
  }

  await strapi.db.query("api::product.product").update({
    where: { id: productId },
    data: {
      category: nextCategory,
      image: nextImage,
      gallery: nextGallery
    }
  });
}

function resolveMediaUrl(file: MediaFile) {
  if (file.url.startsWith("http://") || file.url.startsWith("https://")) {
    return file.url;
  }

  const baseUrl = (process.env.PUBLIC_URL ?? process.env.STRAPI_PUBLIC_URL ?? "http://localhost:1337").replace(/\/$/, "");
  return `${baseUrl}${file.url}`;
}
