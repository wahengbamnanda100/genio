import { FC, ReactNode, useState } from "react";
import CustomTable from "../../CutomTable/CustomTable";
import {GridColumnExtension } from "@devexpress/dx-react-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";
import { Griddetails, ManufacturerMasterSearchRequestBodyType } from "../../../services/aoi.type";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";



interface ManufacturerListTableProps {
  isLoading: boolean;
  searchQuery: ManufacturerMasterSearchRequestBodyType;
  setSearchQuery: React.Dispatch<React.SetStateAction<ManufacturerMasterSearchRequestBodyType>>;
  totalCount: string;
  data: Griddetails[];
  onDeleteClick: (id: string) => void;
}

interface ActionIconBtnProps {
  children: ReactNode;
  varient: "print" | "view" | "delete" | "edit";
  onClick: () => void;
}

interface ActionBtnGroupProps {
    row: Griddetails;
    onClickPrint?: (row: Griddetails) => void;
    onClickView?: (row: Griddetails) => void;
    onClickDelete?: (row: Griddetails) => void;
    onClickEdit?: (row: Griddetails) => void;
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
 // onClickView,
  row,
}) => {
  
  /*
   import { UserDetailsType } from "../../Component-types/localStorageData.type";
import { anyOneIsTrue } from "../../../utils/utils";

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
*/
  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}
    >

        <ActionIconBtn varient="edit" onClick={() => onClickEdit && onClickEdit(row)} >
            <EditIcon fontSize="small" />
        </ActionIconBtn>
      <ActionIconBtn
        varient="delete"
        onClick={() => onClickDelete && onClickDelete(row)}
      >
        <DeleteOutlineIcon fontSize="small" />
      </ActionIconBtn>
      
      {/*viewEnable && (
        <ActionIconBtn
          varient="view"
          onClick={() => onClickView && onClickView(row)}
        >
          <GridViewIcon fontSize="small" />
        </ActionIconBtn>
      )*/}
      {/*USERDATA?.IsDeletable && (
        <ActionIconBtn
          varient="delete"
          onClick={() => onClickDelete && onClickDelete(row)}
        >
          <DeleteOutlineIcon fontSize="small" />
        </ActionIconBtn>
      )*/}
    </Stack>
  );
};

const ManufacturerListTable: FC<ManufacturerListTableProps> = ({ 
  isLoading,
  data,
  totalCount,
  searchQuery,
  onDeleteClick,
  setSearchQuery
 }) => {
  
  /*const [searchQuery, setSearchQuery] = useState({
    department: "",
    status: "",
    Page: 1,
    Rows: 5,
  });*/
  const navigate = useNavigate();
  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);
  
  const columns = [
    {
      title: "Sl",
      name: "index",
      getCellValue: (row: Griddetails) => {
        if (data && data) {
          return (
            data.findIndex((dataRow: Griddetails) => dataRow.ManufacturerId === row.ManufacturerId) + 1
          );
        }
        return "";
      },
    },
    { name: "ManufacturerCode", title: "Manufacturer Code"},
    { name: "ManufacturerName", title: "Manufacturer Name"},
    { name: "Address", title: "Address"},
    { name: "Phonenumber", title: "Phone Number"},
    { name: "Faxnumber", title: "Fax Number"},
    { name: "Emailid", title: "E-Mail ID"},
    { name: "StatusDesc", title: "status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: Griddetails) => (
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
      columnName:"ManufacturerCode",
      align:"left",
      width: 180,
    },
    {
      columnName:"ManufacturerName",
      align:"left",
      width: 180,
    },
    {
      columnName:"Address",
      align:"left",
      width: 200,
    },
    {
      columnName:"Phonenumber",
      align:"left",
      width: 200,
    },
    {
      columnName:"Faxnumber",
      align:"left",
      width:180,
    },
    {
      columnName:"Emailid",
      align:"left",
      width:190,
    },
    {
      columnName: "action",
      align: "center",
    },
  ]);

  const handleView = () => {};
  const handlePrint = () => {};
  const handleDelete = (row: Griddetails) => {
      onDeleteClick(row.ManufacturerId);
  };

  const handleEdit = (row: Griddetails) => {
    const id = row.ManufacturerId;
    console.log("edit clicked", id);
    navigate(`/Manufacturer/${id}`, { state: { data: row } });
  };

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
      hasFilter
      hasGrouping
      hasToggleVisibility
    ></CustomTable>
  );
};

export default ManufacturerListTable;
