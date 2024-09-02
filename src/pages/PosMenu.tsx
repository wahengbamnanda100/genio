/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";

import RightMenuSection from "../common/UI-component/PosMenu/RightSection";
import LeftMenuSection from "../common/UI-component/PosMenu/LeftSection";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PosMenuFormSchema } from "../common/Component-types/posMenu.type";
import { FC, useState } from "react";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import SearchDrawer from "../common/UI-component/History/SearchDrwer";
import { useMutation } from "@tanstack/react-query";
import { mutatePosMenu } from "../services";
import { useAppProvider } from "../AppProvider";
import {
	EmployeeItem,
	ItemsType,
	PosSaveRequsetBodiesType,
	Student,
} from "../services/aoi.type";
import { useDispatch, useSelector } from "react-redux";
import {
	PosMenuItem,
	resetPosMenu,
	selectMenuTable,
	selectNetTotalAmount,
} from "../store/slices/posMenuSlice";
import { AppDispatch, RootState } from "../store";
import moment from "moment";

interface PosMenuProps {
	data: any[] | any;
}

const FormContainer: FC<PosMenuProps> = ({ data }) => {
	const { setNotify } = useAppProvider();
	const dispatch: AppDispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const [openClear, setOpenClear] = useState<boolean>(false);
	const [drawerOpen, setrawerOpen] = useState<boolean>(false);

	const menuTable = useSelector((state: RootState) => selectMenuTable(state));
	const netTotalAmount = useSelector((state: RootState) =>
		selectNetTotalAmount(state)
	);

	console.log("data", data);

	const method = useForm<PosMenuFormSchema>({
		defaultValues: {
			//carddetail
			cardNumber: "",
			familyId: "",
			idNumbar: "",
			dailyLimit: "",
			name: "",
			gardeLimit: 0,

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
			invoiceNumber: "",

			//scanUnit
			cmpName: "",
			showroom: "",
			salesPersonCode: "",
			salesPersonName: "",

			//currency exchange
			currency: [],
			rate: 0,
			exchangePaidAmount: 0,
			exchangeAmount: 0,

			//card type
			cardType: [],
			cardTypeNumber: 0,
			cardAmount: 0,
		},
		mode: "onChange",
	});

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["posMneuSave"],
		mutationFn: mutatePosMenu,
		onError: (error) => {
			console.error("Mutation failed:", error.message);
			setNotify({ severity: "error", message: error.message });
			setOpen(false);
		},
		onSuccess: (data) => {
			if (data.statusText === "OK" && data.data.Status === "1") {
				setNotify({ severity: "success", message: data.data.Message });
			} else if (data.statusText === "OK" && data.data.Status !== "1") {
				setNotify({
					severity: "error",
					message: data.data.Message || "Somethig went wrong, try again",
				});
			} else {
				setNotify({ severity: "error", message: "Cannot submit the order" });
			}
			setOpen(false);
		},
	});

	const handleSubmitClick = () => {
		console.log("Submit button clicked");
		// Add your custom logic here
	};

	const handleCancelClick = () => {
		setOpenClear(true);
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

	const validateForm = () => {
		const { dailyLimit, netAmount, availableBalance, paidAmount, totalPaid } =
			method.getValues();

		if (menuTable.length === 0)
			return setNotify({
				severity: "error",
				message: "Select a menu item to submit",
			});

		if (Number(dailyLimit) < netAmount) {
			return setNotify({
				severity: "error",
				message: "Amount cannot be graetr than Daily limit",
			});
		}
		if (paidAmount + totalPaid !== netTotalAmount) {
			return setNotify({
				severity: "error",
				message: "Paid amount should be equal to Net Amount",
			});
		}
		if (netAmount > availableBalance) {
			return setNotify({
				severity: "error",
				message: "Available balance is insufficient",
			});
		}

		setOpen(true);
	};

	const onSubmit: SubmitHandler<PosMenuFormSchema> = (data) => {
		console.log("Form submitted:", data);
		validateForm();
	};

	const transformMenuTableToItems = (menuTable: PosMenuItem[]): ItemsType[] => {
		if (menuTable.length === 0) {
			return [];
		}

		return menuTable.map((menuItem) => ({
			Stm_ID_N: menuItem.id,
			Sid_InvoiceQty_N: menuItem.quantity.toString(),
			Sid_UnitPrice_N: menuItem.unitPrice.toString(),
			Sid_Amount_N: menuItem.amount.toString(),
			Sid_DiscountAmount_N: menuItem.discount.toString(),
			Sid_SalesPrice_N: menuItem.netAmount.toString(),
		}));
	};

	const handleModalConfirm = () => {
		const formData: PosMenuFormSchema = method.getValues();
		const backendData: PosSaveRequsetBodiesType = {
			Cmp_ID_N: "1",
			CurrencyId: "1", //todo check with vini
			DiscountAmount: formData.discountAmount?.toString() || "",
			GrossAmount: formData.total.toString() || "",
			InvoiceDate: moment(formData.invoiceDate).format("DD-MMM-YYYY"),
			Items: transformMenuTableToItems(menuTable),
			NetAmount: formData.netAmount?.toString() || "",
			ShowroomId: formData.showroom,
			Sih_ID_N: "",
			StudentId: (formData.name as Student)?.StudentId || "",
			Usr_ID_N: "1",
			Emp_ID_N: (formData.name as EmployeeItem)?.Emp_ID_N || "",
		};
		console.log("Handle confirm", formData);
		console.log("backend data", backendData);

		mutateAsync(backendData);
	};

	const handleModalCancel = () => {
		console.log("Handle cancel");
		setOpen(false);
	};

	const handleCloseDrawer = () => {
		setrawerOpen(false);
	};

	const handleModalClearCancel = () => {
		setOpenClear(false);
	};

	const handleModalClearConfirm = () => {
		method.reset();
		dispatch(resetPosMenu());
		setOpenClear(false);
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
				loading={isPending}
				setOpen={setOpen}
				title="Confirm Submit"
				description="Do you want to confirm this order"
				onConfirm={handleModalConfirm}
				onCancel={handleModalCancel}
			/>

			<ConfirmationDialog
				dialogType="cancel"
				open={openClear}
				// loading={isPending}
				setOpen={setOpenClear}
				title="Reset all"
				description="Do you want to clear all menu"
				onConfirm={handleModalClearConfirm}
				onCancel={handleModalClearCancel}
			/>

			<SearchDrawer
				open={drawerOpen}
				onClose={handleCloseDrawer}
				onOpen={handlePreviousClick}
			/>
		</>
	);
};

// const FullScreenLoader: React.FC = () => {
// 	return (
// 		<Box
// 			sx={{
// 				position: "fixed",
// 				top: 0,
// 				left: 0,
// 				width: "100vw",
// 				height: "100vh",
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",
// 				backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent background
// 				zIndex: 9999, // High z-index to ensure it appears above all content
// 			}}>
// 			<CircularProgress />
// 		</Box>
// 	);
// };

const PosMenu = () => {
	return (
		<>
			{/* <FullScreenLoader /> */}
			<FormContainer data={[]} />
		</>
	);
};

export default PosMenu;
