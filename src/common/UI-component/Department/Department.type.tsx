import { FieldProps } from "../../Form-component";

export interface DepartmentFormType {
  UnitCode: string;
  UnitDesc: string;
  FormalName: string;
  Status: boolean;
}

export const departmentForm = (disable: boolean): FieldProps[] => [
  {
    fieldType: "text",
    name: "UnitCode",
    label: "Unit Code",
    hasErrorMessage: true,
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "UnitDesc",
    label: "Unit Description",
    hasErrorMessage: true,
    size: "medium",
    xs: 12,
  },

  {
    fieldType: "text",
    name: "FormalName",
    label: "Formula Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "checkbox",
    name: "Status",
    size: "medium",
    disabled: disable,
    row: true,
    labelPlacement: "end",
    checkBoxs: [
      {
        name: "Status",
        label: "Status",
      },
    ],
    xs: 12,
  },
];

export interface SearchListDepartmentType {
  departmentName: string;
  status: boolean;
}

export const departmentListSearchFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "departmentName",
    label: "Department Name",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "select",
    name: "status",
    label: "Status",
    size: "medium",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    xs: 6,
  },
];
