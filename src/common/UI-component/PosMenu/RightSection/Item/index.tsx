import {
	Box,
	Button,
	Tooltip,
	Typography,
	useTheme,
	alpha,
	// lighten,
} from "@mui/material";
import { FC } from "react";
import AnimateButton from "../../../Extended/AnimateButton";
import { useAppProvider } from "../../../../../AppProvider";

interface ItemProps {
	label: string;
	onClick: () => void;
}

export const Item: FC<ItemProps> = ({ label, onClick }) => {
	const theme = useTheme();
	const { itemColor } = useAppProvider();

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
					onClick={onClick}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignSelf: "stretch",
						width: "100%",
						// height: "100%",
						py: "1.2rem",
						// bgcolor: theme.palette.itemButton.main,
						background: alpha(itemColor, 1),
						// background: lighten(itemColor, 0.2),
						boxShadow: theme.shadows[4],
						borderRadius: "10px",
						// padding: "10px",
						cursor: "pointer",
						color: "white",
						"&:hover": {
							background: alpha(itemColor, 0.8),
							filter: "brightness(80%)",
							color: "white",
						},
					}}>
					<Typography
						sx={{
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							WebkitLineClamp: 1,
							textOverflow: "ellipsis",
							whiteSpace: "normal",
							maxWidth: "100%",
						}}>
						{label}
					</Typography>
				</Box>
			</Tooltip>
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
						// height: "4.2rem",
						py: "1rem",
						background: isActive ? color : color,
						boxShadow: isActive ? theme.shadows[12] : theme.shadows[4],
						borderRadius: "10px",
						// padding: "10px",
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
