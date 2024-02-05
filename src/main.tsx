import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import "./tailwind.css";
import MyCalendar from "./routes/calendar/Calendar.tsx";
import { Theme } from "@radix-ui/themes";
import Login from "./routes/login/login.tsx";
import Clients from "./routes/clients/Clients.tsx";
import ClientShow from "./routes/clients/ClientShow.tsx";
import ClientAppointments from "./routes/clients/show/ClientAppointments.tsx";
import ClientDetails from "./routes/clients/show/ClientDetails.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ClientDocuments from "./routes/clients/show/ClientDocuments.tsx";
import CompanySettings from "./routes/company/settings.tsx";
import Employees from "./routes/company/employees/employees.tsx";
import SmsSettings from "./routes/company/sms_settings/sms_settings.tsx";
import Services from "./routes/company/services/services.tsx";
import ServiceMain from "./routes/company/services/service_main.tsx";
import Products from "./routes/company/services/products.tsx";
import Packages from "./routes/company/services/packages.tsx";
import Register from "./routes/login/register.tsx";
import "./i18n.ts";
import ClientSummary from "./routes/clients/show/ClientSummary.tsx";
// import FinancialAnalytics from './routes/analytics/financial_analytics.tsx';
import SalesIndex from "./routes/sales/sales_home.tsx";
import { Toaster } from "react-hot-toast";
import MyLayout from "./layouts/MyLayout.tsx";
import MainDashboard from "./routes/dashboards/main_dashboard.tsx";
import ClientAnalytics from "./routes/analytics/client_analytics.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import ReactGA from "react-ga4";
import ProfileSettings from "./routes/settings/profile_settings.tsx";
import ClientNotes from "./routes/clients/show/ClientNotes.tsx";
import GymMemberships from "./routes/gym_memberships/gym_memberships.tsx";
import GymMembershipPlans from "./routes/gym_membership_plans/gym_membership_plans.tsx";
import ServiceAnalytics from "./routes/analytics/service_analytics.tsx";
import ClientSmsHistory from "./routes/clients/show/ClientSmsHistory.tsx";
import PricingPlans from "./routes/pricing_plans/pricing_plans.tsx";
import SmsCampaign from "./routes/sms_campaign/sms_campaign.tsx";
import MainCompanySettings from "./routes/company/settings/main_settings.tsx";
import RechargeSms from "./routes/pricing_plans/recharge_sms.tsx";
import EmailConfirm from "./routes/login/email-confirm.tsx";

ReactGA.initialize("G-5MTC2FVP3C");

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <MyLayout />,
        children: [
            {
                path: "/calendar",
                element: <MyCalendar />,
            },
            {
                path: "/clients",
                element: <Clients />,
            },
            {
                path: "/analytics/clients",
                element: <ClientAnalytics />,
            },
            // {
            //   path: "/analytics/finance",
            //   element: <FinancialAnalytics />
            // },
            {
                path: "/analytics/services",
                element: <ServiceAnalytics />,
            },
            {
                path: "/gym/memberships",
                element: <GymMemberships />,
            },
            {
                path: "/sales",
                element: <SalesIndex />,
            },

            {
                path: "/main_dashboard",
                element: <MainDashboard />,
            },
            {
                path: "/employees",
                element: <Employees />,
            },
            {
                path: "/profile_settings",
                element: <ProfileSettings />,
            },
            {
                path: "/sms_campaign",
                element: <SmsCampaign />,
            },
            {
                path: "/company_settings",
                element: <CompanySettings />,
                children: [
                    {
                        path: "sms_settings",
                        element: <SmsSettings />,
                    },
                    {
                        path: "price_plans",
                        element: <ServiceMain />,
                        children: [
                            {
                                path: "services",
                                element: <Services />,
                            },
                            {
                                path: "products",
                                element: <Products />,
                            },
                            {
                                path: "packages",
                                element: <Packages />,
                            },
                        ],
                    },
                ],
            },

            {
                path: "price_plans",
                element: <ServiceMain />,
                children: [
                    {
                        path: "services",
                        element: <Services />,
                    },
                    {
                        path: "products",
                        element: <Products />,
                    },
                    {
                        path: "packages",
                        element: <Packages />,
                    },
                    {
                        path: "gym_membership_plans",
                        element: <GymMembershipPlans />,
                    },
                ],
            },

            {
                path: "company",
                element: <MainCompanySettings />,
                children: [
                    {
                        path: "settings",
                        element: <MainCompanySettings />,
                    },
                    {
                        path: "plans",
                        element: <PricingPlans />,
                    },
                    {
                        path: "recharge_sms",
                        element: <RechargeSms />,
                    },
                ],
            },

            {
                path: "/clients/:id",
                element: <ClientShow />,
                children: [
                    {
                        path: "appointments",
                        element: <ClientAppointments />,
                    },

                    {
                        path: "details",
                        element: <ClientDetails />,
                    },
                    {
                        path: "summary",
                        element: <ClientSummary />,
                    },
                    {
                        path: "documents",
                        element: <ClientDocuments />,
                    },
                    {
                        path: "notes",
                        element: <ClientNotes />,
                    },
                    {
                        path: "sms_history",
                        element: <ClientSmsHistory />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/email_verified",
        element: <EmailConfirm />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Theme>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        containerClassName="overflow-auto"
                    />
                    <RouterProvider router={router}></RouterProvider>
                </Theme>
            </QueryClientProvider>
        </UserProvider>
    </React.StrictMode>,
);
