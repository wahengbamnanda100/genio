/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchStudentList } from "../../services";
import { FieldProps } from "../Form-component";

export type searchHistorySchema = {
	invoiceNubmer: string;
	cardNumber: string;
	studentName: string;
	admissionNumber: string;
	fromDate: Date | null;
	toDate: Date | null;
	CompanyBussinessUnit: string;
	showroom: string;
};

export type historyTotalDataSchema = {
	totalAmount: number;
	discountAmount: number;
	netAmount: number;
	totalCashAmount: number;
	totalCardAmount: number;
};

export const searchHistoryFields = (): FieldProps[] => {
	return [
		{
			fieldType: "search",
			name: "invoiceNubmer",
			label: "Invoide Number",
			size: "small",
			hasErrorMessage: true,
			// rules: {
			// 	required: "Please enter your card number",
			// },
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
			getOptionLabel: (option: any) => (option ? `${option.CardNumber}` : ""),
			optionKey: "CardNumber",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "cardNumber",
			label: "Card Number",
			size: "small",
			hasErrorMessage: true,
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
			getOptionLabel: (option: any) => (option ? `${option.FamilyId}` : ""),
			optionKey: "FamilyId",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "studentName",
			label: "Studnet Name",
			size: "small",
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
			getOptionLabel: (option: any) => (option ? `${option.FamilyId}` : ""),
			optionKey: "FamilyId",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "admissionNumber",
			label: "Admission Nubmer",
			size: "small",
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
			getOptionLabel: (option: any) => (option ? `${option.FamilyId}` : ""),
			optionKey: "FamilyId",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "date",
			name: "fromDate",
			label: "From Date",
			size: "small",
			xs: 3,
			md: 3,
		},
		{
			fieldType: "date",
			name: "toDate",
			label: "To Date",
			size: "small",
			xs: 3,
			md: 3,
		},

		{
			fieldType: "select",
			name: "CompanyBussinessUnit",
			label: "Company / Business Unit",
			size: "small",
			options: [],
			xs: 3,
			md: 3,
		},

		{
			fieldType: "select",
			name: "showroom",
			label: "Showroom",
			size: "small",
			options: [],
			xs: 3,
			md: 3,
		},
	];
};

export const historyTotalField = (): FieldProps[] => [
	{
		fieldType: "text",
		name: "totalAmount",
		label: "Total Amount",
		size: "small",
		disabled: true,
		xs: 2.4,
	},
	{
		fieldType: "text",
		name: "discountAmount",
		label: "Discount Amount",
		size: "small",
		disabled: true,
		xs: 2.4,
	},
	{
		fieldType: "text",
		name: "netAmount",
		label: "Net Amount",
		size: "small",
		disabled: true,
		xs: 2.4,
	},
	{
		fieldType: "text",
		name: "totalCashAmount",
		label: "Total Cash Amount",
		size: "small",
		disabled: true,
		xs: 2.4,
	},
	{
		fieldType: "text",
		name: "totalCardAmount",
		label: "Total Card Amount",
		size: "small",
		disabled: true,
		xs: 2.4,
	},
];
