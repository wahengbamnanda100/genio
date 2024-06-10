import { Grid, Typography, useTheme, Box } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	LoginFields,
	LoginFormSchema,
} from "../common/Component-types/login.type";
import Field from "../common/Form-component/field";

const Login = () => {
	const theme = useTheme();
	console.log();

	const [showPassword, setShowPassword] = useState(false);

	const methods = useForm<LoginFormSchema>({
		defaultValues: {
			userName: "",
			passWord: "",
			rememberMe: false,
		},
	});

	const onsubmit = () => {};

	return (
		<Grid
			container
			minHeight={"100vh"}
			bgcolor={theme.palette.primary.light}
			padding={1}>
			<Grid
				item
				xs={false}
				sm={4}
				md={8}
				bgcolor={theme.palette.secondary.main}
				sx={{
					borderRadius: 4,
					p: 1,
				}}>
				<Typography variant="h1">This is the right section</Typography>
			</Grid>
			<Grid item xs={12} sm={8} md={4} sx={{ p: 1 }}>
				<Box
					sx={{
						// mt: 8,

						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}>
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit(onsubmit)}
							style={{
								width: "100%",
								padding: "1rem",
								display: "flex",
								flexDirection: "column",
								gap: "1.5rem",
								// justifyContent: "center",
								// alignItems: "center",
							}}>
							{LoginFields(showPassword, setShowPassword).map((field) => (
								<Field key={field.name} {...field} />
							))}
						</form>
					</FormProvider>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;

{
	/*  */
}
