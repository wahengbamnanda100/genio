import { Button, ButtonBase, Collapse, Grid } from "@mui/material";
import {
	ScanComponentSchema,
	scanField,
	ScanUnitSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import AnimateButton from "../../../Extended/AnimateButton";
import { FC, useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormContext, useFormState } from "react-hook-form";
import _ from "lodash";

import ScanUnitComponent from "./ScanUnitComponent";

const ScanComponent = () => {
	const [checked, setChecked] = useState(false);

	const { control } = useFormContext<ScanComponentSchema | ScanUnitSchema>();
	const { errors } = useFormState({ control });

	const checkField: Array<keyof ScanUnitSchema> = [
		"cmpName",
		"showroom",
		"salesPersonCode",
		"salesPersonName",
	];

	useEffect(() => {
		const hasAnyKey = _.some(checkField, (key) => _.has(errors, key));
		// console.log("====================================");
		// console.log(errors, hasAnyKey);
		// console.log("====================================");

		if (hasAnyKey) {
			console.log("error in this page", hasAnyKey);
			setChecked(true);
		}
	}, [errors, checkField]);

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
				<AddToggleBtn toggled={checked} handleAdd={handleAddScan} />
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
				Scan
			</Button>
		</AnimateButton>
	);
};

interface AddBtnProps {
	handleAdd: () => void;
	toggled: boolean;
}

const AddToggleBtn: FC<AddBtnProps> = ({ handleAdd, toggled }) => {
	// const [isToggled, setIsToggled] = useState(false);

	const handleClick = () => {
		// setIsToggled(!isToggled);
		handleAdd();
	};
	return (
		<AnimateButton>
			<ButtonBase
				color="secondary"
				sx={{
					bgcolor: toggled ? "secondary.dark" : "secondary.main",
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
				{toggled ? <RemoveIcon /> : <AddIcon />}
			</ButtonBase>
		</AnimateButton>
	);
};

export default ScanComponent;
