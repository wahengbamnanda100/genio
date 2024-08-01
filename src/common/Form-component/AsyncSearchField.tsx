/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import {
	Autocomplete,
	CircularProgress,
	Grid,
	Popper,
	TextField,
} from "@mui/material";
import _ from "lodash";
import { AsyncSearchFieldProps } from "./formField.type";
import { ErrorContainer } from "./ErrorContainer";
// import { Student } from "../../services";

const StyledPoper = (props: any) => {
	return (
		<Popper
			{...props}
			style={{ width: "fit-content", minWidth: "200px" }}
			placement="bottom-start"
		/>
	);
};

// const dummyData: Student[] = [
// 	{
// 		StudentId: "1",
// 		StudentName: "John Doe",
// 		CardNumber: "1234567890",
// 		AdmissionNumber: "1234567890",
// 		FamilyId: "F12345",
// 		Grade: "10",
// 		AvailableBalance: "500.00",
// 		ImageUrl:
// 			"../imgUpload/StudentRegisterProfileImage/parent_images/1234567890.jpg",
// 		DailyLimit: "100.00",
// 	},
// 	{
// 		StudentId: "2",
// 		StudentName: "Jane Smith",
// 		CardNumber: "9876543210",
// 		AdmissionNumber: "9876543210",
// 		FamilyId: "F67890",
// 		Grade: "12",
// 		AvailableBalance: "800.00",
// 		ImageUrl:
// 			"../imgUpload/StudentRegisterProfileImage/parent_images/9876543210.jpg",
// 		DailyLimit: "200.00",
// 	},
// 	// Add more dummy objects as needed
// ];

const AsyncSearchField = ({
	name,
	searchApi,
	options,
	getOptionLabel,
	filterOptions = (x) => x,
	rules,
	variant = "outlined",
	size = "small",
	style,
	className,
	xs,
	sm,
	md,
	sx,
	setValue,
	placeholder,
	label,
	hasErrorMessage,
	id,
	freeSolo,
	optionKey,
	columns,
	changes,
	renderItem,
	highlightColor = "#61c2ff",
	...restProps
}: AsyncSearchFieldProps) => {
	const [keyStroke, setKeyStroke] = useState("");
	const [selectedValue, setSelectedValue] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [searchData, setSearchData] = useState<any[]>([]);
	const [isFocused, setIsFocused] = useState(false);

	const { control } = useFormContext();
	const { errors } = useFormState({ control });

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data, isLoading } = await searchApi(keyStroke);
			setSearchData(data);

			// setSearchData(dummyData);
			setLoading(isLoading);
		};

		const debouncedFetchData = _.debounce(fetchData, 500);

		if (keyStroke !== "" && isFocused) {
			debouncedFetchData();
		} else {
			setSearchData([]);
			setLoading(false);
		}

		// Cleanup function to cancel debounce on component unmount or keyStroke change
		return () => {
			debouncedFetchData.cancel();
		};
	}, [keyStroke, isFocused, searchApi]);

	return (
		<Grid item xs={xs} md={md} sm={sm} className={className} style={style}>
			<Controller
				key={id}
				name={name}
				render={({ field: { onChange, ref, ...rest } }) => (
					<Autocomplete
						freeSolo={freeSolo}
						{...rest}
						fullWidth
						sx={sx}
						loading={loading}
						onChange={(_, value) => {
							setSelectedValue(value);
							setValue && setValue(name, value);
							changes && changes(name, value);
							if (!freeSolo) {
								onChange(value);
								return;
							}
							if (optionKey) {
								if (typeof value === "string") {
									onChange({ [optionKey]: value });
									return;
								}
								onChange(value);
								return;
							}
						}}
						onInputChange={(_, value) => {
							setKeyStroke(value);
						}}
						options={restProps.disabled ? [] : options(searchData)}
						getOptionLabel={getOptionLabel}
						filterOptions={filterOptions}
						PopperComponent={renderItem ? StyledPoper : undefined}
						renderOption={(props: any, option: any) => {
							const isSelected =
								option &&
								selectedValue &&
								option.StudentId === selectedValue.StudentId;

							return (
								<React.Fragment key={props["data-option-index"]}>
									{renderItem ? (
										<>
											{renderItem &&
												renderItem({
													option,
													props,
													isSelected,
													highlightColor,
												})}
										</>
									) : (
										<li {...props}>{option[`${optionKey}`]}</li>
									)}
								</React.Fragment>
							);
						}}
						noOptionsText={loading ? "Loading..." : "No options"}
						renderInput={(params: any) => {
							// console.log("pram auto", params);
							// console.log("restProps auto", restProps);

							return (
								<TextField
									{...params}
									{...restProps}
									inputRef={ref}
									placeholder={placeholder}
									label={label}
									variant={variant}
									size={size}
									error={_.get(errors, name)}
									onFocus={() => setIsFocused(true)} // Set focus state to true
									onBlur={() => setIsFocused(false)} // Set focus state to false on blur
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<React.Fragment>
												{loading && (
													<CircularProgress color="inherit" size={20} />
												)}
												{params.InputProps.endAdornment}
											</React.Fragment>
										),
									}}
								/>
							);
						}}
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
		</Grid>
	);
};

export default AsyncSearchField;
