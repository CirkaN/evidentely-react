import AdminHomeAnalyticPill from "./components/admin_home_analytic_pill";
import TopClientsTable from "./components/top_clients_table";
import UpcomingAppointments from "./components/upcoming_appointments";

const MainDashboard = () => {
    return (
        <>
        <div className="">
            <p className="text-2xl text-bold">Welcome back, Nikola Cirkovic</p>
        </div>
            <div className="flex flex-col sm:flex-row justify-between">
                <AdminHomeAnalyticPill />
                <AdminHomeAnalyticPill />
                <AdminHomeAnalyticPill />
                <AdminHomeAnalyticPill />
            </div>
            <div className="pt-5">
                <TopClientsTable
                    client_count={5}
                />
            </div>
            <div className="pt-5">
                <UpcomingAppointments
                    appointment_count={5}
                />
            </div>
        </>
    )
}
export default MainDashboard;
