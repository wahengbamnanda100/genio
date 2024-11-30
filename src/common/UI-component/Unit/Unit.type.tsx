import { FieldProps } from "../../Form-component";
export interface UnitFormType
{
UnitCode:string;
UnitDesc:string;
FormalName:string;
Status:boolean;  
UnitId:string;  
}
export const UnitForm=(disable :boolean):FieldProps[]=>[
    {
        fieldType: "text",
        name: "UnitCode",
        label: "Unit Code",
        hasErrorMessage: true,
        size: "medium",
        xs: 12,
      },
      {
        fieldType: "text",
        name: "UnitDesc",
        label: "Unit Description",
        hasErrorMessage: true,
        size: "medium",
        xs: 12,
      },
      {
        fieldType: "text",
        name: "FormalName",
        label: "Formal Name",
        hasErrorMessage: true,
        size: "medium",
        xs: 12,
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
]
export interface SearchListUnit {
  UnitCode: string;
  UnitDesc: string;
  FormalName:string;
  Status:string; 
  Page: string;
  Rows: string;
}

export const UnitListSearchFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Unitcode",
    label: "Unit Code",
    size: "medium",
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
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    xs: 3,
  },
];
