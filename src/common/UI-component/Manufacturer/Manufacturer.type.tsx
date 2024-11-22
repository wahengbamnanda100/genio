import { FieldProps } from "../../Form-component";

export interface ManufacturerFormType {
    ManufacturerCode: string;
    ManufacturerName: string;
    Address : string;
    PhoneNumber:number | string;
    FaxNumber:number | string;
    EMailID:string; 
    Status: boolean;
  }
  
  export const manufacturerForm = (disable: boolean): FieldProps[] => [
    {
      fieldType: "text",
      name: "ManufacturerCode",
      label: "Manufacturer Code",
      hasErrorMessage: true,
      size: "medium",
      xs: 4,
    },
    {
      fieldType: "text",
      name: "ManufacturerName",
      label: "Manufacturer Name",
      hasErrorMessage: true,
      size: "medium",
      xs: 8,
    },
  
    {
      fieldType: "text",
      name: "Address",
      label: "Address",
      multiline:true,
      hasErrorMessage: true,
      size: "medium",
      xs: 12,
    },
    {
        fieldType: "text",
        name: "PhoneNumber",
        label: "Phone Number",
        hasErrorMessage: true,
        size: "medium",
        xs: 4,
    },
    {
        fieldType: "text",
        name: "FaxNumber",
        label: "Fax Number",
        hasErrorMessage: true,
        size: "medium",
        xs: 4,
    },
    {
        fieldType: "text",
        name: "EMailID",
        label: "E-Mail ID",
        hasErrorMessage: true,
        size: "medium",
        xs: 4,
    },
    {
      fieldType: "checkbox",
      name: "Status",
      size: "medium",
      disabled: disable,
      row: true,
      labelPlacement: "end",
      checkBoxs: [
        {
          name: "Status",
          label: "Status",
        },
      ],
      xs: 12,
    },
  ];


  export interface SearchListManufacturer {
    ManufacturerCode: string;
    ManufacturerName:string;
    Address:string;
    PhoneNumber:string;
    status: boolean;
  }


  export const ManufacturerListSearchFields = (): FieldProps[] => [
    {
      fieldType: "text",
      name: "ManufacturerCode",
      label: "Manufacturer Code",
      size: "medium",
      xs: 3,
    },
    {
      fieldType: "text",
      name: "ManufacturerName",
      label: "Manufacturer Name ",
      size: "medium",
      xs: 3,
    },
    {
      fieldType: "text",
      name: "Address",
      label: "Address",
      size: "medium",
      xs: 6,
    },
    {
      fieldType: "text",
      name: "PhoneNumber",
      label: "Phone Number",
      size: "medium",
      xs: 3,
    },
    {
      fieldType: "select",
      name: "status",
      label: "Status",
      size: "medium",
      options: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
      ],
      xs: 3,
    },
  ];