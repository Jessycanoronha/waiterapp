import {
  createBrowserRouter,

  Outlet,

} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./components/Home";
import { Historico } from "./components/Historico";

const AppLayout = () => (
  <div className="container">
    <div className="sidebar">      <Navbar />
    </div>
    <div className="content">
      <Outlet />
    </div>
  </div>
);


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "historico",
        element: <Historico />,
      },
      {
        path: "reports",
        element: '',
      },
    ],
  },
]);

