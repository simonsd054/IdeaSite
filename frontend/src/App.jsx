import { useReducer } from "react"
import { Outlet } from "react-router"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "@/components/ui/toaster"

import Navbar from "@/components/custom/Navbar"
import { GlobalContext, globalReducer } from "./utils/reducer.js"
import {
  Register,
  CreateIdeaPage,
  HomePage,
  Login,
  MyIdeasPage,
  EditIdeaPage,
} from "./pages"
import ProtectedRoute from "./components/custom/ProtectedRoute.jsx"

const initialState = {
  token: localStorage.getItem("token") ?? "",
  user: JSON.parse(localStorage.getItem("user")) ?? "",
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/ideas/create",
            element: <CreateIdeaPage />,
          },
          {
            path: "/ideas/:id/edit",
            element: <EditIdeaPage />,
          },
          {
            path: "/my-ideas",
            element: <MyIdeasPage />,
          },
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
])

function MainPage() {
  return (
    <div className="wrapper-grid mb-10">
      <header className="grid-area-header">
        <Navbar />
      </header>
      <main className="grid-area-body">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  const [store, dispatch] = useReducer(globalReducer, initialState)

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </GlobalContext.Provider>
  )
}

export default App
