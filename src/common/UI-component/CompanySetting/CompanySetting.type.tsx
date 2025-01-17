import { Button, Grid } from "@mui/material";
import { FieldProps } from "../../Form-component";
import Field from "../../Form-component/field";
import NearMeIcon from "@mui/icons-material/NearMe";
import ImageUploadComponent from "../Menumaster/UploadImage";
import { useState } from "react";
import { placeholderUrl } from "../../../layout/MainLayout/Header/UserImage";

export interface CompanySettingTypes {
  Year: string;
  CmpCode: string;
  CmpName: string;
  ContactPerson: string;
  CmpAddress: string;
  location: string;
  Website: string;

  landline: string;
  Phone: string;
  Email: string;
  Fax: string;
  CRNubmer: string;
  SortOrder: string;
  NoOfBussiness: string;

  HoldingCmp: boolean;
  DefaultLanguage: string;
  DefaultCurrency: string;
  BussinessUnit: boolean;
  ParentCompany: string;

  HeaderImg: string;
  FooterImg: string;
  LogoImg: string;

  FromDay: string;
  ToDay: string;
  OTEffectMonth: string;

  active: boolean;
}

export const CompanySettingFields1 = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Year",
    label: "Year",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "CmpCode",
    label: "Company Code",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "CmpName",
    label: "Company Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "ContactPerson",
    label: "Contact Person",
    size: "medium",
    xs: 3,
  },
];

export const CompanySettingFields3 = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Landline",
    label: "Land Line Number",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Mobile",
    label: "Mobile Number",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Email",
    label: "E-Mail ID",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Fax",
    label: "Fax Number",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "CRNubmer",
    label: "CR Number",
    size: "medium",
    xs: 5,
  },
  {
    fieldType: "text",
    name: "SortOrder",
    label: "Sort Order",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "NoOfBussiness",
    label: "No Of Bussiness",
    size: "medium",
    xs: 5,
  },
];

const CompanyAddress = (): FieldProps => ({
  fieldType: "text",
  name: "CmpAddress",
  multiline: true,
  rows: 3,
  label: "Address",
  size: "medium",
  xs: 12,
});

const CompanyWebsite = (): FieldProps => ({
  fieldType: "text",
  name: "Website",
  label: "Website",
  size: "medium",
  xs: 8,
});

export const CompanySettingFields2 = () => {
  return (
    <Grid item container spacing={2}>
      <Field {...CompanyAddress()} />
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<NearMeIcon fontSize="small" />}
        >
          Select Location
        </Button>
      </Grid>
      <Field {...CompanyWebsite()} />
    </Grid>
  );
};

export const CompanySettingFields4 = (): FieldProps[] => [
  {
    fieldType: "checkbox",
    name: "HoldingCmp",
    checkBoxs: [{ name: "HoldingCmp", label: "Holding Company" }],
    labelPlacement: "end",
    xs: 2.4,
  },
  {
    fieldType: "text",
    name: "DefaultLanguage",
    label: "Default Language",
    size: "medium",
    xs: 2.4,
  },
  {
    fieldType: "select",
    name: "DefaultCurrency",
    label: "Default Currency",
    size: "medium",
    options: [
      { value: "INR", label: "INR" },
      {
        value: "USD",
        label: "USD",
      },
    ],
    xs: 2.4,
  },
  {
    fieldType: "checkbox",
    name: "BussinessUnit",
    checkBoxs: [{ name: "BussinessUnit", label: "Bussiness Unit" }],
    labelPlacement: "end",
    xs: 2.4,
  },
  {
    fieldType: "text",
    name: "ParentCompany",
    label: "Parent Company",
    size: "medium",
    xs: 2.4,
  },
];
export const CompanySettingFields5 = () => {
  const [imgSrc] = useState<string>(placeholderUrl);

  return (
    <Grid item container spacing={2} xs={12}>
      <Grid item container xs={4}>
        <Grid item xs={6}>
          Header
        </Grid>
        <Grid item xs={6}>
          {" "}
          <ImageUploadComponent
            src={imgSrc}
            alt={"alte product image"} //todo add later
            width="50%"
            height="50%"
            apiEndpoint={`${import.meta.env.VITE_API_URL}/api/StockCardApi/PostAsync?TempFolderName=~/imgUpload/StockCardItemImage`}
            imageType="menu"
            sxProps={{ objectFit: "cover", borderRadius: 0 }}
          />
        </Grid>
      </Grid>{" "}
      <Grid item container xs={4}>
        <Grid item xs={6}>
          Footer
        </Grid>
        <Grid item xs={6}>
          <ImageUploadComponent
            src={imgSrc}
            alt={"alte product image"} //todo add later
            width="50%"
            height="50%"
            apiEndpoint={`${import.meta.env.VITE_API_URL}/api/StockCardApi/PostAsync?TempFolderName=~/imgUpload/StockCardItemImage`}
            imageType="menu"
            sxProps={{ objectFit: "cover", borderRadius: 0 }}
          />
        </Grid>
      </Grid>{" "}
      <Grid item container xs={4}>
        <Grid item xs={6}>
          Logo
        </Grid>
        <Grid item xs={6}>
          <ImageUploadComponent
            src={imgSrc}
            alt={"alte product image"} //todo add later
            width="50%"
            height="50%"
            apiEndpoint={`${import.meta.env.VITE_API_URL}/api/StockCardApi/PostAsync?TempFolderName=~/imgUpload/StockCardItemImage`}
            imageType="menu"
            sxProps={{ objectFit: "cover", borderRadius: 0 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const CompanySettingFields6 = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "FromDay",
    label: "From(Day)",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "ToDay",
    label: "To(Day)",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "OTEffectMonth",
    label: "OT Effect Month",
    size: "medium",
    xs: 4,
  },
];

export const CompanyActiveField = (): FieldProps => ({
  fieldType: "checkbox",
  name: "active",
  checkBoxs: [{ name: "active", label: "Active" }],
  labelPlacement: "end",
  xs: 2.4,
});
