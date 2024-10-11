import { Avatar, Box, ButtonBase, useTheme } from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import UserImageAvatar from "../UserImage";
import { useNavigate } from "react-router";
import ConfirmationDialog from "../../../../common/ModalComponent/ConfirmationDialog";
import { useState } from "react";
// import { useAppProvider } from "../../../../AppProvider";

const RightSection = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	// const { imgUrl } = useAppProvider();
	const [open, setOpen] = useState<boolean>(false);

	const userData = JSON.parse(localStorage.getItem("userDetail")!);

	const handleLogout = () => {
		console.log("logout clickeds");
		setOpen(true);
	};

	const handleConfirm = () => {
		localStorage.clear();
		navigate("/login");
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexGrow: 1,
					justifyContent: "flex-end",
					gap: 2,
				}}>
				{/* //todo add url with user data */}
				<UserImageAvatar src={userData?.EmpImage || ""} appBar={true} />
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

			<ConfirmationDialog
				dialogType="logout"
				open={open}
				setOpen={setOpen}
				title="Logout"
				description="Do you want to logout?"
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</>
	);
};

export default RightSection;
