import { createBrowserRouter } from "react-router-dom";

import AuthenticationRoutes from "./authenticationRoutes";
import MainRoutes from "./mainRoutes";
import PageNotFound from "../common/UI-component/PageNotFound";

const router = createBrowserRouter(
	[MainRoutes, AuthenticationRoutes, { path: "*", element: <PageNotFound /> }]
	// { basename: "/free" }
);

export default router;
