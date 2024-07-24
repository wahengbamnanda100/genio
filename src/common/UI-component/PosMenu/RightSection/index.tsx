import { Box, Grid } from "@mui/material";
import ScanComponent from "./Scan";
import SelectMenuBox from "./Carrousal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { PosMenuItem, addPosMenu } from "../../../../store/slices/posMenuSlice";
import { CategoryDetailsType, ItemDetailsType } from "../../../../services";
import { dummyMenuData } from "../../../Component-types/posMenu.type";

// interface RightMenuProps {
// 	data: MenuItemDataType;
// }

const RightMenuSection = () => {
	const dispatch: AppDispatch = useDispatch();
	const data = dummyMenuData;

	const [foodItems, setFoodItems] = useState<ItemDetailsType[]>([]);

	const handleCategory = (item: CategoryDetailsType) => {
		const filteredCategory = data.CategoryDetails.find(
			(category) => category.CategoryId === item.CategoryId
		);

		if (filteredCategory) {
			setFoodItems(data.ItemDetails); // Assuming each item has a CategoryId field
		} else {
			setFoodItems([]);
		}
	};

	const handleItem = (item: unknown) => {
		console.log("item clicked", item);
		const typedItem = item as ItemDetailsType;
		const temp: PosMenuItem = {
			id: typedItem.PartId,
			description: typedItem.PartDescription,
			unitPrice: Number(typedItem.Price),
			quantity: 1,
			netAmount: Number(typedItem.Price),
			amount: Number(typedItem.Price),
			discount: 0,
		};
		dispatch(addPosMenu(temp));
	};
	return (
		<Grid item xs={12} md={6}>
			<ScanComponent />

			<SelectMenuBox
				data={data.CategoryDetails}
				category={true}
				onClickItem={handleCategory as (item: unknown) => void}
			/>

			<RightSpacing />

			<SelectMenuBox data={foodItems} onClickItem={handleItem} />
		</Grid>
	);
};

export const RightSpacing = () => {
	return (
		<Box
			sx={{
				width: "100%",
				m: 2,
			}}
		/>
	);
};

export default RightMenuSection;
