/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { PosMenuItem, addPosMenu } from "../../../../store/slices/posMenuSlice";
import SelectMenuBox from "./Carrousal";
import ScanComponent from "./Scan";

import { useFormContext, useWatch } from "react-hook-form";
import { GetCetagoryListing, GetItemListing } from "../../../../services";
import {
	CategoryDetailsType,
	CategoryListingTypeRequestBodiesType,
	CategoryListingTypeResponseType,
	ItemDetailsType,
	ItemListingResponseType,
	MenuListRequstBodiesType,
	Student,
} from "../../../../services/aoi.type";
import {
	cardDetailSchema,
	ScanUnitSchema,
} from "../../../Component-types/posMenu.type";
import AlergicBanner from "./AllergyBanner/AlergicBanner";
import { useAppProvider } from "../../../../AppProvider";
import { useQueryClient } from "@tanstack/react-query";

interface RightSectionProp {
	resetFormValues: (resetFunc: () => void) => void;
}

const RightMenuSection: FC<RightSectionProp> = ({ resetFormValues }) => {
	const dispatch: AppDispatch = useDispatch();
	const { setItemColor } = useAppProvider();

	const { control } = useFormContext<cardDetailSchema & ScanUnitSchema>();

	const CmpID = JSON.parse(localStorage.getItem("CmpId")!);

	const [showroomWatch] = useWatch({
		control,
		name: ["showroom"],
	});

	const queryClient = useQueryClient();

	const [cetagoryListParam, setCaetegoryListParam] =
		useState<CategoryListingTypeRequestBodiesType>({
			BusinessUnitId: CmpID.toString() || "",
			ShowroomId: "",
			// ShowroomId: "147",
		});

	const [menuParam, setMenuParam] = useState<MenuListRequstBodiesType>({
		BusinessUnitId: CmpID.toString() || "",
		// ShowroomId: "147", //todo change it later
		ShowroomId: "",
		CategoryId: "",
	});

	const [studentNameWtach] = useWatch({
		control,
		name: ["name"],
	});

	const {
		data: caetgoryData,
		isLoading: cetagoryIsLoading,
		isFetched: cetegoryIsFetch,
		// refetch: cetagoryRefetch,
	} = GetCetagoryListing(cetagoryListParam, {
		enabled: showroomWatch !== "",
	});

	const {
		data: menuItemData,
		isLoading: menuItemIsLoading,
		isFetched: menuItemIsFetched,
		// refetch: itemRefetch,
	} = GetItemListing(menuParam, {
		enabled: showroomWatch !== "",
	});

	const handleCategory = (item: CategoryDetailsType) => {
		//console.log("category item clicked", item);
		queryClient.removeQueries({
			queryKey: ["item-list"],
		});
		setMenuParam((prev) => ({ ...prev, CategoryId: item.CategoryId }));
	};

	const handleItem = (item: unknown) => {
		// //console.log("item clicked", item);
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

	useEffect(() => {
		//console.log("showroomWatch", showroomWatch);

		if (showroomWatch !== "") {
			//console.log("showroomWatch refetch", showroomWatch);
			setMenuParam((prev) => ({
				...prev,
				CategoryId: "",
				ShowroomId: showroomWatch,
			}));
			setCaetegoryListParam((prev) => ({ ...prev, ShowroomId: showroomWatch }));
			setItemColor("#bd4186");
			// cetagoryRefetch();
			// itemRefetch();
		}
	}, [showroomWatch]);

	useEffect(() => {
		if (menuItemIsFetched) {
			console.log("is item chengeng", menuItemIsFetched);
		}
	}, [menuItemIsFetched]);

	// useEffect(() => {
	// 	if (studentNameWtach) {
	// 		//console.log("studentNameWtach", studentNameWtach);
	// 	}
	// }, [studentNameWtach]);

	return (
		<Grid item xs={12} md={6}>
			<ScanComponent resetFormValues={resetFormValues} />
			{/* //todo add toggle accordign to allergy */}
			{(studentNameWtach as Student)?.AllergicCategory?.length > 0 && (
				<AlergicBanner
					foodItems={(studentNameWtach as Student)?.AllergicCategory}
				/>
			)}
			{/* <AlergicBanner foodItems="COLD/ICED & FIZZY DRINKS,EGGS,ICE CREAM,NUTS,MILK,SEA FOOD,BANANA,APPLE,PUMPKIN,CRABS,LOBSTER,OATS," /> */}

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
