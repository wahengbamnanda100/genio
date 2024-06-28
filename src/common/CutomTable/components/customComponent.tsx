import { Table, TableEditColumn } from "@devexpress/dx-react-grid-material-ui";
import DeleteButton from "./DeleteButton";
import { TableHeadStyled, TableStyled } from "../CustomTable.style";
import { ComponentType } from "react";

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
