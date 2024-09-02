/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";
import {
	UseMutationResult,
	UseQueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import {
	// BussinessUnitItem,
	BussinessUnitRequestBodiesType,
	BussinessUnitResponse,
	CardDetailRequestBodiesType,
	CardDetailsParamType,
	CategoryListingTypeRequestBodiesType,
	CategoryListingTypeResponseType,
	// CategoryListingTypeResponseType,
	EmployeeItem,
	EmployeeRequestBodiesType,
	EmployeeResponseType,
	ExchangeRequestBodies,
	ItemListingRequestBodiesType,
	ItemListingResponseType,
	MenuItemResponseType,
	MenuListRequstBodiesType,
	PosSaveRequsetBodiesType,
	PosSaveResponseType,
	PreviousSaleListItemType,
	PreviousSaleRequestBodiesType,
	PreviousSaleResponseType,
	// ShowroomItemType,
	ShowroomRequestBodiesType,
	ShowroomResponseType,
	Student,
	StudentListRequest,
	StudentListResponse,
} from "./aoi.type";
import { AxiosResponse } from "axios";

export const getStudentList = async (
	requestBody: StudentListRequest
): Promise<StudentListResponse> => {
	const response = await axiosInstance.post<StudentListResponse>(
		"/API/GenioStudentListingAPI",
		requestBody
	);

	// console.log("🌍🌍 student list", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch student list"); //todo add later sanckbar
	}
};

export const getMenuList = async (
	requestBody: MenuListRequstBodiesType
): Promise<MenuItemResponseType> => {
	const response = await axiosInstance.post(
		"API/GenioClubListingAPI",
		requestBody
	);

	// console.log("🔥🔥🔥 menu list", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch menu list"); //todo add later sanckbar
	}
};

//!_____________POS SAVE____________

export const mutatePosMenu = (
	requestBody: PosSaveRequsetBodiesType
): Promise<AxiosResponse<PosSaveResponseType>> => {
	return axiosInstance.post("API/GenioReactPOSSaveAPI", requestBody);
};

export const getPreviousSale = async (
	requestBody: PreviousSaleRequestBodiesType
): Promise<PreviousSaleResponseType> => {
	const response = await axiosInstance.post(
		"/API/GenioPreviousSalesListingAPI",
		requestBody
	);

	// console.log("🚀🚀🚀🚀 previous sale", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch previous sale"); //todo add later sanckbar
	}
};

export const getBussinessList = async (
	requestBody: BussinessUnitRequestBodiesType
): Promise<BussinessUnitResponse> => {
	const response = await axiosInstance.post(
		"API/GenioBussinessUnitListing",
		requestBody
	);

	console.log("🎯🎯🎯🎯 bussiness listing", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch bussiness listing"); //todo add later sanckbar
	}
};

export const getShowroomList = async (
	requestBody: ShowroomRequestBodiesType
): Promise<ShowroomResponseType> => {
	const response = await axiosInstance.post(
		"API/GenioShowroomListingAPI",
		requestBody
	);

	console.log("♨️♨️♨️ showroom listing", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch bussiness listing"); //todo add later sanckbar
	}
};

export const getEmployeeList = async (
	requestBody: EmployeeRequestBodiesType
): Promise<EmployeeResponseType> => {
	const response = await axiosInstance.post(
		"API/GenioEmployeeListingAPI",
		requestBody
	);

	// console.log("♨️♨️♨️ showroom listing", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch bussiness listing"); //todo add later sanckbar
	}
};

export const useStudentList = (): UseMutationResult<
	StudentListResponse,
	Error,
	StudentListRequest,
	unknown
> => {
	return useMutation<StudentListResponse, Error, StudentListRequest, unknown>({
		mutationKey: ["studentList"],
		mutationFn: getStudentList,
		onError: (error: Error) => {
			console.error("Error fetching student list:", error.message);
			// handle error (e.g., show a notification or alert)
		},
	});
};

export const searchStudentList = async (
	params: StudentListRequest,
	isEnable: boolean
): Promise<{ data: Student[]; isLoading: boolean }> => {
	let data: Student[] = [];
	let isLoading: boolean = false;

	const fetchData = async () => {
		try {
			isLoading = true;

			const response = await getStudentList(params);

			if (response.Status === "1") {
				data = response.Data ?? [];
			} else {
				// console.log("else 🚀", isLoading);
				data = [];
			}
		} catch (error) {
			// console.error("Failed to fetch student list 🚨⚡:", error);
			data = [];
		} finally {
			// console.log("finally 🚀", isLoading);
			isLoading = false;
		}
	};

	if (isEnable) {
		await fetchData();
	}

	// console.log("🏓🚀", isEnable ? "IF" : "ELSE", data, isLoading);

	return { data, isLoading };
};

export const searchEmployeeList = async (
	params: EmployeeRequestBodiesType,
	isEnable: boolean
): Promise<{ data: EmployeeItem[]; isLoading: boolean }> => {
	let data: EmployeeItem[] = [];
	let isLoading: boolean = false;

	const fetchData = async () => {
		try {
			isLoading = true;

			const response = await getEmployeeList(params);

			if (response.Status === "1") {
				data = response.Data ?? [];
			} else {
				// console.log("else 🚀", isLoading);
				data = [];
			}
		} catch (error) {
			console.error("Failed to fetch student list 🚨⚡:", error);
			data = [];
		} finally {
			// console.log("finally 🚀", isLoading);
			isLoading = false;
		}
	};

	if (isEnable) {
		await fetchData();
	}

	// console.log("🏓🏅🚀", isEnable ? "IF" : "ELSE", data, isLoading);

	return { data, isLoading };
};

export const searchPreviousList = async (
	params: PreviousSaleRequestBodiesType,
	isEnable: boolean
): Promise<{ data: PreviousSaleListItemType[]; isLoading: boolean }> => {
	let data: PreviousSaleListItemType[] = [];
	let isLoading: boolean = false;

	const fetchData = async () => {
		try {
			isLoading = true;

			const response = await getPreviousSale(params);

			if (response.Status === "1") {
				data = response.Data ?? [];
			} else {
				// console.log("else 🚀", isLoading);
				data = [];
			}
		} catch (error) {
			// console.error("Failed to fetch student list 🚨⚡:", error);
			data = [];
		} finally {
			// console.log("finally 🚀", isLoading);
			isLoading = false;
		}
	};

	if (isEnable) {
		await fetchData();
	}

	// console.log("🏓🏅🚀", isEnable ? "IF" : "ELSE", data, isLoading);

	return { data, isLoading };
};

//!_______REACT USE QUERY___________

export const CompoanyUnitList = (param: BussinessUnitRequestBodiesType) =>
	useQuery({
		queryKey: ["companyList", param],
		queryFn: async () =>
			axiosInstance
				.post("API/GenioBussinessUnitListing", param)
				.then((res: AxiosResponse) => res.data),
	});

export const ShowroomList = (param: ShowroomRequestBodiesType) =>
	useQuery({
		queryKey: ["showroomList", param],
		queryFn: async () =>
			axiosInstance
				.post("API/GenioShowroomListingAPI", param)
				.then((res: AxiosResponse) => res.data),
	});

export const MenuList = (param: MenuListRequstBodiesType) =>
	useQuery({
		queryKey: ["menuList", param],
		queryFn: async () =>
			axiosInstance
				.post("API/GenioClubListingAPI", param)
				.then((res: AxiosResponse) => res.data),
	});

export const EmplyeeList = (param: EmployeeRequestBodiesType) =>
	useQuery({
		queryKey: ["employeeList", param],
		queryFn: async () =>
			axiosInstance
				.post("API/GenioShowroomListingAPI", param)
				.then((res: AxiosResponse) => res.data),
	});

export const PreviousList = (
	param: PreviousSaleRequestBodiesType,
	enabled: boolean
) =>
	useQuery({
		queryKey: ["previousList", param],
		queryFn: async () =>
			axiosInstance
				.post("/API/GenioPreviousSalesListingAPI", param)
				.then((res: AxiosResponse) => res.data),
		enabled,
	});

export const CurrencyList = () =>
	useQuery({
		queryKey: ["currency-list"],
		queryFn: async () =>
			axiosInstance
				.get("/API/GenioCurrencyListingAPI")
				.then((res: AxiosResponse) => res.data),
		refetchOnMount: true,
		// ...queryOptions,
	});

export const ExchangeRate = (
	param: ExchangeRequestBodies,
	queryOptions?: Partial<UseQueryOptions>
) =>
	useQuery({
		queryKey: ["exchange-rate", param],
		queryFn: async () =>
			axiosInstance
				.post("/API/GenioExchangeRateAPI", param)
				.then((res: AxiosResponse) => res.data),
		...queryOptions,
	});

export const CardTypeList = (
	param: CardDetailsParamType,
	data: CardDetailRequestBodiesType,
	queryOptions?: Partial<UseQueryOptions>
) => {
	// Convert param object to query string
	const queryString = new URLSearchParams(param as any).toString();

	return useQuery({
		queryKey: ["pos-save", param, data],
		queryFn: async () =>
			axiosInstance
				.post(
					`/api/CommonControllerMobApi/FillTableCombobox?${queryString}`,
					data
				)
				.then((res: AxiosResponse) => res.data),
		...queryOptions,
	});
};

export const GetCetagoryListing = (
	data: CategoryListingTypeRequestBodiesType,
	queryOptions?: Partial<UseQueryOptions>
) => {
	return useQuery({
		queryKey: ["category-list", data],
		queryFn: async () =>
			axiosInstance
				.post("/API/GenioCategoryListingAPI", data)
				.then(
					(res: AxiosResponse<CategoryListingTypeResponseType>) => res.data
				),
		...queryOptions,
	});
};

export const GetItemListing = (
	data: ItemListingRequestBodiesType,
	queryOptions?: Partial<UseQueryOptions>
) => {
	return useQuery({
		queryKey: ["item-list", data],
		queryFn: async () =>
			axiosInstance
				.post("/API/GenioCategoryItemListingAPI", data)
				.then((res: AxiosResponse<ItemListingResponseType>) => res.data),
		...queryOptions,
	});
};
