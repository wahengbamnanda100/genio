import { Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import {
	ScanUnitSchema,
	scanUnitField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { RightSpacing } from "..";

const ScanUnitComponent = () => {
	const method = useForm<ScanUnitSchema>({
		defaultValues: {
			cmpName: "",
			showroom: "",
			salesPersonCode: "",
			salesPersonName: "",
		},
	});

	return (
		<>
			<Grid container spacing={2}>
				<FormProvider {...method}>
					{scanUnitField().map((field) => (
						<Field key={field.name} {...field} />
					))}
				</FormProvider>
			</Grid>
			<RightSpacing />
		</>
	);
};

export default ScanUnitComponent;
