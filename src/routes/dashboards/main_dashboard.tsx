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
                    Dobro dosli, {user?.name}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
                <AdminHomeAnalyticPill
                    heading="Broj novih klijenata"
                    bg_color="primary"
                    filter_type="new_clients"
                />

                <AdminHomeAnalyticPill
                    heading="Broj termina"
                    filter_type="appointments"
                    bg_color="custom_blue"
                />

                <AdminHomeAnalyticPill
                    heading="Broj otkazanih termina"
                    filter_type="missed_appointments"
                    bg_color="custom_red"
                />

                <AdminHomeAnalyticPill
                    heading="Ocekivani profit (nenaplaceni termini)"
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
