export const enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type Product = {
  id: number;
  title: string;
  slug: string;
  imagesUrl: string[];
  price: number;
  heroImage: string;
  category: number;
  maxQuantity: number;
};

export type CategoryWithProducts = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  products: Product[];
  slug: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];

export type Category = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  slug: string;
};

export type ProductWithCategory = {
  category: Category;
  created_at: string;
  heroImage: string;
  id: number;
  imagesUrl: string[];
  maxQuantity: number;
  price: number | null;
  slug: string;
  title: string;
};

export type ProductsWithCategoriesResponse = ProductWithCategory[];

export type UpdateProductSchema = {
  category: number;
  heroImage: string;
  imagesUrl: string[];
  maxQuantity: number;
  price: number;
  slug: string;
  title: string;
};
