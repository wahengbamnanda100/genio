/* eslint-disable @typescript-eslint/no-explicit-any */

import Field from "../../Form-component/field";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";
import {
  ConfigurationDeatilsType,
  ConfigurationSettingsSelectField,
} from "./ConfigureSetting.type";

interface ApprovalAuthorityDetailTableProps {
  data: any;
  isLoading: boolean;
}

const ConfigurationSettingsTable = ({
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
      getCellValue: (row: ConfigurationDeatilsType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: ConfigurationDeatilsType) =>
                dataRow.Company === row.Company,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "Company",
      title: "Company",
    },
    {
      name: "Select",
      title: "Select",
      getCellValue: () => <Field {...ConfigurationSettingsSelectField()} />,
    },
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

export default ConfigurationSettingsTable;
