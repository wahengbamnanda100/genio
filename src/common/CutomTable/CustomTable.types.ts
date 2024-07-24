/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Column,
	// EditingState,
	EditingStateProps,
	FilteringState,
	GroupingState,
	IntegratedFiltering,
	SortingState,
	SummaryItem,
	TableFixedColumnsProps,
	// TableSummaryRowBase,
} from "@devexpress/dx-react-grid";
import {
	Table,
	TableFilterRow,
	TableColumnVisibility,
	TableRowDetail,
	// TableSummaryRow,
} from "@devexpress/dx-react-grid-material-ui";
import { ComponentType, Dispatch, ReactNode, SetStateAction } from "react";

export type CustomTableProps = {
	isLoading?: boolean;
	paperElevation?: number;
	grid: {
		rows: readonly any[];
		columns: readonly Column[];
	};
	filteringState?: {
		columnExtensions?: FilteringState.ColumnExtension[];
	};
	sortingState?: {
		columnExtensions?: SortingState.ColumnExtension[];
	};
	integratedFiltering?: {
		columnExtensions?: IntegratedFiltering.ColumnExtension[];
	};
	groupingState?: {
		columnExtensions?: GroupingState.ColumnExtension[];
	};
	pagingState?: {
		currentPage?: number;
		onCurrentPageChange?: (currentPage: number) => void;
		pageSize?: number;
		onPageSizeChange?: (pageSize: number) => void;
	};
	summaryState?: {
		totalItems?: SummaryItem[];
	};
	customPaging?: {
		totalCount?: number;
	};
	table?: {
		columnExtensions?: Table.ColumnExtension[];
		rowComponent?: ComponentType<Table.DataRowProps>;
	};
	tableHeaderRow?: {
		titleComponent?: ComponentType<object>;
	};
	tableColumnVisibility?: {
		columnExtensions?: TableColumnVisibility.ColumnExtension[];
	};
	tableFilterRow?: {
		cellComponent?: ComponentType<TableFilterRow.CellProps>;
	};
	customExport?: {
		columnsToRemove?: string[];
		formatCells?: {
			name: string;
			type: "Status" | "Date";
		}[];
		pageOrientation?: "landscape" | "portrait";
	};
	tableRowDetail?: {
		contentComponent?: ComponentType<TableRowDetail.ContentProps>;
	};
	editingState?: EditingStateProps;
	children?: ReactNode;
	hasPaging?: boolean;
	hasExport?: boolean;
	hasSearch?: boolean;
	hasSort?: boolean;
	hasFilter?: boolean;
	hasGrouping?: boolean;
	hasToggleVisibility?: boolean;
	hasVerticalPadding?: boolean;
	hasHorizontalPadding?: boolean;
	hasBoxShadow?: boolean;
	hasSelect?: boolean;
	hasSummary?: boolean;
	selection?: (string | number)[];
	setSelection?: (c: any) => void;
	rightColumns?: TableFixedColumnsProps["rightColumns"];
	leftColumns?: TableFixedColumnsProps["leftColumns"];
	columnReordering?: string[];
	defaultColumnWidths?: {
		columnName: string;
		width: number;
	}[];
};

export interface EditTableProps {
	grid: {
		rows: readonly any[];
		columns: readonly Column[];
	};
	isLoading?: boolean;
	paperElevation?: number;
	hasVerticalPadding?: boolean;
	hasHorizontalPadding?: boolean;
	hasBoxShadow?: boolean;
	children?: ReactNode;
	table?: {
		columnExtensions?: Table.ColumnExtension[];
		rowComponent?: ComponentType<Table.DataRowProps>;
	};
	editingState?: EditingStateProps;
	selection?: (string | number)[];
	setSelection?:
		| Dispatch<SetStateAction<(string | number)[]>>
		| ((selection: (string | number)[]) => void);
}
