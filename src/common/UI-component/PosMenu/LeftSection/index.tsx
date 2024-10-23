/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from "@mui/material";
import ButtonGroup from "./ButtonGroup";
import PaidAmount from "./PaidAmount";
import DiscountAmount from "./DiscountAmount";
import MenuTable from "./Menutable";
import CardDetail from "./CardDetail";
import { FC } from "react";
import BreadcrumbNav from "../Navigation/Breadcrum";
// import { SubmitHandler } from "react-hook-form";
// import { PosMenuFormSchema } from "../../../Component-types/posMenu.type";

interface LeftMenuSectionProps {
	studentName: string;
	isVeiw: boolean;
	handleSubmitClick: () => void;
	handleCancelClick: () => void;
	handlePreviousClick: () => void;
	handleBackClick: () => void;
	registerReset: (resetFn: () => void) => void;
	handleGoback: () => void;
}

const LeftMenuSection: FC<LeftMenuSectionProps> = ({
	studentName,
	isVeiw,
	handleSubmitClick,
	handleCancelClick,
	handlePreviousClick,
	handleBackClick,
	registerReset,
	handleGoback,
}) => {
	// useEffect(() => {
	// 	//console.log("left part rendering...", isVeiw);
	// }, []);

	return (
		<Grid item xs={12} md={6}>
			{isVeiw && <BreadcrumbNav title={studentName} onGoback={handleGoback} />}
			<CardDetail resetFormValues={registerReset} />

			<LeftSpacing />
			<MenuTable />
			<DiscountAmount isView={isVeiw} />
			{/* <LeftSpacing />
			<LeftSpacing /> */}
			<PaidAmount />
			<LeftSpacing />
			<LeftSpacing />
			{!isVeiw && (
				<ButtonGroup
					handleSubmitClick={handleSubmitClick}
					handleCancelClick={handleCancelClick}
					handlePreviousClick={handlePreviousClick}
					handleBackClick={handleBackClick}
				/>
			)}
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
