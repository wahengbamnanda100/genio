import { Grid } from "@mui/material";
import {
	historyTotalDataSchema,
	historyTotalField,
} from "../../Component-types/history.type";
import Field from "../../Form-component/field";
import { FormProvider, useForm } from "react-hook-form";
import { FC, useEffect } from "react";

interface TotalVlaueProps {
	data: historyTotalDataSchema | null;
}

const TotalVlaue: FC<TotalVlaueProps> = ({ data }) => {
	const method = useForm<historyTotalDataSchema>({
		defaultValues: {
			totalAmount: 0,
			discountAmount: 0,
			netAmount: 0,
			totalCashAmount: 0,
			totalCardAmount: 0,
		},
	});

	useEffect(() => {
		if (data) {
			method.setValue("discountAmount", data.discountAmount);
			method.setValue("netAmount", data.netAmount);
			method.setValue("totalAmount", data.totalAmount);
			method.setValue("totalCardAmount", data.totalCardAmount);
			method.setValue("totalCashAmount", data.totalCashAmount);
		}
	}, [data]);

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
