/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Paper from "@mui/material/Paper";
// import { Getter } from "@devexpress/dx-react-core";
import {
  EditingState,
  IntegratedSelection,
  SelectionState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableFixedColumns,
  TableHeaderRow,
  // TableEditColumn,
  TableSelection,
  // TableInlineCellEditing,
  // TableEditRow,
  // TableEditColumn,
  // TableEditRow,
} from "@devexpress/dx-react-grid-material-ui";

import {
  // Command,
  // CustomTableRow,
  FocusableCell,
  HeadComponent,
  // StyledCommandCell,
  TableComponent,
} from "./components/customComponent";
// import StyledEditCell from "./components/EditCell";
import { EditTableProps } from "./CustomTable.types2";
// import { CustomSelectCell } from "./components/SelectionCell";

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
  rightColumns = [],
  leftColumns = [],
  dynamicResize,
  columnWidths,
  setColumnWidths,
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
      className="table_container"
    >
      <Grid {...grid}>
        {children}
        {editingState && <EditingState {...editingState} />}

        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />

        <IntegratedSelection />

        <Table
          cellComponent={FocusableCell}
          tableComponent={TableComponent}
          headComponent={HeadComponent}
          // rowComponent={(props) => (
          // 	<CustomTableRow {...props} selection={selection} />
          // )}
          {...table}
        />
        {dynamicResize && columnWidths && setColumnWidths && (
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
        )}
        <TableHeaderRow />
        {/* <TableInlineCellEditing
					// cellComponent={EditCell}
					selectTextOnEditStart={false}
					cellComponent={StyledEditCell}
				/> */}

        <TableSelection
          selectByRowClick
          highlightRow
          showSelectionColumn={false}
          // cellComponent={CustomSelectCell as any}
        />

        <TableFixedColumns
          rightColumns={rightColumns}
          leftColumns={leftColumns}
        />
      </Grid>
    </Paper>
  );
};

export default MyGridComponent;
