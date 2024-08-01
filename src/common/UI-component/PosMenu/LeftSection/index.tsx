/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from "@mui/material";
import ButtonGroup from "./ButtonGroup";
import PaidAmount from "./PaidAmount";
import DiscountAmount from "./DiscountAmount";
import MenuTable from "./Menutable";
import CardDetail from "./CardDetail";
import { FC, useEffect } from "react";
// import { SubmitHandler } from "react-hook-form";
// import { PosMenuFormSchema } from "../../../Component-types/posMenu.type";

interface LeftMenuSectionProps {
	handleSubmitClick: () => void;
	handleCancelClick: () => void;
	handlePreviousClick: () => void;
	handleBackClick: () => void;
	// onSubmit: () => any;
}

const LeftMenuSection: FC<LeftMenuSectionProps> = ({
	handleSubmitClick,
	handleCancelClick,
	handlePreviousClick,
	handleBackClick,
	// onSubmit,
}) => {
	useEffect(() => {
		console.log("left part rendering...");
	}, []);

	return (
		<Grid item xs={12} md={6}>
			<CardDetail />

			<LeftSpacing />
			<MenuTable />
			<DiscountAmount />
			{/* <LeftSpacing />
			<LeftSpacing /> */}
			<PaidAmount />
			{/* <LeftSpacing /> */}
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
