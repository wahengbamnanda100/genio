import { Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useRef } from "react";
import { Student } from "../../../../../services/aoi.type";

const CardDetail = () => {
	const { control, setValue } = useFormContext<cardDetailSchema>();

	const previousValuesRef = useRef<Partial<cardDetailSchema>>({});

	const [cardNumberWatch] = useWatch({
		control,
		name: ["cardNumber"],
	});

	const [isNumberWatch] = useWatch({
		control,
		name: ["idNumbar"],
	});

	const [nameWatch] = useWatch({
		control,
		name: ["name"],
	});

	const [famulyIdWatch] = useWatch({
		control,
		name: ["familyId"],
	});

	const updateValues = (
		selectedKey: keyof cardDetailSchema,
		selectedValue: Student
	) => {
		if (selectedValue) {
			if (
				selectedKey !== "cardNumber" &&
				previousValuesRef.current.cardNumber !== selectedValue.CardNumber
			) {
				setValue("cardNumber", selectedValue);
			}
			if (
				selectedKey !== "familyId" &&
				previousValuesRef.current.familyId !== selectedValue.FamilyId
			) {
				setValue("familyId", selectedValue);
			}
			if (
				selectedKey !== "idNumbar" &&
				previousValuesRef.current.idNumbar !== selectedValue.AdmissionNumber
			) {
				setValue("idNumbar", selectedValue);
			}
			if (
				selectedKey !== "name" &&
				previousValuesRef.current.name !== selectedValue.StudentName
			) {
				setValue("name", selectedValue);
			}
			if (
				selectedKey !== "dailyLimit" &&
				previousValuesRef.current.dailyLimit !==
					Number(selectedValue.DailyLimit).toFixed(2)
			) {
				setValue("dailyLimit", Number(selectedValue.DailyLimit).toFixed(2));
			}
			if (
				selectedKey !== "gardeLimit" &&
				previousValuesRef.current.gardeLimit !== selectedValue.Grade
			) {
				setValue("gardeLimit", selectedValue.Grade);
			}

			// Update previous values
			previousValuesRef.current = {
				...previousValuesRef.current,
				cardNumber: selectedValue.CardNumber,
				familyId: selectedValue.FamilyId,
				idNumbar: selectedValue.AdmissionNumber,
				name: selectedValue.StudentName,
				dailyLimit: Number(selectedValue.DailyLimit).toFixed(2),
				gardeLimit: selectedValue.Grade,
			};
		} else {
			setValue(selectedKey, "");
		}
	};

	useEffect(() => {
		// console.log("card number", cardNumberWatch);
		const values = cardNumberWatch as Student;
		updateValues("cardNumber", values);
	}, [cardNumberWatch]);

	useEffect(() => {
		// console.log("name", nameWatch);
		const values = nameWatch as Student;
		updateValues("name", values);
	}, [nameWatch]);

	useEffect(() => {
		// console.log("ID number", isNumberWatch);
		const values = isNumberWatch as Student;
		updateValues("idNumbar", values);
	}, [isNumberWatch]);

	useEffect(() => {
		// console.log("family id", famulyIdWatch);
		const values = famulyIdWatch as Student;
		updateValues("familyId", values);
	}, [famulyIdWatch]);

	return (
		<Grid container spacing={1}>
			{cardDetailFields().map((field) => (
				<Field key={field.name} {...field} {...control} />
			))}
		</Grid>
	);
};

export default CardDetail;
