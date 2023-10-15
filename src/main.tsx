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
import ClientSettings from './routes/clients/show/ClientSettings.tsx';
import ClientDetails from './routes/clients/show/ClientDetails.tsx';
import DefaultPage from './routes/default.tsx';
import { QueryClient, QueryClientProvider} from 'react-query'
import ClientDocuments from './routes/clients/show/ClientDocuments.tsx';

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
        path: "/clients/:id",
        element: <ClientShow />,
        children: [
          {
            path: "appointments", element: <ClientAppointments />
          },
          {
            path: "settings", element: <ClientSettings />
          },
          {
            path: "details", element: <ClientDetails />
          },
          {
            path: "documents", element: <ClientDocuments />
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
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
