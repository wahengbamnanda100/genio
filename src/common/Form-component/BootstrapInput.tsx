/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	alpha,
	FormControl,
	Grid,
	InputBase,
	InputLabel,
	styled,
} from "@mui/material";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { ErrorContainer } from "./ErrorContainer";
import { InputFieldProps } from "./formField.type";
import _ from "lodash";
import { ChangeEvent } from "react";
import { NumericFormatCustom } from "./inputField";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	"label + &": {
		marginTop: theme.spacing(2),
		color: theme.palette.secondary.main,
	},
	"& .MuiInputBase-input": {
		borderRadius: 6,
		position: "relative",
		backgroundColor: theme.palette.secondary.main,
		border: "1px solid",
		// borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
		fontSize: 16,
		// width: "auto",
		padding: "6px 12px",
		transition: theme.transitions.create([
			"border-color",
			"background-color",
			"box-shadow",
		]),
		"&.Mui-disabled": {
			// backgroundColor: theme.palette.action.disabledBackground,

			outline: `1px solid ${theme.palette.secondary.dark}`,
			// boxShadow: `0 0 0 0.2rem ${alpha(theme.palette.secondary.dark, 0.25)}`,
		},
		"&:focus": {
			boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
}));

const BootstrapInputField = ({
	name,
	rules,
	size = "small",
	// variant = "outlined",
	condition,
	// thousandSeparator,
	className,
	style,
	xs,
	sm,
	md,
	label,
	// numberFormate,
	hasErrorMessage,
	...restProps
}: InputFieldProps) => {
	const { control } = useFormContext();
	const { errors } = useFormState({ control });

	// const [isFocused, setIsFocused] = useState<boolean>(false);

	// const addCommas = (num) =>
	// 	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

	return (
		<Grid item xs={xs} sm={sm} md={md} className={className} sx={style}>
			<Controller
				name={name}
				control={control}
				render={({ field: { ref, onChange, ...rest } }) => (
					<FormControl variant="standard">
						<InputLabel shrink htmlFor="bootstrap-input">
							{label}
						</InputLabel>
						<BootstrapInput
							{...rest}
							{...restProps}
							fullWidth
							error={Boolean(_.get(errors, name))}
							inputRef={ref}
							inputComponent={NumericFormatCustom as any}
							// variant={variant}
							size={size}
							// InputLabelProps={{ shrink: Boolean(value) || isFocused }}
							// onFocus={() => setIsFocused(true)}
							// onBlur={() => setIsFocused(false)}
							onChange={(
								e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
							) => {
								condition
									? (condition.test(e.target.value) || !e.target.value) &&
										onChange(e.target.value)
									: onChange(e.target.value);
							}}
							autoComplete="off"
							// label={label}
						/>
					</FormControl>
				)}
				rules={rules}
			/>
			{hasErrorMessage && _.get(errors, name) && (
				<ErrorContainer>
					{
						(_.get(errors, name)
							? _.get(errors, `${name}.message`)
							: null) as React.ReactNode
					}
				</ErrorContainer>
			)}
		</Grid>
	);
};

export default BootstrapInputField;
