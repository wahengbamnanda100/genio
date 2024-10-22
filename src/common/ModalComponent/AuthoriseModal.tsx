import React, { useState } from "react";
import {
	DialogActionsStyled,
	DialogCloseIconStyled,
	DialogContentStyled,
	DialogStyled,
	DialogTitleStyled,
} from "./ConfirmationDialog.style";
// import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import { Typography } from "@mui/material";
import { UserDetailsType } from "../Component-types/localStorageData.type";
import { LoadingButton } from "@mui/lab";

// Define the props interface for AuthoriseModal
interface AuthoriseModalProps {
	open: boolean;
	onCancel: () => void;
}

const AuthoriseModal: React.FC<AuthoriseModalProps> = ({ open, onCancel }) => {
	const localUserData = localStorage.getItem("userDetail") as string | null;

	const USERDATA: UserDetailsType | null = localUserData
		? (JSON.parse(localUserData) as UserDetailsType)
		: null;

	const [loading, setLoading] = useState(false);

	const handleOnclick = async () => {
		setLoading(true); // Set loading to true when the button is clicked

		// Simulating an async operation (like an API call) before redirecting
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed

		localStorage.clear();
		window.location.href = "/login";
	};

	const handleClose = (event: React.SyntheticEvent<HTMLElement>) => {
		if (event.target === event.currentTarget) {
			// If the click target is the overlay, do nothing
			return;
		}
		// Else call the onCancel function
		onCancel();
	};

	return (
		<DialogStyled
			open={open}
			onClose={handleClose}
			aria-labelledby="authorize-dialog"
			sx={{
				"& .MuiDialog-paperWidthSm": {
					minWidth: "450px",
					maxWidth: "450px",
				},
			}}>
			<DialogCloseIconStyled onClick={onCancel}>
				{/* <div style={{ position: "relative" }}>
					<CloseIcon />
				</div> */}
			</DialogCloseIconStyled>
			<DialogTitleStyled dialogType="warning">
				<BlockIcon color="warning" style={{ width: "50px", height: "60px" }} />
				<Typography
					variant="h6"
					color={"warning"}>{`Unauthorised User`}</Typography>
			</DialogTitleStyled>
			<DialogContentStyled
				sx={{
					whiteSpace: "pre-line",
					textAlign: "center",
					fontWeight: "400",
				}}>
				<Typography>
					{`User `}
					<Typography fontWeight={"500"} component="span" color="primary">
						{USERDATA?.EmpName}
					</Typography>
					{` is not authorised to access this page, please contact admin`}
				</Typography>
			</DialogContentStyled>
			<DialogActionsStyled dialogType={"warning"}>
				<LoadingButton
					loading={loading} // Use internal loading state
					variant="contained"
					loadingPosition="start"
					color={"warning"}
					onClick={handleOnclick}>
					Redirect to login
				</LoadingButton>
			</DialogActionsStyled>
		</DialogStyled>
	);
};

export default AuthoriseModal;
