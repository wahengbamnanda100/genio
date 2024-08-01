import { Box, Grid } from "@mui/material";
import ScanComponent from "./Scan";
import SelectMenuBox from "./Carrousal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { PosMenuItem, addPosMenu } from "../../../../store/slices/posMenuSlice";

import {
	CategoryDetailsType,
	ItemDetailsType,
	MenuItemResponseType,
	MenuListRequstBodiesType,
} from "../../../../services/aoi.type";
import { MenuList } from "../../../../services";

const RightMenuSection = () => {
	const dispatch: AppDispatch = useDispatch();

	const [menuParam, setMenuParam] = useState<MenuListRequstBodiesType>({
		BusinessUnitId: "1", //todo change it later
		ShowroomId: "147", //todo change it later
		CategoryId: "",
	});

	const { data: menuData, isLoading, isFetched } = MenuList(menuParam);

	const handleCategory = (item: CategoryDetailsType) => {
		// const filteredCategory = data.CategoryDetails.find(
		// 	(category) => category.CategoryId === item.CategoryId
		// );

		setMenuParam((prev) => ({ ...prev, CategoryId: item.CategoryId }));
	};

	const handleItem = (item: unknown) => {
		// console.log("item clicked", item);
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
				data={
					menuData && (menuData as MenuItemResponseType).status === "1"
						? (menuData as MenuItemResponseType).Data[0].CategoryDetails
						: []
				}
				isLoading={isLoading}
				category={true}
				onClickItem={handleCategory as (item: unknown) => void}
			/>

			<RightSpacing />

			<SelectMenuBox
				isLoading={isLoading}
				data={
					isFetched &&
					menuData &&
					(menuData as MenuItemResponseType).status === "1"
						? (menuData as MenuItemResponseType).Data[0].ItemDetails
						: []
				}
				onClickItem={handleItem}
			/>
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
