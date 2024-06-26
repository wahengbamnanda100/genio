/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonPropsColorOverrides, Grid } from "@mui/material";
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
		<Grid container spacing={2}>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Submit & Print"
					type="submit"
					color={"secondary"}
					onClick={handleSubmitClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Cancel"
					type="cancel"
					color={"primary"}
					onClick={handleCancelClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Previous Sales"
					type="previous"
					color={"previousSale"}
					onClick={handlePreviousClick}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<ActionButton
					label="Back"
					type="back"
					color={"primary"}
					onClick={handleBackClick}
				/>
			</Grid>
		</Grid>
	);
};

interface ActionButtonProps {
	label: string;
	type: "submit" | "cancel" | "previous" | "back";
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
	const buttonIcons = {
		submit: <DoneRoundedIcon />,
		cancel: <ClearRoundedIcon />,
		previous: <RestoreRoundedIcon />,
		back: <ReplyRoundedIcon />,
	};

	return (
		<AnimateButton>
			<Button
				variant="contained"
				color={color}
				fullWidth
				sx={{
					borderRadius: 1,
					// bgcolor: color,
					px: 2,
					minWidth: "5rem",
					outline: "none",
					border: "none",
				}}
				startIcon={buttonIcons[type]}
				onClick={onClick}>
				{label}
			</Button>
		</AnimateButton>
	);
};

export default ButtonGroup;
