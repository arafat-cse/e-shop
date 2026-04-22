import { JerseyHomepage } from "@/components/home/jersey-homepage";
import { getProducts } from "@/lib/api/products";

export default async function HomePage() {
  const products = await getProducts();
  return <JerseyHomepage products={products} />;
}
