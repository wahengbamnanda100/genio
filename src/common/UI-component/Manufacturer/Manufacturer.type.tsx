import { ManufacturerMasterSearchRequestBodyType } from "../../../services/aoi.type";
import { ManufacturerMasterSearch } from "../../../services/ManufacturerMaster";
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
    Phonenumber:string;
    Status: boolean | string;
  }


  export const manufacturerSearchQuery:ManufacturerMasterSearchRequestBodyType= {
    ManufacturerCode:"",
    ManufacturerName:"",
    Address:"",
    Phonenumber:"",
    Status: "-1",
    Page:"1",
    Rows:"10"
  }


  

  export const ManufacturerListSearchFields = (): FieldProps[] => [
    {
      fieldType: "autoComplete",
      name: "ManufacturerCode",
      label: "Manufacturer Code",
      size: "medium",
      searchApi: (keyStroke) =>
        ManufacturerMasterSearch(
          {
            ...manufacturerSearchQuery,
            ManufacturerCode: keyStroke,
          },
          {
            enabled: keyStroke !== "" ? true : false,
          },
        ),
      optionKey: "ManufacturerCode",
      getOptionLabel: (option) => (option ? `${option.ManufacturerCode}` : ""),
      options: (searchData) => searchData?.Data ?? [],
  
      xs: 3,
    },
    {
      fieldType: "autoComplete",
      name: "ManufacturerName",
      label: "Manufacturer Name ",
      size: "medium",
      searchApi: (keyStroke) =>
        ManufacturerMasterSearch(
          {
            ...manufacturerSearchQuery,
            ManufacturerName: keyStroke,
          },
          {
            enabled: keyStroke !== "" ? true : false,
          },
        ),
      optionKey: "ManufacturerName",
      getOptionLabel: (option) => (option ? `${option.ManufacturerName}` : ""),
      options: (searchData) => searchData?.Data ?? [],
      xs: 3,
    },
    {
      fieldType: "autoComplete",
      name: "Address",
      label: "Address",
      size: "medium",
      searchApi: (keyStroke) =>
        ManufacturerMasterSearch(
          {
            ...manufacturerSearchQuery,
            Address: keyStroke,
          },
          {
            enabled: keyStroke !== "" ? true : false,
          },
        ),
        optionKey: "Address",
      getOptionLabel: (option) => (option ? `${option.Address}` : ""),
      options: (searchData) => searchData?.Data ?? [],
      xs: 6,
    },
    {
      fieldType: "autoComplete",
      name: "Phonenumber",
      label: "Phone Number",
      size: "medium",
      searchApi: (keyStroke) =>
        ManufacturerMasterSearch(
          {
            ...manufacturerSearchQuery,
            Phonenumber: keyStroke,
          },
          {
            enabled: keyStroke !== "" ? true : false,
          },
        ),
        optionKey: "Phonenumber",
      getOptionLabel: (option) => (option ? `${option.Phonenumber}` : ""),
      options: (searchData) => searchData?.Data ?? [],
      xs: 3,
    },
    {
      fieldType: "select",
      name: "Status",
      label: "Status",
      size: "medium",
      options: [
        { label: "All", value:"-1"},
        { label: "Active", value:"1"},
        { label: "Inactive", value:"0"},
      ],
      xs: 3,
    },
  ];


  