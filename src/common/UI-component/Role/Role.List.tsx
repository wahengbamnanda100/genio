import { FC, ReactNode, useState } from "react";

import {
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { UserDetailsType } from "../../Component-types/localStorageData.type";
// import { anyOneIsTrue } from "../../../utils/utils";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";
import {
  UnitMasterItem,
  UnitMasterSearchReqType,
} from "../../../services/aoi.type";
import { useNavigate } from "react-router";
import CustomTable2 from "../Redesign/TableComponent/CustomTable2";
import { CustomStatusCellFormatter } from "./Role-list-component";

interface DemoListTableProps {
  isLoading: boolean;
  data: UnitMasterItem[];
  totalCount: string;
  searchQuery: UnitMasterSearchReqType;
  onDeleteClick: (id: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<UnitMasterSearchReqType>>;
}

interface ActionIconBtnProps {
  children: ReactNode;
  varient: "print" | "view" | "delete" | "edit";
  onClick: () => void;
}

interface ActionBtnGroupProps {
  row: UnitMasterItem;
  onClickPrint?: (row: UnitMasterItem) => void;
  onClickView?: (row: UnitMasterItem) => void;
  onClickDelete?: (row: UnitMasterItem) => void;
  onClickEdit?: (row: UnitMasterItem) => void;
}

const ActionIconBtn: FC<ActionIconBtnProps> = ({
  children,
  varient,
  onClick,
}) => {
  return (
    <Tooltip title={varient}>
      <IconButton
        onClick={onClick}
        sx={{
          width: "1.2rem",
          height: "1.2rem",
          color:
            varient === "print" || varient === "edit"
              ? "primary.main"
              : varient === "view"
                ? "secondary.main"
                : "error.main",
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

const ActionBtnGroup: FC<ActionBtnGroupProps> = ({
  // onClickPrint,
  onClickDelete,
  onClickEdit,
  row,
}) => {
  // const localUserData = localStorage.getItem("userDetail") as string | null;

  // const USERDATA = localUserData
  //   ? (JSON.parse(localUserData) as UserDetailsType)
  //   : null;

  // const viewEnable = USERDATA
  //   ? anyOneIsTrue(
  //       USERDATA?.IsDeletable,
  //       USERDATA?.IsEditable,
  //       USERDATA?.IsInsertable,
  //       USERDATA?.IsViewable,
  //     )
  //   : false;

  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}
    >
      <ActionIconBtn
        varient="edit"
        onClick={() => onClickEdit && onClickEdit(row)}
      >
        <EditIcon fontSize="small" />
      </ActionIconBtn>
      {/* )} */}
      {/* {USERDATA?.IsDeletable && ( */}
      <ActionIconBtn
        varient="delete"
        onClick={() => onClickDelete && onClickDelete(row)}
      >
        <DeleteOutlineIcon fontSize="small" />
      </ActionIconBtn>
      {/* )} */}
    </Stack>
  );
};

const RoleListTable: FC<DemoListTableProps> = ({
  isLoading,
  data,
  searchQuery,
  totalCount,
  onDeleteClick,
  setSearchQuery,
}) => {
  // const [searchQuery, setSearchQuery] = useState({
  //   department: "",
  //   status: "",
  //   PageNo: 1,
  //   Rows: 10,
  // });
  const navigate = useNavigate();
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  const columns = [
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: UnitMasterItem) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: UnitMasterItem) => dataRow.UnitID === row.UnitID,
            ) + 1
          );
        }
        return "";
      },
    },
    { name: "RoleCode", title: "Role Code" },
    { name: "RoleName", title: "Role Name" },
    { name: "Description", title: "Description" },
    { name: "Status", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: UnitMasterItem) => (
        <ActionBtnGroup
          row={row}
          onClickView={handleView}
          onClickPrint={handlePrint}
          onClickDelete={handleDelete}
          onClickEdit={handleEdit}
        />
      ),
    },
  ];

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

  const handleView = () => {};
  const handlePrint = () => {};
  const handleDelete = (row: UnitMasterItem) => {
    onDeleteClick(row.UnitID);
  };
  const handleEdit = (row: UnitMasterItem) => {
    const id = row.UnitID;
    console.log("edit clicked", id);
    navigate(`/demo/${id}`, { state: { data: row } });
  };

  return (
    <CustomTable2
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
        totalCount: Number(totalCount),
      }} //todo count page
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
      hasPaging
      hasSearch
      hasSort
      // hasFilter
      // hasGrouping
      hasToggleVisibility
    >
      <DataTypeProvider
        for={["Status"]}
        formatterComponent={CustomStatusCellFormatter}
      />
    </CustomTable2>
  );
};

export default RoleListTable;
