import { Outlet, RouteObject } from "react-router";
import transectionRotues from "./transection";
import Setuproutes from "./setup";

const AdminRoutes: RouteObject[] = [
  {
    path: "setup",
    element: <Outlet />,
    children: Setuproutes,
  },
  {
    path: "transection",
    element: <Outlet />,
    children: transectionRotues,
  },
];

export default AdminRoutes;
