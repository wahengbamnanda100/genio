/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useMutation,
	UseMutationResult,
	useQuery,
	UseQueryOptions,
} from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
// import { AxiosResponse } from "axios";

interface LoginRequestBodiesType {
	Usr_LoginID_V: string;
	Usr_Password_V: string;
}

interface LoginData {
	UserId: string;
	LoginDate: string;
	Mod_ID_N: string;
	EmpId: string | null;
	EmpName: string | null;
	EmpImage: string | null;
	EmpMobile: string | null;
	CompanyId: string | null;
}

interface LoginResponseType {
	Status: string;
	Data: LoginData[];
	Message: string;
}

// export const LoginUser = (
// 	data: LoginRequestBodiesType,
// 	queryOptions?: Partial<UseQueryOptions>
// ) => {
// 	return useQuery({
// 		queryKey: ["login", data],
// 		queryFn: async () =>
// 			axiosInstance
// 				.post(`API/GenioLoginAPI`, data)
// 				.then((res: AxiosResponse<LoginResponseType>) => res.data),
// 		...queryOptions,
// 	});
// };

export const loginUser = async (
	data: LoginRequestBodiesType
): Promise<LoginResponseType> => {
	const response = await axiosInstance.post("API/GenioLoginAPI", data);
	return response.data; // Extract data from AxiosResponse
};

export const useStudentList = (): UseMutationResult<
	LoginResponseType,
	Error,
	LoginRequestBodiesType,
	unknown
> => {
	return useMutation<LoginResponseType, Error, LoginRequestBodiesType, unknown>(
		{
			mutationKey: ["login"],
			mutationFn: loginUser,
			onError: (error: Error) => {
				console.error("Error fetching student list:", error.message);
				// handle error (e.g., show a notification or alert)
			},
		}
	);
};

export interface Fy {
	financialyearid: string;
	Code: string;
	Description: string;
	StartDate: string;
	EndDate: string;
}

export interface FyResponseType {
	Data: Fy[];
	Status: string;
	Message: string;
}

export const GetFinancialYear = (
	param: "",
	queryOptions?: Partial<UseQueryOptions>
) =>
	useQuery({
		queryKey: ["financialYear"],
		queryFn: async () =>
			axiosInstance
				.post("/API/GenioFinancialYearAPI", param)
				.then((res: AxiosResponse<FyResponseType>) => res.data),
		...queryOptions,
	});

// interface FyBussinessUnitRequestBodiesType {
// 	""
// }

interface FyBussinessUnitParamsType {
	financialyearid: string;
	userid: string;
	empid: string | null;
}

export interface FyBussinessUnit {
	Cmp_ID_N: string;
	CmpCode: string;
	CmpName: string;
	CmpAddressV: string;
}

export interface FyBussinessUnitResponseType {
	Data: FyBussinessUnit[];
	Status: string;
	Message: string;
}

export const GetFyCompanyList = (
	param: FyBussinessUnitParamsType,
	data: "",
	queryOptions?: Partial<UseQueryOptions>
) => {
	const queryString = new URLSearchParams(param as any).toString();
	return useQuery({
		queryKey: ["FyCompanyList", param.financialyearid],
		queryFn: async () =>
			axiosInstance
				.post(`/API/GenioCompanyListingAPI?${queryString}`, data)
				.then((res: AxiosResponse<FyBussinessUnitResponseType>) => res.data),
		...queryOptions,
	});
};
