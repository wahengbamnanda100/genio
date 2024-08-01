/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	CompoanyUnitList,
	searchPreviousList,
	ShowroomList,
} from "../../services";
import {
	BussinessUnitItem,
	BussinessUnitRequestBodiesType,
	ShowroomItemType,
	ShowroomRequestBodiesType,
} from "../../services/aoi.type";
import { getDropDownValues } from "../../utils/utils";
import { FieldProps } from "../Form-component";

export type searchHistorySchema = {
	invoiceNubmer: unknown;
	cardNumber: unknown;
	studentName: unknown;
	admissionNumber: unknown;
	fromDate: Date | null;
	toDate: Date | null;
	CompanyBussinessUnit: unknown;
	showroom: unknown;
};

export type historyTotalDataSchema = {
	totalAmount: number;
	discountAmount: number;
	netAmount: number;
	totalCashAmount: number;
	totalCardAmount: number;
};

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

export const searchHistoryFields = (
	fromDate: string,
	toDate: string
): FieldProps[] => {
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
				const response = await searchPreviousList(
					{
						InvoiceNumber: keyStroke,
						CardNumber: "",
						StudentName: "",
						ShowroomId: "",
						BussinessUnitId: "",
						AdmissionNUmber: "",
						FromDate: fromDate,
						ToDate: toDate,
						Cmp_ID_N: "",
					},
					keyStroke && keyStroke !== "" ? true : false
				);

				return response;
			},
			getOptionLabel: (option: any) =>
				option ? `${option.InvoiceNumber}` : "",
			optionKey: "InvoiceNumber",
			options: (searchData: any) => {
				return searchData ?? [];
			},
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "cardNumber",
			label: "Card Number",
			size: "small",
			hasErrorMessage: true,
			searchApi: async (keyStroke: string) => {
				const response = await searchPreviousList(
					{
						InvoiceNumber: "",
						CardNumber: keyStroke,
						StudentName: "",
						ShowroomId: "",
						BussinessUnitId: "",
						AdmissionNUmber: "",
						FromDate: fromDate,
						ToDate: toDate,
						Cmp_ID_N: "",
					},
					keyStroke && keyStroke !== "" ? true : false
				);

				return response;
			},
			getOptionLabel: (option: any) =>
				option ? `${option.AdmissionNumber}` : "",
			optionKey: "AdmissionNumber",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "studentName",
			label: "Studnet Name",
			size: "small",
			searchApi: async (keyStroke: string) => {
				const response = await searchPreviousList(
					{
						InvoiceNumber: "",
						CardNumber: "",
						StudentName: keyStroke,
						ShowroomId: "",
						BussinessUnitId: "",
						AdmissionNUmber: "",
						FromDate: fromDate,
						ToDate: toDate,
						Cmp_ID_N: "",
					},
					keyStroke && keyStroke !== "" ? true : false
				);

				return response;
			},
			getOptionLabel: (option: any) => (option ? `${option.StudentName}` : ""),
			optionKey: "StudentName",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "search",
			name: "admissionNumber",
			label: "Admission Nubmer",
			size: "small",
			searchApi: async (keyStroke: string) => {
				const response = await searchPreviousList(
					{
						InvoiceNumber: "",
						CardNumber: "",
						StudentName: "",
						ShowroomId: "",
						BussinessUnitId: "",
						AdmissionNUmber: keyStroke,
						FromDate: fromDate,
						ToDate: toDate,
						Cmp_ID_N: "",
					},
					keyStroke && keyStroke !== "" ? true : false
				);

				return response;
			},
			getOptionLabel: (option: any) =>
				option ? `${option.AdmissionNumber}` : "",
			optionKey: "AdmissionNumber",
			options: (searchData: any) => searchData ?? [],
			xs: 3,
			md: 3,
		},
		{
			fieldType: "date",
			name: "fromDate",
			label: "From Date",
			size: "small",
			// allowPastDates: true,
			xs: 3,
			md: 3,
		},
		{
			fieldType: "date",
			name: "toDate",
			label: "To Date",
			size: "small",
			// allowPastDates: true,
			xs: 3,
			md: 3,
		},

		{
			fieldType: "select",
			name: "CompanyBussinessUnit",
			label: "Company / Business Unit",
			size: "small",
			options: getValuesCompanyUnit(),
			xs: 3,
			md: 3,
		},

		{
			fieldType: "select",
			name: "showroom",
			label: "Showroom",
			size: "small",
			options: getValuesShowroomList(),
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
