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

interface ConfirmationDialogProps extends DialogProps {
	title: string;
	description: string;
	loading?: boolean;
	dialogType: "submit" | "delete" | "cancel";
	setOpen: Dispatch<SetStateAction<boolean>>;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	title,
	description,
	open,
	loading = false,
	dialogType,
	setOpen,
	onConfirm,
	onCancel,
}) => {
	// const theme = useTheme();

	return (
		<DialogStyled
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="confirmation-dialog">
			<DialogCloseIconStyled onClick={() => setOpen(false)}>
				<div style={{ position: "relative" }}>
					<CloseIcon />
				</div>
			</DialogCloseIconStyled>
			<DialogTitleStyled dialogType={dialogType || "submit"}>
				{dialogType === "submit" && <DoneAllIcon color="secondary" />}
				{dialogType === "delete" && <DeleteOutlineOutlinedIcon color="error" />}
				{dialogType === "cancel" && <RotateLeftIcon color="primary" />}
				{title}
			</DialogTitleStyled>
			<DialogContentStyled>{description}</DialogContentStyled>
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
								: "error"
					}
					onClick={onConfirm}>
					{dialogType === "submit"
						? "Submit"
						: dialogType === "cancel"
							? "Clear all"
							: "Delete"}
				</LoadingButton>
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
			</DialogActionsStyled>
		</DialogStyled>
	);
};

export default ConfirmationDialog;
