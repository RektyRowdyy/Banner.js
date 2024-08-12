import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Banner from './components/Banner/Banner.jsx'
import InternalDashboard from './components/InternalDashboard/InternalDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Banner />
      },
      {
        path: "/editBanner",
        element: <InternalDashboard />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
