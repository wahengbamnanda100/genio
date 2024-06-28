/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputAdornment, Theme, alpha } from "@mui/material";
import { FieldProps } from "../Form-component";
import { NumericFormatCustom } from "../Form-component/inputField";

export type cardDetailSchema = {
	cardNumber: string;
	familyId: string;
	idNumbar: number;
	dailyLimit: number;
	name: string;
	gardeLimit: number;
};

export type MenuItem = {
	id: string;
	description: string;
	quantity: number;
	unitPrice: number;
	amount: number;
	discount: number;
	netAmount: number;
};

export type MenuTableSchema = MenuItem[];

export type DiscountAmountSchema = {
	discount: number;
	total: number | string;
	discountAmount: number | undefined;
};

export type NetAmountSchema = {
	netAmount: number;
};

export type PaidAmountSchema = {
	cashAmount: number;
	totalPaid: number;
	balance: number;
};

export type AvailableBalanceSchema = {
	availableBalance: number;
	paidAmount: number;
	balanceAmount: number;
};

export type ScanComponentSchema = {
	invoiceDate: Date | undefined;
	invoiceNumber: string;
};

export type ScanUnitSchema = {
	cmpName: string;
	showroom: string;
	salesPersonCode: string;
	salesPersonName: string;
};

export type PosMenuFormSchema =
	| cardDetailSchema
	| MenuItem
	| MenuTableSchema
	| DiscountAmountSchema
	| NetAmountSchema
	| PaidAmountSchema
	| AvailableBalanceSchema
	| ScanComponentSchema
	| ScanUnitSchema;

// export type PosMenuFormSchema = cardDetailSchema &
// 	MenuItem &
// 	MenuTableSchema &
// 	DiscountAmountSchema &
// 	NetAmountSchema &
// 	PaidAmountSchema &
// 	AvailableBalanceSchema &
// 	ScanComponentSchema &
// 	ScanUnitSchema;

export const cardDetailFields = (): FieldProps[] => [
	{
		fieldType: "text",
		name: "cardNumber",
		label: "Card Number",
		size: "small",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your card number",
		},
		xs: 12,
		md: 6,
	},
	{
		fieldType: "text",
		name: "familyId",
		label: "Family ID",
		size: "small",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your family ID",
		},
		xs: 12,
		md: 6,
	},
	{
		fieldType: "text",
		name: "idNumbar",
		label: "ID Number",
		size: "small",
		condition: /^-?\d+$/,
		hasErrorMessage: true,
		rules: {
			required: "Please enter your ID Number",
		},
		inputProps: {
			maxLength: 14,
			style: { textAlign: "end" },
		},
		xs: 6,
		md: 4,
	},
	{
		fieldType: "text",
		name: "dailyLimit",
		label: "Daily Limit",
		size: "small",
		condition: /^-?\d+$/,
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Daily Limit",
		},
		inputProps: {
			maxLength: 5,
			style: { textAlign: "end" },
		},
		xs: 6,
		md: 2,
	},
	{
		fieldType: "text",
		name: "name",
		label: "Name",
		size: "small",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Name",
		},
		xs: 6,
		md: 4,
	},
	{
		fieldType: "text",
		name: "gardeLimit",
		label: "Garde Limit",
		size: "small",
		condition: /^-?\d+$/,
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Garde Limit",
		},
		inputProps: {
			maxLength: 5,
			style: { textAlign: "end" },
		},
		xs: 6,
		md: 2,
	},
];

export const discountAmountField = (
	theme: Theme,
	disabled: boolean
): FieldProps[] => [
	{
		fieldType: "text",
		name: "total",
		label: "Total",
		size: "small",
		condition: /^-?\d*\.?\d{0,2}$/,
		hasErrorMessage: true,
		disabled: true,
		rules: {
			required: "Please enter your Total",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 7,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
	{
		fieldType: "text",
		name: "discount",
		label: "Discount %",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		disabled,
		InputProps: {
			endAdornment: (
				<InputAdornment position="end">
					<span
						style={{
							color: theme.palette.primary.dark,
							fontWeight: "bold",
						}}>
						%
					</span>
				</InputAdornment>
			),
		},
		rules: {
			required: "Please enter your Discount",
		},
		inputProps: {
			maxLength: 7,
			style: { textAlign: "end" },
		},
		xs: 6,
	},
	{
		fieldType: "text",
		name: "discountAmount",
		label: "Discount Amount",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		disabled,
		rules: {
			required: "Please enter your Net Amount",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 6,
	},
];

export const netAmountField = (theme: Theme): FieldProps => ({
	fieldType: "text",
	name: "netAmount",
	label: "Net Amount",
	size: "small",
	disabled: true,
	hasErrorMessage: true,
	condition: /^-?\d*\.?\d{0,2}$/,
	InputProps: {
		inputComponent: NumericFormatCustom as any,
	},
	inputProps: {
		maxLength: 15,
		style: { textAlign: "end" },
	},
	sx: {
		"& .MuiOutlinedInput-root": {
			// background: alpha(theme.palette.secondary.main, 0.2),
			fontWeight: "bold",

			"& fieldset": {
				borderColor: theme.palette.secondary.main,
				color: theme.palette.secondary.dark,
			},
			"&:hover fieldset": {
				borderColor: theme.palette.secondary.main,
				borderWidth: 2,
				// outline: 2,
			},
			"&.Mui-focused fieldset": {
				borderColor: theme.palette.secondary.main,
				borderWidth: "2px",
				// outline: 2,
			},
			// "&.Mui-disabled fieldset": {
			// 	borderColor: theme.palette.secondary.dark,
			// 	borderWidth: "2px",
			// 	backgroundColor: theme.palette.secondary.light,
			// 	color: theme.palette.secondary.dark,
			// 	// outline: 2,
			// },
		},
		"& .MuiInputLabel-root": {
			color: theme.palette.secondary.main,
			"&.Mui-focused": {
				color: theme.palette.secondary.dark,
			},
			// "&.Mui-disabled": {
			// 	color: theme.palette.secondary.dark,
			// },
		},
	},
	xs: 6,
});

export const paidAmountField = (): FieldProps[] => [
	{
		fieldType: "text",
		name: "cashAmount",
		label: "Cash Amount",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Cash Amount",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
	{
		fieldType: "text",
		name: "totalPaid",
		label: "Total Paid",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Total Paid",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
	{
		fieldType: "text",
		name: "balance",
		label: "Balance",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Balance",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
];

export const availableBalancefield = (theme: Theme): FieldProps[] => [
	{
		fieldType: "text",
		name: "availableBalance",
		label: "Available Balance",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Available Balance",
		},
		sx: {
			"& .MuiOutlinedInput-root": {
				background: alpha(theme.palette.primary.main, 0.1),
				fontWeight: "bold",
			},
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
	{
		fieldType: "text",
		name: "paidAmount",
		label: "Paid Amount",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Paid Amount",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
	{
		fieldType: "text",
		name: "balanceAmount",
		label: "Balance Amount",
		size: "small",
		hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		rules: {
			required: "Please enter your Balance Amount",
		},
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 12,
	},
];

export const scanField = (): FieldProps[] => [
	{
		fieldType: "date",
		name: "invoiceDate",
		label: "Invoice Date",
		size: "small",
		// disabled: true,
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Invoice Date",
		},
		xs: 6,
	},
	{
		fieldType: "text",
		name: "invoiceNumber",
		label: "Invoice Number",
		size: "small",
		// disabled: true,
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Invoice Number",
		},
		xs: 6,
	},
];

export const scanUnitField = (): FieldProps[] => [
	{
		fieldType: "select",
		name: "cmpName",
		label: "Company / Business Unit",
		size: "small",
		options: [],
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Company Name",
		},
		xs: 6,
	},
	{
		fieldType: "select",
		name: "showroom",
		label: "Showroom",
		size: "small",
		options: [],
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Showroom",
		},
		xs: 6,
	},
	{
		fieldType: "text",
		name: "salesPersonCode",
		label: "Sales Person Code",
		size: "small",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Sales Person Code",
		},
		xs: 4,
	},
	{
		fieldType: "text",
		name: "salesPersonName",
		label: "Sales Person Name",
		size: "small",
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Sales Person Name",
		},
		xs: 8,
	},
];
