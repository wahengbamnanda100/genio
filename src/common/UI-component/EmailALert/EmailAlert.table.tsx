/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import CustomTable from "../../CutomTable/CustomTable";
import Field from "../../Form-component/field";
import { useState } from "react";
import {
  ActiveField,
  EmailAlertFeildsType,
  RepeatHoursField,
  StartAtField,
} from "./EmailAlert.type";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface EmailAlertTableProps {
  data: any;
  isLoading: boolean;
}

const EmailAlertTable = ({ data, isLoading }: EmailAlertTableProps) => {
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
      getCellValue: (row: EmailAlertFeildsType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: EmailAlertFeildsType) =>
                dataRow.EmailType === row.EmailType,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "EmailType",
      title: "Email Type",
    },
    {
      name: "StartAt",
      title: "Start At",
      getCellValue: () => <Field {...StartAtField()} />,
    },
    {
      name: "RepeatHours",
      title: "Repeat(Hours)",
      getCellValue: () => <Field {...RepeatHoursField()} />,
    },
    {
      name: "Active",
      title: "Active",
      getCellValue: () => <Field {...ActiveField()} />,
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

export default EmailAlertTable;
