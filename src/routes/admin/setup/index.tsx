import { RouteObject } from "react-router";
import UserRoutes from "./user.routes";

const Setuproutes: RouteObject[] = [
  {
    path: "user",
    children: UserRoutes,
  },
];

export default Setuproutes;
