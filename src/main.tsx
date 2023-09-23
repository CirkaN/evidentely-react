import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@radix-ui/themes/styles.css';
import MyCalendar from './Calendar.tsx';
import { Theme } from '@radix-ui/themes';
import axios from 'axios';


const axios_instance = axios.create({
  baseURL:import.meta.env.REACT_APP_API_URL,
});

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />
  // },
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
