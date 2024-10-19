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
import ConfirmationDialog from "../../../../ModalComponent/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import {
	resetPosMenu,
	selectMenuTable,
} from "../../../../../store/slices/posMenuSlice";
import { RootState } from "../../../../../store";
import { useLocation } from "react-router";
import { queryCache } from "../../../../../utils/utils";

interface ScanUnitComponentProps {
	resetFormValues: (resetFunc: () => void) => void;
}

const ScanUnitComponent: FC<ScanUnitComponentProps> = ({ resetFormValues }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { setValue, control } = useFormContext<ScanUnitSchema>();
	const [focusField, setFocusField] = useState<string>("");
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const previousValuesRef = useRef<Partial<ScanUnitSchema>>({});
	const previousShowroomRef = useRef<Partial<ScanUnitSchema>>({});
	// Watch the fields in a single useWatch call to reduce re-renders
	const [
		salesPersonCodeWatch,
		salesPersonNameWatch,
		cmpNameWatch,
		showroomWatch,
	] = useWatch({
		control,
		name: ["salesPersonCode", "salesPersonName", "cmpName", "showroom"],
	});

	const isView = pathname.includes("view");
	const menuTable = useSelector((state: RootState) => selectMenuTable(state));

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

	const handleShowConfirm = () => {
		dispatch(resetPosMenu());
		setShowConfirm(false);
	};

	const handleShowCancel = () => {
		// //console.log(
		// 	"previousShowroomRef?.current?.showroom",
		// 	previousShowroomRef?.current?.showroom
		// );
		const preShow = previousShowroomRef?.current?.showroom || "";

		setValue("showroom", preShow);
		setShowConfirm(false);
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

	useEffect(() => {
		if (!isView && menuTable.length !== 0 && showroomWatch !== "") {
			previousShowroomRef.current.showroom = showroomWatch;
			setShowConfirm(true);
		}
	}, [showroomWatch]);

	useEffect(() => {
		queryCache.clear();
	}, []);

	return (
		<>
			<Grid container spacing={2}>
				{scanUnitField(setFocusField, cmpNameWatch).map((field) => (
					<Field key={field.name} {...field} />
				))}
			</Grid>
			<RightSpacing />
			<ConfirmationDialog
				dialogType="cancel"
				open={showConfirm}
				// loading={isPending}
				setOpen={setShowConfirm}
				title="Change Showroom"
				description="Changing showroom will remove all menu item selected"
				onConfirm={handleShowConfirm}
				onCancel={handleShowCancel}
			/>
		</>
	);
};

export default ScanUnitComponent;
