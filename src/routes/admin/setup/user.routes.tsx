import CenteredLoadable from "@/common/UI-component/CeteredLoadable";
import { lazy } from "react";
import { RouteObject } from "react-router";

const UserList = CenteredLoadable(
  lazy(() => import("@/pages/admin/user/UserList")),
);
const User = CenteredLoadable(lazy(() => import("@/pages/admin/user/User")));

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
