import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { CompanyList } from "./user.type";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { useState } from "react";
import { ListFilterCellComponent } from "../../common/CutomTable/components/customComponent";
import {
  AllocateButton,
  AllocateDrawer,
  SwitchCell,
} from "./userForm.table.component";
import {
  useUserShowroomAllocation,
  useUserTable,
} from "@/hooks/admin/user/useUserTable";

const UserDetailTable = ({ reset }: { reset: boolean }) => {
  const [searchQuery, setSearchQuery] = useState({
    department: "",
    status: "",
    PageNo: 1,
    Rows: 10,
  });

  const {
    isLoading,
    selection,
    companyList,
    // selectionFull,
    handleDefaultSelection,
    handleSelectionChange,
  } = useUserTable(reset);

  const {
    showrooms,
    isLoading: isLoadingShowrooms,
    openAllocate,
    selection: showroomSelection,
    setOpenAllocate,
    handleSelectChange,
    handleDefaultChange,
    handleAllocation,
    handleSelect,
    handleCancel,
  } = useUserShowroomAllocation();

  const columns: Column[] = [
    {
      title: "Sl",
      name: "rowIndex",
      getCellValue: (row: CompanyList) => {
        if (companyList && companyList) {
          return (
            companyList.findIndex(
              (dataRow: CompanyList) => dataRow.cmpId === row.cmpId,
            ) + 1
          );
        }
        return "";
      },
    },
    { name: "cmpCode", title: "Company Code" },
    { name: "companyName", title: "Company Name" },
    { name: "address", title: "Address" },
    { name: "type", title: "Type" },
    {
      name: "default",
      title: "Default",
      getCellValue: (row: CompanyList) => {
        return (
          <SwitchCell
            row={row}
            checked={!selection.includes(row.cmpId) ? false : row.default}
            disabled={!selection.includes(row.cmpId)}
            onChangeSwitch={handleDefaultSelection}
          />
        );
      },
    },
    {
      name: "showroomAllocation",
      title: "Showroom Allocation",
      getCellValue: (row: CompanyList) => {
        return (
          <AllocateButton
            rowId={row.cmpId}
            open={openAllocate}
            disabled={!selection.includes(row.cmpId)}
            onClickAllocation={handleAllocation}
          />
        );
      },
    },
  ];

  const columnExtension: GridColumnExtension[] = [
    {
      columnName: "action",
      align: "center",
    },
    {
      columnName: "rowIndex",
      align: "center",
      width: 70,
    },
    {
      columnName: "cmpCode",
      align: "left",
      width: 150,
    },
    {
      columnName: "companyName",
      align: "left",
      width: 240,
    },
    {
      columnName: "type",
      align: "left",
      width: 140,
    },
    {
      columnName: "default",
      align: "center",
      width: 100,
    },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenAllocate(open);
    };

  return (
    <>
      <CustomTable2
        densed={true}
        hasHorizontalPadding={false}
        hasVerticalPadding={false}
        hasBoxShadow={false}
        isLoading={isLoading}
        grid={{
          columns,
          rows: companyList,
          getRowId: (row: CompanyList) => row.cmpId,
        }}
        table={{
          columnExtensions: columnExtension,
          // rowComponent: EmployeeAllowanceListTableRowComponent,
        }}
        selection={selection}
        setSelection={handleSelectionChange}
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
          totalCount:
            companyList && Array.isArray(companyList) ? companyList.length : 0,
        }} //todo count page
        tableFilterRow={{
          cellComponent: ListFilterCellComponent,
        }}
        sortingState={{
          columnExtensions: [{ columnName: "action", sortingEnabled: false }],
        }}
        hasPaging
        hasSelect
      ></CustomTable2>

      <AllocateDrawer
        open={openAllocate}
        showrooms={showrooms}
        isLoading={isLoadingShowrooms}
        selection={showroomSelection}
        handleDefaultChange={handleDefaultChange}
        handleSelectChange={handleSelectChange}
        toggleDrawer={toggleDrawer}
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  );
};

export default UserDetailTable;
