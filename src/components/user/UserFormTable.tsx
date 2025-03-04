import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { CompanyList } from "./user.type";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { useEffect, useState } from "react";
import { ListFilterCellComponent } from "../../common/CutomTable/components/customComponent";
import {
  AllocateButton,
  AllocateDrawer,
  SwitchCell,
} from "./userForm.table.component";

const UserDetailTable = ({
  data = [],
  isLoading,
}: {
  data: CompanyList[];
  isLoading: boolean;
}) => {
  const [tableData, setTableData] = useState<CompanyList[]>(data || []);
  const [openAllocate, setOpenAllocate] = useState<boolean>(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectionFull, setSelectionFull] = useState<CompanyList[]>([]);
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
      getCellValue: (row: CompanyList) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: CompanyList) => dataRow.cmpCode === row.cmpCode,
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
            checked={!selection.includes(row.cmpCode) ? false : row.default}
            disabled={!selection.includes(row.cmpCode)}
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
            rowId={row.cmpCode}
            open={openAllocate}
            disabled={!selection.includes(row.cmpCode)}
            setOpen={setOpenAllocate}
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

  useEffect(() => {
    console.log("selected rows", selection);
    console.log("selected rows full", selectionFull);
  }, [selection]);

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

  const handleSelectionChange = (selectedIds: string[]) => {
    // Map selected IDs to full row objects
    const newSelectedRows = tableData.filter((row: CompanyList) =>
      selectedIds.includes(row.cmpCode),
    );
    setSelection(selectedIds); // Update local selection for grid
    setSelectionFull(newSelectedRows);
  };

  const handleDefaultSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: CompanyList,
  ) => {
    if (!event.target.checked) {
      return;
    }

    // Create a new array with updated default values
    const updatedData = tableData.map((company) => ({
      ...company,
      default: company.cmpCode === row.cmpCode,
    }));

    setTableData(updatedData);
    // setData(updatedData);
  };

  const handleSelect = () => {};

  const handleCancel = () => {};

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
          rows: tableData,
          getRowId: (row: CompanyList) => row.cmpCode,
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
          totalCount: data && Array.isArray(data) ? data.length : 0,
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
        toggleDrawer={toggleDrawer}
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  );
};

export default UserDetailTable;
