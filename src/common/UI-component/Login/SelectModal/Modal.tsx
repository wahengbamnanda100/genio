/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from "react";
import { Dialog, Slide, Fade, Grow, useTheme, lighten } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// Define available transition types
type TransitionType = "slide" | "fade" | "grow";

// Map the transition type to actual component
const getTransitionComponent = (type: TransitionType) => {
	switch (type) {
		case "slide":
			return SlideTransition;
		case "fade":
			return FadeTransition;
		case "grow":
			return GrowTransition;
		default:
			return SlideTransition;
	}
};

// Slide transition
const SlideTransition = React.forwardRef(function SlideTransition(
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

// Fade transition
const FadeTransition = React.forwardRef(function FadeTransition(
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Fade ref={ref} {...props} />;
});

// Grow transition
const GrowTransition = React.forwardRef(function GrowTransition(
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Grow ref={ref} {...props} />;
});

interface CustomDialogProps {
	open: boolean;
	onClose: () => void;
	// title: string;
	children: ReactNode; // Use children for content and actions
	transitionType?: TransitionType;
	disableCloseOnBackdropClick?: boolean;
}

const CustomDialog: FC<CustomDialogProps> = ({
	open,
	onClose,
	// title,
	children,
	transitionType = "slide",
	disableCloseOnBackdropClick = true,
}) => {
	const theme = useTheme();
	const TransitionComponent = getTransitionComponent(transitionType);

	const handleClose = (event: any, reason: string) => {
		console.log(event);

		if (
			disableCloseOnBackdropClick &&
			(reason === "backdropClick" || reason === "escapeKeyDown")
		) {
			return;
		}
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			TransitionComponent={TransitionComponent}
			keepMounted
			aria-labelledby="custom-dialog-title"
			aria-describedby="custom-dialog-description"
			sx={{
				"& .MuiDialog-paperWidthSm": {
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					minWidth: "50%",
					maxWidth: "60%",
					padding: "20px 10px",
					boxShadow: theme.shadows[6],
					bgcolor: lighten(theme.palette.primary.light, 0.8),
					p: 0,
				},
			}}>
			{/* <DialogTitle id="custom-dialog-title">{title}</DialogTitle> */}
			{children} {/* Render children instead of content and actions props */}
		</Dialog>
	);
};

export default CustomDialog;
