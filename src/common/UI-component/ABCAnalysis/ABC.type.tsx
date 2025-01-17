import { FieldProps } from "../../Form-component";

export type ABCAnalysisType = {
  AndroidFunc: string;
  CompanyName: string;
  Company: string;
  Shorwoom: string;
  Manufacturer: string;
  Category: string;
  FromDate: string;
  ToDate: string;
};

export type ABCDetailsType = {
  Description: string;
  Qunatity: string;
  Cost: string;
};

export const ABCAnalysisFields = (): FieldProps[] => [
  {
    name: "AndroidFunc",
    label: "Android Function",
    fieldType: "select",
    options: [
      {
        label: "ABC Analysis",
        value: "ABC Analysis",
      },
    ],
    size: "medium",
    xs: 8,
  },
  {
    fieldType: "select",
    name: "CompanyName",
    label: "Company Name",

    options: [
      {
        label: "Company 1",
        value: "Company 1",
      },
    ],
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "Company",
    label: "Company",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "Shorwoom",
    label: "Shorwoom",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "Manufacturer",
    label: "Manufacturer",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "Category",
    label: "Category",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "date",
    name: "FromDate",
    label: "From Date",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "date",
    name: "ToDate",
    label: "To Date",
    size: "medium",
    xs: 2,
  },
];
