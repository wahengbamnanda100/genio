//!_________NEW__________

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
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

const calculateTotalAmount = (menuTable: PosMenuItem[]): number => {
	return parseFloat(
		menuTable.reduce((total, item) => total + item.netAmount, 0).toFixed(2)
	);
};

// const calculateDiscountAmount = (
// 	totalAmount: number,
// 	discountPercentage: number
// ): number => {
// 	return parseFloat((totalAmount * (discountPercentage / 100)).toFixed(2));
// };

const calculateDiscountPercentage = (
	discountAmount: number,
	totalAmount: number
): number => {
	if (totalAmount === 0) {
		return 0;
	}
	const discountPercentage = (discountAmount / totalAmount) * 100;
	return parseFloat(discountPercentage.toFixed(5));
};

const calculateNetTotalAmount = (
	totalAmount: number,
	discountPercentage: number
): number => {
	const discount = totalAmount * (discountPercentage / 100);
	return parseFloat((totalAmount - discount).toFixed(2));
};

const recalculateTotals = (state: PosMenu) => {
	state.totalAmount = calculateTotalAmount(state.menuTable);
	state.discountPercentage = calculateDiscountPercentage(
		state.discountAmount,
		state.totalAmount
	);
	state.netTotal = calculateNetTotalAmount(
		state.totalAmount,
		state.discountPercentage
	);
};
// const recalculateTotals = (state: PosMenu) => {
// 	// Recalculate total amount from menu items
// 	state.totalAmount = calculateTotalAmount(state.menuTable);

// 	// Keep discountAmount fixed, recalculate discountPercentage based on totalAmount
// 	if (state.totalAmount > 0 && state.discountAmount) {
// 		state.discountPercentage = (state.discountAmount / state.totalAmount) * 100;
// 	} else {
// 		state.discountPercentage = 0; // Prevent division by zero
// 	}

// 	// Recalculate the net total amount using the discount amount
// 	state.netTotal = state.totalAmount - state.discountAmount;
// };

const posMenuSlice = createSlice({
	name: "posMenu",
	initialState,
	reducers: {
		addPosMenu: (state, action: PayloadAction<PosMenuItem>) => {
			const existingItem = state.menuTable.find(
				(item) => item.id === action.payload.id
			);
			//console.log("call add item");

			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
				existingItem.amount = parseFloat(
					(existingItem.unitPrice * existingItem.quantity).toFixed(2)
				);
				existingItem.netAmount = parseFloat(
					(existingItem.amount - existingItem.discount).toFixed(2)
				);
			} else {
				const newItem = {
					...action.payload,
					amount: parseFloat(action.payload.amount.toFixed(2)),
					netAmount: parseFloat(action.payload.netAmount.toFixed(2)),
				};
				state.menuTable.push(newItem);
			}
			// Call recalculateTotals once instead of repeating logic
			recalculateTotals(state);
		},

		// New reducer to add a collection of menu items
		addMenuItems: (state, action: PayloadAction<PosMenuItem[]>) => {
			// Replace the entire menuTable with the new items
			state.menuTable = action.payload.map((item) => ({
				...item,
				amount: parseFloat(item.amount.toFixed(2)),
				netAmount: parseFloat(item.netAmount.toFixed(2)),
				discount: parseFloat(item.discount.toFixed(2)),
			}));

			// Recalculate totals after replacing the menu items
			recalculateTotals(state);
		},

		removePosMenu: (state, action: PayloadAction<string>) => {
			state.menuTable = state.menuTable.filter(
				(item) => item.id !== action.payload
			);
			recalculateTotals(state); // Recalculate after removal
		},
		incrementItemQuantity: (state, action: PayloadAction<string>) => {
			const item = state.menuTable.find((item) => item.id === action.payload);
			if (item) {
				item.quantity += 1;
				item.amount = parseFloat((item.unitPrice * item.quantity).toFixed(2));
				item.netAmount = parseFloat((item.amount - item.discount).toFixed(2));
			}
			recalculateTotals(state); // Recalculate after increment
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
			recalculateTotals(state); // Recalculate after decrement
		},

		setMenuItems: (state, action: PayloadAction<PosMenuItem[]>) => {
			state.menuTable = action.payload.map((item) => ({
				...item,
				amount: parseFloat(item.amount.toFixed(2)),
				netAmount: parseFloat(item.netAmount.toFixed(2)),
			}));
			recalculateTotals(state); // Recalculate after setting items
		},
		setNetTotalAmount: (state, action: PayloadAction<number>) => {
			state.discountAmount = action.payload;
			recalculateTotals(state); // Recalculate after net total change
		},

		resetPosMenu: () => {
			return initialState;
		},
	},
});

export const selectMenuTable = (state: RootState) =>
	state.posMenuTable.menuTable;

export const selectTotalAmount = createSelector(
	(state: RootState) => state.posMenuTable.menuTable,
	(menuTable) => calculateTotalAmount(menuTable)
);

export const selectDiscountAmount = (state: RootState) =>
	state.posMenuTable.discountAmount;

export const selectNetTotalAmount = createSelector(
	(state: RootState) => state.posMenuTable.totalAmount,
	(state: RootState) => state.posMenuTable.discountPercentage,
	(totalAmount, discountPercentage) =>
		calculateNetTotalAmount(totalAmount, discountPercentage)
);

export const selectDiscountPercent = createSelector(
	(state: RootState) => state.posMenuTable.discountAmount,
	(state: RootState) => state.posMenuTable.totalAmount,
	(discountAmount, totalAmount) =>
		calculateDiscountPercentage(discountAmount, totalAmount)
);

export const selectDiscountDisable = (state: RootState) =>
	state.posMenuTable.discountDisable;

export const {
	addPosMenu,
	addMenuItems,
	removePosMenu,
	incrementItemQuantity,
	decrementItemQuantity,
	// editMenuItem,
	setMenuItems,
	setNetTotalAmount,
	// setDiscountPercentage,
	// updateMenuItem,
	resetPosMenu,
} = posMenuSlice.actions;

export default posMenuSlice.reducer;
