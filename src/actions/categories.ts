"use server";

import { createClient } from "@/supabase/server";
import { CategoriesWithProductsResponse } from "@/types";

export const getCategoriesWithProducts =
  async (): Promise<CategoriesWithProductsResponse> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("category")
      .select("* , products:product(*)")
      .returns<CategoriesWithProductsResponse>();

    if (error) throw new Error(`Error fetching categories: ${error.message}`);

    return data || [];
  };
