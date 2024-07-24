import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import AnimateButton from "../../../Extended/AnimateButton";

interface ItemProps {
	label: string;
	onClick: () => void;
}

export const Item: FC<ItemProps> = ({ label, onClick }) => {
	const theme = useTheme();
	return (
		<AnimateButton>
			<Box
				component={Button}
				onClick={onClick}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "4rem",
					py: "2rem",
					bgcolor: theme.palette.itemButton.main,
					boxShadow: theme.shadows[4],
					borderRadius: "10px",
					padding: "10px",
					cursor: "pointer",
					color: "white",
					"&:hover": {
						backgroundColor: theme.palette.itemButton.dark,
						color: "white",
					},
				}}>
				<Typography>{label}</Typography>
			</Box>
		</AnimateButton>
	);
};

interface BreakfastItemProps {
	label: string;
	color: string;
	hoverColor: string;
	isActive?: boolean;
	onClick?: () => void;
}

export const BreakfastItem: FC<BreakfastItemProps> = ({
	label,
	color,
	hoverColor,
	isActive,
	onClick,
}) => {
	const theme = useTheme();

	return (
		<AnimateButton>
			<Tooltip
				title={label}
				arrow
				slotProps={{
					tooltip: {
						style: {
							padding: "0.6rem",
							fontSize: "0.8em",
							backgroundColor: theme.palette.grey[800],
						},
					},
				}}>
				<Box
					component={Button}
					// onClick={onClick}
					onClick={onClick}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "4.2rem",
						py: "2rem",
						background: isActive ? hoverColor : color,
						boxShadow: isActive ? theme.shadows[12] : theme.shadows[4],
						borderRadius: "10px",
						padding: "10px",
						cursor: "pointer",
						color: "white",

						transition: "background-color 0.3s ease-in",
						"&:hover": {
							background: isActive ? hoverColor : color,
							filter: "brightness(80%)",
							color: "white",
						},
					}}>
					<Typography
						variant="h6"
						sx={{
							overflow: "hidden",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							maxWidth: "100%",
						}}>
						{label}
					</Typography>
				</Box>
			</Tooltip>
		</AnimateButton>
	);
};
