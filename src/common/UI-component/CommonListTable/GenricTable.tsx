/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";
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
// import { useNavigate } from "react-router";

interface GenericTableProps<T> {
  isLoading: boolean;
  searchQuery: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<any>>;
  onDeleteClick: (id: string) => void;
  totalPageCount: string;
  data: T[];
  columns: Column[];
  columnExtensions: GridColumnExtension[];
  rightColumns: string[];
  leftColumns: string[];
  onEditClick?: (rowData: T) => void;
  onViewClick?: (rowData: T) => void;
  onPrintClick?: (rowData: T) => void;
  currencyColumns?: string[];
}

interface ActionIconBtnProps {
  children: ReactNode;
  varient: "edit" | "view" | "delete" | "print";
  onClick: () => void;
}

interface ActionBtnGroupProps<T> {
  rowData: T;
  onClickPrint?: (rowData: T) => void;
  onClickView?: (rowData: T) => void;
  onClickDelete?: (rowData: T) => void;
  onClickEdit?: (rowData: T) => void;
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
            varient === "edit" || varient === "print"
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

const ActionBtnGroup = <T,>({
  onClickDelete,
  onClickEdit,
  rowData,
}: ActionBtnGroupProps<T>) => {
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
        onClick={() => onClickEdit && onClickEdit(rowData)}
      >
        <EditIcon fontSize="small" />
      </ActionIconBtn>
      <ActionIconBtn
        varient="delete"
        onClick={() => onClickDelete && onClickDelete(rowData)}
      >
        <DeleteOutlineIcon fontSize="small" />
      </ActionIconBtn>
    </Stack>
  );
};

const GenericTable = <T extends { [key: string]: any }>({
  isLoading,
  searchQuery,
  totalPageCount,
  data,
  columns,
  columnExtensions,
  rightColumns,
  leftColumns,
  setSearchQuery,
  onDeleteClick,
  onEditClick,
  onViewClick,
  onPrintClick,
  currencyColumns = [],
}: GenericTableProps<T>) => {
  //   const navigate = useNavigate();

  const handleDelete = (rowData: T) => {
    onDeleteClick(rowData.id);
  };

  const handleEdit = (rowData: T) => {
    if (onEditClick) {
      onEditClick(rowData);
    }
  };

  const handleView = (rowData: T) => {
    if (onViewClick) {
      onViewClick(rowData);
    }
  };

  const handlePrint = (rowData: T) => {
    if (onPrintClick) {
      onPrintClick(rowData);
    }
  };

  const actionColumn: Column = {
    name: "action",
    title: "Action",
    getCellValue: (row: T) => (
      <ActionBtnGroup
        rowData={row}
        onClickView={handleView}
        onClickPrint={handlePrint}
        onClickDelete={handleDelete}
        onClickEdit={handleEdit}
      />
    ),
  };

  const finalColumns = [...columns, actionColumn];

  return (
    <CustomTable
      isLoading={isLoading}
      grid={{
        columns: finalColumns,
        rows: data,
      }}
      table={{
        columnExtensions: columnExtensions,
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
      }}
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
      {currencyColumns.length > 0 && (
        <DataTypeProvider
          for={currencyColumns}
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
      )}
    </CustomTable>
  );
};

export default GenericTable;
