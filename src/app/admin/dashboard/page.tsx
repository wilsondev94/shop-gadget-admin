import { getMonthlyOrders } from "@/actions/orders";
import DashboardOverview from "./components/DashboardOverview";
import { getCategoryData } from "@/actions/categories";
import { getLatestUsers } from "@/actions/auth";

export default async function AdminDashboard() {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();
  const latestUsers = await getLatestUsers();

  return (
    <DashboardOverview
      monthlyOrders={monthlyOrders}
      categoryData={categoryData}
      latestUsers={latestUsers}
    />
  );
}
