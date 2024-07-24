import { Grid } from "@mui/material";
import {
	historyTotalDataSchema,
	historyTotalField,
} from "../../Component-types/history.type";
import Field from "../../Form-component/field";
import { FormProvider, useForm } from "react-hook-form";

const TotalVlaue = () => {
	const method = useForm<historyTotalDataSchema>({
		defaultValues: {},
	});

	return (
		<FormProvider {...method}>
			<Grid container width={"100%"} spacing={2} px={1} pl={3}>
				{historyTotalField().map((field) => (
					<Field key={field.name} {...field} />
				))}
			</Grid>
		</FormProvider>
	);
};

export default TotalVlaue;
