/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Autocomplete, Grid, Popper, TextField } from "@mui/material";
import _ from "lodash";
import { ErrorContainer } from "./ErrorContainer";
import { AsyncSearchFieldProps } from "./formField.type";

const StyledPoper = (props: any) => {
	return (
		<Popper
			{...props}
			style={{ width: "fit-content", minWidth: "200px" }}
			placement="bottom-start"
		/>
	);
};

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
	...restProps
}: AsyncSearchFieldProps) => {
	const { control } = useFormContext();
	const { errors } = useFormState({ control });

	const [keyStrocke, setKeyStrocke] = useState("");
	const uniqueOptionsSet = new Set<string>();

	const { data: searchData, isLoading } = searchApi(keyStrocke);

	const filterUniqueOptions = (options: any) => {
		const seenKeys = new Set();
		return options.filter((option: any) => {
			const _optionKey = option[`${optionKey}`];
			if (!seenKeys.has(_optionKey)) {
				seenKeys.add(_optionKey);
				return true;
			}
			return false;
		});
	};

	return (
		<Grid item xs={xs} sm={sm} className={className} style={style}>
			<Controller
				key={id}
				name={name}
				render={({ field: { onChange, ref, ...rest } }) => (
					<Autocomplete
						freeSolo={freeSolo}
						{...rest}
						fullWidth
						sx={sx}
						loading={isLoading}
						onChange={(e, value) => {
							setValue && setValue(name, value);
							changes && changes(name, value);
							if (!freeSolo) {
								onChange(value);
								return;
							}
							if (optionKey) {
								if (typeof value === "string") {
									if (
										options(searchData).find((el) => el[optionKey] === value)
									) {
										onChange(
											options(searchData).find((el) => el[optionKey] === value)
										);
										return;
									}
									onChange({ [optionKey || ""]: value });
									return;
								}
								onChange(value);
								return;
							}
						}}
						onInputChange={(e, value) => setKeyStrocke(value)}
						options={
							restProps.disabled ? [] : filterUniqueOptions(options(searchData))
						}
						getOptionLabel={getOptionLabel}
						filterOptions={filterOptions}
						PopperComponent={renderItem ? StyledPoper : undefined}
						renderOption={(props: any, option: any, state) => {
							const optionList = option[`${optionKey}`];
							return (
								<React.Fragment key={props["data-option-index"]}>
									{renderItem ? (
										<>{renderItem && renderItem({ option, props })}</>
									) : (
										<li {...props}>{optionList}</li>
									)}
								</React.Fragment>
							);
						}}
						renderInput={(params: any) => {
							return (
								<TextField
									{...params}
									{...restProps}
									inputRef={ref}
									placeholder={placeholder}
									label={label}
									variant={variant}
									size={size}
								/>
							);
						}}
					/>
				)}
				rules={rules}
			/>
			{/* <ErrorContainer>
        {hasErrorMessage && _.get(errors, name)
          ? _.get(errors, `${name}.message`)
          : null}
      </ErrorContainer> */}
		</Grid>
	);
};

export default AsyncSearchField;
