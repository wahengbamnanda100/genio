import { Box, Grid } from "@mui/material";
import ScanComponent from "./Scan";
import SelectMenuBox from "./Carrousal";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { PosMenuItem, addPosMenu } from "../../../../store/slices/posMenuSlice";

type itemsType = {
	id: string;
	description: string;
	price: number;
	calories: number;
};

type foodType = {
	category: string;
	items: itemsType[];
};

type foodDataType = foodType[];

interface RightMenuProps {
	data: foodDataType;
}

const RightMenuSection: FC<RightMenuProps> = ({ data }) => {
	const dispatch: AppDispatch = useDispatch();

	const [foodItems, setFoodItems] = useState<itemsType[]>([]);

	const handleCategory = (category: unknown) => {
		//todo chang later
		const filteredCategory = data.find((food) => food.category === category);

		if (filteredCategory) {
			setFoodItems(filteredCategory.items);
		} else {
			setFoodItems([]);
		}
	};

	const handleItem = (item: unknown) => {
		console.log("item clicked", item);
		const typedItem = item as itemsType;
		const temp: PosMenuItem = {
			id: typedItem.id,
			description: typedItem.description,
			unitPrice: typedItem.price,
			quantity: 1,
			netAmount: typedItem.price,
			amount: typedItem.price,
			discount: 0,
		};
		dispatch(addPosMenu(temp));
	};
	return (
		<Grid item xs={12} md={6}>
			<ScanComponent />

			<SelectMenuBox data={data} category={true} onClickItem={handleCategory} />

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
