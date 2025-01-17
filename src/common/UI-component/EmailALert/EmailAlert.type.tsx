import { FieldProps } from "../../Form-component";

export interface EmailAlertFeildsType {
  EmailType: string;
  StartAt: string;
  RepeatHours: string;
  Active: boolean;
}

export interface EmailAlertFieldsDetailsType {
  EmailDetail: EmailAlertFeildsType[];
}

export const StartAtField = (): FieldProps => ({
  fieldType: "dateTime",
  name: "StartAt",
  label: "Start At",
});

export const RepeatHoursField = (): FieldProps => ({
  fieldType: "text",
  name: "RepeatHours",
  label: "Repeat Hours",
  size: "medium",
});

export const ActiveField = (): FieldProps => ({
  fieldType: "checkbox",
  name: "Active",
  checkBoxs: [{ name: "Active" }],
  size: "medium",
});
