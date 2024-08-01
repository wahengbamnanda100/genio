/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useFormContext, useFormState } from "react-hook-form";
import _ from "lodash";
import { Grid } from "@mui/material";
import { DateFieldProps } from ".";
import { ErrorContainer } from "./ErrorContainer";
// import { useTranslation } from "react-i18next";
import { isAfter, isBefore, isEqual, isValid } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

type errors = {
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

// const maskMap = {
// 	en: "__/__/____",
// 	ar: "____/__/__",
// };

const DateField = ({
	name,
	className,
	style,
	inputFormat = "dd-MM-yyyy",
	rules,
	size = "small",
	variant = "outlined",
	xs,
	sm,
	sx,
	allowPastDates = false,
	hasErrorMessage,
	...restProps
}: DateFieldProps) => {
	// const { i18n } = useTranslation();
	const { control } = useFormContext();
	const { errors }: errors = useFormState({ control });

	return (
		<Grid item xs={xs} sm={sm} className={className} style={style}>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, ref, ...rest }, fieldState }) => (
					<DatePicker
						{...rest}
						{...restProps}
						sx={sx}
						inputRef={ref}
						value={value}
						format={inputFormat}
						slotProps={{
							textField: {
								fullWidth: true,
								inputProps: {
									placeholder: "Select a Date",
								},
								size: size,
								error: !!fieldState.error,
							},
						}}
						localeText={{
							fieldMonthPlaceholder: () => "MM",
						}}
					/>
				)}
				rules={{
					...rules,
					validate: (value) => {
						if (value === null || !isValid(value)) {
							return "Invalid date format";
						}

						// const currentDate = new Date();
						// currentDate.setHours(0, 0, 0, 0);
						// let isValidDate;

						// if (allowPastDates) {
						// 	isValidDate =
						// 		isBefore(value, currentDate) ||
						// 		isEqual(value, currentDate) ||
						// 		isAfter(value, currentDate);
						// } else {
						// 	isValidDate =
						// 		isAfter(value, currentDate) || isEqual(value, currentDate);
						// }

						// return isValidDate ? undefined : "Date exceeds current date";
					},
				}}
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

export default DateField;
