import { Box, Grid } from "@mui/material";
import ButtonGroup from "./ButtonGroup";
import PaidAmount from "./PaidAmount";
import DiscountAmount from "./DiscountAmount";
import MenuTable from "./Menutable";
import CardDetail from "./CardDetail";
import { FC } from "react";

interface LeftMenuSectionProps {
	handleSubmitClick: () => void;
	handleCancelClick: () => void;
	handlePreviousClick: () => void;
	handleBackClick: () => void;
}

const LeftMenuSection: FC<LeftMenuSectionProps> = ({
	handleSubmitClick,
	handleCancelClick,
	handlePreviousClick,
	handleBackClick,
}) => {
	return (
		<Grid item xs={12} md={6}>
			<CardDetail />

			{/* <LeftSpacing /> */}
			<MenuTable />
			{/* <Spacing /> */}
			<DiscountAmount />
			<LeftSpacing />
			<PaidAmount />
			<LeftSpacing />
			<ButtonGroup
				handleSubmitClick={handleSubmitClick}
				handleCancelClick={handleCancelClick}
				handlePreviousClick={handlePreviousClick}
				handleBackClick={handleBackClick}
			/>
		</Grid>
	);
};
const LeftSpacing = () => {
	return (
		<Box
			sx={{
				width: "100%",
				m: 1,
			}}
		/>
	);
};

export default LeftMenuSection;
