/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useFormContext, useFormState } from "react-hook-form";
import {
	Badge,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	ListItemIcon,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
	useTheme,
} from "@mui/material";
import _ from "lodash";
// import { ChangeEvent } from "react";
import { SelectFieldProps } from "./index";
import { ErrorContainer } from "./ErrorContainer";
type errors = {
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const SelectField = ({
	name,
	multiple,
	options,
	label,
	rules,
	size = "small",
	variant = "outlined",
	className,
	style,
	xs,
	sm,
	hasErrorMessage,
	changes,
	customizedRender = (value) => value.join(", "),
	...restProps
}: SelectFieldProps) => {
	const { control } = useFormContext();
	const theme = useTheme();
	const { errors }: errors = useFormState({ control });
	const hasError = Boolean(_.get(errors, name));

	return (
		<Grid item xs={xs} sm={sm} className={className} style={style}>
			<FormControl size={size} variant={variant} fullWidth>
				<InputLabel
					id={`label-select-field-${name}`}
					sx={{ color: hasError ? theme.palette.error.main : undefined }}>
					{label}
				</InputLabel>
				<Controller
					name={name}
					control={control}
					render={({ field: { value, ref, ...rest } }) => (
						<Select
							{...rest}
							{...restProps}
							labelId={`label-select-field-${name}`}
							id={`select-field-${name}`}
							inputRef={ref}
							error={Boolean(_.get(errors, name))}
							label={label}
							multiple={multiple}
							onChange={(event: SelectChangeEvent<any>) => {
								rest.onChange(event);
								changes && changes(name, event);
							}}
							value={value}
							MenuProps={{
								anchorOrigin: {
									vertical: "bottom",
									horizontal: "left",
								},
								transformOrigin: {
									vertical: "top",
									horizontal: "left",
								},
								PaperProps: {
									sx: {
										maxHeight: 285,
										boxShadow: "-0px -0px 10px 0px rgba(0, 0, 0, 0.18)",
									},
								},
							}}
							renderValue={(selected) => {
								const selectedOption = Array.isArray(selected)
									? selected
									: [selected];
								const selectedLabel = options
									.filter((option) => selectedOption.includes(option.value))
									.map((option) => option.label);
								return customizedRender(selectedLabel);
							}}>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
									// style={{ fontWeight: 400,  }}
									sx={{ fontWeight: 400, position: "relative" }}>
									{multiple && (
										<ListItemIcon>
											<Checkbox
												checked={value.includes(option.value)}
												style={{ padding: "0 10px 0 5px" }}
											/>
										</ListItemIcon>
									)}

									<MenuItemText
										text={option.label}
										mandatory={option?.mandatory || false}
									/>
								</MenuItem>
							))}
						</Select>
					)}
					rules={rules}
				/>
			</FormControl>
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

export default SelectField;

interface MenuItemTextProps {
	text: string;
	mandatory: boolean;
}

const MenuItemText = ({ text, mandatory }: MenuItemTextProps) => {
	return (
		<>
			<Badge
				color="secondary"
				variant="dot"
				invisible={!mandatory}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				sx={{ mr: 1 }}></Badge>
			<Typography>{text}</Typography>
		</>
	);
};
