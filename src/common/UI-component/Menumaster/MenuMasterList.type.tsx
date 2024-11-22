import { MenuMasterListReqType } from "../../../services/aoi.type";
import { MenuMasterList } from "../../../services/menuMaster";
import { FieldProps } from "../../Form-component";

export type MenuMasterListSearchType = {
  Partnumber: string;
  SupplierPartNumber: string;
  PurchaseDescription: string;
  Barcode: string;
  CategoryName: string;
  SalesDescription: string;
  Manufacturer: string;
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
  Status: "0",
  DietCategory: "",
  FormType: "",
  UnitMasterId: "",
  Page: "1",
  Rows: "10",
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
    optionKey: "SupplierPartNumber",
    getOptionLabel: (option) => (option ? `${option.SupplierPartNumber}` : ""),
    options: (searchData) => searchData?.Data ?? [],

    xs: 2,
  },
  {
    fieldType: "text",
    name: "PurchaseDescription",
    label: "Purchase Description",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "Barcode",
    label: "Barcode",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "CategoryName",
    label: "Category Name",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "SalesDescription",
    label: "Sales Description",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "Manufacturer",
    label: "Manufecturer",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "MaterialType",
    label: "Metarial Type",
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
    fieldType: "text",
    name: "DietCategory",
    label: "Diet Category",
    size: "medium",
    xs: 2,
  },
];
