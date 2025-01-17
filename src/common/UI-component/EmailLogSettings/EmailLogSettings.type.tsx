import { FieldProps } from "../../Form-component";

export type EmailLogSettingsType = {
  LogFromDate: string;
  LogToDate: string;
  EmailType: string;
  EmpCode: string;
  EmpName: string;
  EmailId: string;
};

export type EmailDetailsType = {
  Date: string;
  EmailType: string;
  EmpCode: string;
  EmpName: string;
  EmailId: string;
  EmailSubject: string;
  EmailBody: string;
};

export const EmailLogSettingsFields = (): FieldProps[] => [
  {
    name: "LogFromDate",
    label: "From Date",
    fieldType: "date",
    size: "medium",
    xs: 3,
  },
  {
    name: "LogToDate",
    label: "To Date",
    fieldType: "date",
    size: "medium",
    xs: 3,
  },
  {
    name: "EmailType",
    label: "Email Type",
    fieldType: "select",
    size: "medium",
    xs: 6,
    options: [],
  },
  {
    name: "EmpCode",
    label: "Employee Code",
    fieldType: "text",
    size: "medium",
    xs: 3,
  },
  {
    name: "EmpName",
    label: "Employee Name",
    fieldType: "text",
    size: "medium",
    xs: 4,
  },
  {
    name: "EmailId",
    label: "Email Id",
    fieldType: "text",
    size: "medium",
    xs: 5,
  },
];
