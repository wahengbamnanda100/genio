import {
	Avatar,
	Box,
	ButtonBase,
	Divider,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import LogoSection from "./LogoSection";
import RightSection from "./RightSection";
import { placeholderUrl } from "./UserImage";

// Define the prop types for the Header component
interface HeaderProps {
	handleLeftDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLeftDrawerToggle }) => {
	const theme = useTheme();
	const UserData = JSON.parse(localStorage.getItem("userDetail")!);

	const updatedImageUrl = UserData?.CmpLogo
		? `${import.meta.env.VITE_API_URL}${
				UserData.CmpLogo.startsWith("..")
					? UserData.CmpLogo.replace(/^\.{1,2}/, "")
					: UserData.CmpLogo
			}?timestamp=${new Date().getTime()}` // Cache-busting query param
		: "";

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				// : 1,
				// border: "1px solid red",
				[theme.breakpoints.down("md")]: {
					width: "auto",
				},
				zIndex: 1000,
			}}>
			<ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
				<Avatar
					variant="rounded"
					sx={{
						transition: "all .2s ease-in-out",
						background: theme.palette.secondary.light,
						color: theme.palette.secondary.dark,
						"&:hover": {
							background: theme.palette.secondary.dark,
							color: theme.palette.secondary.light,
						},
					}}
					onClick={handleLeftDrawerToggle}
					color="inherit">
					<MenuIcon />
				</Avatar>
			</ButtonBase>

			<Box
				component="span"
				sx={{
					display: { xs: "none", md: "block" },
					flexGrow: 1,
					marginLeft: 2,
				}}>
				<LogoSection />
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<WelcomeScreen
					// username={UserData.EmpName || "admin"}
					cmpName={UserData.CmpName || ""}
					logoUrl={updatedImageUrl || placeholderUrl}
				/>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<RightSection />
		</Box>
	);
};

export default Header;

const WelcomeScreen = ({
	cmpName,
	logoUrl,
}: {
	cmpName: string;
	logoUrl: string;
}) => {
	const theme = useTheme();
	return (
		<Stack direction="row" gap={2} alignItems={"center"} color={"white"}>
			<Box sx={{ overflow: "hidden", height: "40px", width: "60px" }}>
				<img
					src={logoUrl}
					height={"100%"}
					width={"100%"}
					style={{ objectFit: "contain" }}
				/>
			</Box>
			<Divider
				flexItem
				orientation="vertical"
				sx={{
					borderRightWidth: 1,
					borderRightColor: theme.palette.secondary.light,
				}}
			/>
			<Typography fontWeight={"500"}>{cmpName}</Typography>
		</Stack>
	);
};
