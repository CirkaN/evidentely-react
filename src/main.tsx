import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@radix-ui/themes/styles.css';
import MyCalendar from './routes/calendar/Calendar.tsx';
import { Theme } from '@radix-ui/themes';
import Login from './routes/login/login.tsx';

const router = createBrowserRouter([
  {
    path:"/calendar",
    element: <MyCalendar/>
  },
  {
    path:"/login",
    element: <Login/>
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme>
      <RouterProvider router={router}></RouterProvider>
      </Theme>

  </React.StrictMode>,
)
