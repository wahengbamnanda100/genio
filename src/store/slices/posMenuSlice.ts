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

const calculateDiscountAmount = (
	totalAmount: number,
	discountPercentage: number
): number => {
	return parseFloat((totalAmount * (discountPercentage / 100)).toFixed(2));
};

// const calculateDiscountPercentage = (
// 	discountAmount: number,
// 	totalAmount: number
// ): number => {
// 	if (totalAmount === 0) {
// 		return 0;
// 	}
// 	const discountPercentage = (discountAmount / totalAmount) * 100;
// 	return parseFloat(discountPercentage.toFixed(2));
// };

const calculateNetTotalAmount = (
	totalAmount: number,
	discountPercentage: number
): number => {
	const discount = totalAmount * (discountPercentage / 100);
	return parseFloat((totalAmount - discount).toFixed(2));
};

const recalculateTotals = (state: PosMenu) => {
	state.totalAmount = calculateTotalAmount(state.menuTable);
	state.discountAmount = calculateDiscountAmount(
		state.totalAmount,
		state.discountPercentage
	);
	state.netTotal = calculateNetTotalAmount(
		state.totalAmount,
		state.discountPercentage
	);
};

const posMenuSlice = createSlice({
	name: "posMenu",
	initialState,
	reducers: {
		addPosMenu: (state, action: PayloadAction<PosMenuItem>) => {
			const existingItem = state.menuTable.find(
				(item) => item.id === action.payload.id
			);
			console.log("call add item");

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
		// editMenuItem: (state, action: PayloadAction<PosMenuItem>) => {
		// 	const index = state.menuTable.findIndex(
		// 		(item) => item.id === action.payload.id
		// 	);
		// 	if (index !== -1) {
		// 		const updatedItem = {
		// 			...action.payload,
		// 			amount: parseFloat(action.payload.amount.toFixed(2)),
		// 			netAmount: parseFloat(action.payload.netAmount.toFixed(2)),
		// 		};
		// 		state.menuTable[index] = updatedItem;
		// 	}
		// 	recalculateTotals(state); // Recalculate after edit
		// },
		setMenuItems: (state, action: PayloadAction<PosMenuItem[]>) => {
			state.menuTable = action.payload.map((item) => ({
				...item,
				amount: parseFloat(item.amount.toFixed(2)),
				netAmount: parseFloat(item.netAmount.toFixed(2)),
			}));
			recalculateTotals(state); // Recalculate after setting items
		},
		setNetTotalAmount: (state, action: PayloadAction<number>) => {
			state.discountPercentage = action.payload;
			recalculateTotals(state); // Recalculate after net total change
		},
		// setDiscountPercentage: (state, action: PayloadAction<number>) => {
		// 	state.discountAmount = action.payload;
		// 	state.discountPercentage = calculateDiscountPercentage(
		// 		state.discountAmount,
		// 		state.totalAmount
		// 	);
		// 	state.netTotal = parseFloat(
		// 		(state.totalAmount - state.discountAmount).toFixed(2)
		// 	);
		// },
		// updateMenuItem: (
		// 	state,
		// 	action: PayloadAction<{ [key: number]: Partial<PosMenuItem> }>
		// ) => {
		// 	const updates = action.payload;
		// 	for (const index in updates) {
		// 		const itemIndex = parseInt(index);
		// 		if (!isNaN(itemIndex) && state.menuTable[itemIndex]) {
		// 			const itemUpdates: any = updates[itemIndex];
		// 			for (const key in itemUpdates) {
		// 				if (
		// 					itemUpdates[key] !== undefined &&
		// 					key in state.menuTable[itemIndex]
		// 				) {
		// 					(state.menuTable[itemIndex][key as keyof PosMenuItem] as any) =
		// 						itemUpdates[key];
		// 				}
		// 			}

		// 			const item = state.menuTable[itemIndex];
		// 			item.amount = parseFloat((item.unitPrice * item.quantity).toFixed(2));
		// 			item.netAmount = parseFloat((item.amount - item.discount).toFixed(2));
		// 		}
		// 	}
		// 	recalculateTotals(state); // Recalculate after update
		// },
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

export const selectDiscountAmount = createSelector(
	(state: RootState) => state.posMenuTable.totalAmount,
	(state: RootState) => state.posMenuTable.discountPercentage,
	(totalAmount, discountPercentage) =>
		calculateDiscountAmount(totalAmount, discountPercentage)
);

export const selectNetTotalAmount = createSelector(
	(state: RootState) => state.posMenuTable.totalAmount,
	(state: RootState) => state.posMenuTable.discountPercentage,
	(totalAmount, discountPercentage) =>
		calculateNetTotalAmount(totalAmount, discountPercentage)
);

export const selectDiscountPercent = (state: RootState) =>
	state.posMenuTable.discountPercentage;

export const selectDiscountDisable = (state: RootState) =>
	state.posMenuTable.discountDisable;

export const {
	addPosMenu,
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
