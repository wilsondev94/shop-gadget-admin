import { getCategoriesWithProducts } from "@/actions/categories";
import Categories from "./components/Categories";

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProducts();

  console.log("CATEGORIES", categories);

  return <Categories categories={categories} />;
}
