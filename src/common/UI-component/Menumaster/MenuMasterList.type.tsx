import {
  MenuMasterListReqType,
  MenuMasterListType,
} from "../../../services/aoi.type";
import { MenuMasterList } from "../../../services/menuMaster";
import { FieldProps } from "../../Form-component";
import { getDietCategory, getMetarialType } from "./MenuForm.types";

export type MenuMasterListSearchType = {
  Partnumber: MenuMasterListType | "";
  SupplierPartNumber: MenuMasterListType | "";
  PurchaseDescription: MenuMasterListType | "";
  Barcode: MenuMasterListType | "";
  CategoryName: MenuMasterListType | "";
  SalesDescription: MenuMasterListType | "";
  Manufacturer: MenuMasterListType | "";
  MaterialType: string;
  SerialNumber: string;
  EffectInventory: string;
  NegativeStock: string;
  Status: string;
  DietCategory: string;
};

export const menuSearchQuery: MenuMasterListReqType = {
  Partnumber: "",
  SupplierPartNumber: "",
  PurchaseDescription: "",
  Barcode: "",
  CategoryName: "",
  SalesDescription: "",
  Manufacturer: "",
  MaterialType: "",
  SerialNumber: "",
  EffectInventory: "",
  NegativeStock: "",
  Status: "-1",
  DietCategory: "",
  FormType: "",
  UnitMasterId: "",
  Page: "1",
  Rows: "10",
  Stm_ID_N: "",
};

export const menuMasterSearchField = (): FieldProps[] => [
  {
    fieldType: "autoComplete",
    name: "Partnumber",
    label: "Part Number",
    size: "medium",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          Partnumber: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Partnumber",
    getOptionLabel: (option) => (option ? `${option.Partnumber}` : ""),
    options: (searchData) => searchData?.Data ?? [],

    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "SupplierPartNumber",
    label: "Supplier Part Number",
    size: "medium",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          SupplierPartNumber: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "SupplierPartNo",
    getOptionLabel: (option) => (option ? `${option.SupplierPartNo}` : ""),
    options: (searchData) => searchData?.Data ?? [],

    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "PurchaseDescription",
    label: "Purchase Description",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          PurchaseDescription: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Purchasedescription",
    getOptionLabel: (option) => (option ? `${option.Purchasedescription}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "Barcode",
    label: "Barcode",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          Barcode: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Barcode",
    getOptionLabel: (option) => (option ? `${option.Barcode}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "CategoryName",
    label: "Category Name",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          CategoryName: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Categoryname",
    getOptionLabel: (option) => (option ? `${option.Categoryname}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "SalesDescription",
    label: "Sales Description",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          SalesDescription: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Salesdescription",
    getOptionLabel: (option) => (option ? `${option.Salesdescription}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: "Manufacturer",
    label: "Manufecturer",
    searchApi: (keyStroke) =>
      MenuMasterList(
        {
          ...menuSearchQuery,
          Manufacturer: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "Manufacturername",
    getOptionLabel: (option) => (option ? `${option.Manufacturername}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "MaterialType",
    label: "Metarial Type",
    options: getMetarialType(true),
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "SerialNumber",
    label: "Serial Number Required",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "EffectInventory",
    label: "Effect Inventory",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "NegativeStock",
    label: "Negative Stock Allowed",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "Status",
    label: "Status",
    options: [
      { value: "-1", label: "All" },
      { value: "1", label: "Active" },
      { value: "0", label: "Inactive" },
    ],

    size: "medium",
    xs: 2,
  },
  {
    fieldType: "select",
    name: "DietCategory",
    label: "Diet Category",
    options: getDietCategory(true),
    size: "medium",
    xs: 2,
  },
];
