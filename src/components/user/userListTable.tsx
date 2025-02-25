import {
  Column,
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";

import ActionBtnGroup from "../../common/ActionButtonGroup";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { CustomStatusCellFormatter } from "../../common/UI-component/Role/Role-list-component";
import { UserListItemType } from "./user.type";

const UserListTable = ({ data }: { data: UserListItemType[] }) => {
  const rightFixed = ["action"];
  const columnExtensions: GridColumnExtension[] = [
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
    },
    { name: "UserId", title: "User ID" },
    { name: "EmployeeCode", title: "Emplopyee Code" },
    { name: "EmployeeName", title: "Employee Name" },
    { name: "Designation", title: "Designation" },
    { name: "Description", title: "Description" },
    { name: "RoleCode", title: "Role Code" },
    { name: "RoleName", title: "Role Name" },
    { name: "Status", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: UserListItemType) => (
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
  const rows: UserListItemType[] = data;

  const handleDelete = (row: UserListItemType) => {
    console.log("Deleted row", row);
  };
  const handleEdit = (row: UserListItemType) => {
    console.log("edit row", row);
  };
  return (
    <CustomTable2
      densed={false}
      hasBoxShadow
      isLoading={false}
      grid={{
        columns,
        rows,
      }}
      table={{ columnExtensions }}
      rightColumns={rightFixed}
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
