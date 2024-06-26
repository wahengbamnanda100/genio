//!______________________________________

import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import _ from "lodash";
// import { ChangeEvent, forwardRef, useRef } from "react";
import { ChangeEvent, forwardRef } from "react";
import { InputFieldProps } from "./formField.type";
import { ErrorContainer } from "./ErrorContainer";
// import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const InputField = ({
	name,
	rules,
	size = "small",
	variant = "outlined",
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
					<TextField
						{...rest}
						{...restProps}
						fullWidth
						error={Boolean(_.get(errors, name))}
						inputRef={ref}
						variant={variant}
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
						label={label}
					/>
				)}
				rules={rules}
			/>
			{hasErrorMessage && (
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

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

// const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
// 	function TextMaskCustom(props, ref) {
// 		const { onChange, ...other } = props;
// 		const inputRef = useRef(null);
// 		return (
// 			<IMaskInput
// 				{...other}
// 				mask="+(00) 0000 000000"
// 				lazy={true}
// 				definitions={{
// 					"#": /[1-9]/,
// 				}}
// 				//@ts-ignore
// 				inputRef={ref}
// 				onAccept={(value: any) =>
// 					onChange({ target: { name: props.name, value } })
// 				}
// 				overwrite
// 			/>
// 		);
// 	}
// );

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				decimalScale={2}
				thousandSeparator
				valueIsNumericString
				fixedDecimalScale
				// prefix="$"
			/>
		);
	}
);

export default InputField;
export { NumericFormatCustom };
