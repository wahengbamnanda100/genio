import { createBrowserRouter } from "react-router-dom";

import AuthenticationRoutes from "./authenticationRoutes";
import MainRoutes from "./mainRoutes";
import PageNotFound from "../common/UI-component/PageNotFound";
// import DemoRoutes from "./externalRoutes";
import NewRoutes from "./routes";

const router = createBrowserRouter(
  [
    NewRoutes,
    MainRoutes,
    AuthenticationRoutes,
    // DemoRoutes,
    { path: "*", element: <PageNotFound /> },
  ],
  // { basename: "/free" }
);

export default router;
