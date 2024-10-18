/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	IconButton,
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchHistory from "./SearchHistory";
import CustomTable from "../../CutomTable/CustomTable";
import {
	Column,
	DataTypeProvider,
	GridColumnExtension,
} from "@devexpress/dx-react-grid";
import { RightSpacing } from "../PosMenu/RightSection";
import TotalVlaue from "./TotalVlaue";
import { FormProvider, useForm } from "react-hook-form";
import {
	historyTotalDataSchema,
	searchHistorySchema,
} from "../../Component-types/history.type";
import { deletePreviousMenu, PreviousList } from "../../../services";
import moment from "moment";
import {
	PrevDeleteRequestBodiesType,
	PreviousSaleListItemType,
	PreviousSaleRequestBodiesType,
} from "../../../services/aoi.type";
import {
	CustomTableCurrrencyCellFormatter,
	ListFilterCellComponent,
} from "../../CutomTable/components/customComponent";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppProvider } from "../../../AppProvider";
import ConfirmationDialog from "../../ModalComponent/ConfirmationDialog";

interface SearchDrawerProps extends SwipeableDrawerProps {
	setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TitleBarProp {
	onClose: any;
}

const TitleBar: FC<TitleBarProp> = ({ onClose }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				px: 2,
				py: 1,
				borderBottom: "1px solid",
				mb: 2,
				width: "100%",
			}}>
			<IconButton onClick={onClose} aria-label="close" sx={{ mr: 2 }}>
				<CloseIcon />
			</IconButton>
			<Typography
				variant="h6"
				fontWeight={"medium"}
				sx={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
				}}>
				Order History
			</Typography>
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
				}}>
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
			flex={1}>
			{/* <ActionIconBtn
				varient="print"
				onClick={() => onClickPrint && onClickPrint(id)}>
				<ReceiptIcon fontSize="small" />
			</ActionIconBtn> */}
			<ActionIconBtn
				varient="view"
				onClick={() => onClickView && onClickView(id)}>
				<GridViewIcon fontSize="small" />
			</ActionIconBtn>
			<ActionIconBtn
				varient="delete"
				onClick={() => onClickDelete && onClickDelete(id)}>
				<DeleteOutlineIcon fontSize="small" />
			</ActionIconBtn>
		</Stack>
	);
};
const StyledDrawerContainer = styled(Box)(() => ({
	width: "100%",
	minHeight: "100vh",
	overflowY: "auto",
	overflowX: "hidden",
}));

const SearchDrawer: FC<SearchDrawerProps> = ({
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

	const USERDATA = JSON.parse(localStorage.getItem("userDetail")!);

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
								dataRow.OrderId === row.OrderId
						) + 1
					); // +1 if you want the index to start from 1
				}
				return "";
			},
		},
		{
			title: "Invoice Nubmer",
			name: "InvoiceNumber",
		},
		{
			title: "Invoic Date",
			name: "InvoiceDate",
			getCellValue: (row) =>
				moment(row.InvoiceDate, "M/D/YYYY h:mm:ss A").format(
					"D MMM YY - hh:mm A"
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

	const { mutateAsync } = useMutation({
		mutationKey: ["deletePos"],
		mutationFn: deletePreviousMenu,
		onSuccess: (data) => {
			if (data?.Status === "1") {
				refetch();
				setNotify({
					severity: "success",
					message: data.Message,
				});
			} else {
				setNotify({
					severity: "error",
					message: "Unable to delete, try again",
				});
			}
		},
	});

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
		const deleteData: PrevDeleteRequestBodiesType = {
			UserID: USERDATA.UserId || "",
			Sih_Id_N: deleteRow,
		};
		mutateAsync(deleteData);
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
			} // //console.log("Data item ", data);
		);
		setSearch(searchData);
		setEnable(true);

		//console.log("backend search data", searchData);
	};

	const { data, isLoading, isFetched, refetch } = PreviousList(search!, enable);

	let currentPageData = useMemo(() => {
		if (!isFetched || !data || !Array.isArray(data.Data)) {
			setTotalValues({
				totalAmount: 0,
				netAmount: 0,
				discountAmount: 0,
				totalGenioWalletAmount: 0,
				totalCashAmount: 0,
				totalCardAmount: 0,
				// Reset any other fields as needed
			});
			return [];
		}
		try {
			// First, slice the data according to pagination
			const startIndex = (searchQuery.PageNo - 1) * searchQuery.Rows;
			const endIndex = startIndex + searchQuery.Rows;
			const slicedData = data.Data.slice(startIndex, endIndex);

			//console.log("sliced data", slicedData, data?.Data);

			// Check if slicedData is empty, reset totals to 0 if it is
			if (slicedData.length === 0) {
				setTotalValues({
					totalAmount: 0,
					netAmount: 0,
					discountAmount: 0,
					totalGenioWalletAmount: 0,
					totalCashAmount: 0,
					totalCardAmount: 0,
					// Reset any other fields as needed
				});
				return [];
			}

			// Then calculate totals based on the sliced (current page) data
			const calculatedTotals = slicedData.reduce(
				(
					acc: historyTotalDataSchema,
					item: Partial<PreviousSaleListItemType>
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
				{
					totalAmount: 0,
					netAmount: 0,
					discountAmount: 0,
					totalGenioWalletAmount: 0,
					totalCashAmount: 0,
					totalCardAmount: 0,
					// Initialize more fields as needed
				}
			);

			// Format the totals to have 2 decimal places
			calculatedTotals.totalAmount = parseFloat(
				calculatedTotals.totalAmount.toFixed(2)
			);
			calculatedTotals.netAmount = parseFloat(
				calculatedTotals.netAmount.toFixed(2)
			);
			calculatedTotals.discountAmount = parseFloat(
				calculatedTotals.discountAmount.toFixed(2)
			);
			calculatedTotals.totalGenioWalletAmount = parseFloat(
				calculatedTotals.totalGenioWalletAmount
			);
			calculatedTotals.totalCashAmount = parseFloat(
				calculatedTotals.totalCashAmount.toFixed(2)
			);
			calculatedTotals.totalCardAmount = parseFloat(
				calculatedTotals.totalCardAmount.toFixed(2)
			);

			// Store the total amount in state
			setTotalValues(calculatedTotals);

			// Format specific fields in slicedData to have 2 decimal digits
			const formattedSlicedData = slicedData.map(
				(item: PreviousSaleListItemType) => ({
					...item,
					TotalAmount: parseFloat((Number(item.TotalAmount) || 0).toFixed(2)),
					NetAmount: parseFloat((Number(item.NetAmount) || 0).toFixed(2)),
					GenioCardAmount: parseFloat(
						(Number(item.GenioCardAmount) || 0).toFixed(2)
					),
					DiscountAmount: parseFloat(
						(Number(item.DiscountAmount) || 0).toFixed(2)
					),
					CashAmount: parseFloat((Number(item.CashAmount) || 0).toFixed(2)),
					CardAmount: parseFloat((Number(item.CardAmount) || 0).toFixed(2)),
					// Add more fields as needed
				})
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
				} // //console.log("Data item ", data);
			);
		}
	}, [isFetched]);

	// Add this useEffect to reset form and table data when drawer closes
	useEffect(() => {
		if (open) {
			refetch();
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
			currentPageData=[],
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

	return (
		<SwipeableDrawer
			anchor={"right"}
			open={open}
			onClose={onClose}
			onOpen={onOpen}
			PaperProps={{
				sx: {
					width: {
						xs: "100%",
						sm: "700px",
						md: "800px",
						lg: "70%",
						xl: "70%",
					},
				},
			}}>
			<FormProvider {...method}>
				<StyledDrawerContainer>
					<Toolbar />
					<TitleBar onClose={onClose} />
					<SearchHistory
						onSearch={method.handleSubmit(onSearch)}
						expanded={expanded}
						setExpanded={setExpanded}
					/>
					<RightSpacing />
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
						hasToggleVisibility>
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

					<RightSpacing />
					<TotalVlaue data={totalValues} />
					<RightSpacing />
				</StyledDrawerContainer>
				<ConfirmationDialog
					dialogType="delete"
					title="Delete"
					description="Do you want to delete this previous record"
					open={deleteOpen}
					onConfirm={handleDeleteConfirm}
					onCancel={handleDeleteCancel}
				/>
			</FormProvider>
		</SwipeableDrawer>
	);
};

export default SearchDrawer;
