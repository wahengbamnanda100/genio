/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableEditColumn } from "@devexpress/dx-react-grid-material-ui";
import DeleteButton from "./DeleteButton";
import { TableHeadStyled, TableStyled } from "../CustomTable.style";
import { ComponentType } from "react";
// import { styled } from "@mui/material";

interface StyledCommandCellProps extends TableEditColumn.CellProps {
	style?: React.CSSProperties;
}

interface FocusableCellProps extends Table.DataCellProps {
	onClick?: () => void;
}

const commandComponents: {
	[key: string]: React.FC<{ onExecute: () => void }>;
} = {
	delete: DeleteButton,
};

export const Command: React.ComponentType<TableEditColumn.CommandProps> = ({
	id,
	onExecute,
}) => {
	const CommandButton = commandComponents[id];
	return CommandButton ? <CommandButton onExecute={onExecute} /> : null;
};

export const StyledCommandCell: React.FC<StyledCommandCellProps> = ({
	children,
	style,
	...restProps
}) => {
	return (
		<TableEditColumn.Cell
			{...restProps}
			style={{
				// backgroundColor: lighten(theme.palette.primary.light, 0.9),
				display: "flex",
				padding: 0,
				justifyContent: "center",
				alignItems: "center",
				// backgroundColor: "blanchedalmond",
				height: "100%",
				...style,
				// ...style,
			}}>
			{children}
		</TableEditColumn.Cell>
	);
};

export const FocusableCell: React.FC<FocusableCellProps> = ({
	onClick,
	...restProps
}) => <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />;

export const TableComponent: ComponentType<object> = (props) => {
	return <TableStyled {...props} className="table" />;
};

export const HeadComponent: ComponentType<object> = (props) => {
	return <TableHeadStyled {...props} className="tableHead" />;
};

// export const CustomTableRow: React.FC<CustomTableRowProps> = ({
// 	tableRow,
// 	selection,
// 	...restProps
// }) => {
// 	const theme = useTheme();

// 	// Check if the row is selected
// 	const selected =
// 		selection &&
// 		tableRow.rowId !== undefined &&
// 		selection.includes(tableRow.rowId);

// 	const style = {
// 		backgroundColor: selected ? theme.palette.primary.dark : "inherit",
// 		height: "2rem",
// 	};

// 	return <Table.Row {...restProps} tableRow={tableRow} style={style} />;
// };

// const StyledTableRow = styled(Table.Row)(() => ({
// 	"&.selected": {
// 		backgroundColor: "red !important",
// 	},
// }));

// export const CustomTableRow = ({
// 	row,
// 	children,
// 	tableRow,
// 	...restProps
// }: any) => (
// 	<StyledTableRow
// 		{...restProps}
// 		tableRow={tableRow}
// 		className={tableRow?.selected ? "selected" : ""}>
// 		{children}
// 	</StyledTableRow>
// );
