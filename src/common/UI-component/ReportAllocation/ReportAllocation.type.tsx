import { FieldProps } from "../../Form-component";

export type ReportAllocationType = {
  EmpCode: string;
  EmpName: string;
  Desg: string;
  AllocatedDate: string;
  ReportType: string;
  Module: string;
};

export const ReportAllocationFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "name",
    label: "Emmployee Code",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "EmpName",
    label: "Employee Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "Desg",
    label: "Designation",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "AllocatedDate",
    label: "Allocated Date",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "ReportType",
    label: "Report Type",
    size: "medium",
    xs: 3,
  },
];
