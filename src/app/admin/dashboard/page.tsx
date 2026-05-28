import { getMonthlyOrders } from "@/actions/orders";
import DashboardOverview from "./components/DashboardOverview";

export default async function AdminDashboard() {
  const monthlyOrders = await getMonthlyOrders();

  return <DashboardOverview monthlyOrders={monthlyOrders} />;
}
