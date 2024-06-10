import { lazy } from "react";
import Loadable from "../common/UI-component/Loadable";
import MinimalLayout from "../layout/MinimalLogin";
import { RouteObject } from "react-router";
import ErrorElement from "../common/UI-component/ErrorElement";

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import("../pages/Login")));
const AuthRegister = Loadable(lazy(() => import("../pages/Registration")));

const AuthenticationRoutes: RouteObject = {
	path: "/",
	element: <MinimalLayout />,
	errorElement: <ErrorElement />,
	children: [
		{
			index: true,
			path: "login",
			element: <AuthLogin />,
		},
		{
			path: "register",
			element: <AuthRegister />,
		},
	],
};

export default AuthenticationRoutes;
