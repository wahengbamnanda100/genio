/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";

import foodData from "../helpers/fooddata.json";
import RightMenuSection from "../common/UI-component/PosMenu/RightSection";
import LeftMenuSection from "../common/UI-component/PosMenu/LeftSection";
import { FormProvider, useForm } from "react-hook-form";
import { PosMenuFormSchema } from "../common/Component-types/posMenu.type";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../store/slices/posMenuSlice";
import { useEffect } from "react";

type itemsType = {
	id: string;
	description: string;
	price: number;
	calories: number;
};

type foodType = {
	category: string;
	items: itemsType[];
};

type foodDataType = foodType[];

const PosMenu = () => {
	// const theme = useTheme();

	const allFoodData: foodDataType = foodData.categories;

	// const breakfastColor = {
	// 	Breakfast: theme.palette.breakfast,
	// 	"Hot Food": theme.palette.breakfast,
	// 	"Grab and Go": "",
	// };

	const totalAmount = useSelector((state: RootState) =>
		selectTotalAmount(state)
	);

	const method = useForm<PosMenuFormSchema>({
		defaultValues: {
			//carddetail
			cardNumber: "1234",
			familyId: "234324324",
			idNumbar: 10,
			dailyLimit: 10,
			name: "fasd",
			gardeLimit: 10,

			//menuTableSchema

			//discountAmount
			discount: 0,
			total: 0,
			discountAmount: 0,

			//netAmount
			netAmount: 0,

			//paidAmountSchema
			cashAmount: 0,
			totalPaid: 0,
			balance: 0,

			//availbleBalance
			availableBalance: 0,
			balanceAmount: 0,
			paidAmount: 0,

			//scanComponent
			invoiceDate: new Date("15 june 2024"),
			invoiceNumber: "testing invoice",

			//scanUnit
			cmpName: "",
			showroom: "",
			salesPersonCode: "",
			salesPersonName: "",
		},
		mode: "onChange",
	});

	useEffect(() => {
		method.setValue("total", totalAmount as number);
	}, [totalAmount]);

	const handleSubmitClick = () => {
		console.log("Submit button clicked");
		// Add your custom logic here
	};

	const handleCancelClick = () => {
		console.log("Cancel button clicked");
		// Add your custom logic here
	};

	const handlePreviousClick = () => {
		console.log("Previous button clicked");
		// Add your custom logic here
	};

	const handleBackClick = () => {
		console.log("Back button clicked");
		// Add your custom logic here
	};

	return (
		<Paper elevation={4} sx={{ p: 3 }}>
			<Grid container spacing={2}>
				<FormProvider {...method}>
					<LeftMenuSection
						handleBackClick={handleBackClick}
						handleCancelClick={handleCancelClick}
						handlePreviousClick={handlePreviousClick}
						handleSubmitClick={handleSubmitClick}
					/>

					<RightMenuSection data={allFoodData} />
				</FormProvider>
			</Grid>
		</Paper>
	);
};

export default PosMenu;
