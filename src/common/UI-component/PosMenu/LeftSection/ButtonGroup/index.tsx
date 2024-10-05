/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Button,
	ButtonPropsColorOverrides,
	Grid,
	useTheme,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import AnimateButton from "../../../Extended/AnimateButton";

interface ButtonGroupProps {
	handleSubmitClick: () => void;
	handleCancelClick: () => void;
	handlePreviousClick: () => void;
	handleBackClick: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
	handleSubmitClick,
	handleCancelClick,
	handlePreviousClick,
	handleBackClick,
}) => {
	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Submit & Print"
					type="submitPrint"
					color="secondary"
					onClick={handleSubmitClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Cancel"
					type="cancel"
					color="primary"
					onClick={handleCancelClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Previous Sales"
					type="previous"
					color="previousSale"
					onClick={handlePreviousClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Back"
					type="back"
					color="primary"
					onClick={handleBackClick}
				/>
			</Grid>
		</Grid>
	);
};

interface ActionButtonProps {
	label: string;
	type: "submitPrint" | "cancel" | "previous" | "back";
	color: any;
	colors?: OverridableStringUnion<
		| "primary"
		| "secondary"
		| "inherit"
		| "success"
		| "error"
		| "info"
		| "warning"
		| "previousSale"
		| "breakfast"
		| "grab"
		| "hotfood"
		| "itemButton",
		ButtonPropsColorOverrides
	>;
	onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	label,
	type,
	color,
	onClick,
}) => {
	const theme = useTheme();
	const buttonIcons = {
		submitPrint: <DoneRoundedIcon />,
		cancel: <ClearRoundedIcon />,
		previous: <RestoreRoundedIcon />,
		back: <ReplyRoundedIcon />,
	};

	return (
		<AnimateButton style={{ flexGrow: 1, height: "100%" }}>
			<Button
				variant="contained"
				color={color}
				fullWidth
				sx={{
					borderRadius: 1,
					px: 2,
					minWidth: "5rem",
					outline: "none",
					border: "none",
					height: "100%",
					display: "flex",
					alignItems: "center", // Icon and text aligned horizontally
					justifyContent: "center",
					textAlign: "center", // Center the text
					whiteSpace: "normal", // Allow text to wrap
					wordBreak: "break-word", // Break long words if necessary
					[theme.breakpoints.down(1080)]: {
						fontSize: "0.6rem",
						minWidth: "3rem",
					},
				}}
				startIcon={buttonIcons[type]}
				onClick={onClick}>
				{label}
			</Button>
		</AnimateButton>
	);
};

export default ButtonGroup;
