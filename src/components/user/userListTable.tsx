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
}

const UserListTable = ({
  data,
  isLoading,
  totalCount,
  searchQuery,
  setSearchQuery,
}: UserListProps) => {
  const rightFixed = ["action"];
  const columnExtensions: GridColumnExtension[] = [
    {
      columnName: "action",
      align: "center",
      width: 120,
    },
  ];

  console.log({ totalCount });
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
    { name: "UserID", title: "User ID" },
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

  const handleDelete = (row: SearchListType) => {
    console.log("Deleted row", row);
  };
  const handleEdit = (row: SearchListType) => {
    console.log("edit row", row);
  };
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
