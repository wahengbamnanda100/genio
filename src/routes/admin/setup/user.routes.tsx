import User from "@/pages/admin/user/User";
import UserList from "@/pages/admin/user/UserList";
import { RouteObject } from "react-router";

const UserRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserList />,
  },
  {
    path: "create",
    element: <User />,
  },
  {
    path: "edit/:id",
    element: <User />,
  },
  {
    path: "view/:id",
    element: <User />,
  },
];

export default UserRoutes;
