/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnitMasterItem } from "../../services/aoi.type";
import { UnitMasterSearch } from "../../services/unitMaster";
import { FieldProps } from "../Form-component";

export type UnitmMasterListSchema = {
  UnitCode: string;
  UnitDesc: string;
  FormalName: string;
  Status: "1" | "0" | "";
};

export const unitMasterSearchFields = (): FieldProps[] => [
  {
    fieldType: "search",
    name: "UnitCode",
    label: "Unit Code",
    size: "medium",
    searchApi: async (keyStroke: string) => {
      const response = await UnitMasterSearch(
        {
          UnitCode: keyStroke,
          UnitDesc: "",
          FormalName: "",
          Status: "",
        },
        {
          enabled: keyStroke && keyStroke !== "" ? true : false,
        },
      );
      return response;
    },
    getOptionLabel: (option: UnitMasterItem) =>
      option ? `${option.UnitCode}` : "",
    optionKey: "UnitCode",
    options: (searchData: any) => searchData ?? [],
    xs: 3,
  },
  {
    fieldType: "text",
    name: "UnitDesc",
    label: "Unit Description",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "FormalName",
    label: "Formal Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "StatusDesc",
    label: "Status",
    size: "medium",
    options: [
      { label: "Active", value: "1" },
      { label: "Inactive", value: "0" },
    ],
    xs: 3,
  },
];
