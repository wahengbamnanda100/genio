import { Box, Grid, IconButton, alpha, useTheme } from "@mui/material";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

import {
	availableBalancefield,
	cardTypeField,
	exchangeRateField,
	paidAmountField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { FC, ReactNode, useState } from "react";
import { MotionProps, motion } from "framer-motion";
import { FieldProps } from "../../../../Form-component";

const Face = ({
	children,
	rotation,
}: {
	children: ReactNode;
	rotation: number;
}) => (
	<Box
		sx={{
			position: "absolute",
			width: "100%",
			height: "100%",
			backfaceVisibility: "hidden",
			transform: `rotateX(${rotation}deg)`,
		}}>
		{children}
	</Box>
);

const AnimateGrid = ({
	flip,
	variants,
	children,
}: {
	flip: boolean;
	variants: MotionProps["variants"];
	children: ReactNode;
}) => (
	<motion.div
		initial="front"
		animate={flip ? "back" : "front"}
		variants={variants}
		transition={{ duration: 0.5 }}
		style={{
			width: "100%",
			height: "100%",
			minHeight: "160px",
			transformStyle: "preserve-3d",
			perspective: "1000px",
			position: "relative",
		}}>
		{children}
	</motion.div>
);

const PaidAmount = () => {
	const theme = useTheme();

	const [flip, setFlip] = useState<boolean>(false);

	const variants = {
		front: { rotateX: 0 },
		back: { rotateX: 180 },
	};

	const handleFlip = () => {
		setFlip((prev) => !prev);
	};

	// const paidAMount = (
	// 	<Stack
	// 		gap={1}
	// 		flexDirection={"column"}
	// 		padding={1}
	// 		width={"100%"}
	// 		borderRadius={2}
	// 		bgcolor={alpha(theme.palette.secondary.light, 0.1)}>
	// 		{paidAmountField().map((field) => (
	// 			<Field key={field.name} {...field} />
	// 		))}
	// 	</Stack>
	// );

	// const availableBalance = (
	// 	<Stack
	// 		gap={1}
	// 		flexDirection={"column"}
	// 		padding={1}
	// 		width={"100%"}
	// 		borderRadius={2}
	// 		bgcolor={alpha(theme.palette.primary.light, 0.1)}>
	// 		{availableBalancefield(theme).map((field) => (
	// 			<Field key={field.name} {...field} />
	// 		))}
	// 	</Stack>
	// );

	// const exchangeRate = (
	// 	<Grid
	// 		item
	// 		container
	// 		gap={2}
	// 		padding={1}
	// 		width={"100%"}
	// 		borderRadius={2}
	// 		bgcolor={alpha(theme.palette.breakfast.light, 0.1)}>
	// 		{exchangeRateField().map((field) => (
	// 			<Field key={field.name} {...field} />
	// 		))}
	// 	</Grid>
	// );

	// const cardType = (
	// 	<Grid
	// 		item
	// 		container
	// 		gap={2}
	// 		padding={1}
	// 		width={"100%"}
	// 		borderRadius={2}
	// 		bgcolor={alpha(theme.palette.hotfood.light, 0.1)}>
	// 		{cardTypeField().map((field) => (
	// 			<Field key={field.name} {...field} />
	// 		))}
	// 	</Grid>
	// );

	const renderFields = (fields: FieldProps[], bgColor: string) => (
		<Grid
			item
			container
			gap={1}
			padding={1}
			width={"100%"}
			borderRadius={2}
			bgcolor={alpha(bgColor, 0.1)}>
			{fields.map((field) => (
				<Field key={field.name} {...field} />
			))}
		</Grid>
	);

	return (
		<Grid container spacing={2} position={"relative"} sx={{}}>
			<Grid item container xs={12} md={6} position="relative">
				<AnimateGrid flip={flip} variants={variants}>
					{!flip && (
						<Face rotation={0}>
							{renderFields(paidAmountField(), theme.palette.secondary.light)}
						</Face>
					)}
					{flip && (
						<Face rotation={180}>
							{renderFields(exchangeRateField(), theme.palette.breakfast.light)}
						</Face>
					)}
				</AnimateGrid>
			</Grid>
			<Grid item container xs={12} md={6} position="relative">
				<AnimateGrid flip={flip} variants={variants}>
					{!flip && (
						<Face rotation={0}>
							{renderFields(
								availableBalancefield(theme),
								theme.palette.primary.light
							)}
						</Face>
					)}
					{flip && (
						<Face rotation={180}>
							{renderFields(cardTypeField(), theme.palette.hotfood.light)}
						</Face>
					)}
				</AnimateGrid>
			</Grid>

			<SwitchButton flip={flip} handleFlip={handleFlip} />
		</Grid>
	);
};

interface FlipButtonProps {
	flip: boolean;
	handleFlip: () => void;
}

const SwitchButton: FC<FlipButtonProps> = ({ flip, handleFlip }) => {
	const theme = useTheme();

	return (
		<IconButton
			onClick={handleFlip}
			sx={{
				position: "absolute",
				top: "10%",
				left: "99%",
				width: "30px", // Adjust size as needed
				height: "30px", // Adjust size as needed
				transform: "translate(-50%, -50%)",
				boxShadow: theme.shadows[5],
				transition: "all 0.2s ease-in-out",
				bgcolor: alpha(theme.palette.secondary.main, 0.9),
				"&:hover": {
					bgcolor: alpha(theme.palette.secondary.dark, 0.8),
					width: "40px", // Adjust size as needed
					height: "40px", // Adjust size as needed
				},
			}}>
			<Box
				sx={{
					display: "flex",
					transform: flip ? "rotateX(180deg)" : "rotateX(0deg)",
					padding: 1,
					transition: "transform 0.6s",
					transformStyle: "preserve-3d",
					perspective: "1000px",
				}}>
				<SwapVertRoundedIcon
					sx={{
						fontSize: "1.1em",
						fontWeight: "bold",
						color: theme.palette.text.secondary,
					}}
				/>
			</Box>
		</IconButton>
	);
};

export default PaidAmount;
