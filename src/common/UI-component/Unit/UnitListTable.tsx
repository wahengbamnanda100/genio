import { FC, ReactNode, useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserDetailsType } from "../../Component-types/localStorageData.type";
import { anyOneIsTrue } from "../../../utils/utils";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

import {
  UnitMasterSearchReqType,
  UnitMasterItem,
} from "../../../services/aoi.type";


interface UnitListTableProps {
  isLoading: boolean;
  searchQuery: UnitMasterSearchReqType;
  setSearchQuery: React.Dispatch<React.SetStateAction<UnitMasterSearchReqType>>;
  totalPageCount: string;
  data: UnitMasterItem[];
}

interface ActionIconBtnProps {
  children: ReactNode;
  varient:  "edit" | "delete";
  onClick: () => void;
}

interface ActionBtnGroupProps {
  id: string;
   onClickEdit?: (id: string) => void;
  onClickDelete?: (id: string) => void;
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
            varient === "edit"
              ? "primary.main"
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
 // onClickEdit,
  id,
}) => {
  const localUserData = localStorage.getItem("userDetail") as string | null;

  const USERDATA = localUserData
    ? (JSON.parse(localUserData) as UserDetailsType)
    : null;

  const viewEnable = USERDATA
    ? anyOneIsTrue(
        USERDATA?.IsDeletable,
        USERDATA?.IsEditable,
        USERDATA?.IsInsertable,
        USERDATA?.IsViewable,
      )
    : false;

  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}
    >
      
    
      {USERDATA?.IsDeletable && (
        <ActionIconBtn
          varient="delete"
          onClick={() => onClickDelete && onClickDelete(id)}
        >
          <DeleteOutlineIcon fontSize="small" />
        </ActionIconBtn>
      )}
    </Stack>
  );
};


  const UnitListTable: FC<UnitListTableProps> = ({
    isLoading,
    searchQuery,
    setSearchQuery,
    totalPageCount,
    data,
  }) => {
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  const columns = [
    {
      title: "Sl",
      name: "index",      
     getCellValue: (row: UnitMasterItem) => {
                  if (data?.length) {
          // Check if data exists and is not empty
          const index = data.findIndex(
            (dataRow: UnitMasterItem) =>
              dataRow.UnitID === row.UnitID,
          );
          return index >= 0 ? index + 1 : "";
        }
        return "";
      },
    },
    { name: "UnitCode", title: "Unit Code" },
    { name: "UnitDesc", title: "Description" },
    { name: "FormalName", title: "Formal Name" },
    { name: "StatusDesc", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: UnitMasterItem) => (
        <ActionBtnGroup
          id={row.UnitID}
          onClickEdit={handleView}
           onClickDelete={handleDelete}
        />
      ),
    },
  ];

  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
      width:100,
    },
    {
      columnName: "index",
      align: "center",
      width:100,
    },
  ]);

  const handleView = () => {};
  const handleDelete = () => {};

  return (
    <CustomTable
      //hasBoxShadow
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
        totalCount: Number(totalPageCount),
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
   
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
      rightColumns={rightColumns}
      leftColumns={leftColumns}
      hasExport
      hasPaging
      hasSearch
      hasSort
      hasFilter
      hasGrouping
      hasToggleVisibility
    ></CustomTable>
  );
};

export default UnitListTable;
