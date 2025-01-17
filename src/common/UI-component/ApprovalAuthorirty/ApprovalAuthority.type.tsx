import { FieldProps } from "../../Form-component";

export type ApprovalAuthorityDetailType = {
  index: number;
  EmpCode: string;
  EmpName: string;
  EmailAlert: boolean;
};

export const ApprovalAuthorityEmpCodeField = (): FieldProps => ({
  fieldType: "text",
  name: "EmpCode",
  label: "Employee Code",
  size: "medium",
  xs: 12,
});

export const ApprovalAuthorityEmpNameField = (): FieldProps => ({
  fieldType: "text",
  name: "EmpName",
  label: "Employee Name",
  size: "medium",
  xs: 12,
});

export const ApprovalAuthorityEmailAlertField = (): FieldProps => ({
  fieldType: "checkbox",
  name: "EmailAlert",
  checkBoxs: [{ name: "EmailAlert" }],
  size: "medium",
  xs: 12,
});

export interface ApprovalAuthorityFieldType {
  Module: string;
  ApprovalType: string;
  EnableReporting: boolean;
  NoReportingLevel: string;
}

export const ApprovalAuthorityFeilds = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Module",
    label: "Module",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "ApprovalType",
    label: "Approval Type",
    size: "medium",
    xs: 4,
  },
];

export const ApprovalAuthorityFeilds1 = (): FieldProps[] => [
  {
    fieldType: "checkbox",
    name: "EnableReporting",
    labelPlacement: "end",
    checkBoxs: [{ name: "EnableReporting", label: "Enable Reporting To" }],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "NoReportingLevel",
    label: "No of Reporting Level",
    size: "medium",
    xs: 3,
  },
];
