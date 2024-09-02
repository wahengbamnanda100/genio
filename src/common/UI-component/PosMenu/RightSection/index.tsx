import { Box, Grid } from "@mui/material";
import ScanComponent from "./Scan";
import SelectMenuBox from "./Carrousal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { PosMenuItem, addPosMenu } from "../../../../store/slices/posMenuSlice";

import {
	CategoryDetailsType,
	CategoryListingTypeRequestBodiesType,
	CategoryListingTypeResponseType,
	ItemDetailsType,
	ItemListingResponseType,
	MenuListRequstBodiesType,
} from "../../../../services/aoi.type";
import { GetCetagoryListing, GetItemListing } from "../../../../services";

const RightMenuSection = () => {
	const dispatch: AppDispatch = useDispatch();

	const [cetagoryListParam] = useState<CategoryListingTypeRequestBodiesType>({
		BusinessUnitId: "1",
		ShowroomId: "147",
	});

	const [menuParam, setMenuParam] = useState<MenuListRequstBodiesType>({
		BusinessUnitId: "1", //todo change it later
		ShowroomId: "147", //todo change it later
		CategoryId: "",
	});

	const {
		data: caetgoryData,
		isLoading: cetagoryIsLoading,
		isFetched: cetegoryIsFetch,
	} = GetCetagoryListing(cetagoryListParam, {
		enabled: true,
	});

	const {
		data: menuItemData,
		isLoading: menuItemIsLoading,
		isFetched: menuItemIsFetched,
	} = GetItemListing(menuParam, {
		enabled: true,
	});

	const handleCategory = (item: CategoryDetailsType) => {
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
					cetegoryIsFetch &&
					caetgoryData &&
					(caetgoryData as CategoryListingTypeResponseType).status === "1"
						? (caetgoryData as CategoryListingTypeResponseType).Data
						: []
				}
				isLoading={cetagoryIsLoading}
				category={true}
				onClickItem={handleCategory as (item: unknown) => void}
			/>

			<RightSpacing />

			<SelectMenuBox
				isLoading={menuItemIsLoading}
				data={
					menuItemIsFetched &&
					menuItemData &&
					(menuItemData as ItemListingResponseType).status === "1"
						? (menuItemData as ItemListingResponseType).Data
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
