import { CompanyList, ShowroomListType } from "@/components/user/user.type";

export const SHOWROOM_MOCK_DATA: ShowroomListType[] = [
  {
    id: 1,
    name: "JAZZ CAFE - MSHS HOTFOOD 1",
    selected: true,
    isDefault: false,
  },
  {
    id: 2,
    name: "JAZZ CAFE - MSHS SANDWICH BAR",
    selected: true,
    isDefault: false,
  },
  {
    id: 3,
    name: "JAZZ CAFE - MSHS JUICE BAR",
    selected: true,
    isDefault: false,
  },
  {
    id: 4,
    name: "JAZZ CAFE - ES HOTFOOD 1",
    selected: false,
    isDefault: false,
  },
  {
    id: 5,
    name: "JAZZ CAFE -CAFETERIA",
    selected: false,
    isDefault: false,
  },
];

export const CompanyDetail: CompanyList[] = [
  {
    cmpCode: "123",
    companyName: "ABC Company",
    address: "This is address",
    default: false,
    type: "type",
    showroomAllocatin: [],
  },
  {
    cmpCode: "1234",
    companyName: "ABC Company1",
    address: "This is address1",
    default: false,
    type: "type",
    showroomAllocatin: [],
  },
];
