/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FilledInputProps,
	InputAdornmentProps,
	InputBaseComponentProps,
	InputBaseProps,
	InputProps,
	OutlinedInputProps,
	SxProps,
	Theme,
} from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import React, { CSSProperties, ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

type common_type = {
	name: string;
	label?: string;
	disabled?: boolean;
	rules?: RegisterOptions;
	style?: CSSProperties;
	className?: string;
	size?: "small" | "medium";
	sx?: SxProps<Theme>;
	variant?: "filled" | "outlined" | "standard";
	xs?:
		| false
		| "auto"
		| true
		| 1
		| 2
		| 2.4
		| 3
		| 3.5
		| 4
		| 5
		| 5.5
		| 5.6
		| 5.7
		| 5.8
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12;
	sm?:
		| false
		| "auto"
		| true
		| 1
		| 2
		| 3
		| 3.5
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12;
	md?:
		| false
		| "auto"
		| true
		| 1
		| 2
		| 3
		| 3.5
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12;
	hasErrorMessage?: boolean;
};

export type ColumnProps = {
	title: string;
	name: string;
	style?: CSSProperties;
};

type InputFieldProps = {
	numberFormate?: boolean;
	placeholder?: string;
	multiline?: boolean;
	minRows?: string | number;
	maxRows?: string | number;
	rows?: string | number;
	InputProps?: Partial<
		OutlinedInputProps | FilledInputProps | InputProps | InputBaseProps
	>;
	condition?: RegExp;
	thousandSeparator?: boolean;
	maxChars?: number;
	inputProps?: InputBaseComponentProps;
	type?: "email" | "number" | "text" | "password";
} & common_type;

export type InputFieldType = { fieldType: "text" } & InputFieldProps;
export type BootstrapInputFieldType = {
	fieldType: "boot-text";
} & InputFieldProps;

type CheckBoxFieldProps = {
	title?: string;
	checkBoxs: {
		name: string;
		label?: string | ReactNode;
		disabled?: boolean;
		style?: CSSProperties;
	}[];
	checkedIcon?: ReactNode;
	icon?: ReactNode;
	row?: boolean;
	labelPlacement?: "bottom" | "end" | "start" | "top";
	required?: string;
	defaultCheck?: boolean;
} & Omit<common_type, "label" | "variant" | "name" | "rules">;

export type CheckBoxFieldType = {
	fieldType: "checkbox";
} & CheckBoxFieldProps & {
		name: string;
	};

export type Student = {
	StudentId: string;
	StudentName: string;
	CardNumber: string;
	AdmissionNumber: string;
	FamilyId: string;
	Grade: string;
	AvailableBalance: string;
	ImageUrl: string;
	DailyLimit: string;
};

type AsyncSearchFieldProps = {
	placeholder?: string;
	// searchApi: (keyStroke: string) => { data: unknown[]; isLoading: boolean };
	searchApi: (
		keyStroke: string
	) => Promise<{ data: unknown[]; isLoading: boolean }>;
	// searchApi: (
	// 	keyStroke: string
	// ) => UseMutationResult<unknown, Error, unknown, unknown>;
	options: (searchData: any) => any[];
	getOptionLabel: (option: any) => string;
	getValueLabel?: string;
	id?: string;
	filterOptions?: (options: any[], state: any) => any[];
	openText?: string;
	closeText?: string;
	clearText?: string;
	noOptionsText?: string;
	setValue?: (name: any, value: any) => void;
	InputProps?: Partial<OutlinedInputProps | FilledInputProps | InputProps>;
	freeSolo?: boolean;
	optionKey?: string;
	rules?: any;
	changes?: any;
	highlightColor?: string;
	columns?: ColumnProps[];
	renderItem?: ({
		option,
		props,
		isSelected,
		highlightColor,
	}: any) => React.ReactNode;
} & common_type;

export type AsyncSearchFieldType = {
	fieldType: "search";
} & AsyncSearchFieldProps;

type SelectFieldProps = {
	multiple?: boolean;
	disabledOptions?: any[];
	changes?: any;
	options: { label: string; value: any; mandatory?: boolean }[];
	customizedRender?: (selectedOptions: string[]) => React.ReactNode;
} & common_type;

export type SelectFieldType = { fieldType: "select" } & SelectFieldProps;

type DateFieldProps = {
	inputFormat?: string;
	minDate?: Date;
	maxDate?: Date;
	allowPastDates?: boolean;
	view?: ("day" | "month" | "year")[];
	InputAdornmentProps?: Partial<InputAdornmentProps<"div", {}>>;
} & common_type &
	DatePickerProps<never>;

export type DateFieldType = { fieldType: "date" } & DateFieldProps;

type DateTimeFieldProps = {
	ampm?: boolean;
	inputFormat?: string;
	minDate?: Date;
	maxDate?: Date;
	minTime?: Date;
	maxTime?: Date;
	maxDateTime?: Date;
	minDateTime?: Date;
	view?: ("day" | "hours" | "minutes" | "month" | "seconds" | "year")[];
	InputAdornmentProps?: Partial<InputAdornmentProps<"div", {}>>;
} & common_type;

export type DateTimeFieldType = { fieldType: "dateTime" } & DateTimeFieldProps;

type DropzoneFieldProps = {
	accept?: { [key: string]: any };
	hideMessage?: boolean;
	showImage?: boolean;
	multipleFiles?: boolean;
	view?: boolean;
} & Omit<common_type, "size" | "label" | "sx" | "variant">;

export type DropzoneFieldType = { fieldType: "dropzone" } & DropzoneFieldProps;

export type ReactDropzoneFieldType = {
	fieldType: "reactdropzone";
} & DropzoneFieldProps;

type FieldProps =
	| InputFieldType
	| BootstrapInputFieldType
	| AsyncSearchFieldType
	| DateFieldType
	| DateTimeFieldType
	| DropzoneFieldType
	| SelectFieldType
	| CheckBoxFieldType
	| ReactDropzoneFieldType;

export type {
	FieldProps,
	InputFieldProps,
	CheckBoxFieldProps,
	SelectFieldProps,
	DateFieldProps,
	DateTimeFieldProps,
	AsyncSearchFieldProps,
	DropzoneFieldProps,
};
