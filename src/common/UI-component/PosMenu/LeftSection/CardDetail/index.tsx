import { Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useState } from "react";

const CardDetail = () => {
	const { control, setValue } = useFormContext<cardDetailSchema>();

	const [options] = useState<cardDetailSchema[]>([
		{
			cardNumber: "",
			familyId: "",
			idNumbar: "",
			dailyLimit: 0,
			name: "",
			gardeLimit: 0,
		},
		// Add more options as needed
	]);

	const [cardNumberWatch, famulyIdWatch, isNumberWatch, nameWatch] = useWatch({
		control,
		name: ["cardNumber", "familyId", "idNumbar", "name"],
	});

	useEffect(() => {
		const selectedOption = options.find(
			(option) =>
				option.cardNumber === cardNumberWatch ||
				option.familyId === famulyIdWatch ||
				option.idNumbar === isNumberWatch ||
				option.name === nameWatch
		);

		if (selectedOption) {
			setValue("cardNumber", selectedOption.cardNumber);
			setValue("familyId", selectedOption.familyId);
			setValue("idNumbar", selectedOption.idNumbar);
			setValue("dailyLimit", selectedOption.dailyLimit);
			setValue("name", selectedOption.name);
			setValue("gardeLimit", selectedOption.gardeLimit);
		}
	}, [
		cardNumberWatch,
		famulyIdWatch,
		isNumberWatch,
		nameWatch,
		options,
		setValue,
	]);

	return (
		<Grid container spacing={1}>
			{cardDetailFields().map((field) => (
				<Field key={field.name} {...field} {...control} />
			))}
		</Grid>
	);
};

export default CardDetail;
