import { createBrowserRouter } from "react-router-dom";
import { Home, Dashboard, Stream } from "./pages";
import { Login, Signup } from "./templates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // {
      //   path: "signup",
      //   element: <Signup />,
      // },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,
  },
  {
    path: "/stream",
    element: <Dashboard />,
    children: [],
  },
  {
    path: "/stream/:id",
    element: <Stream />,
    children: [],
  },
]);

export default router;
