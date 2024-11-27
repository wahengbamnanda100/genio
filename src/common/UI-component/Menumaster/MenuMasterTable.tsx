import GridViewIcon from "@mui/icons-material/GridView";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { FC, ReactNode, useState } from "react";
// import { anyOneIsTrue } from "../../../utils/utils";
import {
  Column,
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";
import CustomTable from "../../CutomTable/CustomTable";
import {
  CustomTableCurrrencyCellFormatter,
  ListFilterCellComponent,
} from "../../CutomTable/components/customComponent";
// import { UserDetailsType } from "../../Component-types/localStorageData.type";
import {
  MenuMasterListReqType,
  MenuMasterListType,
} from "../../../services/aoi.type";

interface MenuListTableProps {
  isLoading: boolean;
  searchQuery: MenuMasterListReqType;
  setSearchQuery: React.Dispatch<React.SetStateAction<MenuMasterListReqType>>;
  totalPageCount: string;
  data: MenuMasterListType[];
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
      {/* {viewEnable && ( */}
      <ActionIconBtn
        varient="view"
        onClick={() => onClickView && onClickView(id)}
      >
        <GridViewIcon fontSize="small" />
      </ActionIconBtn>
      {/* )} */}
      {/* {USERDATA?.IsDeletable && ( */}
      <ActionIconBtn
        varient="delete"
        onClick={() => onClickDelete && onClickDelete(id)}
      >
        <DeleteOutlineIcon fontSize="small" />
      </ActionIconBtn>
      {/* )} */}
    </Stack>
  );
};

const MenUMasterTable: FC<MenuListTableProps> = ({
  isLoading,
  searchQuery,
  setSearchQuery,
  totalPageCount,
  data,
}) => {
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "index",
      align: "center",
      width: 80,
    },
    {
      columnName: "Partnumber",
      align: "left",
      width: 130,
    },
    {
      columnName: "Purchasedescription",
      align: "left",
      width: 180,
    },
    {
      columnName: "Salesdescription",
      align: "left",
      width: 160,
    },
    {
      columnName: "Categoryname",
      align: "left",
      width: 140,
    },
    {
      columnName: "Dietcategory",
      align: "left",
      width: 130,
    },
    {
      columnName: "Manufacturername",
      align: "left",
      width: 180,
    },
    {
      columnName: "Stockunit",
      align: "left",
      width: 130,
    },
    {
      columnName: "Averagecost",
      align: "right",
      width: 130,
    },
    {
      columnName: "Sellingprice",
      align: "right",
      width: 180,
    },
    {
      columnName: "Status",
      align: "center",
      width: 130,
    },
    {
      columnName: "action",
      align: "center",
      width: 100,
    },
  ]);

  const columns: Column[] = [
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: MenuMasterListType) => {
        const index =
          data?.findIndex((dataRow) => dataRow.Partnumber === row.Partnumber) ??
          -1;
        return index !== -1 ? index + 1 : "";
      },
    },
    { name: "Partnumber", title: "Part Number" },
    { name: "Purchasedescription", title: "Purchase Description" },
    { name: "Salesdescription", title: "Sales Description" },
    { name: "Categoryname", title: "Category Name" },
    { name: "Dietcategory", title: "Diet Category" },
    { name: "Manufacturername", title: "Manufacturer Name" },
    { name: "Stockunit", title: "Stock Unit" },
    { name: "Averagecost", title: "Average Cost" },
    { name: "Sellingprice", title: "Selling Price (Normal)" },
    { name: "Status", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: MenuMasterListType) => (
        <ActionBtnGroup
          id={row.Partnumber}
          onClickView={handleView}
          onClickPrint={handlePrint}
          onClickDelete={handleDelete}
        />
      ),
    },
  ];

  const handleView = () => {};
  const handlePrint = () => {};
  const handleDelete = () => {};

  return (
    <CustomTable
      //   hasBoxShadow
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
    >
      <DataTypeProvider
        for={["Sellingprice", "Averagecost"]}
        availableFilterOperations={[
          "equal",
          "notEqual",
          "greaterThan",
          "greaterThanOrEqual",
          "lessThan",
          "lessThanOrEqual",
        ]}
        formatterComponent={CustomTableCurrrencyCellFormatter}
      />
    </CustomTable>
  );
};

export default MenUMasterTable;
