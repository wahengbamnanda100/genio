/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	ButtonBase,
	Grid,
	Paper,
	SxProps,
	Typography,
	useTheme,
} from "@mui/material";
import Field from "../../../Form-component/field";
import {
	LoginFields,
	LoginFormSchema,
} from "../../../Component-types/login.type";
import { Dispatch, FC, SetStateAction } from "react";
import AnimateButton from "../../Extended/AnimateButton";
import { useFormContext } from "react-hook-form";
import generateLinearGradient from "../../../../utils/gradientColor";

interface FormCardProps {
	showPassword: boolean;
	sx?: SxProps;
	onSubmit: (data: LoginFormSchema) => void;
	setShowPassword: Dispatch<SetStateAction<boolean>>;
}
const FormCard: FC<FormCardProps> = ({
	showPassword,
	sx,
	onSubmit,
	setShowPassword,
}) => {
	const theme = useTheme();
	const { handleSubmit } = useFormContext<LoginFormSchema>();

	return (
		<Paper
			elevation={6}
			sx={{
				...sx,
				borderRadius: 3,
				width: "450px",
				boxShadow: theme.shadows[6],
			}}>
			<Grid
				container
				component={"form"}
				gap={1}
				p={4}
				width={"100%"}
				flex={1}
				justifyContent={"flex-start"}
				alignItems={"center"}
				onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} pb={2}>
					<Typography variant="body1" fontWeight={"medium"} color={"primary"}>
						SIGN IN
					</Typography>
				</Grid>

				{LoginFields(theme, showPassword, setShowPassword).map((field) => (
					<Field key={field.name} {...field} />
				))}
				<Box sx={{ mt: 1, width: "100%", pb: 2 }}>
					<AnimateButton>
						<ButtonBase
							// size="medium"
							// disabled={false}
							// fullWidth
							type="submit"
							// color="secondary"
							// variant="contained"
							sx={{
								width: "100%",
								textTransform: "uppercase",
								color: "white",
								fontWeight: "bold",
								borderRadius: 1.2,
								p: 1.4,
								background: generateLinearGradient({
									light: theme.palette.secondary.main,
									dark: theme.palette.secondary.dark,
								}),

								"&:hover": {
									background: theme.palette.secondary.dark,
								},
							}}>
							Login
						</ButtonBase>
					</AnimateButton>
				</Box>
				<Grid item xs={12} pb={2}>
					<Typography
						variant="subtitle2"
						fontWeight={"medium"}
						textAlign={"center"}>
						Can't access your account?
					</Typography>
				</Grid>
				<Grid item xs={12} pb={2}>
					<Typography
						variant="subtitle2"
						fontWeight={"medium"}
						textAlign={"center"}
						color={theme.palette.primary.main}>
						Best viewed in chrome / 16 and above
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default FormCard;
