/// <reference types="vite-plugin-svgr/client" />
import {
	alpha,
	Button,
	DialogProps,
	Paper,
	PaperProps,
	useTheme,
} from "@mui/material";
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
import Draggable from "react-draggable";

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

export function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
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
	const theme = useTheme();

	return (
		<DialogStyled
			open={open}
			onClose={onCancel}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable confirmation-dialog">
			<DialogCloseIconStyled onClick={onCancel}>
				<div style={{ position: "relative" }}>
					<CloseIcon />
				</div>
			</DialogCloseIconStyled>
			<DialogTitleStyled
				id="draggable-dialog-title"
				dialogType={dialogType || "submit"}
				sx={{
					cursor: "move",
					color: dialogType === "warning" ? "#4f1c1b" : "inherit",
					fontWeight: dialogType === "warning" ? "bold" : "inheritx",
					":hover": {
						bgcolor: alpha(theme.palette.primary.main, 0.08),
					},
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
					whiteSpace: "pre-line",
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
