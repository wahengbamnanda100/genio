/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";

import RightMenuSection from "../common/UI-component/PosMenu/RightSection";
import LeftMenuSection from "../common/UI-component/PosMenu/LeftSection";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PosMenuFormSchema } from "../common/Component-types/posMenu.type";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../store/slices/posMenuSlice";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import SearchDrawer from "../common/UI-component/History/SearchDrwer";

const PosMenu = () => {
	// const theme = useTheme();

	// const allFoodData: foodDataType = foodData.categories;

	// const breakfastColor = {
	// 	Breakfast: theme.palette.breakfast,
	// 	"Hot Food": theme.palette.breakfast,
	// 	"Grab and Go": "",
	// };

	const totalAmount = useSelector((state: RootState) =>
		selectTotalAmount(state)
	);
	const [open, setOpen] = useState<boolean>(false);
	const [drawerOpen, setrawerOpen] = useState<boolean>(false);

	const method = useForm<PosMenuFormSchema>({
		defaultValues: {
			//carddetail
			cardNumber: "",
			familyId: "",
			idNumbar: "",
			dailyLimit: 10,
			name: "",
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
			invoiceDate: new Date(),
			invoiceNumber: "testing invoice",

			//scanUnit
			cmpName: "",
			showroom: "",
			salesPersonCode: "",
			salesPersonName: "",

			//currency exchange
			currency: [],
			rate: 0,
			exchangePaidAmount: 0,
			amount: 0,

			//card type
			cardType: [],
			cardTypeNumber: 0,
			cardAmount: 0,
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
		setrawerOpen(true);
		// Add your custom logic here
	};

	const handleBackClick = () => {
		console.log("Back button clicked");
		// Add your custom logic here
	};

	const handleModalConfirm = () => {
		console.log("Handle confirm");
	};

	const handleModalCancel = () => {
		console.log("Handle cancel");
		setOpen(false);
	};

	const handleCloseDrawer = () => {
		setrawerOpen(false);
	};

	const onSubmit: SubmitHandler<PosMenuFormSchema> = (data) => {
		console.log("Form submitted:", data);
		setOpen(true);
	};

	return (
		<>
			<Paper elevation={4} sx={{ p: 3 }}>
				<FormProvider {...method}>
					<Grid
						component={"form"}
						container
						spacing={2}
						onSubmit={method.handleSubmit(onSubmit)}>
						<LeftMenuSection
							handleBackClick={handleBackClick}
							handleCancelClick={handleCancelClick}
							handlePreviousClick={handlePreviousClick}
							handleSubmitClick={handleSubmitClick}
						/>

						<RightMenuSection />
					</Grid>
				</FormProvider>
			</Paper>

			<ConfirmationDialog
				dialogType="submit"
				open={open}
				setOpen={setOpen}
				title="Confirm Submit"
				description="Do you want to confirm this order"
				onConfirm={handleModalConfirm}
				onCancel={handleModalCancel}
			/>

			<SearchDrawer
				open={drawerOpen}
				onClose={handleCloseDrawer}
				onOpen={handlePreviousClick}
			/>
		</>
	);
};

export default PosMenu;
