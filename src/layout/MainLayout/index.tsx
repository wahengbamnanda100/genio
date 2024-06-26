import {
	AppBar,
	Box,
	Toolbar,
	styled,
	useTheme,
	Theme,
	alpha,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const drawerWidth: number = 150;

// Define a prop interface for the Main component
interface MainProps {
	theme: Theme;
	open: boolean;
}

const Main = styled("main", {
	shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({ theme, open }) => ({
	...theme.typography.body1,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: alpha(theme.palette.primary.light, 0.3),
	marginLeft: open ? drawerWidth : 0,
	minHeight: "100vh",
	width: `calc(100% - ${open ? drawerWidth : 0}px)`,
	padding: "16px",
	[theme.breakpoints.down("md")]: {
		marginLeft: open ? 20 : 0,
		width: `calc(100% - ${open ? drawerWidth : 0}px)`,
	},
	[theme.breakpoints.down("sm")]: {
		marginLeft: open ? 10 : 0,
		width: `calc(100% - ${open ? drawerWidth : 0}px)`,
		marginRight: open ? 10 : 0,
	},
}));
const MainLayout: React.FC = () => {
	const theme = useTheme();
	//  const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(false);

	const handleLeftDrawerToggle = () => {
		setLeftDrawerOpened((prev: boolean) => !prev);
		console.log("handle toggle sidebar clicked");
	};

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.primary.main,
					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none",
				}}>
				<Toolbar>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			<Main theme={theme} open={leftDrawerOpened}>
				<Toolbar />
				{/* breadcrumb */}
				{/* <Breadcrumbs
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        /> */}

				<Outlet />
			</Main>
		</Box>
	);
};

export default MainLayout;
