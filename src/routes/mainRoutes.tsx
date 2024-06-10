import { lazy } from "react";
import Loadable from "../common/UI-component/Loadable";
import MainLayout from "../layout/MainLayout";
import ErrorElement from "../common/UI-component/ErrorElement";
import { RouteObject } from "react-router";

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const PosMenu = Loadable(lazy(() => import("../pages/PosMenu")));

const MainRoutes: RouteObject = {
	path: "/",
	element: <MainLayout />,
	errorElement: <ErrorElement />,
	children: [
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			index: true,
			path: "dashboard",
			element: <Dashboard />,
		},
		{
			path: "pos-menu",
			element: <PosMenu />,
		},
	],
};

export default MainRoutes;
