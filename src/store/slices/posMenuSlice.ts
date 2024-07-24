/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface PosMenuItem {
	id: string;
	description: string;
	unitPrice: number;
	quantity: number;
	netAmount: number;
	amount: number;
	discount: number;
}

interface PosMenu {
	menuTable: PosMenuItem[];
	totalAmount: number;
	discountAmount: number;
	discountPercentage: number;
	netTotal: number;
	discountDisable: boolean;
}

const initialState: PosMenu = {
	menuTable: [],
	totalAmount: 0,
	discountPercentage: 0,
	netTotal: 0,
	discountAmount: 0,
	discountDisable: false,
};

// const hasDiscount = (updates: {
// 	[key: number]: Partial<PosMenuItem>;
// }): boolean => {
// 	for (const key in updates) {
// 		if (updates[key].discount !== undefined) {
// 			return true;
// 		}
// 	}
// 	return false;
// };

const calculateTotalAmount = (menuTable: PosMenuItem[]): number => {
	return parseFloat(
		menuTable.reduce((total, item) => total + item.netAmount, 0).toFixed(2)
	);
};

const calculateDiscountAmount = (
	totalAmount: number,
	discountPercentage: number
) => {
	return parseFloat((totalAmount * (discountPercentage / 100)).toFixed(2));
};

const calculateDiscountPercentage = (
	discountAmount: number,
	totalAmount: number
): number => {
	if (totalAmount === 0) {
		return 0; // Handle division by zero edge case
	}

	const discountPercentage = (discountAmount / totalAmount) * 100;
	return parseFloat(discountPercentage.toFixed(2));
};

const calculateNetTotalAmount = (
	totalAmount: number,
	discountPercentage: number
): number => {
	const discount = totalAmount * (discountPercentage / 100);
	return parseFloat((totalAmount - discount).toFixed(2));
};

const posMenuSlice = createSlice({
	name: "posMenu",
	initialState,
	reducers: {
		addPosMenu: (state, action: PayloadAction<PosMenuItem>) => {
			const existingItem = state.menuTable.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				// Increment the quantity and update amount and netAmount
				existingItem.quantity += action.payload.quantity;
				existingItem.amount = parseFloat(
					(existingItem.unitPrice * existingItem.quantity).toFixed(2)
				);
				existingItem.netAmount = parseFloat(
					(existingItem.amount - existingItem.discount).toFixed(2)
				);
			} else {
				// Add new item if it doesn't exist
				const newItem = {
					...action.payload,
					amount: parseFloat(action.payload.amount.toFixed(2)),
					netAmount: parseFloat(action.payload.netAmount.toFixed(2)),
				};
				state.menuTable.push(newItem);
			}

			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		removePosMenu: (state, action: PayloadAction<string>) => {
			state.menuTable = state.menuTable.filter(
				(item) => item.id !== action.payload
			);
			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		incrementItemQuantity: (state, action: PayloadAction<string>) => {
			const item = state.menuTable.find((item) => item.id === action.payload);
			if (item) {
				item.quantity += 1;
				item.amount = parseFloat((item.unitPrice * item.quantity).toFixed(2));
				item.netAmount = parseFloat((item.amount - item.discount).toFixed(2));
			}
			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		decrementItemQuantity: (state, action: PayloadAction<string>) => {
			const item = state.menuTable.find((item) => item.id === action.payload);
			if (item) {
				item.quantity -= 1;
				if (item.quantity <= 0) {
					state.menuTable = state.menuTable.filter(
						(menuItem) => menuItem.id !== item.id
					);
				} else {
					item.amount = parseFloat((item.unitPrice * item.quantity).toFixed(2));
					item.netAmount = parseFloat((item.amount - item.discount).toFixed(2));
				}
			}

			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		editMenuItem: (state, action: PayloadAction<PosMenuItem>) => {
			const index = state.menuTable.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				const updatedItem = {
					...action.payload,
					amount: parseFloat(action.payload.amount.toFixed(2)),
					netAmount: parseFloat(action.payload.netAmount.toFixed(2)),
				};
				state.menuTable[index] = updatedItem;
			}

			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		setMenuItems: (state, action: PayloadAction<PosMenuItem[]>) => {
			state.menuTable = action.payload.map((item) => ({
				...item,
				amount: parseFloat(item.amount.toFixed(2)),
				netAmount: parseFloat(item.netAmount.toFixed(2)),
			}));
			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		setNetTotalAmount: (state, action: PayloadAction<number>) => {
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountPercentage = action.payload;
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
		setDiscountPercentage: (state, action: PayloadAction<number>) => {
			state.discountAmount = action.payload;
			state.discountPercentage = calculateDiscountPercentage(
				state.discountAmount,
				state.totalAmount
			);
			state.netTotal = parseFloat(
				(state.totalAmount - state.discountAmount).toFixed(2)
			);
		},
		updateMenuItem: (
			state,
			action: PayloadAction<{ [key: number]: Partial<PosMenuItem> }>
		) => {
			const updates = action.payload;
			// const check = hasDiscount(action.payload);
			// state.discountDisable = check;
			for (const index in updates) {
				const itemIndex = parseInt(index);
				if (!isNaN(itemIndex) && state.menuTable[itemIndex]) {
					const itemUpdates: any = updates[itemIndex];
					for (const key in itemUpdates) {
						if (
							itemUpdates[key] !== undefined &&
							key in state.menuTable[itemIndex]
						) {
							(state.menuTable[itemIndex][key as keyof PosMenuItem] as any) =
								itemUpdates[key];
						}
					}

					// Update amount and netAmount according to the quantity and discount
					const item = state.menuTable[itemIndex];
					item.amount = parseFloat((item.unitPrice * item.quantity).toFixed(2));
					item.netAmount = parseFloat((item.amount - item.discount).toFixed(2));
				}
			}
			state.totalAmount = calculateTotalAmount(state.menuTable);
			state.discountAmount = calculateDiscountAmount(
				state.totalAmount,
				state.discountPercentage
			);
			state.discountPercentage = calculateDiscountPercentage(
				state.discountAmount,
				state.totalAmount
			);
			state.netTotal = calculateNetTotalAmount(
				state.totalAmount,
				state.discountPercentage
			);
		},
	},
});

export const selectMenuTable = (state: RootState) =>
	state.posMenuTable.menuTable;
export const selectTotalAmount = (state: RootState) =>
	state.posMenuTable.totalAmount;
export const selectDiscountAmount = (state: RootState) =>
	state.posMenuTable.discountAmount;
export const selectNetTotalAmount = (state: RootState) =>
	state.posMenuTable.netTotal;
export const selectDiscountPercent = (state: RootState) =>
	state.posMenuTable.discountPercentage;
export const selectDiscountDisable = (state: RootState) =>
	state.posMenuTable.discountDisable;

export const {
	addPosMenu,
	removePosMenu,
	incrementItemQuantity,
	decrementItemQuantity,
	editMenuItem,
	setMenuItems,
	setNetTotalAmount,
	setDiscountPercentage,
	updateMenuItem,
} = posMenuSlice.actions;

export default posMenuSlice.reducer;
