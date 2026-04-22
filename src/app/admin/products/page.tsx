import { getCategoriesWithProducts } from "@/actions/categories";
import { Product } from "./components/Prodcts";
import { getProductsWithCategories } from "@/actions/products";

export default async function Products() {
  const categories = await getCategoriesWithProducts();
  const products = await getProductsWithCategories();

  return <Product categories={categories} products={products} />;
}
