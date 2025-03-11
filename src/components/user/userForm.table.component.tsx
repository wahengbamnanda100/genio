/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Dispatch, SetStateAction } from "react";
import { StyledSwitch } from "./User.styled";
import { ShowroomListType } from "./user.type";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";

import CustomTable2 from "@/common/UI-component/Redesign/TableComponent/CustomTable2";
import { ListFilterCellComponent } from "@/common/CutomTable/components/customComponent";
import { UserShowroomListPayload } from "@/services/admin/user/api.type";

export const SwitchCell = <T,>({
  row,
  checked,
  disabled = false,
  onChangeSwitch,
}: {
  row: T;
  checked: boolean;
  disabled?: boolean;
  onChangeSwitch: (event: React.ChangeEvent<HTMLInputElement>, row: T) => void;
}) => {
  return (
    <StyledSwitch
      disabled={disabled}
      checked={checked}
      onChange={(event) => onChangeSwitch(event, row)}
      inputProps={{ "aria-label": "switch_default" }}
    />
  );
};

export const AllocateButton = ({
  rowId,
  open,
  disabled = false,
  onClickAllocation,
}: {
  rowId: string;
  open: boolean;
  disabled?: boolean;
  onClickAllocation: (id: string) => void;
}) => {
  return (
    <Button
      size="small"
      variant={disabled ? "text" : "outlined"}
      disabled={disabled}
      onClick={() => onClickAllocation(rowId)}
      sx={{
        color: open ? "white" : "inherit",
        bgcolor: open ? "black" : "inherit",
        "&.Mui-disabled": {
          backgroundColor: (theme) => theme.palette.grey[100],
          color: (theme) => theme.palette.grey[800],
        },
      }}
    >
      {disabled ? "Select Showroom" : "Allocate"}
    </Button>
  );
};

interface AllocationDrawerProps {
  open: boolean;
  showrooms: ShowroomListType[];
  isLoading: boolean;
  totalCount: string;
  selection: string[];
  searchQuery: Omit<UserShowroomListPayload, "CompanyID">;
  setSearchQuery: Dispatch<
    SetStateAction<Omit<UserShowroomListPayload, "CompanyID">>
  >;
  toggleDrawer: (open: boolean) => any;
  handleSelectChange: (id: string[]) => void;
  handleDefaultChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: ShowroomListType,
  ) => void;
  onSelect: () => void;
  onCancel: () => void;
}

export const AllocateDrawer = ({
  open,
  showrooms,
  isLoading,
  selection,
  totalCount,
  searchQuery,
  setSearchQuery,
  toggleDrawer,
  handleSelectChange,
  handleDefaultChange,
  onSelect,
  onCancel,
}: AllocationDrawerProps) => {
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={onCancel}
      onOpen={toggleDrawer(true)}
    >
      <Toolbar sx={{ mb: 1 }} />
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{
          maxHeight: "calc(100vh - 74px)",
          minHeight: "calc(100vh - 74px)",
        }}
      >
        <Stack direction={"column"} sx={{ maxWidth: "480px" }}>
          <AllocateTitle setOpen={toggleDrawer(false)} />
          <ShowroomList
            data={showrooms}
            isLoading={isLoading}
            selection={selection}
            searchQuery={searchQuery}
            totalCount={totalCount}
            setSearchQuery={setSearchQuery}
            handleSelectChange={handleSelectChange}
            handleDefaultChange={handleDefaultChange}
          />
        </Stack>

        <ShowroomSelectButtons onSelect={onSelect} onCancel={onCancel} />
      </Stack>
    </SwipeableDrawer>
  );
};

const AllocateTitle = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
    >
      <IconButton sx={{ flex: 0.5 }} onClick={() => setOpen(false)}>
        <CloseIcon />
      </IconButton>
      <Typography
        variant="h6"
        fontWeight={"medium"}
        sx={{ flex: 8, textAlign: "center" }}
      >
        Allocate Showroom
      </Typography>
    </Stack>
  );
};

interface ShowroomListProps {
  data: ShowroomListType[];
  isLoading: boolean;
  selection: string[];
  totalCount: string;
  searchQuery: Omit<UserShowroomListPayload, "CompanyID">;
  setSearchQuery: Dispatch<
    SetStateAction<Omit<UserShowroomListPayload, "CompanyID">>
  >;
  handleSelectChange: (id: string[]) => void;
  handleDefaultChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: ShowroomListType,
  ) => void;
}

const ShowroomList = ({
  data,
  isLoading,
  selection,
  totalCount,
  searchQuery,
  setSearchQuery,
  handleSelectChange,
  handleDefaultChange,
}: ShowroomListProps) => {
  const columns: Column[] = [
    {
      title: "SL",
      name: "rowIndex",
      getCellValue: (row: ShowroomListType) => {
        if (data) {
          return data.findIndex((tr: ShowroomListType) => tr.id === row.id) + 1;
        }

        return "";
      },
    },
    {
      title: "ShowroomName",
      name: "name",
    },
    {
      title: "Default",
      name: "isDefault",
      getCellValue: (row: ShowroomListType) => {
        return (
          <SwitchCell
            row={row}
            checked={!selection.includes(row.id) ? false : row.isDefault}
            disabled={!selection.includes(row.id)}
            onChangeSwitch={handleDefaultChange}
          />
        );
      },
    },
  ];

  const columnExtension: GridColumnExtension[] = [
    {
      columnName: "rowIndex",
      width: 70,
      align: "center",
    },
    {
      columnName: "isDefault",
      width: 100,
      align: "center",
    },
  ];

  return (
    <CustomTable2
      densed={true}
      hasHorizontalPadding={false}
      hasVerticalPadding={false}
      hasBoxShadow={false}
      isLoading={isLoading}
      grid={{
        columns,
        rows: data,
        getRowId: (row: ShowroomListType) => row.id,
      }}
      table={{
        columnExtensions: columnExtension,
        // rowComponent: EmployeeAllowanceListTableRowComponent,
      }}
      selection={selection}
      setSelection={handleSelectChange}
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
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
      hasPaging
      hasSelect
    ></CustomTable2>
  );
};

const ShowroomSelectButtons = ({
  onSelect,
  onCancel,
}: {
  onSelect: () => void;
  onCancel: () => void;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      width={"100%"}
      px={8}
      pb={2}
    >
      <Button variant="contained" fullWidth size="small" onClick={onSelect}>
        Select
      </Button>
      <Button variant="outlined" fullWidth size="small" onClick={onCancel}>
        Cancel
      </Button>
    </Stack>
  );
};
