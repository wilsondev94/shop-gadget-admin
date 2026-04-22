"use client";

import { Category, ProductsWithCategoriesResponse } from "@/types";

type ProductProps = {
  categories: Category[];
  products: ProductsWithCategoriesResponse;
};

export const Product = ({ categories, products }: ProductProps) => {
  return <main>Product</main>;
};
