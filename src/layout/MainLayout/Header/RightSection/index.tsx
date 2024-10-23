import {
	Avatar,
	Box,
	ButtonBase,
	Divider,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import UserImageAvatar from "../UserImage";
import { useNavigate } from "react-router";
import ConfirmationDialog from "../../../../common/ModalComponent/ConfirmationDialog";
import { useEffect, useState } from "react";
import moment from "moment";
import { queryCache } from "../../../../utils/utils";

const RightSection = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>("");

	const userData = JSON.parse(localStorage.getItem("userDetail")!);
	const domain = localStorage.getItem("domain");
	const domainUrl = domain ? domain : import.meta.env.VITE_API_URL;

	useEffect(() => {
		// Construct the image URL with timestamp only when the component mounts (initial load)
		if (userData?.EmpImage) {
			const timestamp = new Date().getTime(); // Generate timestamp for cache busting
			const url = `${domainUrl}${
				userData.EmpImage.startsWith("..")
					? userData.EmpImage.replace(/^\.{1,2}/, "")
					: userData.EmpImage
			}?timestamp=${timestamp}`;
			setImageUrl(url);
		}
	}, []);

	const handleLogout = () => {
		setOpen(true);
	};

	const handleConfirm = async () => {
		localStorage.clear();
		await queryCache.clear();
		navigate("/login", { replace: true });
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
				<Stack direction="row" gap={2} alignItems={"center"} color={"white"}>
					{/* Pass the memoized image URL */}
					<UserImageAvatar src={imageUrl} appBar={true} />
					<Divider
						flexItem
						orientation="vertical"
						sx={{
							borderRightWidth: 1,
							borderRightColor: theme.palette.secondary.light,
						}}
					/>
					<Stack direction={"column"}>
						<Typography>
							Welcome{" "}
							<span
								style={{
									color: theme.palette.secondary.light,
									fontWeight: "500",
									textTransform: "capitalize",
								}}>
								{userData?.EmpName || "admin"}
							</span>
						</Typography>
						<Typography fontWeight={"400"}>
							{moment(new Date()).format("DD-MMM-YYYY")}
						</Typography>
					</Stack>
				</Stack>

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
