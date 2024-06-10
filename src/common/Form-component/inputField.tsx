/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, forwardRef, useState } from "react";
import _ from "lodash";
import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { InputFieldProps } from "./formField.type";
import { ErrorContainer } from "./ErrorContainer";

import { NumericFormat, NumericFormatProps } from "react-number-format";

type errors = {
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const InputField = ({
	name,
	rules,
	size = "small",
	variant = "outlined",
	condition,
	thousandSeparator,
	className,
	style,
	xs,
	sm,
	md,
	label,
	numberFormate,
	maxChars,
	hasErrorMessage,
	...restProps
}: InputFieldProps) => {
	const { control } = useFormContext();
	const { errors }: errors = useFormState({ control });

	const [inputValue, setInputValue] = useState("");
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const remainingCharacters = maxChars
		? maxChars - inputValue.length
		: undefined;
	const isMaxLengthExceeded =
		remainingCharacters !== undefined && remainingCharacters < 0;

	return (
		<Grid item xs={xs} sm={sm} md={md} className={className} sx={style}>
			<Controller
				name={name}
				control={control}
				render={({ field: { ref, onChange, value, ...rest } }) => (
					<TextField
						{...rest}
						{...restProps}
						fullWidth
						error={Boolean(_.get(errors, name))}
						inputRef={ref}
						variant={variant}
						size={size}
						InputLabelProps={{ shrink: Boolean(value) || isFocused }}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onChange={(
							e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
						) => {
							condition
								? (condition.test(e.target.value) || !e.target.value) &&
									onChange(e.target.value)
								: onChange(e.target.value);
							setInputValue(e.target.value);
						}}
						autoComplete="off"
						label={label}
						helperText={
							maxChars !== undefined
								? isMaxLengthExceeded
									? `Maximum length exceeded by ${Math.abs(
											remainingCharacters!
										)} characters`
									: remainingCharacters !== undefined
										? `Remaining characters: ${remainingCharacters}`
										: undefined
								: undefined
						}
					/>
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

			{/* <ErrorContainer>
        {hasErrorMessage && _.get(errors, name)
          ? _.get(errors, `${name}.message`)
          : null}
      </ErrorContainer> */}
		</Grid>
	);
};

export const NumericFormatCustom = forwardRef<NumericFormatProps, any>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		// console.log("Mask ==> ", props);

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
				fixedDecimalScale
				// thousandSeparator
				valueIsNumericString
				// fixedDecimalScale
			/>
		);
	}
);

export default InputField;
