/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
// import { FixedSizeList as List } from "react-window";
import Carousel from "./Carousel";
import { BreakfastItem, Item } from "../Item";
import { useAppProvider } from "../../../../../AppProvider";

interface SelectMenuBoxProps {
	data: object[];
	category?: boolean;
	isLoading?: boolean;
	onClickItem: (item: unknown) => void;
}

const SelectMenuBox: FC<SelectMenuBoxProps> = ({
	data,
	category = false,
	isLoading = false,
	onClickItem,
}) => {
	// const ITEM_SIZE = 24;
	const theme = useTheme();
	const { setItemColor } = useAppProvider();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<number | undefined>(undefined);
	// const [gradientColors, setGradientColors] = useState<string[]>([]);
	// const [darkColor, setDarkColor] = useState<string[]>([]);

	const [cateColor, setCatColor] = useState<string[]>([]);
	const [foodItemColor, setFoodItemColor] = useState<string[]>([]);

	useEffect(() => {
		// Define 5 to 6 linear gradient colors her

		const categoryColor = [
			"#bd4186",
			"#1d78db",
			"#c98900",
			"#8ea8ce",
			"#2d92c0",
			"#4fb9af",
			"#487a47",
			"#504d7c",
			"#dd156b",
			"#922b2e",
			"#c6ae4a",
			"#644445",
			"#88898e",
			"#2d2a77",
		];
		const itemColor = [
			"#bd4186",
			"#1d78db",
			"#c98900",
			"#8ea8ce",
			"#2d92c0",
			"#4fb9af",
			"#487a47",
			"#504d7c",
			"#dd156b",
			"#922b2e",
			"#c6ae4a",
			"#644445",
			"#88898e",
			"#2d2a77",
		];

		const darkColors = [
			theme.palette.breakfast.dark,
			theme.palette.hotfood.dark,
			theme.palette.grab.dark,
			theme.palette.secondary.dark,
			theme.palette.error.dark,
			theme.palette.primary.dark,
		];

		// Generate gradient colors based on the defined linearGradients
		// const generatedColors: string[] = [];
		const darkColorsRandom: string[] = [];
		const cc: string[] = [];
		const ic: string[] = [];
		for (let i = 0; i < data.length; i++) {
			// const gradientIndex = i % linearGradients.length;
			const darkIndex = i % darkColors.length;
			// const gradientColor = generateLinearGradient(
			// linearGradients[gradientIndex]
			// );
			const ccIndex = i % categoryColor.length;
			const icIndex = i % itemColor.length;

			const ccColor = categoryColor[ccIndex];
			const icColor = itemColor[icIndex];

			cc.push(ccColor);
			ic.push(icColor);

			const darkColor = darkColors[darkIndex];
			darkColorsRandom.push(darkColor);
			// generatedColors.push(gradientColor);
		}

		setCatColor(cc);
		setFoodItemColor(ic);

		// setGradientColors(generatedColors);
		// setDarkColor(darkColorsRandom);
	}, [data]);

	useEffect(() => {
		if (category) {
			setActiveItem(0);
		}
	}, [category]);
	const handleCategoryClick = (index: number, item: unknown) => {
		setActiveItem(index);
		onClickItem(item);

		const colorToStore = foodItemColor[index % foodItemColor.length];
		setItemColor(colorToStore);
	};

	const handleItemClick = (item: unknown) => {
		onClickItem(item);
	};

	useEffect(() => {
		if (!category) setCurrentPage(0);
	}, [data]);

	return (
		<Carousel
			rows={category ? 1 : 4}
			columns={3}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			isLoading={isLoading}
			category={category}
			label={category ? "Select Category" : "Select Item"}>
			{/* <List
				height={400} // Adjust based on your component height
				itemCount={data.length}
				itemSize={ITEM_SIZE}
				width="100%">
				{renderRow}
			</List> */}

			{/* {isLoading && <LoadingItem rows={1} columns={3} />} */}
			{data.map((item: any, index) =>
				category ? (
					<BreakfastItem
						key={index}
						label={item.CategoryDescription}
						isActive={index === activeItem}
						color={cateColor[index % cateColor.length]}
						hoverColor={foodItemColor[index % foodItemColor.length]}
						onClick={() => handleCategoryClick(index, item)}
					/>
				) : (
					<Item
						key={item.PartId}
						label={item.PartDescription}
						onClick={() => handleItemClick(item)}
					/>
				)
			)}
		</Carousel>
	);
};

export default SelectMenuBox;
