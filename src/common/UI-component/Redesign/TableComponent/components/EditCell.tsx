/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableInlineCellEditing } from "@devexpress/dx-react-grid-material-ui";
import { TextField } from "@mui/material";

const StyledEditCell: React.FC<any> = ({
	value,
	onValueChange,
	...restProps
}) => {
	const { column } = restProps;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target;
		const regex = /^\d+(\.\d{0,2})?$/;
		if (regex.test(inputValue) || inputValue === "") {
			onValueChange(inputValue);
		}
	};

	const handleInputQunatity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target;
		const regex = /^\d+$/;
		if (regex.test(inputValue) || inputValue === "") {
			onValueChange(inputValue);
		}
	};

	switch (column.name) {
		case "description":
			return (
				<TableInlineCellEditing.Cell {...restProps}>
					<TextField
						variant="standard"
						size="small"
						value={value}
						onChange={(e) => onValueChange(e.target.value)}
						sx={{
							width: "100%",
							"& .MuiInputBase-input": {
								padding: 0,
								margin: 0,
							},
						}}
					/>
				</TableInlineCellEditing.Cell>
			);

		case "quantity":
			return (
				<TableInlineCellEditing.Cell {...restProps}>
					<TextField
						variant="standard"
						size="small"
						value={value}
						onChange={handleInputQunatity}
						inputProps={{
							maxLength: 15,
							style: { textAlign: "end" },
						}}
						sx={{
							width: "100%",
							"& .MuiInputBase-input": {
								padding: 0,
								margin: 0,
							},
						}}
					/>
				</TableInlineCellEditing.Cell>
			);

		default:
			return (
				<TableInlineCellEditing.Cell {...restProps}>
					<TextField
						variant="standard"
						size="small"
						value={value}
						inputProps={{
							maxLength: 15,
							style: { textAlign: "end" },
						}}
						onChange={handleInputChange}
						sx={{
							width: "100%",
							"& .MuiInputBase-input": {
								padding: 0,
								margin: 0,
							},
						}}
					/>
				</TableInlineCellEditing.Cell>
			);
	}
};

export default StyledEditCell;
