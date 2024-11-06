/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  SwipeableDrawer,
  SwipeableDrawerProps,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
// import ReceiptIcon from "@mui/icons-material/Receipt";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchHistory from "../common/UI-component/History/SearchHistory";
import CustomTable from "../common/CutomTable/CustomTable";
import {
  Column,
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";
// import TotalVlaue from "../common/UI-component/";
import { FormProvider, useForm } from "react-hook-form";
import {
  historyTotalDataSchema,
  searchHistorySchema,
} from "../common/Component-types/history.type";
import { PreviousList } from "../services";
import moment from "moment";
import {
  PreviousSaleListItemType,
  PreviousSaleRequestBodiesType,
} from "../services/aoi.type";
import {
  CustomTableCurrrencyCellFormatter,
  ListFilterCellComponent,
} from "../common/CutomTable/components/customComponent";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAppProvider } from "../AppProvider";
import { anyOneIsTrue, queryCache } from "../utils/utils";
import { UserDetailsType } from "../common/Component-types/localStorageData.type";

interface SearchDrawerProps extends SwipeableDrawerProps {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TitleBarProp {
  onClickCreate: any;
}

const TitleBar: FC<TitleBarProp> = ({ onClickCreate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderBottom: "1px solid",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={"medium"}
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Menu Master List
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onClickCreate}
      >
        Create New
      </Button>
    </Box>
  );
};

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
const StyledDrawerContainer = styled(Box)(() => ({
  width: "100%",
  minHeight: "100vh",
  overflowY: "auto",
  //   overflowX: "hidden",
}));

const MenuMasterLIst: FC<SearchDrawerProps> = ({
  open,
  onClose,
  onOpen,
  setClose,
}) => {
  const navigate = useNavigate();
  const { setNotify } = useAppProvider();
  const CmpID = JSON.parse(localStorage.getItem("CmpId")!);

  const [searchQuery, setSearchQuery] = useState<{
    Rows: number;
    PageNo: number;
  }>({
    Rows: 10,
    PageNo: 1,
    // CmpID:
  });

  const [leftColumns] = useState(["index", "invoiceNo"]);
  const [rightColumns] = useState(["action"]);

  const [enable, setEnable] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteRow, setDeleteRow] = useState<string>("");
  const [totalValues, setTotalValues] = useState<historyTotalDataSchema>({
    totalAmount: 0,
    discountAmount: 0,
    netAmount: 0,
    totalGenioWalletAmount: 0,
    totalCashAmount: 0,
    totalCardAmount: 0,
  });

  const [search, setSearch] = useState<PreviousSaleRequestBodiesType>({
    InvoiceNumber: "",
    CardNumber: "",
    StudentName: "",
    ShowroomId: "",
    BussinessUnitId: "",
    AdmissionNUmber: "",
    FromDate: moment(new Date()).format("DD-MMM-YYYY"),
    ToDate: moment(new Date()).format("DD-MMM-YYYY"),
    Cmp_ID_N: CmpID.toString(), //todo add later
  });

  const localUserData = localStorage.getItem("userDetail") as string | null;

  const USERDATA = localUserData
    ? (JSON.parse(localUserData) as UserDetailsType)
    : null;

  const queryClient = useQueryClient();

  const method = useForm<searchHistorySchema>({
    defaultValues: {
      invoiceNubmer: "",
      cardNumber: "",
      studentName: "",
      admissionNumber: "",
      fromDate: new Date(),
      toDate: new Date(),
      CompanyBussinessUnit: "",
      showroom: "",
    },
  });

  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "rowIndex",
      width: 60,
    },
    {
      columnName: "InvoiceNumber",
      width: 140,
    },
    {
      columnName: "InvoiceDate",
      width: 150,
    },
    {
      columnName: "StudentName",
      width: 140,
    },
    {
      columnName: "AdmissionNumber",
      width: 180,
    },
    {
      columnName: "DiscountAmount",
      width: 160,
    },
    {
      columnName: "TotalAmount",
      width: 140,
    },
    {
      columnName: "NetAmount",
      width: 140,
    },
    {
      columnName: "GenioCardAmount",
      width: 180,
    },
    {
      columnName: "CashAmount",
      width: 140,
    },
    {
      columnName: "CardAmount",
      width: 140,
    },
    {
      columnName: "CardSwipe",
      width: 120,
      align: "center",
    },
    {
      columnName: "action",
      width: 120,
      align: "center",
    },
  ]);

  const columns: Column[] = [
    {
      title: "Sl",
      name: "rowIndex",
      getCellValue: (row) => {
        if (isFetched && data && data.Data) {
          return (
            data.Data.findIndex(
              (dataRow: PreviousSaleListItemType) =>
                dataRow.OrderId === row.OrderId,
            ) + 1
          ); // +1 if you want the index to start from 1
        }
        return "";
      },
    },
    {
      title: "Invoice Number",
      name: "InvoiceNumber",
    },
    {
      title: "Invoice Date",
      name: "InvoiceDate",
      getCellValue: (row) =>
        moment(row.InvoiceDate, "M/D/YYYY h:mm:ss A").format(
          "D MMM YY - hh:mm A",
        ),
    },
    {
      title: "Student Name",
      name: "StudentName",
    },
    {
      title: "Admission Number",
      name: "AdmissionNumber",
    },
    {
      title: "Discount Amount",
      name: "DiscountAmount",
    },
    {
      title: "Total Amount",
      name: "TotalAmount",
    },
    {
      title: "Net Amount",
      name: "NetAmount",
    },
    {
      title: "Genio Card Amount",
      name: "GenioCardAmount",
    },
    {
      title: "Cash Amount",
      name: "CashAmount",
    },
    {
      title: "Card Amount",
      name: "CardAmount",
    },
    {
      title: "Card Swipe",
      name: "CardSwipe",
    },
    {
      title: "Action",
      name: "action",
      getCellValue: (row: PreviousSaleListItemType) => (
        <ActionBtnGroup
          id={row.OrderId}
          onClickView={handleView}
          onClickPrint={handlePrint}
          onClickDelete={handleDelete}
        />
      ),
    },
  ];

  //   const { mutateAsync } = useMutation({
  //     mutationKey: ["deletePos"],
  //     mutationFn: deletePreviousMenu,
  //     onSuccess: (data) => {
  //       if (data?.Status === "1") {
  //         refetch();
  //         setNotify({
  //           severity: "success",
  //           message: data.Message,
  //         });
  //       } else {
  //         setNotify({
  //           severity: "error",
  //           message: "Unable to delete, try again",
  //         });
  //       }
  //     },
  //   });

  const handleView = (id: string) => {
    //console.log("handle click view", id);
    navigate(`/pos-menu/view/${id}`);
    setClose(!open);
  };
  const handlePrint = (id: string) => {
    console.log("handle click Print", id);
  };
  const handleDelete = (id: string) => {
    setDeleteRow(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    //console.log("handle click Delete", deleteRow);
    // const deleteData: PrevDeleteRequestBodiesType = {
    //   UserID: USERDATA?.UserId || "",
    //   Sih_Id_N: deleteRow,
    // };
    // mutateAsync(deleteData);
    setDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
  };

  const onSearch = (data: any) => {
    //console.log("search data", data);
    const searchData: PreviousSaleRequestBodiesType = {
      InvoiceNumber: data?.invoiceNubmer?.InvoiceNumber || "",
      CardNumber: data?.cardNumber?.CardNumber || "",
      StudentName: data?.studentName?.StudentName || "",
      ShowroomId: data?.showroom || "",
      BussinessUnitId: data?.CompanyBussinessUnit || "",
      AdmissionNUmber: data?.admissionNumber?.AdmissionNumber || "",
      FromDate: moment(data.fromDate).format("DD-MMM-YYYY"),
      ToDate: moment(data.toDate).format("DD-MMM-YYYY"),
      Cmp_ID_N: CmpID.toString(), //todo add later
    };

    setSearchQuery(
      {
        Rows: 10,
        PageNo: 1,
      }, // //console.log("Data item ", data);
    );
    setSearch(searchData);
    setEnable(true);

    //console.log("backend search data", searchData);
  };

  const handleCreateNew = () => {
    navigate("/menu-master");
  };

  const { data, isLoading, isFetched, refetch } = PreviousList(search!, enable);

  let currentPageData = useMemo(() => {
    const totalValuesForAllData = {
      totalAmount: 0,
      netAmount: 0,
      discountAmount: 0,
      totalGenioWalletAmount: 0,
      totalCashAmount: 0,
      totalCardAmount: 0,
      // Add more fields if necessary
    };
    if (!isFetched || !data || !Array.isArray(data.Data)) {
      // Reset totals to 0 when no data is available
      setTotalValues(totalValuesForAllData);
      return [];
    }
    try {
      // Calculate totals for all data, not just the current page
      const allDataTotals = data.Data.reduce(
        (
          acc: historyTotalDataSchema,
          item: Partial<PreviousSaleListItemType>,
        ) => {
          acc.totalAmount += Number(item.TotalAmount) || 0;
          acc.netAmount += Number(item.NetAmount) || 0;
          acc.discountAmount += Number(item.DiscountAmount) || 0;
          acc.totalGenioWalletAmount += Number(item.GenioCardAmount) || 0;
          acc.totalCashAmount += Number(item.CashAmount) || 0;
          acc.totalCardAmount += Number(item.CardAmount) || 0;
          // Add more fields as needed
          return acc;
        },
        { ...totalValuesForAllData },
      );

      // Format the totals to have 2 decimal places
      allDataTotals.totalAmount = parseFloat(
        allDataTotals.totalAmount.toFixed(2),
      );
      allDataTotals.netAmount = parseFloat(allDataTotals.netAmount.toFixed(2));
      allDataTotals.discountAmount = parseFloat(
        allDataTotals.discountAmount.toFixed(2),
      );
      allDataTotals.totalGenioWalletAmount = parseFloat(
        allDataTotals.totalGenioWalletAmount.toFixed(2),
      );
      allDataTotals.totalCashAmount = parseFloat(
        allDataTotals.totalCashAmount.toFixed(2),
      );
      allDataTotals.totalCardAmount = parseFloat(
        allDataTotals.totalCardAmount.toFixed(2),
      );

      // Store the total for all data in state
      setTotalValues(allDataTotals);

      // Now, slice the data for the current page according to pagination
      const startIndex = (searchQuery.PageNo - 1) * searchQuery.Rows;
      const endIndex = startIndex + searchQuery.Rows;
      const slicedData = data.Data.slice(startIndex, endIndex);

      // If there's no data in the current slice, return an empty array
      if (slicedData.length === 0) {
        return [];
      }

      // Format specific fields in slicedData to have 2 decimal digits
      const formattedSlicedData = slicedData.map(
        (item: PreviousSaleListItemType) => ({
          ...item,
          TotalAmount: parseFloat((Number(item.TotalAmount) || 0).toFixed(2)),
          NetAmount: parseFloat((Number(item.NetAmount) || 0).toFixed(2)),
          GenioCardAmount: parseFloat(
            (Number(item.GenioCardAmount) || 0).toFixed(2),
          ),
          DiscountAmount: parseFloat(
            (Number(item.DiscountAmount) || 0).toFixed(2),
          ),
          CashAmount: parseFloat((Number(item.CashAmount) || 0).toFixed(2)),
          CardAmount: parseFloat((Number(item.CardAmount) || 0).toFixed(2)),
          // Add more fields as needed
        }),
      );

      return formattedSlicedData;
    } catch (error) {
      console.error("Error occurred while processing data:", error);
      return [];
    }
  }, [data, searchQuery, isFetched]);

  useEffect(() => {
    if (isFetched) {
      setEnable(false);
      setSearchQuery(
        {
          Rows: 10,
          PageNo: 1,
        }, // //console.log("Data item ", data);
      );
    }
  }, [isFetched]);

  // Add this useEffect to reset form and table data when drawer closes
  useEffect(() => {
    if (open) {
      refetch();
      queryCache.clear();
      setEnable(true);
    }
    if (!open) {
      method.reset(); // Reset the form
      queryClient.removeQueries({
        queryKey: ["previousList"],
      });
      setSearchQuery({
        Rows: 10,
        PageNo: 1,
      });
      (currentPageData = []),
        setTotalValues({
          totalAmount: 0,
          netAmount: 0,
          discountAmount: 0,
          totalGenioWalletAmount: 0,
          totalCashAmount: 0,
          totalCardAmount: 0,
        });
      setSearch({
        InvoiceNumber: "",
        CardNumber: "",
        StudentName: "",
        ShowroomId: "",
        BussinessUnitId: "",
        AdmissionNUmber: "",
        FromDate: moment(new Date()).format("DD-MMM-YYYY"),
        ToDate: moment(new Date()).format("DD-MMM-YYYY"),
        Cmp_ID_N: CmpID.toString(), //todo add later
      }); // Clear table data
      setEnable(false); // Reset enable state
      setExpanded(false);
    }
  }, [open]);

  useEffect(() => {
    queryCache.clear();
  }, []);

  return (
    <Paper sx={{ mt: 4, p: 2, px: 3, border: "1px solid" }}>
      <Grid container spacing={2} sx={{ width: "96vw" }}>
        <Grid item xs={12}>
          {" "}
          <TitleBar onClickCreate={handleCreateNew} />
        </Grid>
        <Grid item xs={12}>
          <FormProvider {...method}>
            <SearchHistory
              onSearch={method.handleSubmit(onSearch)}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </FormProvider>
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            hasBoxShadow
            isLoading={isLoading}
            grid={{
              columns,
              rows: currentPageData,
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
              totalCount:
                isFetched && data && Array.isArray(data.Data)
                  ? data.Data.length
                  : 0,
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
              columnExtensions: [
                { columnName: "action", sortingEnabled: false },
              ],
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
              for={[
                "DiscountAmount",
                "TotalAmount",
                "NetAmount",
                "CashAmount",
                "CardAmount",
                "GenioCardAmount",
              ]}
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
        </Grid>
      </Grid>

      {/* </CustomTable> */}
    </Paper>
  );
};

export default MenuMasterLIst;

// const MenuMasterLIst = () => {
//   return <div>MenuMasterLIst</div>;
// };
