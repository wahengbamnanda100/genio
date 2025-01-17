/* eslint-disable @typescript-eslint/no-explicit-any */

// import Field from "../../Form-component/field";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";
import { ReferTypeDetailsType } from "./ReferTypeSettings.type";

interface ApprovalAuthorityDetailTableProps {
  data: any;
  isLoading: boolean;
}

const ReferTypeSettingTable = ({
  data,
  isLoading,
}: ApprovalAuthorityDetailTableProps) => {
  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
    },
  ]);

  const columns: Column[] = [
    {
      title: "Sl",
      name: "rowIndex",
      getCellValue: (row: ReferTypeDetailsType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: ReferTypeDetailsType) =>
                dataRow.CompanyName === row.CompanyName,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "Select",
      title: "Select",
    },
    {
      name: "GroupName",
      title: "Group Name",
    },
    {
      name: "CompanyName",
      title: "Company Name",
    },
    {
      name: "BusinessUnit",
      title: "Business Unit",
    },
    {
      name: "Showroom",
      title: "Showroom",
    },
    {
      name: "ResetOn",
      title: "Reset On",
    },
    // {
    //   name: "Select",
    //   title: "Select",
    //   getCellValue: () => <Field {...ConfigurationSettingsSelectField()} />,
    // },
  ];

  return (
    <CustomTable
      hasHorizontalPadding={false}
      hasVerticalPadding={false}
      hasBoxShadow={false}
      isLoading={isLoading} //todo isLoading boolean
      grid={{
        columns,
        rows: data,
      }}
      table={{
        columnExtensions: columnExtension,
        // rowComponent: EmployeeAllowanceListTableRowComponent,
      }}
      tableFilterRow={{
        cellComponent: ListFilterCellComponent,
      }}
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
    ></CustomTable>
  );
};

export default ReferTypeSettingTable;
