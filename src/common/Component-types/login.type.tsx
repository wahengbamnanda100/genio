import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FieldProps } from "../Form-component";

export type LoginFormSchema = {
	userName: string;
	passWord: string;
	rememberMe: boolean;
};

const handleClickShowPassword = (
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setShowPassword((prev) => !prev);
};

const handleMouseDownPassword = (
	event: React.MouseEvent<HTMLButtonElement>
) => {
	event.preventDefault();
};

export const LoginFields = (
	showPassword: boolean,
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
): FieldProps[] => [
	{
		fieldType: "text",
		name: "userName",
		label: "User name",
		size: "medium",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your username",
		},
		InputProps: {
			style: {
				borderRadius: "10px",
				height: "3rem",
				background: "transparent",
				// boxShadow: theme.shadows[2],
			},
		},
		inputProps: {
			style: {
				background: "transparent",
			},
		},
	},
	{
		fieldType: "text",
		name: "passWord",
		label: "Password",
		size: "medium",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your password",
			minLength: {
				value: 1,
				message: "Password must contain at least 6 characters",
			},
		},
		type: showPassword ? "text" : "password",
		InputProps: {
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						aria-label="toggle password visibility"
						onClick={() => handleClickShowPassword(setShowPassword)}
						onMouseDown={handleMouseDownPassword}
						edge="end">
						{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
					</IconButton>
				</InputAdornment>
			),
			style: {
				borderRadius: "10px",
				height: "3rem",
				background: "transparent",
				// boxShadow: theme.shadows[2],
			},
		},
		inputProps: {
			style: {
				background: "transparent",
			},
		},
	},
];
