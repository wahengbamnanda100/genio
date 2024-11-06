//!________STUDENT LIST API____________

export interface StudentListRequest {
  FamilyId: string;
  CardNumber: string;
  Admissionno: string;
  StudentName: string;
  ShowroomId: string;
  Cmp_ID_N: string;
}

export interface Student {
  CardID: string;
  StudentName: string;
  CardNumber: string;
  AdmissionNumber: string;
  AllergicCategory: string;
  FamilyId: string;
  Grade: string;
  AvailableBalance: string;
  ImageUrl: string;
  DailyLimit: string;
  StudentImage: string;
  CitizenshipID: string;
  Class?: string;
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

export interface PaymentDtlType {
  Gem_ID_N: string | null; //Card Type
  Pyd_CardNo_V: string; // card number
  Pyd_CardAmount_N: string; //cardamount
  Pyd_ChequeAmount_N: string; //paidamount
  Pyd_CashAmount_N: string; //cashamount
  Pyd_AmountPaid_N: string; //totalpaid
  Pyd_Balance_N: string; //Balance
}

export interface PosSaveRequsetBodiesType {
  Cmp_ID_N: string;
  ShowroomId: string;
  CardID: string;
  InvoiceDate: string;
  CurrencyId: string;
  GrossAmount: string;
  DiscountPercentage: string;
  DiscountAmount: string;
  NetAmount: string;
  Usr_ID_N: string;
  Sih_ID_N: string;
  Emp_ID_N: string;
  Items: ItemsType[];
  CitizenshipID: string;
  Paymentdtl?: PaymentDtlType[];
}

export interface PosSaveResponseType {
  Status: string;
  status?: string;
  info?: string;
  Message: string;
  Data: null | unknown;
  // Sih_ID_N: string;
  Refernumber: string;
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
  CardNumber: string;
  AdmissionNumber: string;
  StudentName: string;
  DiscountAmount: string;
  GenioCardAmount: string;
  TotalAmount: string;
  NetAmount: string;
  CashAmount: string;
  CardAmount: string;
  CardSwipe: "NO" | "YES" | string;
}
export interface DetailItem {
  Description: string;
  Quantity: string;
  Amount: string;
  UnitPrice: string;
  Discount: string;
  NetAmount: string;
}
export interface PreviousDetailType {
  CardNumber: string;
  FamilyID: string;
  IDNumber: string;
  DailyLimit: string;
  Name: string;
  Grade: string;
  SalesPersonCode: string;
  SalesPersonName: string;
  Company_bussinessunit: string;
  Showroom: string;
  InvoiceNumber: string;
  Sih_InvoiceDate_D: string;
  Total: string;
  NetAmount: string;
  CashAmount: string;
  TotalPaid: string;
  Balance: string;
  AvailableBalance: string;
  PaidAmount: string;
  DiscountAmount: string;
  DiscountPercentage: string;
  Sih_ID_N: string;
  Items: DetailItem[];
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

//!____________EXCHANGE CURRENCY CARD______________

export interface ExchangeRequestBodies {
  CurrencyId: string;
  Date: string;
}

export interface CurrencyType {
  CurrencyId: string;
  CurrencyDesc: string;
  CurrencyCode: string;
  CurrencySymbol: string;
}

export interface ExchangeType {
  ExchangeRate: string;
  CurrencyCode: string;
  Decimal: string;
}

export interface ExchangeResponseType {
  Status: string;
  Data: ExchangeType[] | [];
  Message: string;
}

export interface CurrencyResponseType {
  Status: string;
  Data: CurrencyType[] | [];
  Message: string;
}

export interface CardDetailsParamType {
  FillData: 1;
}

export interface CardDetailRequestBodiesType {
  Table: "Gen_General_Mst";
  DisplayMember: "Gem_Desc_V";
  ValueMember: "Gem_ID_N";
  FilterString: "Gem_TypeID_N=74";
}

export interface CardDetailType {
  strDisplayMember: string;
  strValueMember: string;
  Gem_Default_N: string;
}

export interface CardDetailsResponseType {
  Status: string;
  Data: CardDetailType[] | [];
  Message: string;
}

export interface CategoryListingTypeRequestBodiesType {
  BusinessUnitId: string | "1";
  // ShowroomId: string | "11";
  ShowroomId: string | "147";
}

export interface CategoryListingItem {
  CategoryId: string;
  CategoryDescription: string;
}

export interface CategoryListingTypeResponseType {
  status: string;
  Data: CategoryListingItem[] | [];
  Message: string;
}

export interface ItemListingRequestBodiesType {
  BusinessUnitId: string | "1";
  // ShowroomId: string | "11";
  ShowroomId: string | "147";
  CategoryId: string;
}

export interface ItemListingResponseType {
  status: string;
  Data: ItemDetailsType[] | [];
  Message: string;
}

export interface PreviousDetailResponseType {
  Status: string;
  Data: PreviousDetailType[] | [];
  Message: string;
}

//!_________________POS DELETE_____________

export interface PrevDeleteRequestBodiesType {
  UserID: string;
  Sih_Id_N: string;
}

export interface PrevDeleteResponseType {
  Status: string;
  Data: null;
  Message: string;
}

//! ____________DEMO____________

export type UnitMasterRequestBodyType = {
  UnitCode: string;
  UnitDesc: string;
  FormalName: string;
  Status: string;
  UserId: string;
};

export type UnitMasterResponseBodyType = {
  Status: string;
  UnitId: string;
  Message: string;
};
