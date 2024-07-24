import axiosInstance from "../utils/axiosInstance";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export interface StudentListRequest {
	FamilyId: string;
	CardNumber: string;
	StudentName: string;
	ShowroomId: string;
	Cmp_ID_N: string;
}

export interface Student {
	StudentId: string;
	StudentName: string;
	CardNumber: string;
	AdmissionNumber: string;
	FamilyId: string;
	Grade: string;
	AvailableBalance: string;
	ImageUrl: string;
	DailyLimit: string;
}

export interface CategoryDetailsType {
	CategoryId: string;
	CategoryCode: string | null;
	CategoryDescription: string;
}

export interface ItemDetailsType {
	PartId: string;
	PartNumber: string;
	PartDescription: string;
	Price: string;
}

export interface MenuItemDataType {
	CategoryDetails: CategoryDetailsType[];
	ItemDetails: ItemDetailsType[];
}

export interface MenuItemResponse {
	status: string;
	data: MenuItemDataType;
	message: string;
}

export interface StudentListResponse {
	Status: string;
	Data: Student[];
	Message: string;
}

export const getStudentList = async (
	requestBody: StudentListRequest
): Promise<StudentListResponse> => {
	const response = await axiosInstance.post(
		"/API/GenioStudentListingAPI",
		requestBody
	);

	console.log("🌍🌍", response);

	if (response.statusText === "OK") {
		return response.data;
	} else {
		throw new Error("Failed to fetch student list"); //todo add later sanckbar
	}
};

export const StudentList = (): UseMutationResult<
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
		onSuccess: (data: StudentListResponse, variables: StudentListRequest) => {
			console.log("Successfully fetched student list:", data);
			console.log("Variables used:", variables);
			// handle success (e.g., update local state or show a success message)
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
				console.log("else 🚀", isLoading);
				data = [];
			}
		} catch (error) {
			console.error("Failed to fetch student list 🚨⚡:", error);
			data = [];
		} finally {
			console.log("finally 🚀", isLoading);
			isLoading = false;
		}
	};

	if (isEnable) {
		await fetchData();
	}

	console.log("🏓🚀", isEnable ? "IF" : "ELSE", data, isLoading);

	return { data, isLoading };
};
