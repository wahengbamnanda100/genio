import {
  Column,
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";

import ActionBtnGroup from "../../common/ActionButtonGroup";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { CustomStatusCellFormatter } from "../../common/UI-component/Role/Role-list-component";
import {
  SearchListType,
  SearchUserListPayloadType,
} from "@/services/admin/user/api.type";
import { Dispatch, SetStateAction } from "react";

interface UserListProps {
  data: SearchListType[];
  isLoading: boolean;
  totalCount: string;
  searchQuery: SearchUserListPayloadType;
  setSearchQuery: Dispatch<SetStateAction<SearchUserListPayloadType>>;
  handleDelete: (row: SearchListType) => void;
  handleEdit: (row: SearchListType) => void;
}

const UserListTable = ({
  data,
  isLoading,
  totalCount,
  searchQuery,
  setSearchQuery,
  handleDelete,
  handleEdit,
}: UserListProps) => {
  const rightFixed = ["action"];
  const columnExtensions: GridColumnExtension[] = [
    {
      columnName: "index",
      align: "center",
      width: 80,
    },
    {
      columnName: "RoleCode",
      align: "left",
      width: 120,
    },
    {
      columnName: "Status",
      align: "center",
      width: 100,
    },
    {
      columnName: "action",
      align: "center",
      width: 120,
    },
  ];
  const columns: Column[] = [
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: SearchListType) => {
        if (data) {
          return (
            data.findIndex(
              (dataRow: SearchListType) => dataRow.UserID === row.UserID,
            ) + 1
          );
        }
        return "";
      },
    },
    // { name: "UserID", title: "User ID" },
    { name: "EmpCode", title: "Emplopyee Code" },
    { name: "EmpName", title: "Employee Name" },
    { name: "Designatiom", title: "Designation" },
    { name: "Description", title: "Description" },
    { name: "RoleCode", title: "Role Code" },
    { name: "RoleName", title: "Role Name" },
    { name: "Status", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: SearchListType) => (
        <ActionBtnGroup
          row={row}
          //  onClickView={handleView}
          //  onClickPrint={handlePrint}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        />
      ),
    },
  ];
  const rows: SearchListType[] = data;

  return (
    <CustomTable2
      densed={false}
      hasBoxShadow
      isLoading={isLoading}
      grid={{
        columns,
        rows,
      }}
      table={{ columnExtensions }}
      rightColumns={rightFixed}
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
        // totalCount: Number(totalCount),
        totalCount: Number(totalCount),
      }}
      filteringState={{
        columnExtensions: [
          { columnName: "index", filteringEnabled: false },
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
      tableColumnVisibility={{
        columnExtensions: [
          { columnName: "index", togglingEnabled: false },
          { columnName: "action", togglingEnabled: false },
        ],
      }}
      hasExport
      hasPaging
      hasSearch
      hasSort
      hasToggleVisibility
    >
      {" "}
      <DataTypeProvider
        for={["Status"]}
        formatterComponent={CustomStatusCellFormatter}
      />
    </CustomTable2>
  );
};

export default UserListTable;
