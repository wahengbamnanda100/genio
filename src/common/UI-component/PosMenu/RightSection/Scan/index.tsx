/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonBase, Collapse, Grid } from "@mui/material";
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
// import { IoScanOutline } from "react-icons/io5";
// import _ from "lodash";

import ScanUnitComponent from "./ScanUnitComponent";
// import { useAppProvider } from "../../../../../AppProvider";

interface ScanComponentProps {
	resetFormValues: (resetFunc: () => void) => void;
}

const ScanComponent: FC<ScanComponentProps> = ({ resetFormValues }) => {
	const [checked, setChecked] = useState(false);

	const { control } = useFormContext<ScanComponentSchema | ScanUnitSchema>();
	const { errors } = useFormState({ control });

	const { cmpName, showroom, salesPersonName, salesPersonCode } = errors as any;

	useEffect(() => {
		//console.log("error in cam cmp", errors);

		const hasError = cmpName || showroom || salesPersonName || salesPersonCode;

		setChecked(hasError);
	}, [cmpName, showroom, salesPersonName, salesPersonCode, errors]);

	// const handleSubmitCLick = () => {
	// 	//console.log("Clicked submit scan");
	// };

	const handleAddScan = () => {
		//console.log("Scan add clicked");
		setChecked(!checked);
	};

	return (
		<Grid
			container
			spacing={2}
			justifyContent={"space-between"}
			alignItems={"center"}>
			<Grid
				item
				xs={1}
				justifySelf={"flex-start"}
				justifyContent={"flex-start"}>
				<AddToggleBtn toggled={checked} handleAdd={handleAddScan} />
			</Grid>
			{/* <Grid item xs={3}>
				<SubmitBtn handleSubmit={handleSubmitCLick} />
			</Grid> */}
			<Grid item container xs={9} spacing={2} justifyContent={"end"}>
				{scanField().map((field) => (
					<Field key={field.name} {...field} {...control} />
				))}
			</Grid>

			<Grid item xs={12} sx={{ m: 0, p: 0 }}>
				<Collapse in={checked} sx={{ p: 0 }}>
					<ScanUnitComponent resetFormValues={resetFormValues} />
				</Collapse>
			</Grid>
		</Grid>
	);
};

// interface SubmitBtnProps {
// 	handleSubmit: () => void;
// }

// const SubmitBtn: FC<SubmitBtnProps> = ({ handleSubmit }) => {
// 	return (
// 		<AnimateButton>
// 			<Button
// 				variant="contained"
// 				color="secondary"
// 				fullWidth
// 				startIcon={<IoScanOutline />}
// 				onClick={handleSubmit}>
// 				Scan
// 			</Button>
// 		</AnimateButton>
// 	);
// };

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
