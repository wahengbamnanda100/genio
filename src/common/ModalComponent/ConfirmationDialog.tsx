/// <reference types="vite-plugin-svgr/client" />
import { Button, DialogProps } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Dispatch, FC, SetStateAction } from "react";
import {
	DialogActionsStyled,
	DialogCloseIconStyled,
	DialogContentStyled,
	DialogStyled,
	DialogTitleStyled,
} from "./ConfirmationDialog.style";
import CloseIcon from "@mui/icons-material/Close";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import AllergyIcon from "../../assets/icons/AllergyIcon.svg?react";

export type DialogType = "submit" | "delete" | "cancel" | "logout" | "warning";
interface ConfirmationDialogProps extends DialogProps {
	title: string;
	description: string;
	loading?: boolean;
	dialogType: DialogType;
	setOpen?: Dispatch<SetStateAction<boolean>>;
	onConfirm: () => void;
	onCancel?: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	title,
	description,
	open,
	loading = false,
	dialogType,
	// setOpen,
	onConfirm,
	onCancel,
}) => {
	// const theme = useTheme();

	return (
		<DialogStyled
			open={open}
			onClose={onCancel}
			aria-labelledby="confirmation-dialog">
			<DialogCloseIconStyled onClick={onCancel}>
				<div style={{ position: "relative" }}>
					<CloseIcon />
				</div>
			</DialogCloseIconStyled>
			<DialogTitleStyled
				dialogType={dialogType || "submit"}
				sx={{
					color: dialogType === "warning" ? "#4f1c1b" : "inherit",
					fontWeight: dialogType === "warning" ? "bold" : "inheritx",
				}}>
				{dialogType === "submit" && <DoneAllIcon color="secondary" />}
				{dialogType === "delete" && <DeleteOutlineOutlinedIcon color="error" />}
				{dialogType === "cancel" && <RotateLeftIcon color="primary" />}
				{dialogType === "logout" && <PowerSettingsNewIcon color="error" />}

				{dialogType === "warning" && (
					<AllergyIcon style={{ width: "50px", height: "60px" }} />
				)}
				{title}
			</DialogTitleStyled>
			<DialogContentStyled
				sx={{
					textAlign: dialogType === "warning" ? "center" : "left",
					fontWeight: dialogType === "warning" ? "400" : "inherit",
				}}>
				{description}
			</DialogContentStyled>
			<DialogActionsStyled dialogType={dialogType || "submit"}>
				<LoadingButton
					loading={loading}
					variant="contained"
					loadingPosition="start"
					color={
						dialogType === "submit"
							? "secondary"
							: dialogType === "cancel"
								? "primary"
								: dialogType === "warning"
									? "error"
									: "error"
					}
					onClick={onConfirm}>
					{dialogType === "submit"
						? "Submit"
						: dialogType === "cancel"
							? "Clear all"
							: dialogType === "logout"
								? "Logout"
								: dialogType === "warning"
									? "Okay"
									: "Delete"}
				</LoadingButton>
				{!(dialogType === "warning") && (
					<Button variant="outlined" onClick={onCancel}>
						Cancel
					</Button>
				)}
			</DialogActionsStyled>
		</DialogStyled>
	);
};

export default ConfirmationDialog;
