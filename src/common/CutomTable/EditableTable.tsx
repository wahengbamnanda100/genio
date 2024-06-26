/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Paper,
	CircularProgress,
	Button,
	InputAdornment,
	useMediaQuery,
	// Menu,
	// MenuItem,
} from "@mui/material";
import {
	Grid,
	Table,
	TableHeaderRow,
	PagingPanel,
	TableFilterRow,
	TableColumnVisibility,
	// Toolbar,
	ColumnChooser,
	SearchPanel,
	TableGroupRow,
	GroupingPanel,
	DragDropProvider,
	TableFixedColumns,
	TableSelection,
	VirtualTable,
	TableRowDetail,
	TableSummaryRow,
	TableColumnResizing,
	TableColumnReordering,
} from "@devexpress/dx-react-grid-material-ui";
import {
	CustomPaging,
	EditingState,
	FilteringState,
	Grouping,
	GroupingState,
	IntegratedFiltering,
	IntegratedGrouping,
	// IntegratedSelection,
	IntegratedSorting,
	PagingState,
	// RowDetailState,
	SearchState,
	SelectionState,
	SortingState,
	SummaryState,
	// DataTypeProvider,
	IntegratedSummary,
} from "@devexpress/dx-react-grid";
import React, { ComponentType, useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
// import { useTranslation } from "react-i18next";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
	LoadingShade,
	TableHeadStyled,
	TableStyled,
	TableSummaryRowStyled,
	TextFieldStyled,
} from "./CustomTable.style";
import { CustomTableProps } from "./CustomTable.types";
// import {
// 	EXPORT_TYPES,
// 	tableExportFn,
// 	tableExportFnProps,
// } from "helpers/tableExportFn";

// const CurrencyFormatter = ({ value }: any) =>
// 	value.toLocaleString("en-US", { style: "currency", currency: "USD" });

// const CurrencyTypeProvider = (props: any) => (
// 	<DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
// );

const messages = {
	Total: "Total",
};

const TotalRowComponent: React.ComponentType<Table.RowProps> = ({
	tableRow,
	...rest
}) => {
	return <TableSummaryRowStyled {...rest} />;
};

const totalCalculator = (
	type: string,
	rows: any[],
	getValue: (row: any) => any
) => {
	if (type === "Total") {
		if (!rows.length) {
			return "";
		}
		const columnName = getValue(rows[0]).props.name.split(".").pop();
		const value = rows.map((el) => Number(el[columnName]));
		const total = value.reduce(
			(previousValue, currentValue) => previousValue + currentValue
		);
		return total;
	}
	return IntegratedSummary.defaultCalculator(type, rows, getValue);
};

const Loading = () => {
	return (
		<LoadingShade>
			<CircularProgress className="loading_icon" />
		</LoadingShade>
	);
};

const TableComponent: ComponentType<object> = (props) => {
	return <TableStyled {...props} className="table" />;
};

const HeadComponent: ComponentType<object> = (props) => {
	return <TableHeadStyled {...props} className="tableHead" />;
};

const InputSearchComponent: ComponentType<SearchPanel.InputProps> = ({
	value,
	onValueChange,
}) => {
	// const { t } = useTranslation();
	return (
		<TextFieldStyled
			variant="outlined"
			placeholder={"search_text" + "..."}
			value={value}
			onChange={(e) => onValueChange(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon color="disabled" />
					</InputAdornment>
				),
			}}
		/>
	);
};

const ToggleButtonComponent: ComponentType<ColumnChooser.ToggleButtonProps> = ({
	onToggle,
	buttonRef,
}) => {
	// const { t } = useTranslation();

	return (
		<Button
			variant="outlined"
			startIcon={<FilterListIcon />}
			color="primary"
			onClick={onToggle}
			ref={(filterButtonRef) => buttonRef(filterButtonRef!)}>
			Filter Text
		</Button>
	);
};

// const GroupComponent: ComponentType<GroupingPanel.EmptyMessageProps> = () => {
// 	// const { t } = useTranslation();

// 	return <span>drag</span>;
// };

const CustomTable = ({
	isLoading,
	grid,
	filteringState,
	integratedFiltering,
	groupingState,
	sortingState,
	summaryState,
	pagingState,
	customPaging,
	table,
	tableHeaderRow,
	tableColumnVisibility,
	tableFilterRow,
	tableRowDetail,
	children,
	hasPaging,
	hasSearch,
	hasSort,
	hasFilter,
	hasGrouping,
	hasToggleVisibility,
	hasVerticalPadding,
	// hasExport,
	hasSelect,
	selection,
	setSelection,
	// customExport,
	hasHorizontalPadding = true,
	hasBoxShadow = true,
	paperElevation = 0,
	hasSummary,
	columnReordering = [],
	defaultColumnWidths = [],
}: CustomTableProps) => {
	const [
		columnIntegratedFilteringExtensionsState,
		setColumnIntegratedFilteringExtensionsState,
	] = useState(integratedFiltering?.columnExtensions ?? []);
	const [grouping, setGrouping] = useState<Grouping[]>([]);

	const [rightColumns] = useState(["Action"]);
	const [leftColumns] = useState(["RowIndex", "ReferNo", "SectorCode"]);
	// const [expandedRowId, setExpandedRowId] = useState(null);

	const onHiddenColumnNamesChange = (hiddenColumnNames: string[]) => {
		setColumnIntegratedFilteringExtensionsState(
			hiddenColumnNames
				.map((columnName) => ({
					columnName,
					predicate: () => false,
				}))
				.concat(integratedFiltering?.columnExtensions as any)
		);
	};

	const matches = useMediaQuery("(min-width:1000px)");
	useEffect(() => {}, [matches]);

	// const handleDetailRowExpand = (expandedRowIds) => {
	// 	setExpandedRowId(
	// 		expandedRowIds.length ? expandedRowIds[expandedRowIds.length - 1] : null
	// 	);
	// };

	return (
		<Paper
			elevation={paperElevation}
			style={{
				position: "relative",
				padding: `${hasVerticalPadding ? 20 : 0}px ${
					hasHorizontalPadding ? 20 : 0
				}px`,
				zIndex: 0,
				boxShadow: hasBoxShadow
					? "-0px -0px 10px 0px rgba(0, 0, 0, 0.1)"
					: undefined,
			}}
			className="table_container">
			<Grid {...grid}>
				{children}
				{/* <RowDetailState /> */}
				{/* <RowDetailState
					expandedRowIds={expandedRowId !== null ? [expandedRowId] : []}
					onExpandedRowIdsChange={handleDetailRowExpand}
				/> */}
				<VirtualTable columnExtensions={table?.columnExtensions} />

				<SearchState />

				<SortingState {...sortingState} />
				<IntegratedSorting />

				<FilteringState {...filteringState} />
				<IntegratedFiltering
					columnExtensions={columnIntegratedFilteringExtensionsState}
				/>

				<DragDropProvider />

				<GroupingState
					grouping={grouping}
					onGroupingChange={setGrouping}
					{...groupingState}
				/>
				{/* <GroupingPanel.EmptyMessage
          getMessage={(messageKey: string) => "string"}
          
        /> */}
				<IntegratedGrouping />

				<EditingState onCommitChanges={() => {}} />

				<PagingState {...pagingState} />
				<CustomPaging {...customPaging} />

				<SelectionState
					selection={selection}
					onSelectionChange={setSelection}
				/>
				{/* <IntegratedSelection /> */}

				{/* <TableGroupRow.InlineSummary getMessage={(messageKey: string) => "string"}  /> */}

				{hasSelect && (
					<TableSelection
						selectByRowClick
						highlightRow
						showSelectionColumn={true}
					/>
				)}

				<SummaryState {...summaryState} />
				<IntegratedSummary calculator={totalCalculator} />

				<Table
					tableComponent={TableComponent}
					headComponent={HeadComponent}
					{...table}
				/>

				{columnReordering.length ? (
					<TableColumnReordering defaultOrder={columnReordering} />
				) : (
					[]
				)}

				{defaultColumnWidths.length ? (
					<>
						<TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
					</>
				) : null}

				<TableHeaderRow showSortingControls={hasSort} {...tableHeaderRow} />

				{tableRowDetail && <TableRowDetail {...tableRowDetail} />}

				{hasGrouping && <TableGroupRow />}

				{hasToggleVisibility && (
					<TableColumnVisibility
						{...tableColumnVisibility}
						onHiddenColumnNamesChange={onHiddenColumnNamesChange}
					/>
				)}

				{hasFilter && <TableFilterRow showFilterSelector {...tableFilterRow} />}

				{hasSummary && (
					<TableSummaryRow
						messages={messages as any}
						totalRowComponent={TotalRowComponent}
					/>
				)}

				<TableFixedColumns
					rightColumns={rightColumns}
					leftColumns={leftColumns}
				/>

				{hasPaging && <PagingPanel pageSizes={[5, 10, 25, 50]} />}

				{/* {(hasSearch || hasGrouping || hasToggleVisibility || hasExport) && (
					<Toolbar
						rootComponent={(props) => (
							<ToolbarComponent
								{...props}
								hasExport={hasExport}
								rows={grid.rows}
								columns={grid.columns}
								customExport={customExport}
							/>
						)}
					/>
				)} */}

				{hasGrouping && <GroupingPanel showGroupingControls />}

				{hasSearch && <SearchPanel inputComponent={InputSearchComponent} />}

				{hasToggleVisibility && (
					<ColumnChooser toggleButtonComponent={ToggleButtonComponent} />
				)}
			</Grid>
			{isLoading && <Loading />}
		</Paper>
	);
};

export default CustomTable;
