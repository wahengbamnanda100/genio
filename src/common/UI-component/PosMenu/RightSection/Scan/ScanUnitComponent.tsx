import { Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import {
	ScanUnitSchema,
	scanUnitField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { RightSpacing } from "..";
import { EmployeeItem } from "../../../../../services/aoi.type";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

interface ScanUnitComponentProps {
	resetFormValues: (resetFunc: () => void) => void;
}

const ScanUnitComponent: FC<ScanUnitComponentProps> = ({ resetFormValues }) => {
	const { setValue, control } = useFormContext<ScanUnitSchema>();
	const [focusField, setFocusField] = useState<string>("");
	const previousValuesRef = useRef<Partial<ScanUnitSchema>>({});
	// Watch the fields in a single useWatch call to reduce re-renders
	const [salesPersonCodeWatch, salesPersonNameWatch] = useWatch({
		control,
		name: ["salesPersonCode", "salesPersonName"],
	});

	// Memoized function to update values based on EmployeeItem
	const updateValues = useCallback(
		(selectedKey: keyof ScanUnitSchema, selectedValue: EmployeeItem) => {
			if (!selectedValue || focusField !== selectedKey) return;

			// Update fields only if values have changed
			if (
				selectedKey !== "salesPersonCode" &&
				previousValuesRef.current.salesPersonCode !== selectedValue.EmployeeCode
			) {
				setValue("salesPersonCode", selectedValue, {
					shouldValidate: true,
				});
			}
			if (
				selectedKey !== "salesPersonName" &&
				previousValuesRef.current.salesPersonName !== selectedValue.EmployeeName
			) {
				setValue("salesPersonName", selectedValue, {
					shouldValidate: true,
				});
			}

			// Store previous values for future reference
			previousValuesRef.current = {
				salesPersonCode: selectedValue.EmployeeCode,
				salesPersonName: selectedValue.EmployeeName,
			};
		},
		[focusField, setValue]
	);

	// Debounced update handler
	const debouncedUpdate = useCallback(
		debounce(
			(field: keyof ScanUnitSchema, value: EmployeeItem) =>
				updateValues(field, value),
			300
		),
		[updateValues]
	);

	// Reset function to be triggered by parent
	const resetFormAndRefs = () => {
		previousValuesRef.current = {};
		setFocusField("");
	};

	// Unified effect for field watchers
	useEffect(() => {
		if (salesPersonCodeWatch && focusField === "salesPersonCode") {
			debouncedUpdate("salesPersonCode", salesPersonCodeWatch as EmployeeItem);
		}
		if (salesPersonNameWatch && focusField === "salesPersonName") {
			debouncedUpdate("salesPersonName", salesPersonNameWatch as EmployeeItem);
		}

		return () => {
			debouncedUpdate.cancel(); // Cancel debounce on unmount
		};
	}, [salesPersonCodeWatch, salesPersonNameWatch, debouncedUpdate]);

	useEffect(() => {
		resetFormValues(resetFormAndRefs);
	}, [resetFormValues]);

	return (
		<>
			<Grid container spacing={2}>
				{scanUnitField(setFocusField).map((field) => (
					<Field key={field.name} {...field} />
				))}
			</Grid>
			<RightSpacing />
		</>
	);
};

export default ScanUnitComponent;
