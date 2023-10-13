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

const router = createBrowserRouter([
  {
    path:"/calendar",
    element: <MyCalendar/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/clients",
    element:<Clients/>,
  },
  {
    path:"/clients/:id",
    element:<ClientShow/>,
    children: [
      { path: "appointments", element: <ClientAppointments/>},
      {
        path:"settings",element: <ClientSettings/>
      }
    ]
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme>
      <RouterProvider router={router}></RouterProvider>
      </Theme>

  </React.StrictMode>,
)
