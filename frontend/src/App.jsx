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
  IdeaDetailPage,
} from "./pages"
import ProtectedRoute from "./components/custom/ProtectedRoute.jsx"
import ForwardToHome from "./components/custom/ForwardToHome.jsx"

const initialState = {
  token: localStorage.getItem("token") ?? "",
  user: JSON.parse(JSON.stringify(localStorage.getItem("user"))) ?? "",
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <ForwardToHome />,
        children: [

          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ]
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
            path: "/ideas/:id",
            element: <IdeaDetailPage />,
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
    <>
      <header className="mb-[84px]">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
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
