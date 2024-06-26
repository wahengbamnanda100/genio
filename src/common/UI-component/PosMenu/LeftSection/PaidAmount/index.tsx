import { Grid, Stack, alpha, useTheme } from "@mui/material";
import {
	availableBalancefield,
	paidAmountField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";

const PaidAmount = () => {
	const theme = useTheme();

	return (
		<Grid container spacing={2}>
			{/* <FormProvider {...paidMethod}> */}
			<Grid item container xs={12} md={6}>
				<Stack
					gap={1}
					flexDirection={"column"}
					padding={1}
					width={"100%"}
					borderRadius={2}
					bgcolor={alpha(theme.palette.secondary.light, 0.1)}>
					{paidAmountField().map((field) => (
						<Field key={field.name} {...field} />
					))}
				</Stack>
			</Grid>
			{/* </FormProvider> */}
			{/* <FormProvider {...availableMethod}> */}
			<Grid item container xs={12} md={6}>
				<Stack
					gap={1}
					flexDirection={"column"}
					padding={1}
					width={"100%"}
					borderRadius={2}
					bgcolor={alpha(theme.palette.primary.light, 0.1)}>
					{availableBalancefield(theme).map((field) => (
						<Field key={field.name} {...field} />
					))}
				</Stack>
			</Grid>
			{/* </FormProvider> */}
		</Grid>
	);
};

export default PaidAmount;
