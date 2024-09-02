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
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ArticleIcon from "@mui/icons-material/Article";
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
import { PreviousList } from "../../../services";
import moment from "moment";
import {
	PreviousSaleListItemType,
	PreviousSaleRequestBodiesType,
} from "../../../services/aoi.type";
import {
	CustomTableCurrrencyCellFormatter,
	ListFilterCellComponent,
} from "../../CutomTable/components/customComponent";

interface SearchDrawerProps extends SwipeableDrawerProps {}

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
	onClickPrint,
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
			<ActionIconBtn
				varient="print"
				onClick={() => onClickPrint && onClickPrint(id)}>
				<DownloadIcon />
			</ActionIconBtn>
			<ActionIconBtn
				varient="view"
				onClick={() => onClickView && onClickView(id)}>
				<ArticleIcon />
			</ActionIconBtn>
			<ActionIconBtn
				varient="delete"
				onClick={() => onClickDelete && onClickDelete(id)}>
				<DeleteOutlineIcon />
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

const SearchDrawer: FC<SearchDrawerProps> = ({ open, onClose, onOpen }) => {
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
	const [totalValues, setTotalValues] = useState<historyTotalDataSchema>({
		totalAmount: 0,
		discountAmount: 0,
		netAmount: 0,
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
		Cmp_ID_N: "1", //todo add later
	});

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

	const handleView = (id: string) => {
		console.log("handle click view", id);
	};
	const handlePrint = (id: string) => {
		console.log("handle click Print", id);
	};
	const handleDelete = (id: string) => {
		console.log("handle click Delete", id);
	};

	const onSearch = (data: any) => {
		console.log("search data", data);
		const searchData: PreviousSaleRequestBodiesType = {
			InvoiceNumber: data?.invoiceNubmer?.InvoiceNumber || "",
			CardNumber: data?.cardNumber?.AdmissionNumber || "",
			StudentName: data?.studentName?.StudentName || "",
			ShowroomId: data?.showroom || "",
			BussinessUnitId: data?.CompanyBussinessUnit || "",
			AdmissionNUmber: data?.admissionNumber?.AdmissionNumber || "",
			FromDate: moment(data.fromDate).format("DD-MMM-YYYY"),
			ToDate: moment(data.toDate).format("DD-MMM-YYYY"),
			Cmp_ID_N: "1", //todo add later
		};

		setSearch(searchData);
		setEnable(true);

		console.log("backend search data", searchData);
	};

	const { data, isLoading, isFetched } = PreviousList(search!, enable);

	const currentPageData = useMemo(() => {
		if (!isFetched || !data || !Array.isArray(data.Data)) return [];
		try {
			const calculatedTotals = data.Data.reduce(
				(
					acc: historyTotalDataSchema,
					item: Partial<PreviousSaleListItemType>
				) => {
					acc.totalAmount += Number(item.TotalAmount) || 0;
					acc.netAmount += Number(item.NetAmount) || 0;
					acc.discountAmount += Number(item.DiscountAmount) || 0;
					acc.totalCashAmount += Number(item.CashAmount) || 0;
					acc.totalCardAmount += Number(item.CardAmount) || 0;
					// Add more fields as needed
					return acc;
				},
				{
					totalAmount: 0,
					netAmount: 0,
					discountAmount: 0,
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
			calculatedTotals.totalCashAmount = parseFloat(
				calculatedTotals.totalCashAmount.toFixed(2)
			);
			calculatedTotals.totalCardAmount = parseFloat(
				calculatedTotals.totalCardAmount.toFixed(2)
			);

			// Store the total amount in state
			setTotalValues(calculatedTotals);

			const startIndex = (searchQuery.PageNo - 1) * searchQuery.Rows;
			const endIndex = startIndex + searchQuery.Rows;
			const slicedData = data.Data.slice(startIndex, endIndex);

			return slicedData;
		} catch (error) {
			console.error("Error occurred while processing data:", error);
			return [];
		}
	}, [data, searchQuery]);

	useEffect(() => {
		if (isFetched) {
			setEnable(false);
			console.log("Data item ", data);
		}
	}, [isFetched]);

	// Add this useEffect to reset form and table data when drawer closes
	useEffect(() => {
		if (open) {
			setEnable(true);
		}
		if (!open) {
			method.reset(); // Reset the form
			setSearch({
				InvoiceNumber: "",
				CardNumber: "",
				StudentName: "",
				ShowroomId: "",
				BussinessUnitId: "",
				AdmissionNUmber: "",
				FromDate: moment(new Date()).format("DD-MMM-YYYY"),
				ToDate: moment(new Date()).format("DD-MMM-YYYY"),
				Cmp_ID_N: "1", //todo add later
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
			</FormProvider>
		</SwipeableDrawer>
	);
};

export default SearchDrawer;
