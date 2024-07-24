/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Paper,
	CircularProgress,
	Button,
	InputAdornment,
	useMediaQuery,
	Menu,
	MenuItem,
} from "@mui/material";
import {
	Grid,
	Table,
	TableHeaderRow,
	PagingPanel,
	TableFilterRow,
	TableColumnVisibility,
	Toolbar,
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
	RowDetailState,
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
	LoadingShade,
	TableHeadStyled,
	TableStyled,
	TableSummaryRowStyled,
	TextFieldStyled,
} from "./CustomTable.style";
import { CustomTableProps } from "./CustomTable.types";
import {
	EXPORT_TYPES,
	tableExportFn,
	tableExportFnProps,
} from "../../helpers/tableExportFn";

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

const ToolbarComponent: ComponentType<
	Toolbar.RootProps &
		Omit<tableExportFnProps, "selected"> & { hasExport?: boolean }
> = ({ rows, columns, customExport, hasExport, ...props }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuItemClick =
		(selected: (typeof EXPORT_TYPES)[number]) => () => {
			tableExportFn({ rows, columns, customExport, selected });
			setAnchorEl(null);
		};

	return (
		<Toolbar.Root {...props} style={{ borderBottom: "none", padding: "0" }}>
			{props.children}
			{hasExport && (
				<Button
					startIcon={<ArrowUpwardIcon />}
					type="button"
					variant="outlined"
					style={{
						marginLeft: 20,
						minWidth: "fit-content",
						marginRight: 0,
					}}
					onClick={handleClick}>
					Export
				</Button>
			)}
			<Menu
				elevation={0}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{
					"& .MuiPaper-root": {
						width: "120px",
						borderRadius: "0px",
						boxShadow:
							"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
					},
				}}>
				{EXPORT_TYPES.map((type) => (
					<MenuItem key={type} onClick={handleMenuItemClick(type)}>
						{type}
					</MenuItem>
				))}
			</Menu>
		</Toolbar.Root>
	);
};

const HeadComponent: ComponentType<object> = (props) => {
	return <TableHeadStyled {...props} className="tableHead" />;
};

const InputSearchComponent: ComponentType<SearchPanel.InputProps> = ({
	value,
	onValueChange,
}) => {
	return (
		<TextFieldStyled
			variant="outlined"
			placeholder={"Quick search" + "..."}
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
	return (
		<Button
			variant="outlined"
			startIcon={<FilterListIcon />}
			color="primary"
			onClick={onToggle}
			ref={(filterButtonRef) => buttonRef(filterButtonRef!)}>
			Filter
		</Button>
	);
};

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
	hasExport,
	hasSelect,
	selection,
	setSelection,
	customExport,
	hasHorizontalPadding = true,
	hasBoxShadow = true,
	paperElevation = 0,
	rightColumns = [],
	leftColumns = [],
	hasSummary,
	columnReordering = [],
	defaultColumnWidths = [],
}: CustomTableProps) => {
	const [
		columnIntegratedFilteringExtensionsState,
		setColumnIntegratedFilteringExtensionsState,
	] = useState(integratedFiltering?.columnExtensions ?? []);
	const [grouping, setGrouping] = useState<Grouping[]>([]);

	// const [rightColumns] = useState(["Action"]);
	// const [leftColumns] = useState(["RowIndex", "ReferNo", "SectorCode"]);
	const [expandedRowId, setExpandedRowId] = useState(null);

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

	const handleDetailRowExpand = (expandedRowIds: any) => {
		setExpandedRowId(
			expandedRowIds.length ? expandedRowIds[expandedRowIds.length - 1] : null
		);
	};

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
			className="table_container_main">
			<Grid {...grid}>
				{children}
				{/* <RowDetailState /> */}
				<RowDetailState
					expandedRowIds={expandedRowId !== null ? [expandedRowId] : []}
					onExpandedRowIdsChange={handleDetailRowExpand}
				/>
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

				{hasSelect && <TableSelection /*selectByRowClick*/ showSelectAll />}

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

				{(hasSearch || hasGrouping || hasToggleVisibility || hasExport) && (
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
				)}

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
