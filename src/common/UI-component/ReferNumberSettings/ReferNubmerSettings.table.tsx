/* eslint-disable @typescript-eslint/no-explicit-any */

import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

import { ReferNumberDetails } from "./ReferNumberSettings.type";

interface ReferNumberProps {
  data: any;
  isLoading: boolean;
}

const ReferNumberSettingsTable = ({ data, isLoading }: ReferNumberProps) => {
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
      getCellValue: (row: ReferNumberDetails) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: ReferNumberDetails) => dataRow.Module === row.Module,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "Desc",
      title: "Description",
    },
    {
      name: "Module",
      title: "Module",
    },
    {
      name: "Prefix",
      title: "Prefix",
    },
    {
      name: "Seperator",
      title: "Seperator",
    },
    {
      name: "YearTag",
      title: "Year Tag",
    },
    {
      name: "NoCharacters",
      title: "No of Characters",
    },
    {
      name: "LastReferNo",
      title: "Last Refer No",
    },
    {
      name: "SampleFormat",
      title: "Sample Format",
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

export default ReferNumberSettingsTable;
