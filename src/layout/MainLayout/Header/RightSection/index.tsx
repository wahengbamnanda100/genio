import { Avatar, Box, ButtonBase, useTheme } from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import UserImageAvatar from "../UserImage";
import { useNavigate } from "react-router";

const RightSection = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("logout clickeds");
		navigate("/login");
	};

	return (
		<Box
			sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end", gap: 2 }}>
			<UserImageAvatar />
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
					onClick={handleLogout}
					color="inherit">
					<PowerSettingsNewIcon />
				</Avatar>
			</ButtonBase>
		</Box>
	);
};

export default RightSection;
