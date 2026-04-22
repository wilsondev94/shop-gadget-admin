"use server";

import { createClient } from "@/supabase/server";
import { ProductsWithCategoriesResponse } from "@/types";

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product")
      .select("*, category:category(*)")
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
        Error fetching products with categories: ${error.message}`);
    }

    return data || [];
  };
