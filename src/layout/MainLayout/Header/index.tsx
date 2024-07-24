import { Avatar, Box, ButtonBase, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import LogoSection from "./LogoSection";
import RightSection from "./RightSection";

// Define the prop types for the Header component
interface HeaderProps {
	handleLeftDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLeftDrawerToggle }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
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
				sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
				<LogoSection />
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />
			<RightSection />
		</Box>
	);
};

export default Header;
