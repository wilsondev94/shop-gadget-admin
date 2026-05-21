import { getOrdersWithProducts } from "@/actions/orders";
import OrderTableRow from "./components/OrderTableRow";

const OrderPage = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts)
    return (
      <div className="text-center font-bold text-2xl">No orders found</div>
    );

  return (
    <div>
      <OrderTableRow ordersWithProducts={ordersWithProducts} />
    </div>
  );
};

export default OrderPage;
