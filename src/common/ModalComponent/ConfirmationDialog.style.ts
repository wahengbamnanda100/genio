import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	styled,
} from "@mui/material";

type DialogProps = {
	dialogType: "submit" | "delete" | "cancel";
};

export const DialogStyled = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paperWidthSm": {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		minWidth: "340px",
		maxWidth: "340px",
		padding: "20px 10px",
		boxShadow: theme.shadows[6],
	},
}));

export const DialogCloseIconStyled = styled("div")(() => ({
	position: "absolute",
	top: 10,
	right: 10,
	cursor: "pointer",
	borderRadius: "50%",
	width: "1.7rem",
	height: "1.7rem",
	"& div": {
		position: "relative",
		width: "1.7rem",
		height: "1.7rem",
		textAlign: "center",
		verticalAlign: "middle",
	},
	"& svg": {
		width: "1.2em",
		height: "1.2em",
		margin: "auto 0",
		position: "absolute",
		left: "47.5%",
		top: "47.5%",
		transform: "translate(-50%,-50%) rotate(90deg)",
	},
}));

export const DialogTitleStyled = styled(DialogTitle)<DialogProps>(
	({ theme, dialogType }) => ({
		paddingTop: "0px",
		paddingBottom: "6px",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		alignItems: "center",

		"& svg": {
			fill:
				dialogType === "submit"
					? theme.palette.secondary.main
					: dialogType === "delete"
						? theme.palette.error.main
						: "primary",
			minWidth: "fit-content",
			minHeight: "2.5rem",
			marginBottom: "8px",
		},
		"& .add_icon": {
			minWidth: "fit-content",
			minHeight: "50px",
			marginBottom: "16px",
			fill: theme.palette.primary.main,
		},
		"& span": {
			minWidth: "fit-content",
			marginBottom: "10px",
		},
		"& .alert_dialog_title_text": {
			color: theme.palette.error.main,
			fontWeight: 500,
		},
		"& .alert_dialog_title_text_add": {
			color:
				dialogType === "submit"
					? theme.palette.secondary.main
					: dialogType === "delete"
						? theme.palette.error.main
						: "primary",
			fontWeight: 500,
			marginBottom: "0",
		},
	})
);

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	padding: "0px 8px",
	"& p": {
		textAlign: "center",
		fontWeight: 400,
		fontSize: "18px",
		width: "100%",
		color: theme.palette.text.primary,
		lineHeight: "26px",
	},
}));

export const DialogActionsStyled = styled(DialogActions)<DialogProps>(() => ({
	display: "flex",
	justifyContent: "center",
}));
