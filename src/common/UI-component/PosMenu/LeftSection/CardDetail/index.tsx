import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";

const CardDetail = () => {
	const { control } = useFormContext<cardDetailSchema>();

	return (
		// <FormProvider {...methods}>
		<Grid container spacing={1}>
			{cardDetailFields().map((field) => (
				<Field key={field.name} {...field} {...control} />
			))}
		</Grid>
		// </FormProvider>
	);
};

export default CardDetail;
