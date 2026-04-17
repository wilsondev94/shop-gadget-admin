import { getCategoriesWithProducts } from "@/actions/categories";
import { Product } from "./components/Prodcts";

export default async function Products() {
  const categories = await getCategoriesWithProducts();

  return <Product categories={categories} />;
}
