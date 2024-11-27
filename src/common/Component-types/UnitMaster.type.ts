/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UnitMasterItem,
  UnitMasterSearchReqType,
} from "../../services/aoi.type";
import { UnitMasterSearch } from "../../services/unitMaster";
import { FieldProps } from "../Form-component";

export type UnitmMasterListSchema = {
  UnitCode: string;
  UnitDesc: string;
  FormalName: string;
  Status: "-1" | "1" | "0" | "";
};

export const unitMasterParama: UnitMasterSearchReqType = {
  UnitCode: "",
  UnitDesc: "",
  FormalName: "",
  Status: "",
};

export const unitMasterSearchFields = (): FieldProps[] => [
  {
    fieldType: "autoComplete",
    name: "UnitCode",
    label: "Unit Code",
    size: "medium",
    searchApi: (keystroke) =>
      UnitMasterSearch(
        {
          ...unitMasterParama,
          UnitCode: keystroke,
        },
        {
          enabled: keystroke !== "" ? true : false,
        },
      ),
    getOptionLabel: (option: UnitMasterItem) =>
      option ? `${option.UnitCode}` : "",
    optionKey: "UnitCode",
    options: (searchData: any) => searchData?.Data ?? [],
    xs: 3,
  },
  {
    fieldType: "autoComplete",
    name: "UnitDesc",
    label: "Unit Description",
    searchApi: (keystroke) =>
      UnitMasterSearch(
        {
          ...unitMasterParama,
          UnitDesc: keystroke,
        },
        {
          enabled: keystroke !== "" ? true : false,
        },
      ),
    getOptionLabel: (option: UnitMasterItem) =>
      option ? `${option.UnitDesc}` : "",
    optionKey: "UnitDesc",
    options: (searchData: any) => searchData?.Data ?? [],
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "autoComplete",
    name: "FormalName",
    label: "Formal Name",
    searchApi: (keystroke) =>
      UnitMasterSearch(
        {
          ...unitMasterParama,
          FormalName: keystroke,
        },
        {
          enabled: keystroke !== "" ? true : false,
        },
      ),
    getOptionLabel: (option: UnitMasterItem) =>
      option ? `${option.FormalName}` : "",
    optionKey: "FormalName",
    options: (searchData: any) => searchData?.Data ?? [],
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "Status",
    label: "Status",
    size: "medium",
    options: [
      { label: "All", value: "-1" },
      { label: "Active", value: "1" },
      { label: "Inactive", value: "0" },
    ],
    xs: 3,
  },
];
