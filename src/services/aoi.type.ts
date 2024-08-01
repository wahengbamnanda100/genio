//!________STUDENT LIST API____________

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

export interface StudentListResponse {
	Status: string;
	Data: Student[];
	Message: string;
}

//!________MENU LIST API____________

export interface MenuListRequstBodiesType {
	BusinessUnitId: string;
	ShowroomId: string;
	CategoryId: string;
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

export interface MenuItemResponseType {
	status: string;
	Data: MenuItemDataType[]; //todo chagne later from server side
	Message: string;
}

//!____________MUTATE POS MENU____________

export interface ItemsType {
	Stm_ID_N: string;
	Sid_InvoiceQty_N: string;
	Sid_UnitPrice_N: string;
	Sid_Amount_N: string;
	Sid_DiscountAmount_N: string;
	Sid_SalesPrice_N: string;
}

export interface PosSaveRequsetBodiesType {
	Cmp_ID_N: string;
	ShowroomId: string;
	StudentId: string;
	InvoiceDate: string;
	CurrencyId: string;
	GrossAmount: string;
	DiscountAmount: string;
	NetAmount: string;
	Usr_ID_N: string;
	Sih_ID_N: string;
	Items: ItemsType[];
}

export interface PosSaveResponseType {
	Status: string;
	Message: string;
	Data: null | unknown;
	Sih_ID_N: string;
}

//!_________PREVIOUS SALE____________

export interface PreviousSaleRequestBodiesType {
	InvoiceNumber: string;
	CardNumber: string;
	StudentName: string;
	ShowroomId: string;
	BussinessUnitId: string;
	AdmissionNUmber: string;
	FromDate: string;
	ToDate: string;
	Cmp_ID_N: string;
}

export interface PreviousSaleListItemType {
	OrderId: string;
	InvoiceNumber: string;
	InvoiceDate: string;
	AdmissionNumber: string;
	StudentName: string;
	DiscountAmount: string;
	TotalAmount: string;
	NetAmount: string;
	CashAmount: string;
	CardAmount: string;
	CardSwipe: "NO" | "YES" | string;
}

export interface PreviousSaleResponseType {
	Status: string;
	Data: PreviousSaleListItemType[] | [];
	Message: string;
}

//!_______________BUSSINESS LISTING_______________

export interface BussinessUnitRequestBodiesType {
	Cmp_ID_N: string;
	Usr_ID_N: string;
}

export interface BussinessUnitItem {
	BusinessUnitId: string;
	BusinessUnitDesc: string;
	BusinessUnitCode: string;
}

export interface BussinessUnitResponse {
	Status: string;
	Data: BussinessUnitItem[] | [];
	Message: string;
}

//!___________SHOWROOM LISTING___________

export interface ShowroomRequestBodiesType {
	BusinessUnitId: string;
	Usr_ID_N: string;
}

export interface ShowroomItemType {
	ShowroomId: string;
	ShowroomDesc: string;
	ShowroomCode: string;
}

export interface ShowroomResponseType {
	Status: string;
	Data: ShowroomItemType[] | [];
	Message: string;
}

//!____________EMPLOYEE LISTING____________

export interface EmployeeRequestBodiesType {
	SearchText: string;
	Cmp_ID_N: string;
}

export interface EmployeeItem {
	Emp_ID_N: string;
	EmployeeName: string;
	EmployeeCode: string;
}

export interface EmployeeResponseType {
	Status: string;
	Data: EmployeeItem[] | [];
	Message: string;
}
