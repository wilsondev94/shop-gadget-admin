type User = {
  avatar_url: string;
  created_at: string | null;
  email: string;
  id: string;
  type: string | null;
};

type Product = {
  category: number;
  created_at: string;
  heroImage: string;
  id: number;
  imagesUrl: string[];
  maxQuantity: number;
  price: number;
  slug: string;
  title: string;
};

type OrderItems = {
  created_at: string;
  id: number;
  order: number;
  product: number & Product;
  quantity: number;
}[];

export type OrdersWithProducts =
  | {
      created_at: string;
      description: string | null;
      id: number;
      slug: string;
      status: string;
      totalPrice: number;
      user: string & User;
      order_items: OrderItems;
    }[]
  | null;
