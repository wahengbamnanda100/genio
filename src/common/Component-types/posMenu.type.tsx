/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputAdornment, Theme, alpha } from "@mui/material";
import { FieldProps } from "../Form-component";
import { NumericFormatCustom } from "../Form-component/inputField";
import StudentCard from "../Form-component/StudentListItem";
import {
	CompoanyUnitList,
	searchEmployeeList,
	searchStudentList,
	ShowroomList,
} from "../../services";
import {
	BussinessUnitItem,
	BussinessUnitRequestBodiesType,
	ShowroomItemType,
	ShowroomRequestBodiesType,
	Student,
} from "../../services/aoi.type";
import { getDropDownValues } from "../../utils/utils";
import EmployeeListItem from "../Form-component/EmployeeList";

export type cardDetailSchema = {
	cardNumber: unknown;
	familyId: unknown;
	idNumbar: unknown;
	dailyLimit: number | string;
	name: unknown;
	gardeLimit: number | string;
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
	salesPersonCode: unknown;
	salesPersonName: unknown;
};

export type ExchangeRatSchema = {
	currency: any[];
	rate: number;
	exchangePaidAmount: number;
	amount: number;
};

export type CardPaymentSchema = {
	cardType: any[];
	cardTypeNumber: number;
	cardAmount: number;
};

export type PosMenuFormSchema = cardDetailSchema &
	MenuItem &
	MenuTableSchema &
	DiscountAmountSchema &
	NetAmountSchema &
	PaidAmountSchema &
	AvailableBalanceSchema &
	ScanComponentSchema &
	ScanUnitSchema &
	ExchangeRatSchema &
	CardPaymentSchema;

const getValuesCompanyUnit = () => {
	const param: BussinessUnitRequestBodiesType = {
		Cmp_ID_N: "1",
		Usr_ID_N: "7",
	};
	const { data, isFetched } = CompoanyUnitList(param);
	const dropDownValues = isFetched
		? getDropDownValues<BussinessUnitItem>(
				data?.Data,
				"BusinessUnitDesc",
				"BusinessUnitCode"
			)
		: [];
	return dropDownValues;
};

const getValuesShowroomList = () => {
	const param: ShowroomRequestBodiesType = {
		BusinessUnitId: "1",
		Usr_ID_N: "7",
	};
	const { data, isFetched } = ShowroomList(param);
	const dropDownValues = isFetched
		? getDropDownValues<ShowroomItemType>(
				data?.Data,
				"ShowroomDesc",
				"ShowroomId"
			)
		: [];

	return dropDownValues;
};

export const cardDetailFields = (): FieldProps[] => {
	return [
		{
			fieldType: "search",
			name: "cardNumber",
			label: "Card Number",
			size: "small",
			renderItem: ({ option, props, isSelected, highlightColor }) => (
				<StudentCard
					key={option.StudentId}
					options={option}
					props={props}
					isSelected={isSelected}
					highlightColor={highlightColor}
				/>
			),
			hasErrorMessage: true,
			rules: {
				required: "Please enter Card Number",
			},
			searchApi: async (keyStroke: string) => {
				const response = await searchStudentList(
					{
						FamilyId: "",
						CardNumber: keyStroke,
						StudentName: "",
						ShowroomId: "7",
						Cmp_ID_N: "1",
					},
					keyStroke && keyStroke !== "" ? true : false
				);

				return response;
			},
			getOptionLabel: (option) => (option ? `${option.CardNumber}` : ""),
			optionKey: "CardNumber",
			options: (searchData) => searchData ?? [],
			xs: 12,
			md: 6,
		},
		{
			fieldType: "search",
			name: "name",
			label: "Name",
			size: "small",
			renderItem: ({ option, props, isSelected, highlightColor }) => (
				<StudentCard
					key={option.StudentId}
					options={option}
					props={props}
					isSelected={isSelected}
					highlightColor={highlightColor}
				/>
			),
			hasErrorMessage: true,
			rules: {
				required: "Please enter Student Name",
			},
			searchApi: (keyStroke: string) => {
				return searchStudentList(
					{
						FamilyId: "",
						CardNumber: "",
						StudentName: keyStroke,
						ShowroomId: "7",
						Cmp_ID_N: "1",
					},
					keyStroke && keyStroke !== "" ? true : false
				);
			},
			getOptionLabel: (option: Student) =>
				option ? `${option.StudentName}` : "",
			optionKey: "StudentName",
			options: (searchData) => searchData ?? [],
			xs: 6,
			md: 6,
		},

		{
			fieldType: "search",
			name: "idNumbar",
			label: "ID Number",
			size: "small",
			renderItem: ({ option, props, isSelected, highlightColor }) => (
				<StudentCard
					key={option.StudentId}
					options={option}
					props={props}
					isSelected={isSelected}
					highlightColor={highlightColor}
				/>
			),
			hasErrorMessage: true,
			rules: {
				required: "Please enter ID Number",
			},
			searchApi: (keyStroke: string) => {
				return searchStudentList(
					{
						FamilyId: "",
						CardNumber: keyStroke,
						StudentName: "",
						ShowroomId: "7",
						Cmp_ID_N: "1",
					},
					keyStroke && keyStroke !== "" ? true : false
				);
			},
			getOptionLabel: (option: Student) =>
				option ? `${option.AdmissionNumber}` : "",
			optionKey: "AdmissionNumber",
			options: (searchData) => searchData ?? [],
			xs: 6,
			md: 4,
		},
		{
			fieldType: "text",
			name: "dailyLimit",
			label: "Daily Limit",
			size: "small",
			hasErrorMessage: true,
			condition: /^-?\d*\.?\d{0,2}$/,
			disabled: true,
			// rules: {
			// 	required: "Please enter your Balance Amount",
			// },
			InputProps: {
				inputComponent: NumericFormatCustom as any,
			},
			inputProps: {
				maxLength: 15,
				style: { textAlign: "end" },
			},
			xs: 6,
			md: 2,
		},

		{
			fieldType: "search",
			name: "familyId",
			label: "Family ID",
			size: "small",
			hasErrorMessage: true,
			renderItem: ({ option, props, isSelected, highlightColor }) => (
				<StudentCard
					key={option.StudentId}
					options={option}
					props={props}
					isSelected={isSelected}
					highlightColor={highlightColor}
				/>
			),
			rules: {
				required: "Please enter your family ID",
			},
			searchApi: (keyStroke: string) => {
				return searchStudentList(
					{
						FamilyId: keyStroke,
						CardNumber: "",
						StudentName: "",
						ShowroomId: "7",
						Cmp_ID_N: "1",
					},
					keyStroke && keyStroke !== "" ? true : false
				);
			},
			getOptionLabel: (option: Student) => (option ? `${option.FamilyId}` : ""),
			optionKey: "FamilyId",
			options: (searchData) => searchData ?? [],
			xs: 12,
			md: 4,
		},
		{
			fieldType: "text",
			name: "gardeLimit",
			label: "Garde Limit",
			size: "small",
			condition: /^-?\d+$/,
			hasErrorMessage: true,
			disabled: true,
			rules: {
				required: "Please enter your Garde Limit",
			},
			inputProps: {
				maxLength: 7,
				// style: { textAlign: "end" },
			},
			xs: 6,
			md: 2,
		},
	];
};

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
	label: "Net Amount (QAR)",
	size: "small",
	disabled: true,
	hasErrorMessage: true,
	condition: /^-?\d*\.?\d{0,2}$/,
	InputProps: {
		inputComponent: NumericFormatCustom as any,
	},
	inputProps: {
		maxLength: 15,
		style: {
			textAlign: "end",
			WebkitTextFillColor: "white",
			// "-webkit-text-fill-color": theme.palette.text.secondary,
			fontSize: "1.4em",
		},
	},
	sx: {
		color: theme.palette.text.secondary,
		"& .MuiOutlinedInput-root": {
			"-webkit-text-fill-color": theme.palette.text.secondary,
			// background: alpha(theme.palette.secondary.main, 0.2),
			fontWeight: "bold",

			"& fieldset": {
				borderColor: theme.palette.secondary.main,
				color: "white",
				// color: theme.palette.secondary.dark,
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
			"&.Mui-disabled": {
				color: theme.palette.text.secondary,
			},
			"&.Mui-disabled fieldset": {
				borderColor: theme.palette.secondary.dark,
				// borderColor: theme.palette.text.secondary,
				// color: theme.palette.text.secondary,
				"-webkit-text-fill-color": theme.palette.text.secondary,
				borderWidth: "2px",
				backgroundColor: theme.palette.secondary.main,
				// outline: 2,
			},
		},

		"& .MuiInputLabel-root": {
			color: theme.palette.secondary.main,
			"&.Mui-focused": {
				color: theme.palette.secondary.dark,
			},
			"&.Mui-disabled": {
				color: theme.palette.secondary.dark,
				// color: theme.palette.text.secondary,
			},
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
		disabled: true,
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		//
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			// 	required: "Please enter your Cash Amount",
			// },Props: {
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
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Total Paid",
		// },
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
		disabled: true,
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance",
		// },
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
		disabled: true,
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Available Balance",
		// },
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
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Paid Amount",
		// },
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
		disabled: true,
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
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
		disabled: true,
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
		options: getValuesCompanyUnit(),
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
		options: getValuesShowroomList(),
		hasErrorMessage: true,
		rules: {
			required: "Please enter your Showroom",
		},
		xs: 6,
	},
	{
		fieldType: "search",
		name: "salesPersonCode",
		label: "Sales Person Code",
		size: "small",
		renderItem: ({ option, props, isSelected, highlightColor }) => (
			<EmployeeListItem
				// key={option.Emp_ID_N}
				options={option}
				props={props}
				isSelected={isSelected}
				highlightColor={highlightColor}
			/>
		),
		hasErrorMessage: true,
		searchApi: async (keyStroke: string) => {
			const response = await searchEmployeeList(
				{
					SearchText: keyStroke,
					Cmp_ID_N: "1",
				},
				keyStroke && keyStroke !== "" ? true : false
			);

			return response;
		},
		getOptionLabel: (option) => (option ? `${option.EmployeeCode}` : ""),
		optionKey: "EmployeeCode",
		options: (searchData) => searchData ?? [],
		xs: 4,
	},
	{
		fieldType: "search",
		name: "salesPersonName",
		label: "Sales Person Name",
		size: "small",
		renderItem: ({ option, props, isSelected, highlightColor }) => (
			<EmployeeListItem
				// key={option.Emp_ID_N}
				options={option}
				props={props}
				isSelected={isSelected}
				highlightColor={highlightColor}
			/>
		),
		hasErrorMessage: true,
		searchApi: async (keyStroke: string) => {
			const response = await searchEmployeeList(
				{
					SearchText: keyStroke,
					Cmp_ID_N: "1",
				},
				keyStroke && keyStroke !== "" ? true : false
			);
			console.log("emp res", response);

			return response;
		},
		getOptionLabel: (option) => (option ? `${option.EmployeeName}` : ""),
		optionKey: "EmployeeName",
		options: (searchData) => searchData ?? [],
		xs: 8,
	},
];

export const exchangeRateField = (): FieldProps[] => [
	{
		fieldType: "select",
		name: "currency",
		label: "Foreign Currency",
		size: "small",
		options: [],
		// hasErrorMessage: true,
		// rules: {
		// 	required: "Please enter your Currency",
		// },
		xs: 12,
	},
	{
		fieldType: "text",
		name: "rate",
		label: "Exchange Rate",
		size: "small",
		disabled: true,
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
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
		name: "exchangePaidAmount",
		label: "Paid Amount (QAR)",
		size: "small",
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 5.8,
	},
	{
		fieldType: "text",
		name: "amount",
		label: "Amount (QAR)",
		size: "small",
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
		InputProps: {
			inputComponent: NumericFormatCustom as any,
		},
		inputProps: {
			maxLength: 15,
			style: { textAlign: "end" },
		},
		xs: 5.8,
	},
];

export const cardTypeField = (): FieldProps[] => [
	{
		fieldType: "select",
		name: "cardType",
		label: "Card Type",
		size: "small",
		options: [],
		// hasErrorMessage: true,
		// rules: {
		// 	required: "Please enter your Currency",
		// },
		xs: 12,
	},
	{
		fieldType: "text",
		name: "cardTypeNumber",
		label: "Card Number",
		size: "small",
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
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
		name: "cardAmount",
		label: "Card Amount",
		size: "small",
		// hasErrorMessage: true,
		condition: /^-?\d*\.?\d{0,2}$/,
		// rules: {
		// 	required: "Please enter your Balance Amount",
		// },
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

export const dummyMenuData = {
	CategoryDetails: [
		{
			CategoryId: "2",
			CategoryCode: null,
			CategoryDescription: "SANDWICH",
		},
		{
			CategoryId: "3",
			CategoryCode: null,
			CategoryDescription: "BREAKFAST",
		},
		{
			CategoryId: "72",
			CategoryCode: null,
			CategoryDescription: "WRAPS",
		},
		{
			CategoryId: "40",
			CategoryCode: null,
			CategoryDescription: "HOT FOOD",
		},
		{
			CategoryId: "189",
			CategoryCode: null,
			CategoryDescription: "GRAB & GO",
		},
		{
			CategoryId: "208",
			CategoryCode: null,
			CategoryDescription: "HOTFOOD",
		},
		{
			CategoryId: "5",
			CategoryCode: null,
			CategoryDescription: "CONTAINER",
		},
		{
			CategoryId: "167",
			CategoryCode: null,
			CategoryDescription: "A - FRIENDSHIP FESTIVAL - HOT/ICED COFFEE",
		},
	],
	ItemDetails: [
		{
			PartId: "418",
			PartNumber: "ASD0238",
			PartDescription: "BAGEL WITH GRILLED CHICKEN\n",
			Price: "18.00",
		},
		{
			PartId: "421",
			PartNumber: "ASD0241",
			PartDescription: "BAGEL WITH CREAM CHEESE\n",
			Price: "16.00",
		},
		{
			PartId: "422",
			PartNumber: "ASD0242",
			PartDescription: "CHICKEN WRAP\n",
			Price: "15.00",
		},
		{
			PartId: "429",
			PartNumber: "ASD0249",
			PartDescription: "CHICKEN FAJITAS\n",
			Price: "16.00",
		},
		{
			PartId: "430",
			PartNumber: "ASD0250",
			PartDescription: "RATATOUILLE\n",
			Price: "12.00",
		},
		{
			PartId: "431",
			PartNumber: "ASD0251",
			PartDescription: "CLASSIC CHEESE SANDWICH\n",
			Price: "8.00",
		},
		{
			PartId: "432",
			PartNumber: "ASD0252",
			PartDescription: "CLASSIC CHICKEN SANDWICH\n",
			Price: "9.00",
		},
		{
			PartId: "433",
			PartNumber: "ASD0253",
			PartDescription: "CLASSIC ROAST BEEF SANDWICH\n",
			Price: "10.00",
		},
		{
			PartId: "434",
			PartNumber: "ASD0254",
			PartDescription: "CLASSIC TUNA SANDWICH\n",
			Price: "9.00",
		},
		{
			PartId: "435",
			PartNumber: "ASD0255",
			PartDescription: "CLASSIC TURKEY SANDWICH\n",
			Price: "10.00",
		},
		{
			PartId: "436",
			PartNumber: "ASD0256",
			PartDescription: "PREMIUM CHEESE SANDWICH\n",
			Price: "13.00",
		},
		{
			PartId: "437",
			PartNumber: "ASD0257",
			PartDescription: "PREMIUM CHICKEN SANDWICH\n",
			Price: "14.00",
		},
		{
			PartId: "438",
			PartNumber: "ASD0258",
			PartDescription: "PREMIUM ROAST BEEF SANDWICH\n",
			Price: "16.00",
		},
		{
			PartId: "439",
			PartNumber: "ASD0259",
			PartDescription: "PREMIUM TUNA SANDWICH\n",
			Price: "15.00",
		},
		{
			PartId: "440",
			PartNumber: "ASD0260",
			PartDescription: "PREMIUM TURKEY SANDWICH\n",
			Price: "16.00",
		},
		{
			PartId: "441",
			PartNumber: "ASD0261",
			PartDescription: "MINI BAGEL W/ CHICKEN\n",
			Price: "15.00",
		},
		{
			PartId: "442",
			PartNumber: "ASD0262",
			PartDescription: "MINI BAGEL W/ TURKEY\n",
			Price: "16.00",
		},
		{
			PartId: "443",
			PartNumber: "ASD0263",
			PartDescription: "MINI BAGEL W/ ROAST BEEF\n",
			Price: "15.00",
		},
		{
			PartId: "444",
			PartNumber: "ASD0264",
			PartDescription: "MINI BAGEL W/ TUNA\n",
			Price: "15.00",
		},
		{
			PartId: "445",
			PartNumber: "ASD0265",
			PartDescription: "ASSORTED BREAD ROLL",
			Price: "8.00",
		},
		{
			PartId: "449",
			PartNumber: "ASD0269",
			PartDescription: "JUMBO SANDWICHES (1X4)\n",
			Price: "15.00",
		},
		{
			PartId: "851",
			PartNumber: "ASD0671",
			PartDescription: "PLAIN BAGEL",
			Price: "10.00",
		},
		{
			PartId: "852",
			PartNumber: "ASD0672",
			PartDescription: "CREAM CHEESE",
			Price: "6.00",
		},
		{
			PartId: "1053",
			PartNumber: "ASD0873",
			PartDescription: "CHICKEN SHAWARMA",
			Price: "12.00",
		},
	],
};
