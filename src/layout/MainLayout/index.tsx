import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
	return (
		<Box>
			<Outlet />
		</Box>
	);
};

export default MainLayout;
