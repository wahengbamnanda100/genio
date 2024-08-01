/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import Carousel from "./Carousel";
import { BreakfastItem, Item } from "../Item";
import { useTheme } from "@mui/material";
import generateLinearGradient, {
	Colors,
} from "../../../../../utils/gradientColor";

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
	const theme = useTheme();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<number | undefined>(undefined);
	const [gradientColors, setGradientColors] = useState<string[]>([]);
	const [darkColor, setDarkColor] = useState<string[]>([]);

	useEffect(() => {
		// Define 5 to 6 linear gradient colors here
		const linearGradients: Colors[] = [
			{
				light: theme.palette.breakfast.main,
				dark: theme.palette.breakfast.dark,
			},
			{ light: theme.palette.hotfood.main, dark: theme.palette.hotfood.dark },
			{ light: theme.palette.grab.main, dark: theme.palette.grab.dark },
			{
				light: theme.palette.secondary.main,
				dark: theme.palette.secondary.dark,
			},
			{ light: theme.palette.error.main, dark: theme.palette.error.dark },
			{ light: theme.palette.primary.main, dark: theme.palette.primary.dark }, // Optional 6th gradient
		];

		const darkColors = [
			theme.palette.breakfast.light,
			theme.palette.hotfood.light,
			theme.palette.grab.light,
			theme.palette.secondary.light,
			theme.palette.error.light,
			theme.palette.primary.light,
		];

		// Generate gradient colors based on the defined linearGradients
		const generatedColors: string[] = [];
		const darkColorsRandom: string[] = [];
		for (let i = 0; i < data.length; i++) {
			const gradientIndex = i % linearGradients.length;
			const darkIndex = i % darkColors.length;
			const gradientColor = generateLinearGradient(
				linearGradients[gradientIndex]
			);
			const darkColor = darkColors[darkIndex];
			darkColorsRandom.push(darkColor);
			generatedColors.push(gradientColor);
		}

		setGradientColors(generatedColors);
		setDarkColor(darkColorsRandom);
	}, [data]);

	useEffect(() => {
		if (category) {
			setActiveItem(0);
		}
	}, [category]);

	const handleCategoryClick = (index: number, item: unknown) => {
		setActiveItem(index);
		onClickItem(item);
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
			label={category ? "Select Category" : "Select Item"}>
			{/* {isLoading && <LoadingItem rows={1} columns={3} />} */}
			{data.map((item: any, index) =>
				category ? (
					<BreakfastItem
						key={index}
						label={item.CategoryDescription}
						isActive={index === activeItem}
						color={gradientColors[index % gradientColors.length]}
						hoverColor={darkColor[index % darkColor.length]}
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
