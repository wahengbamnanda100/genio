/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import ScanComponent from "./Scan";
import SelectMenuBox from "./Carrousal";
import { useEffect, useState } from "react";
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
import AlergicBanner from "./AllergyBanner/AlergicBanner";
import { useFormContext, useWatch } from "react-hook-form";
import { cardDetailSchema } from "../../../Component-types/posMenu.type";

const RightMenuSection = () => {
	const dispatch: AppDispatch = useDispatch();

	const { control } = useFormContext<cardDetailSchema>();

	const [cetagoryListParam] = useState<CategoryListingTypeRequestBodiesType>({
		BusinessUnitId: "1",
		ShowroomId: "147",
	});

	const [menuParam, setMenuParam] = useState<MenuListRequstBodiesType>({
		BusinessUnitId: "1", //todo change it later
		ShowroomId: "147", //todo change it later
		CategoryId: "",
	});

	// const [studentNameWtach] = useWatch({
	// 	control,
	// 	name: ["name"],
	// });

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

	// useEffect(() => {
	// 	if (studentNameWtach) {
	// 		console.log("studentNameWtach", studentNameWtach);
	// 	}
	// }, [studentNameWtach]);

	return (
		<Grid item xs={12} md={6}>
			<ScanComponent />
			{/* //todo add toggle accordign to allergy */}
			{/* {studentNameWtach?.AllergicCategory.length > 0 && (
				<AlergicBanner foodItems="COLD/ICED & FIZZY DRINKS,EGGS,ICE CREAM,NUTS" />
			)} */}
			<AlergicBanner foodItems="COLD/ICED & FIZZY DRINKS,EGGS,ICE CREAM,NUTS,MILK,SEA FOOD,BANANA,APPLE,PUMPKIN,CRABS,LOBSTER,OATS," />

			<RightSpacing />

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
