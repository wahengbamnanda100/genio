import { TableSelection } from "@devexpress/dx-react-grid-material-ui";
import { Checkbox } from "@mui/material";

interface CustomSelectCellProps extends TableSelection.CellProps {
	selected: boolean;
	disabled: boolean;
	onToggle: () => void;
}
export const CustomSelectCell: React.FC<CustomSelectCellProps> = ({
	selected,
	disabled,
	onToggle,
	...restProps
}) => (
	<TableSelection.Cell {...restProps} selected={selected} onToggle={onToggle}>
		<Checkbox
			checked={selected}
			disabled={disabled}
			onChange={onToggle}
			sx={{
				// bgcolor: "red",
				color: "error.main",
				"&.Mui-checked": {
					color: "secondary.main",
				},
			}}
		/>
	</TableSelection.Cell>
);
