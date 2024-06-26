import { Button, ButtonBase, Collapse, Grid } from "@mui/material";
import {
	ScanComponentSchema,
	scanField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import AnimateButton from "../../../Extended/AnimateButton";
import { FC, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormContext } from "react-hook-form";
import ScanUnitComponent from "./ScanUnitComponent";

const ScanComponent = () => {
	const [checked, setChecked] = useState(false);

	const { control } = useFormContext<ScanComponentSchema>();

	const handleSubmitCLick = () => {
		console.log("Clicked submit scan");
	};

	const handleAddScan = () => {
		console.log("Scan add clicked");
		setChecked(!checked);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={3}>
				<AddToggleBtn handleAdd={handleAddScan} />
			</Grid>
			<Grid item xs={3}>
				<SubmitBtn handleSubmit={handleSubmitCLick} />
			</Grid>
			<Grid item container xs={6} spacing={2}>
				{scanField().map((field) => (
					<Field key={field.name} {...field} {...control} />
				))}
			</Grid>

			<Grid item xs={12} sx={{ m: 0, p: 0 }}>
				<Collapse in={checked} sx={{ p: 0 }}>
					<ScanUnitComponent />
				</Collapse>
			</Grid>
		</Grid>
	);
};

interface SubmitBtnProps {
	handleSubmit: () => void;
}

const SubmitBtn: FC<SubmitBtnProps> = ({ handleSubmit }) => {
	return (
		<AnimateButton>
			<Button
				variant="contained"
				color="secondary"
				fullWidth
				onClick={handleSubmit}>
				Submit
			</Button>
		</AnimateButton>
	);
};

interface AddBtnProps {
	handleAdd: () => void;
}

const AddToggleBtn: FC<AddBtnProps> = ({ handleAdd }) => {
	const [isToggled, setIsToggled] = useState(false);

	const handleClick = () => {
		setIsToggled(!isToggled);
		handleAdd();
	};
	return (
		<AnimateButton>
			<ButtonBase
				color="secondary"
				sx={{
					bgcolor: isToggled ? "secondary.dark" : "secondary.main",
					maxWidth: "40px",
					maxHeight: "40px",
					borderRadius: 1,
					color: "white",
					padding: 2,
					"&:hover": {
						bgcolor: "secondary.dark",
					},
				}}
				onClick={handleClick}>
				{isToggled ? <RemoveIcon /> : <AddIcon />}
			</ButtonBase>
		</AnimateButton>
	);
};

export default ScanComponent;
