import { RouteObject } from "react-router";
import UserList from "../../../pages/user/UserList";
import User from "../../../pages/user/User";

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
