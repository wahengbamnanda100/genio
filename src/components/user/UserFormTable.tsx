import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { RowDataType } from "./user.type";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { useState } from "react";
import { ListFilterCellComponent } from "../../common/CutomTable/components/customComponent";

const UserDetailTable = ({ data = [] }) => {
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
    { name: "cmpCode", title: "Company Code" },
    { name: "cmpName", title: "Company Name" },
    { name: "Address", title: "Address" },
    { name: "type", title: "Type" },
    { name: "default", title: "Default" },
    { name: "showroomAllocation", title: "Showroom Allocation" },
  ];

  const columnExtension: GridColumnExtension[] = [
    {
      columnName: "action",
      align: "center",
    },
  ];

  return (
    <CustomTable2
      densed={true}
      hasHorizontalPadding={false}
      hasVerticalPadding={false}
      hasBoxShadow={false}
      isLoading={false}
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
    ></CustomTable2>
  );
};

export default UserDetailTable;
