import { t } from "i18next";
import { useUser } from "../../context/UserContext";
import AdminHomeAnalyticPill from "./components/admin_home_analytic_pill";
import DashboardChart from "./components/chart";
import TopClientsTable from "./components/top_clients_table";
import UpcomingAppointments from "./components/upcoming_appointments";

const MainDashboard = () => {
    const { user } = useUser();
    return (
        <>
            <div>
                <p className="text-2xl uppercase text-slate-700 font-bold">
                    {t("common.welcome")}, {user?.name}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
                <AdminHomeAnalyticPill
                    heading={t("quick_analytics.no_new_clients")}
                    bg_color="primary"
                    filter_type="new_clients"
                />

                <AdminHomeAnalyticPill
                    heading={t("quick_analytics.no_new_appointments")}
                    filter_type="appointments"
                    bg_color="custom_blue"
                />

                <AdminHomeAnalyticPill
                    heading={t("quick_analytics.missed_appointments")}
                    filter_type="missed_appointments"
                    bg_color="custom_red"
                />

                <AdminHomeAnalyticPill
                    heading={t("quick_analytics.estimated_profit")}
                    filter_type="profit"
                    bg_color="custom_green"
                />
            </div>
            <br />

            <div className="flex h-64">
                <DashboardChart />
            </div>

            <div className="pt-5">
                <TopClientsTable client_count={5} />
            </div>
            <div className="pt-5">
                <UpcomingAppointments appointment_count={5} />
            </div>
        </>
    );
};
export default MainDashboard;
