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
import { FC, ReactNode, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchHistory from "./SearchHistory";
import CustomTable from "../../CutomTable/CustomTable";
import { Column } from "@devexpress/dx-react-grid";
import { RightSpacing } from "../PosMenu/RightSection";
import TotalVlaue from "./TotalVlaue";

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

	const [defaultColumnWidths] = useState<
		{ columnName: string; width: number }[]
	>([
		{
			columnName: "index",
			width: 60,
		},
		{
			columnName: "invoiceNo",
			width: 100,
		},
		{
			columnName: "invoiceDate",
			width: 100,
		},
		{
			columnName: "studentName",
			width: 100,
		},
		{
			columnName: "admissionNumber",
			width: 100,
		},
		{
			columnName: "discountAmount",
			width: 100,
		},
		{
			columnName: "totalAmount",
			width: 100,
		},
		{
			columnName: "netAmount",
			width: 100,
		},
		{
			columnName: "cashAmount",
			width: 100,
		},
		{
			columnName: "cardAmount",
			width: 100,
		},
		{
			columnName: "cardSwipe",
			width: 100,
		},
		{
			columnName: "action",
			width: 80,
		},
	]);

	const columns: Column[] = [
		{
			title: "Sl No.",
			name: "index",
		},
		{
			title: "Invoice Nubmer",
			name: "invoiceNo",
		},
		{
			title: "Invoic Date",
			name: "invoiceDate",
		},
		{
			title: "Student Name",
			name: "studentName",
		},
		{
			title: "Admission Number",
			name: "admissionNumber",
		},
		{
			title: "Discount Amount",
			name: "discountAmount",
		},
		{
			title: "Total Amount",
			name: "totalAmount",
		},
		{
			title: "Net Amount",
			name: "netAmount",
		},
		{
			title: "Cash Amount",
			name: "cashAmount",
		},
		{
			title: "Card Amount",
			name: "cardAmount",
		},
		{
			title: "Card Swipe",
			name: "cardSwipe",
		},
		{
			title: "Action",
			name: "action",
			getCellValue: () => <ActionBtnGroup />,
		},
	];

	const rows = [
		{
			index: 1,
			invoiceNo: 123456,
			invoiceDate: "15 may 2024",
			studentName: "John Doe",
			admissionNumber: "ABC123",
			discountAmount: 100,
			totalAmount: 2000,
			netAmount: 1900,
			cashAmount: 1500,
			cardAmount: 500,
			cardSwipe: "1234 5678 9012 3456",
		},
	];

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
			<StyledDrawerContainer>
				<Toolbar />
				<TitleBar onClose={onClose} />
				<SearchHistory />
				<RightSpacing />
				<CustomTable
					hasBoxShadow
					isLoading={false}
					grid={{
						columns,
						rows,
					}}
					table={{
						columnExtensions: [],
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
					customPaging={{ totalCount: 0 }} //todo change total count
					tableFilterRow={
						{
							// cellComponent: EmployeeAllowanceListFilterCellComponent,
						}
					}
					defaultColumnWidths={defaultColumnWidths}
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
						columnExtensions: [{ columnName: "Action", sortingEnabled: false }],
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
