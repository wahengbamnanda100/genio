import { FieldProps } from "../../Form-component";

export type ReferNumberSettingsType = {
  Module: string;
  CmpName: string;
  Showroom: string;
  FinacialYear: string;
  Month: string;
};

export type ReferNumberDetails = {
  Desc: string;
  Module: string;
  Prefix: string;
  Seperator: string;
  YearTag: string;
  MonthTag: string;
  NoCharacters: string;
  LastReferNo: string;
  SampleFormat: string;
};

export const ReferNumberFields = (): FieldProps[] => [
  {
    name: "Module",
    label: "Module",
    fieldType: "text",
    size: "medium",
    xs: 4,
  },
  {
    name: "CmpName",
    label: "Company Name",
    fieldType: "text",
    size: "medium",
    xs: 4,
  },
  {
    name: "Showroom",
    label: "Showroom",
    fieldType: "text",
    size: "medium",
    xs: 4,
  },
  {
    name: "FinacialYear",
    label: "Financial Year",
    fieldType: "text",
    size: "medium",
    xs: 3,
  },
  {
    name: "Month",
    label: "Month",
    fieldType: "text",
    size: "medium",
    xs: 3,
  },
];
