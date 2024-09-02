/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Table,
	TableEditColumn,
	TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";
import DeleteButton from "./DeleteButton";
import { TableHeadStyled, TableStyled } from "../CustomTable.style";
import { ComponentType } from "react";
import {
	FormControl,
	MenuItem,
	Select,
	styled,
	TableCell,
} from "@mui/material";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { NumericFormat } from "react-number-format";
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

const SelectStyled = styled(Select)`
	& .MuiSelect-outlined.MuiSelect-outlined {
		padding: 10px !important;
	}
`;

export const CustomTableCardSwipeFilterEditor = ({
	filter,
	onFilter,
}: TableFilterRow.CellProps) => {
	return (
		<TableCell>
			<FormControl fullWidth>
				<SelectStyled
					defaultValue={"All"}
					fullWidth
					value={filter?.value ?? ""}
					placeholder="filter..."
					onChange={(e: any) =>
						onFilter(
							e.target.value === "all"
								? null
								: { columnName: "CardSwipe", value: e.target.value }
						)
					}
					size="small"
					style={{ maxHeight: 50, fontWeight: 400 }}
					variant="standard">
					<MenuItem style={{ display: "block", fontWeight: 400 }} value={"all"}>
						All
					</MenuItem>
					<MenuItem style={{ display: "block", fontWeight: 400 }} value={"YES"}>
						YES
					</MenuItem>
					<MenuItem style={{ display: "block", fontWeight: 400 }} value={"NO"}>
						NO
					</MenuItem>
				</SelectStyled>
			</FormControl>
		</TableCell>
	);
};

export const ListFilterCellComponent: React.ComponentType<
	TableFilterRow.CellProps
> = (props) => {
	if (props.column.name === "rowIndex" || props.column.name === "Action") {
		return <TableCell></TableCell>;
	}
	if (props.column.name === "action") {
		return <TableCell></TableCell>;
	}
	if (props.column.name === "CardSwipe") {
		return <CustomTableCardSwipeFilterEditor {...props} />;
	}
	return <TableFilterRow.Cell {...props} />;
};

const CurrencyContent = styled("h4")`
	font-size: 1em;
	font-weight: 400;
	line-height: 1.75;
	min-width: 64px;
	padding: 0px 2px;
	margin: 0 ;
	text-align: end;
	width: 100%;
	min-width: 91px;
	display: block;
	}
`;

export const CustomTableCurrrencyCellFormatter: React.ComponentType<
	DataTypeProvider.ValueFormatterProps
> = ({ value }) => {
	return (
		<NumericFormat
			displayType="text"
			value={value}
			// thousandsGroupStyle="lakh"
			thousandSeparator
			valueIsNumericString
			decimalScale={2}
			fixedDecimalScale
			renderText={(value) => <CurrencyContent>{value}</CurrencyContent>}
		/>
	);
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
