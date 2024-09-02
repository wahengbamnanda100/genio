import { lazy } from "react";
import Loadable from "../common/UI-component/Loadable";
import MainLayout from "../layout/MainLayout";
import ErrorElement from "../common/UI-component/ErrorElement";
import { RouteObject } from "react-router";
import PageNotFound from "../common/UI-component/PageNotFound";

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const PosMenu = Loadable(lazy(() => import("../pages/PosMenu")));

const MainRoutes: RouteObject = {
	path: "/",
	element: <MainLayout />,

	children: [
		{
			path: "/",
			element: <Dashboard />,
			errorElement: <ErrorElement />,
		},
		{
			index: true,
			path: "dashboard",
			element: <Dashboard />,
			errorElement: <ErrorElement />,
		},
		{
			path: "pos-menu",
			element: <PosMenu />,
			errorElement: <ErrorElement />,
		},
		{
			path: "pos-menu/view/:id",
			element: <PosMenu />,
			errorElement: <ErrorElement />,
		},
		{
			path: "*",
			element: <PageNotFound />, // replace with 404 page component or custom error page component if needed. For example, <PageNotFound /> from "react-router-dom" package.
		},
	],
};

export default MainRoutes;
