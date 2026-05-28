import { getMonthlyOrders } from "@/actions/orders";
import DashboardOverview from "./components/DashboardOverview";
import { getCategoryData } from "@/actions/categories";

export default async function AdminDashboard() {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();

  return (
    <DashboardOverview
      monthlyOrders={monthlyOrders}
      categoryData={categoryData}
    />
  );
}
