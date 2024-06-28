/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Paper from "@mui/material/Paper";
import { Getter } from "@devexpress/dx-react-core";
import { EditingState, SelectionState } from "@devexpress/dx-react-grid";
import {
	Grid,
	Table,
	TableHeaderRow,
	// TableEditColumn,
	TableSelection,
	TableInlineCellEditing,
	// TableEditRow,
	TableEditColumn,
	// TableEditRow,
} from "@devexpress/dx-react-grid-material-ui";

import {
	Command,
	FocusableCell,
	HeadComponent,
	StyledCommandCell,
	TableComponent,
} from "./components/customComponent";
import StyledEditCell from "./components/EditCell";
import { EditTableProps } from "./CustomTable.types";

// const getRowId = (row: Row) => row.id;

const MyGridComponent: React.FC<EditTableProps> = ({
	grid,
	paperElevation,
	hasVerticalPadding,
	hasHorizontalPadding,
	hasBoxShadow,
	children,
	table,
	editingState,
	selection,
	setSelection,
}) => {
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
				{editingState && <EditingState {...editingState} />}

				<SelectionState
					selection={selection}
					onSelectionChange={setSelection}
				/>

				<Table
					cellComponent={FocusableCell}
					tableComponent={TableComponent}
					headComponent={HeadComponent}
					{...table}
				/>
				<TableHeaderRow />
				<TableInlineCellEditing
					// cellComponent={EditCell}
					selectTextOnEditStart={false}
					cellComponent={StyledEditCell}
				/>
				<TableSelection
					selectByRowClick
					highlightRow
					showSelectionColumn={false}
				/>

				<TableEditColumn
					width={50}
					showDeleteCommand
					commandComponent={Command}
					cellComponent={StyledCommandCell}
				/>

				<Getter
					name="tableColumns"
					computed={({ tableColumns }) => {
						const editCommandKey = Symbol.for("editCommand").toString();

						const columns = tableColumns.filter(
							(c: any) => c.key !== editCommandKey
						);
						const actionCommand = tableColumns.filter(
							(c: any) => c.key === editCommandKey
						);

						return [...columns, ...actionCommand];
					}}
				/>
			</Grid>
		</Paper>
	);
};

export default MyGridComponent;
