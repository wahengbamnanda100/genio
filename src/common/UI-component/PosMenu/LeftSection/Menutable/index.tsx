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
import {
	Column,
	// EditingCell,
	// EditingState,
	// EditingStateProps,
	GridColumnExtension,
} from "@devexpress/dx-react-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../../store";
import {
	decrementItemQuantity,
	incrementItemQuantity,
	removePosMenu,
	// removePosMenu,
	selectMenuTable,
	// updateMenuItem,
} from "../../../../../store/slices/posMenuSlice";
import EditingCustomTable from "../../../../CutomTable/EditableTable";
import AnimateButton from "../../../Extended/AnimateButton";
import { MenuItem } from "../../../../Component-types/posMenu.type";
// import CustomTable from "../../../../CutomTable/CustomTable";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ConfirmationDialog from "../../../../ModalComponent/ConfirmationDialog";

const MenuTable = () => {
	const dispatch: AppDispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
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
	const [selection, setSelection] = useState<(string | number)[]>([]);
	const [deleteRow, setDeleteRow] = useState<MenuItem>();
	// const [editingCells, setEditingCells] = useState<EditingCell[]>([]);
	// const [editColumnExtension] = useState<EditingState.ColumnExtension[]>([
	// 	{ columnName: "sl", editingEnabled: false },
	// ]);

	const handleRowDelete = (row: MenuItem) => {
		setDeleteRow(row);
		setOpen(true);
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
					sx={{ p: 0.1, alignSelf: "center" }}>
					<DeleteOutlinedIcon
						color="error"
						fontSize="small"
						sx={{ fontSize: "0.7em", p: 0 }}
					/>
				</IconButton>
			),
		},
	];

	useEffect(() => {
		if (menuTable.length === 0) setSelection([]);
	}, [menuTable]);

	const handleSelectionChange = (newSelection: (string | number)[]) => {
		if (newSelection.length > 0) {
			// Only keep the most recent selection
			setSelection([newSelection[newSelection.length - 1]]);
		} else {
			setSelection([]);
		}
	};

	// const commitChanges: EditingStateProps["onCommitChanges"] = ({
	// 	changed,
	// 	deleted,
	// }) => {
	// 	if (changed) {
	// 		dispatch(updateMenuItem(changed));
	// 	}
	// 	if (deleted) {
	// 		const key = deleted[0];
	// 		const deleteid = menuTable[key as number].id;
	// 		dispatch(removePosMenu(deleteid));
	// 	}
	// };

	const handleAddItem = () => {
		if (selection.length > 0) {
			const _id = menuTable[selection[0] as number].id;
			dispatch(incrementItemQuantity(_id));
		} else {
			console.log("Menu item is not slected");
		}
	};

	const handleRemoveItem = () => {
		if (selection.length > 0) {
			const _id = menuTable[selection[0] as number].id;
			dispatch(decrementItemQuantity(_id));
			if (menuTable[selection[0] as number].quantity === 1) setSelection([]);
		} else {
			console.log("Menu item is not slected");
		}
	};

	const handleConfirm = () => {
		const _id = deleteRow && deleteRow.id;
		dispatch(removePosMenu(_id!));

		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Box>
			<TableHeader
				handleAddItem={handleAddItem}
				handleRemoveItem={handleRemoveItem}
			/>

			<EditingCustomTable
				hasHorizontalPadding={false}
				hasVerticalPadding={false}
				hasBoxShadow={false}
				isLoading={false}
				grid={{
					columns: column,
					rows: menuTable,
				}}
				table={{
					columnExtensions: columnExtension,
				}}
				// editingState={{
				// 	onCommitChanges: commitChanges,
				// 	editingCells: editingCells,
				// 	onEditingCellsChange: setEditingCells,
				// 	columnExtensions: editColumnExtension,
				// }}
				// hasSelect={true}
				selection={selection}
				setSelection={handleSelectionChange}
			/>

			<ConfirmationDialog
				dialogType="delete"
				open={open}
				setOpen={setOpen}
				title="Confirm Delete"
				description="Do you want to delete the item"
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</Box>
	);
};

interface TableHeader {
	handleAddItem: () => void;
	handleRemoveItem: () => void;
}

const TableHeader: React.FC<TableHeader> = ({
	handleAddItem,
	handleRemoveItem,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				flexGrow: 1,
				alignItems: "center",
				mb: 1,
			}}>
			<AnimateOpButton handleClick={handleAddItem}>
				<AddIcon />
			</AnimateOpButton>
			<Typography
				variant="body1"
				flexGrow={1}
				textAlign={"center"}
				fontWeight={"bold"}>
				Selected Items
			</Typography>

			<AnimateOpButton handleClick={handleRemoveItem}>
				<RemoveIcon />
			</AnimateOpButton>
		</Box>
	);
};

interface AnimateOpButtonProps {
	handleClick: () => void;
	children: ReactNode;
}

const AnimateOpButton: React.FC<AnimateOpButtonProps> = ({
	handleClick,
	children,
}) => {
	const theme = useTheme();
	return (
		<AnimateButton>
			<ButtonBase
				onClick={handleClick}
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
