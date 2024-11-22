import { FC, ReactNode, useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserDetailsType } from "../../Component-types/localStorageData.type";
import { anyOneIsTrue } from "../../../utils/utils";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface RowDataType {
  id: string;
  department: string;
  status: string;
}

interface ManufacturerListTableProps {
  isLoading: boolean;
  data: RowDataType[];
}

interface ActionIconBtnProps {
  children: ReactNode;
  varient: "print" | "view" | "delete";
  onClick: () => void;
}

interface ActionBtnGroupProps {
  id: string;
  onClickPrint?: (id: string) => void;
  onClickView?: (id: string) => void;
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
            varient === "print"
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
  onClickView,
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
      {/* <ActionIconBtn
				varient="print"
				onClick={() => onClickPrint && onClickPrint(id)}>
				<ReceiptIcon fontSize="small" />
			</ActionIconBtn> */}
      {viewEnable && (
        <ActionIconBtn
          varient="view"
          onClick={() => onClickView && onClickView(id)}
        >
          <GridViewIcon fontSize="small" />
        </ActionIconBtn>
      )}
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

const ManufacturerListTable: FC<ManufacturerListTableProps> = ({ isLoading, data }) => {
  const [searchQuery, setSearchQuery] = useState({
    department: "",
    status: "",
    PageNo: 1,
    Rows: 10,
  });
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  const [columns] = useState<Column[]>([
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: RowDataType) => {
        if (data && data) {
          return (
            data.findIndex((dataRow: RowDataType) => dataRow.id === row.id) + 1
          );
        }
        return "";
      },
    },
    { name: "ManufacturerCode", title: "Manufacturer Code"},
    { name: "ManufacturerName", title: "Manufacturer Name"},
    { name: "Address", title: "Address"},
    { name: "PhoneNumber", title: "Phone Number"},
    { name: "FaxNumber", title: "Fax Number"},
    { name: "EMail", title: "E-Mail ID"},
    { name: "status", title: "status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: RowDataType) => (
        <ActionBtnGroup
          id={row.id}
          onClickView={handleView}
          onClickPrint={handlePrint}
          onClickDelete={handleDelete}
        />
      ),
    },
  ]);

  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
    },
  ]);

  const handleView = () => {};
  const handlePrint = () => {};
  const handleDelete = () => {};

  return (
    <CustomTable
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
      hasFilter
      hasGrouping
      hasToggleVisibility
    ></CustomTable>
  );
};

export default ManufacturerListTable;
