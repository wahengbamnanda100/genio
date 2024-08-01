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
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { RightSpacing } from "../PosMenu/RightSection";
import TotalVlaue from "./TotalVlaue";
import { FormProvider, useForm } from "react-hook-form";
import { searchHistorySchema } from "../../Component-types/history.type";
import { PreviousList } from "../../../services";
import moment from "moment";
import {
	PreviousSaleListItemType,
	PreviousSaleRequestBodiesType,
} from "../../../services/aoi.type";

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
}

const ActionIconBtn: FC<ActionIconBtnProps> = ({ children, varient }) => {
	return (
		<Tooltip title={varient}>
			<IconButton
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

	const [search, setSearch] = useState<PreviousSaleRequestBodiesType>();

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
			getCellValue: () => <ActionBtnGroup />,
		},
	];

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
		if (!isFetched) return [];
		const startIndex = (searchQuery.PageNo - 1) * searchQuery.Rows;
		const endIndex = startIndex + searchQuery.Rows;
		return data?.Data.slice(startIndex, endIndex);
	}, [data, searchQuery]);

	useEffect(() => {
		if (isFetched) {
			setEnable(false);
			console.log("Data item ", data);
		}
	}, [isFetched]);

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
					<SearchHistory onSearch={method.handleSubmit(onSearch)} />
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
						customPaging={{ totalCount: isFetched ? data?.Data.length : 0 }} //todo change total count
						// tableFilterRow={
						// 	{
						// 		// cellComponent: EmployeeAllowanceListFilterCellComponent,
						// 	}
						// }
						tableColumnVisibility={{
							columnExtensions: [
								{ columnName: "RowIndex", togglingEnabled: false },
								{ columnName: "Action", togglingEnabled: false },
							],
						}}
						groupingState={{
							columnExtensions: [
								{ columnName: "RowIndex", groupingEnabled: false },
								{ columnName: "Action", groupingEnabled: false },
							],
						}}
						filteringState={{
							columnExtensions: [
								{ columnName: "RowIndex", filteringEnabled: false },
								{ columnName: "Action", filteringEnabled: false },
							],
						}}
						integratedFiltering={{
							columnExtensions: [
								{
									columnName: "Status",
									predicate: (value, filter) =>
										Number(filter.value) === Number(value),
								},
							],
						}}
						sortingState={{
							columnExtensions: [
								{ columnName: "Action", sortingEnabled: false },
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
					/>

					<RightSpacing />
					<TotalVlaue />
				</StyledDrawerContainer>
			</FormProvider>
		</SwipeableDrawer>
	);
};

const ActionBtnGroup = () => {
	return (
		<Stack
			direction={"row"}
			gap={2}
			justifyContent={"center"}
			alignItems={"center"}
			flex={1}>
			<ActionIconBtn varient="print">
				<DownloadIcon />
			</ActionIconBtn>
			<ActionIconBtn varient="view">
				<ArticleIcon />
			</ActionIconBtn>
			<ActionIconBtn varient="delete">
				<DeleteOutlineIcon />
			</ActionIconBtn>
		</Stack>
	);
};

export default SearchDrawer;
