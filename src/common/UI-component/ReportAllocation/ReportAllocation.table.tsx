/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface RowDataType {
  id: string;
  department: string;
  status: string;
}

const ReportAllcoationTable = ({ data = [] }) => {
  const [leftColumns] = useState(["rowIndex"]);
  const [rightColumns] = useState(["action"]);
  const [searchQuery, setSearchQuery] = useState({
    department: "",
    status: "",
    PageNo: 1,
    Rows: 10,
  });
  const columns: Column[] = [
    {
      title: "Sl",
      name: "rowIndex",
      getCellValue: (row: RowDataType) => {
        if (data && data) {
          return (
            data.findIndex((dataRow: RowDataType) => dataRow.id === row.id) + 1
          );
        }
        return "";
      },
    },
    { name: "description", title: "Description" },
    { name: "select", title: "Select" },
  ];

  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
    },
  ]);

  //   const handleView = () => {};
  //   const handlePrint = () => {};
  //   const handleDelete = () => {};

  return (
    <CustomTable
      hasHorizontalPadding={false}
      hasVerticalPadding={false}
      hasBoxShadow={false}
      isLoading={false} //todo isLoading boolean
      grid={{
        columns,
        rows: data,
      }}
      table={{
        columnExtensions: columnExtension,
        // rowComponent: EmployeeAllowanceListTableRowComponent,
      }}
      pagingState={{
        currentPage: searchQuery?.PageNo - 1,
        onCurrentPageChange: (currentPage) =>
          setSearchQuery({
            ...searchQuery,
            PageNo: currentPage + 1,
          }),
        pageSize: searchQuery.Rows,
        onPageSizeChange: (pageSize) =>
          setSearchQuery({
            ...searchQuery,
            PageNo: 1,
            Rows: pageSize,
          }),
      }}
      customPaging={{
        totalCount: data && Array.isArray(data) ? data.length : 0,
      }} //todo count page
      tableFilterRow={{
        cellComponent: ListFilterCellComponent,
      }}
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
      rightColumns={rightColumns}
      leftColumns={leftColumns}
      hasPaging
    ></CustomTable>
  );
};

export default ReportAllcoationTable;
