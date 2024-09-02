import { Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import {
	ScanUnitSchema,
	scanUnitField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { RightSpacing } from "..";
import { EmployeeItem } from "../../../../../services/aoi.type";
import { useEffect, useRef } from "react";

const ScanUnitComponent = () => {
	const previousValuesRef = useRef<Partial<ScanUnitSchema>>({});

	const { setValue, control } = useFormContext<ScanUnitSchema>();

	const [empCodeWatch] = useWatch({ control, name: ["salesPersonCode"] });
	const [empNameWatch] = useWatch({ control, name: ["salesPersonName"] });

	const updateValues = (
		selectedKay: Partial<keyof ScanUnitSchema>,
		selectedValue: EmployeeItem
	) => {
		if (selectedValue) {
			console.log("selectedValue ", selectedKay, selectedValue);

			if (
				selectedKay !== "salesPersonCode" &&
				previousValuesRef.current.salesPersonCode !== selectedValue.EmployeeCode
			) {
				setValue("salesPersonCode", selectedValue, {
					shouldValidate: true,
					shouldDirty: true,
				});
			}
			if (
				selectedKay !== "salesPersonName" &&
				previousValuesRef.current.salesPersonName !== selectedValue.EmployeeName
			) {
				setValue("salesPersonName", selectedValue, {
					shouldValidate: true,
					shouldDirty: true,
				});
			}

			previousValuesRef.current = {
				...previousValuesRef.current,
				salesPersonCode: selectedValue.EmployeeCode,
				salesPersonName: selectedValue.EmployeeName,
			};
		} else {
			setValue(selectedKay, "");
		}
	};

	useEffect(() => {
		// console.log("emp code", empCodeWatch);
		const values = empCodeWatch as EmployeeItem;
		updateValues("salesPersonCode", values);
	}, [empCodeWatch]);

	useEffect(() => {
		const values = empNameWatch as EmployeeItem;
		updateValues("salesPersonName", values);
	}, [empNameWatch]);

	return (
		<>
			<Grid container spacing={2}>
				{scanUnitField().map((field) => (
					<Field key={field.name} {...field} />
				))}
			</Grid>
			<RightSpacing />
		</>
	);
};

export default ScanUnitComponent;
