import {
	AppBar,
	Box,
	Toolbar,
	styled,
	useTheme,
	Theme,
	alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import { useAppProvider } from "../../AppProvider";
import CustomSnackbar from "../../common/UI-component/Notification";
import { UserDetailsType } from "../../common/Component-types/localStorageData.type";
import { anyOneIsTrue } from "../../utils/utils";
import AuthoriseModal from "../../common/ModalComponent/AuthoriseModal";
// import { UserDetailsType } from "../../common/Component-types/localStorageData.type";
// import { anyOneIsTrue } from "../../utils/utils";

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
	padding: "12px",
	paddingTop: "8px",
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
	const { notify } = useAppProvider();
	//  const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleLeftDrawerToggle = () => {
		setLeftDrawerOpened((prev: boolean) => !prev);
		//console.log("handle toggle sidebar clicked");
	};

	const localUserData = localStorage.getItem("userDetail") as string | null;

	const USERDATA = localUserData
		? (JSON.parse(localUserData) as UserDetailsType)
		: null;

	const accessGranted = USERDATA
		? anyOneIsTrue(
				USERDATA.IsDeletable,
				USERDATA.IsInsertable,
				USERDATA.IsViewable
			)
		: false;

	useEffect(() => {
		if (!accessGranted) {
			setIsModalOpen(true);
		}
	}, [accessGranted]);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={4}
				sx={{
					bgcolor: theme.palette.primary.main,

					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none",
				}}>
				<Toolbar
					sx={{
						height: "44px",
						minHeight: "44px",
						// border: "1px solid red",
						[theme.breakpoints.down(1280)]: {
							height: "44px",
							minHeight: "44px", // Apply on smaller screens as well
						},
						[theme.breakpoints.down(1025)]: {
							height: "44px",
							minHeight: "44px", // Apply on smaller screens as well
						},
					}}>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			<Main theme={theme} open={leftDrawerOpened}>
				<Box sx={{ padding: "1.1rem" }}>
					<CustomSnackbar />
				</Box>

				{accessGranted && <Outlet />}
				{/* <Outlet /> */}
			</Main>

			{notify && <CustomSnackbar />}
			<AuthoriseModal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
			/>
		</Box>
	);
};

export default MainLayout;
