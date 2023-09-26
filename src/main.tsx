import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@radix-ui/themes/styles.css';
import MyCalendar from './Calendar.tsx';
import { Theme } from '@radix-ui/themes';

const router = createBrowserRouter([
  {
    path:"/calendar",
    element: <MyCalendar/>
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme>
      <RouterProvider router={router}></RouterProvider>
      </Theme>

  </React.StrictMode>,
)
