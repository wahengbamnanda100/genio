/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useForm } from "react-hook-form";
// import { MenuTableSchema } from "../../../Component-types/posMenu.type";
import {
	Box,
	ButtonBase,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import CustomTable from "../../../../CutomTable/CustomTable";
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { ReactNode, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { MenuItem } from "../../../../Component-types/posMenu.type";
import AnimateButton from "../../../Extended/AnimateButton";
import { AppDispatch, RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
	removePosMenu,
	selectMenuTable,
} from "../../../../../store/slices/posMenuSlice";

const MenuTable = () => {
	const dispatch: AppDispatch = useDispatch();
	const menuTable = useSelector((state: RootState) => selectMenuTable(state));

	const [columnExtension] = useState<GridColumnExtension[]>([
		{ columnName: "sl", width: "50" },
		// { columnName: "description", width: "160" },
		{ columnName: "quantity", width: "80", align: "right" },
		{ columnName: "unitPrice", width: "80", align: "right" },
		{ columnName: "amount", width: "80", align: "right" },
		{ columnName: "discount", width: "80", align: "right" },
		{ columnName: "netAmount", width: "100", align: "right" },
		{ columnName: "action", width: "60", align: "center" },
	]);

	const [selection, setSelection] = useState<any[]>([]);

	const handleRowDelete = (row: MenuItem) => {
		console.log("delete clicked", row.id);
		dispatch(removePosMenu(row.id));
	};

	const column: Column[] = [
		{
			title: "SL",
			name: "sl",
			getCellValue: (row) =>
				menuTable.findIndex((item) => item.id === row.id) + 1,
		},
		{
			title: "Description",
			name: "description",
		},
		{
			title: "Quantity",
			name: "quantity",
		},
		{
			title: "Unit Price",
			name: "unitPrice",
		},
		{
			title: "Amount",
			name: "amount",
		},
		{
			title: "Discount",
			name: "discount",
		},
		{
			title: "Net Amount",
			name: "netAmount",
		},
		{
			title: "Action",
			name: "action",
			getCellValue: (row: MenuItem) => (
				<IconButton
					color="error"
					onClick={() => handleRowDelete(row)}
					sx={{ p: 0, alignSelf: "center" }}>
					<DeleteOutlinedIcon
						color="error"
						fontSize="small"
						sx={{ fontSize: "0.6em", p: 0 }}
					/>
				</IconButton>
			),
		},
	];

	return (
		<Box>
			<TableHeader />
			<CustomTable
				hasHorizontalPadding={false}
				hasVerticalPadding={false}
				hasBoxShadow={false}
				isLoading={false}
				grid={{
					columns: column,
					// rows: tableData,
					rows: menuTable,
				}}
				table={{
					columnExtensions: columnExtension,
				}}
				hasSelect={true}
				selection={selection}
				setSelection={setSelection}
			/>
		</Box>
	);
};

const TableHeader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				flexGrow: 1,
				alignItems: "center",
				mb: 1,
			}}>
			<AnimateOpButton>
				<AddIcon />
			</AnimateOpButton>
			<Typography
				variant="body1"
				flexGrow={1}
				textAlign={"center"}
				fontWeight={"bold"}>
				Selected Items
			</Typography>

			<AnimateOpButton>
				<RemoveIcon />
			</AnimateOpButton>
		</Box>
	);
};

interface AnimateOpButtonProps {
	children: ReactNode;
}

const AnimateOpButton: React.FC<AnimateOpButtonProps> = ({ children }) => {
	const theme = useTheme();
	return (
		<AnimateButton>
			<ButtonBase
				color="secondary"
				sx={{
					height: "2rem",
					width: "2rem",
					bgcolor: "secondary.main",
					color: theme.palette.text.secondary,
					borderRadius: 0.5,
					p: 1,
				}}>
				{children}
			</ButtonBase>
		</AnimateButton>
	);
};

export default MenuTable;
