import { useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface RowDataType {
  id: string;
  department: string;
  status: string;
}

const AppActivationTable = ({ data = [] }) => {
  const [leftColumns] = useState(["rowIndex"]);
  const [rightColumns] = useState(["action"]);
  const [searchQuery, setSearchQuery] = useState({
    department: "",
    status: "",
    PageNo: 1,
    Rows: 10,
  });
  const [columns] = useState<Column[]>([
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
    { name: "FamulyId", title: "Family ID" },
    { name: "FullName", title: "Full  Name" },
    { name: "Mobile", title: "Mobile Number" },
    { name: "Email", title: "Email ID" },
    { name: "AppStatus", title: "App Status" },
    { name: "Active", title: "Active" },
    // { name: "status", title: "status" },
    // {
    //   name: "action",
    //   title: "action",
    //   getCellValue: (row: CompanyList) => ( //todo change it later
    //     <ActionBtnGroup
    //       id={row.cmpCode}
    //       onClickView={handleView}
    //       onClickPrint={handlePrint}
    //       onClickDelete={handleDelete}
    //     />
    //   ),
    // },
  ]);

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

export default AppActivationTable;
