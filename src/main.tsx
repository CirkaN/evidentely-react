import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@radix-ui/themes/styles.css';
import "./tailwind.css"
import MyCalendar from './routes/calendar/Calendar.tsx';
import { Theme } from '@radix-ui/themes';
import Login from './routes/login/login.tsx';
import Clients from './routes/clients/Clients.tsx';
import ClientShow from './routes/clients/ClientShow.tsx';
import ClientAppointments from './routes/clients/show/ClientAppointments.tsx';
import ClientDetails from './routes/clients/show/ClientDetails.tsx';
import DefaultPage from './routes/default.tsx';
import { QueryClient, QueryClientProvider } from 'react-query'
import ClientDocuments from './routes/clients/show/ClientDocuments.tsx';
import CompanySettings from './routes/company/settings.tsx';
import Employees from './routes/company/employees/employees.tsx';
import SmsSettings from './routes/company/sms_settings/sms_settings.tsx';
import Services from './routes/company/services/services.tsx';
import ServiceMain from './routes/company/services/service_main.tsx';
import Products from './routes/company/services/products.tsx';
import Packages from './routes/company/services/packages.tsx';
import Register from './routes/login/register.tsx';
import './i18n.ts';
import ClientSummary from './routes/clients/show/ClientSummary.tsx';
import Analytics from './routes/analytics/default.tsx';
import FinancialAnalytics from './routes/analytics/financial_analytics.tsx';


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage />,
    children: [
      {
        path: "/calendar",
        element: <MyCalendar />
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/analytics",
        element: <Analytics />
      },
      {
        path: "/analytics/finance",
        element: <FinancialAnalytics />
      },
      {
        path: "/company_settings",
        element: <CompanySettings />,
        children: [
          {
            path: "employees", element: <Employees />
          },
          {
            path: "sms_settings", element: <SmsSettings />
          },
          {
            path: "price_plans", element: <ServiceMain />,
            children: [
              {
                path: "services", element: <Services />,
              },
              {
                path: "products", element: <Products />,
              },
              {
                path: "packages", element: <Packages />,
              }
            ]
          },
        ]
      },
      {
        path: "/clients/:id",
        element: <ClientShow />,
        children: [
          {
            path: "appointments", element: <ClientAppointments />
          },
      
          {
            path: "details", element: <ClientDetails />
          },
          {
            path: "summary", element: <ClientSummary />
          },
          {
            path: "documents", element: <ClientDocuments />
          }
        ]
      }
    ]
  },
  {
    path: "/login/",
    element: <Login  />
  },
  {
    path: "/register",
    element: <Register />
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <RouterProvider router={router}></RouterProvider>
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>,
)
