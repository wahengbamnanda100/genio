/* eslint-disable @typescript-eslint/no-explicit-any */

import Field from "../../Form-component/field";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";
import {
  ApprovalAuthorityDetailType,
  ApprovalAuthorityEmailAlertField,
  ApprovalAuthorityEmpCodeField,
  ApprovalAuthorityEmpNameField,
} from "./ApprovalAuthority.type";

interface ApprovalAuthorityDetailTableProps {
  data: any;
  isLoading: boolean;
}

const ApprovalAuthorityDetailTable = ({
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
      getCellValue: (row: ApprovalAuthorityDetailType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: ApprovalAuthorityDetailType) =>
                dataRow.index === row.index,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "EmpCode",
      title: "Employee Code",
      getCellValue: () => <Field {...ApprovalAuthorityEmpCodeField()} />,
    },
    {
      name: "EmpName",
      title: "Employee Name",
      getCellValue: () => <Field {...ApprovalAuthorityEmpNameField()} />,
    },
    {
      name: "EmailAlert",
      title: "Email Alert Required",
      getCellValue: () => <Field {...ApprovalAuthorityEmailAlertField()} />,
    },
    {
      name: "remove",
      title: "Remove",
      getCellValue: (row: ApprovalAuthorityDetailType) => (
        <IconButton onClick={() => console.log(row)}>
          <DeleteIcon />
        </IconButton>
      ),
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

export default ApprovalAuthorityDetailTable;
