/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  AddOnDetailsRequestBodyType,
  CountryReqType,
  DietCategoryReqBodyType,
  ManufacturerRequestBodyType,
  MetarialTypeRequestBodyType,
  StockUnitRequsetType,
} from "../../../services/aoi.type";
import {
  AddOnDetailsApi,
  DietCategoryItemApi,
  ManufacturerDataApi,
  MenuMasterCountryList,
  MenuMasterStockUnitList,
  MetarialTypeApi,
} from "../../../services/menuMaster";
import { getDropDownValues } from "../../../utils/utils";
import { FieldProps } from "../../Form-component";
import { NumericFormatCustom } from "../../Form-component/inputField";

const getDietCategory = () => {
  const requestBody: DietCategoryReqBodyType = {
    DisplayMember: "Gem_Desc_V",
    Table: "Gen_General_Mst",
    FilterString: "Gem_TypeID_N=223",
    ValueMember: "Gem_ID_N",
  };
  const { data, isFetched } = DietCategoryItemApi(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "strDisplayMember", "strValueMember")
      : [];

  return dropdownValues;
};

const getMetarialType = () => {
  const requestBody: MetarialTypeRequestBodyType = {
    Table: "Adm_AppsType_Mst",
    DisplayMember: "Atm_Description_V",
    ValueMember: "Atm_ID_N",
    FilterString: "Atm_TypeID_N = 2 AND Atm_ID_N=4",
  };
  const { data, isFetched } = MetarialTypeApi(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "strDisplayMember", "strValueMember")
      : [];

  return dropdownValues;
};

const getAddOnDetails = () => {
  const requestBody: AddOnDetailsRequestBodyType = {
    Table: "Gen_General_Mst",
    DisplayMember: "Gem_Desc_V",
    ValueMember: "Gem_ID_N",
    FilterString: "Gem_TypeID_N=261",
  };

  const { data, isFetched } = AddOnDetailsApi(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "strDisplayMember", "strValueMember")
      : [];

  return dropdownValues;
};

const getManufacturer = (check: boolean) => {
  const requestBody: ManufacturerRequestBodyType = {
    Cmp_ID_N: "1",
    IsAllChecked: Number(check).toString(),
  };

  const { data, isFetched } = ManufacturerDataApi(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "ManufacturerDesc", "ManufacturerId")
      : [];

  return dropdownValues;
};

const getStockUnit = () => {
  const requestBody: StockUnitRequsetType = null;

  const { data, isFetched } = MenuMasterStockUnitList(requestBody);

  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "UnitName", "UnitId")
      : [];

  return dropdownValues;
};

const getMMCountryList = () => {
  const requestBody: CountryReqType = null;

  const { data, isFetched } = MenuMasterCountryList(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "CountryName", "CountryId")
      : [];

  return dropdownValues;
};

export interface MenuMasterFormType {
  categoryTitle: string;
  dietCategory: string[];
  partNumber: string;
  barcode: string;
  supplierPartNumber: string;
  categoryImage: string;

  purchaseDiscription: string;
  salesDescription: string;
  arabicDescription: string;

  manufactoreAll: boolean;
  manufacturer: string;
  country: string;
  metarialType: string;
  brand: string;
  model: string;
  make: string;
  specification: string;
  budgetCode: string;
  reOrderLevel: string;
  minimumQuantity: string;
  maximumQuantity: string;
  wastagePercentage: string;
  leadTime: string;
  stockUnit: string;
  previousCost: string;
  averageCost: string;
  purchaseRate: string;
  previousSalesPrice: string;
  discountMargin: string;
  minimumSalesPrice: string;
  sellingPrice: string;
  sellingPriceAgency: string;
  sellingPriceDealer: string;
  shelfLife: string;
  addOnDetails: string[];
  allownegative: boolean;
  serialNo: boolean;
  effectInventory: boolean;
  notes: string;
  active: boolean;
  addCompanies: Set<string>;
}

export const CategoryDetail = (
  config: number | null,
  configLoading: boolean,
): FieldProps[] => [
  {
    fieldType: "text",
    name: "categoryTitle",
    label: "Category Name",
    size: "medium",
    xs: 6,
    disabled: true,
    hasErrorMessage: true,
    rules: {
      required: "Category is required",
    },
  },
  {
    fieldType: "select",
    name: "dietCategory",
    label: "Diet Category",
    multiple: true,
    options: getDietCategory(),
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "partNumber",
    label: "Part Number " + (config === 1 ? "(Auto)" : ""),
    disabled: config === 1 ? true : false,
    size: "medium",
    InputProps: {
      endAdornment: configLoading ? <CircularProgress size={20} /> : null,
    },
    xs: 4,
  },
  {
    fieldType: "text",
    name: "barcode",
    label: "Barcode",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "supplierPartNumber",
    label: "Supplier Part Number",
    size: "medium",
    xs: 4,
  },
];

export const PusrchaseDescForm = (): FieldProps => ({
  fieldType: "text",
  name: "purchaseDiscription",
  label: "Purchase Description",
  size: "medium",
  xs: 12,
  multiline: true,
  rows: 4,
  bgColor: "#f0fdf4",
  hasErrorMessage: true,
  rules: {
    required: "Purchase descripton is required",
  },
});

export const SalesDescForm = (): FieldProps => ({
  fieldType: "text",
  name: "salesDescription",
  label: "Sales Description",
  size: "medium",
  xs: 12,
  multiline: true,
  rows: 4,
  bgColor: "#f0fdf4",
  hasErrorMessage: true,
  rules: {
    required: "Sales descripton is required",
  },
});

export const ArabicSaleDescForm = (): FieldProps => ({
  fieldType: "text",
  name: "arabicDescription",
  label: "مميزات الوصف",
  size: "medium",
  xs: 12,
  multiline: true,
  rows: 4,
  rtl: true,
  bgColor: "#f0fdf4",
  hasErrorMessage: true,
  rules: {
    required: "Arabic description is required",
  },
});

export const ProductOtherDetail1 = (
  isChecked: boolean,
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void,
): FieldProps[] => [
  {
    fieldType: "select",
    name: "manufacturer",
    label: "ManuFacturer",
    size: "medium",
    options: getManufacturer(isChecked),
    hasErrorMessage: true,
    rules: {
      required: "Manufacturer is required",
    },
    input: (
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <Typography fontWeight={"medium"} variant="body2" sx={{ ml: 0 }}>
              All
            </Typography>
            <Checkbox
              checked={isChecked}
              size="small"
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "End adornment checkbox" }}
            />
          </InputAdornment>
        }
        label="Options"
      />
    ),
    xs: 4,
  },
  {
    fieldType: "select",
    name: "country",
    label: "Country of orgin",
    size: "medium",
    options: getMMCountryList(),
    hasErrorMessage: true,
    rules: {
      required: "Country is required",
    },
    xs: 4,
  },
  {
    fieldType: "select",
    name: "metarialType",
    label: "Metarial Type",
    size: "medium",
    options: getMetarialType(),
    xs: 4,
  },
  {
    fieldType: "text",
    name: "brand",
    label: "Brand",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "model",
    label: "Model",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "make",
    label: "Make",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "specification",
    label: "Specification",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "reOrderLevel",
    label: "Re-Order Level",
    size: "medium",
    xs: 4,
    condition: /^\d*$/,
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "minimumQuantity",
    label: "Minimum Quantity",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "maximumQuantity",
    label: "Maximum Quantity ",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "wastagePercentage",
    label: "Wastage Percentage ",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "shelfLife",
    label: "Shelf Life",
    size: "medium",
    xs: 4,
    condition: /^\d*$/,
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "leadTime",
    label: "Lead Time (Days) ",
    size: "medium",
    xs: 4,
    condition: /^\d*$/,
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "select",
    name: "stockUnit",
    label: "Stock Unit",
    options: getStockUnit(),
    size: "medium",
    hasErrorMessage: true,
    rules: {
      required: "Stock unit is required",
    },
    xs: 4,
  },
  {
    fieldType: "text",
    name: "previousCost",
    label: "Previous Cost",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "averageCost",
    label: "Average Cost",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "purchaseRate",
    label: "Purchase Rate",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "previousSalesPrice",
    label: "Previous Sales Price",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "discountMargin",
    label: "Discount Margin",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "minimumSalesPrice",
    label: "Minimum Sales Price",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "sellingPrice",
    label: "Selling Price (Normal)",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "sellingPriceAgency",
    label: "Selling Price (Agency)",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "text",
    name: "sellingPriceDealer",
    label: "Selling Price (Dealer) ",
    size: "medium",
    xs: 4,
    condition: /^-?\d*\.?\d{0,2}$/,
    InputProps: {
      inputComponent: NumericFormatCustom as any,
    },
    inputProps: {
      maxLength: 15,
      style: { textAlign: "end" },
    },
  },
  {
    fieldType: "select",
    name: "addOnDetails",
    label: "Add On Details",
    options: getAddOnDetails(),
    multiple: true,
    size: "medium",
    xs: 4,
  },
];

export const ChckboxGroup = (): FieldProps => ({
  fieldType: "checkbox",
  row: true,
  name: "checkboxList",
  labelPlacement: "end",
  checkBoxs: [
    { label: "Allow (-ve) stock", name: "allownegative" },
    { label: "Serial No. Required", name: "serialNo" },
    { label: "Effect Inventory", name: "effectInventory" },
  ],
  xs: 6,
});

export const Notes = (): FieldProps => ({
  fieldType: "text",
  multiline: true,
  rows: 4,
  name: "notes",
  label: "Notes",
  xs: 12,
  bgColor: "#f0fdf4",
});

export const ChckboxActive = (disabled: boolean): FieldProps => ({
  fieldType: "checkbox",
  row: true,
  name: "active",
  labelPlacement: "end",
  checkBoxs: [{ label: "Active", name: "active", disabled }],
  xs: 6,
});

export const AddCategoryItem = (type: "add" | "edit" | "new"): FieldProps[] => [
  {
    fieldType: "text",
    label: "Category Code",
    name: "categoryCode",
    size: "medium",
    xs: 12,
    disabled: type === "edit",
    condition: /^[A-Za-z0-9]{0,3}$/,
    hasErrorMessage: true,
    rules: {
      required: "Category Code is required",
    },
    inputProps: {
      maxLength: 3,
      // style: { textAlign: "end" },
    },
    style: {
      marginBottom: 2,
    },
  },
  {
    fieldType: "text",
    label: "Category Name",
    name: "categoryName",
    size: "medium",
    xs: 12,
    hasErrorMessage: true,
    rules: {
      required: "Please select your Showroom",
    },
    style: {
      marginBottom: 2,
    },
  },
];
