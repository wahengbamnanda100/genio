import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { CompanyList } from "./user.type";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { ListFilterCellComponent } from "../../common/CutomTable/components/customComponent";
import {
  AllocateButton,
  AllocateDrawer,
  SwitchCell,
} from "./userForm.table.component";
import { useUserTable } from "@/hooks/admin/user/useUserTable";
import { useUserShowroomAllocation } from "@/hooks/admin/user/useUserShowroom";

const UserDetailTable = () => {
  const {
    isLoading,
    selection,
    companyList,
    totalCount: compnayTotalCount,
    searchQuery,
    setSearchQuery,
    // selectionFull,
    handleDefaultSelection,
    handleSelectionChange,
  } = useUserTable();

  const {
    showrooms,
    isLoading: isLoadingShowrooms,
    openAllocate,
    totalCount: showroomTotalCount,
    selection: showroomSelection,
    searchQuery: showroomSearchQuery,
    setSearchQuery: setShowroomSearchQuery,
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
          currentPage: Number(searchQuery?.Page) - 1,
          onCurrentPageChange: (currentPage) =>
            setSearchQuery({
              ...searchQuery,
              Page: (currentPage + 1).toString(),
            }),
          pageSize: Number(searchQuery.Rows),
          onPageSizeChange: (pageSize) =>
            setSearchQuery({
              ...searchQuery,
              Page: "1",
              Rows: pageSize.toString(),
            }),
        }}
        customPaging={{
          totalCount: Number(compnayTotalCount),
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
        totalCount={showroomTotalCount}
        selection={showroomSelection}
        searchQuery={showroomSearchQuery}
        setSearchQuery={setShowroomSearchQuery}
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
