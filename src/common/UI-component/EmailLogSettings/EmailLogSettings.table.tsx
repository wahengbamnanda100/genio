/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { GridColumnExtension } from "@devexpress/dx-react-grid";
import { EmailDetailsType } from "./EmailLogSettings.type";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface EmailLogSettingTableProps {
  data: any[];
  isLoading: boolean;
}

const EmailLogSettingTable = ({
  data,
  isLoading,
}: EmailLogSettingTableProps) => {
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
      width: 100,
    },
    {
      columnName: "StatusDesc",
      align: "center",
    },
    {
      columnName: "index",
      align: "center",
      width: 100,
    },
  ]);

  const columns = [
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: EmailDetailsType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: EmailDetailsType) => dataRow.EmpCode === row.EmpCode,
            ) + 1
          );
        }
        return "";
      },
    },
    { name: "Date", title: "Date" },
    { name: "EmailType", title: "Email Type" },
    { name: "EmpCode", title: "Employee Code" },
    { name: "EmpName", title: "Employee Name" },
    { name: "EmailId", title: "Email Id" },
    { name: "EmailSubject", title: "Email Subject" },
    // { name: "EmailBody", title: "Email Body" },
    {
      name: "action",
      title: "action",
      //   getCellValue: (row: UnitMasterItem) => (
      //     <ActionBtnGroup
      //       row={row}
      //       onClickView={handleView}
      //       onClickPrint={handlePrint}
      //       onClickDelete={handleDelete}
      //       onClickEdit={handleEdit}
      //     />
      //   ),
    },
  ];

  return (
    <CustomTable
      hasBoxShadow
      isLoading={isLoading}
      grid={{
        columns,
        rows: data,
      }}
      table={{
        columnExtensions: columnExtension,
        // rowComponent: EmployeeAllowanceListTableRowComponent,
      }}
      //   pagingState={{
      //     currentPage: Number(searchQuery?.Page) - 1,
      //     onCurrentPageChange: (currentPage) =>
      //       setSearchQuery({
      //         ...searchQuery,
      //         Page: (currentPage + 1).toString(),
      //       }),
      //     pageSize: Number(searchQuery.Rows),
      //     onPageSizeChange: (pageSize) =>
      //       setSearchQuery({
      //         ...searchQuery,
      //         Page: "1",
      //         Rows: pageSize.toString(),
      //       }),
      //   }}
      //   customPaging={{
      //     totalCount: Number(totalCount),
      //   }} //todo count page
      tableFilterRow={{
        cellComponent: ListFilterCellComponent,
      }}
      tableColumnVisibility={{
        columnExtensions: [
          { columnName: "rowIndex", togglingEnabled: false },
          { columnName: "action", togglingEnabled: false },
        ],
      }}
      groupingState={{
        columnExtensions: [
          { columnName: "rowIndex", groupingEnabled: false },
          { columnName: "action", groupingEnabled: false },
        ],
      }}
      filteringState={{
        columnExtensions: [
          { columnName: "rowIndex", filteringEnabled: false },
          { columnName: "action", filteringEnabled: false },
        ],
      }}
      integratedFiltering={{
        columnExtensions: [
          {
            columnName: "CardSwipe",
            predicate: (value, filter) => filter.value === value,
          },
        ],
      }}
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
      rightColumns={rightColumns}
      leftColumns={leftColumns}
      hasExport
      //   hasPaging
      hasSearch
      hasSort
      hasFilter
      hasGrouping
      hasToggleVisibility
    ></CustomTable>
  );
};

export default EmailLogSettingTable;
