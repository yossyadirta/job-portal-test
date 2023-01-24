import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Index from "../pages/Index";
import Login from "../pages/Login";
import DetailJob from "../pages/DetailJob";

const router = createBrowserRouter([
  {
    path: "/login",
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/jobs");
      }
      return <Login />;
    },
    element: <Login />,
  },
  {
    path: "/",
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return <Index />;
    },
    element: <Index />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <DetailJob />,
      },
    ],
  },
]);

export default router;
