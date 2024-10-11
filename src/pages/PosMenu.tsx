/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { useAppProvider } from "../AppProvider";
import { PosMenuFormSchema } from "../common/Component-types/posMenu.type";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import SearchDrawer from "../common/UI-component/History/SearchDrwer";
import Loader from "../common/UI-component/Loader";
import LeftMenuSection from "../common/UI-component/PosMenu/LeftSection";
import RightMenuSection from "../common/UI-component/PosMenu/RightSection";
import { GetPreviousDetails, mutatePosMenu } from "../services";
import {
	DetailItem,
	EmployeeItem,
	ItemsType,
	PosSaveRequsetBodiesType,
	PreviousDetailResponseType,
	Student,
} from "../services/aoi.type";
import { AppDispatch, RootState } from "../store";
import {
	addMenuItems,
	PosMenuItem,
	resetPosMenu,
	selectMenuTable,
	selectNetTotalAmount,
} from "../store/slices/posMenuSlice";

interface PosMenuProps {
	data: any[] | any;
}

const FormContainer: FC<PosMenuProps> = ({ data }) => {
	const effectRan = useRef(false);
	const { pathname } = useLocation();
	const {
		checked,
		setChecked,
		setNotify,
		setImgUrl,
		setAvailBal,
		setDisableAvailBalance,
		setDisableCashAmount,
	} = useAppProvider();
	const dispatch: AppDispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const [openClear, setOpenClear] = useState<boolean>(false);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

	const menuTable = useSelector((state: RootState) => selectMenuTable(state));
	const netTotalAmount = useSelector((state: RootState) =>
		selectNetTotalAmount(state)
	);

	const isView = pathname.includes("view");
	let resetCardDetailForm: () => void;
	let resetScanUnitForm: () => void;

	const cmpId = JSON.parse(localStorage.getItem("userDetail")!);
	const CmpID = JSON.parse(localStorage.getItem("CmpId")!);

	const employeeData =
		!cmpId.EmpCode || !cmpId.EmpName || !cmpId.EmpId
			? "" // If any of the fields are null or empty, set employeeData to an empty string
			: {
					EmployeeCode: cmpId.EmpCode,
					EmployeeName: cmpId.EmpName,
					Emp_ID_N: cmpId.EmpId,
				};

	const method = useForm<PosMenuFormSchema>({
		defaultValues: {
			//carddetail
			cardNumber: "",
			familyId: "",
			idNumbar: "",
			dailyLimit: "",
			name: "",
			gardeLimit: "",

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
			cmpName: CmpID.toString() || "",
			showroom: "",
			salesPersonCode: employeeData,
			salesPersonName: employeeData,

			//currency exchange
			currency: [],
			rate: 0,
			exchangePaidAmount: 0,
			exchangeAmount: 0,

			//card type
			allowCard: false,
			cardType: [],
			cardTypeNumber: "",
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
				setNotify({
					severity: "success",
					message: `Invoice number ${data.data.Sih_ID_N} - ${data.data.Message}`,
				});
				handleResetpage();
				// After form is successfully submitted, reset CardDetail form
				if (resetCardDetailForm) {
					resetCardDetailForm();
				}
				if (resetScanUnitForm) {
					resetScanUnitForm();
				}
			} else if (
				data.statusText === "OK" &&
				data.data.status !== "1" &&
				!data.data.Data
			) {
				setNotify({
					severity: "error",
					message:
						data.data.Message || data.data.info || "Unable to save pos menu",
				});
			} else if (data.statusText === "OK" && data.data.Status !== "1") {
				setNotify({
					severity: "error",
					message: "Somethig went wrong, try again",
				});
			} else {
				setNotify({ severity: "error", message: "Cannot submit the order" });
			}
			setOpen(false);
		},
	});

	const handleSetPreviousDetail = () => {
		const previousData: (typeof data)[0] = data[0];
		// console.log("previousData", previousData);

		const studentObj: Partial<Student> = {
			CardNumber: previousData.CardNumber,
			FamilyId: previousData.FamilyID,
			StudentName: previousData.Name,
			AdmissionNumber: previousData.IDNumber,
			DailyLimit: previousData.DailyLimit.toString(),
			Grade: previousData.Grade.toString(),
			AvailableBalance: previousData.AvailableBalance.toString(),
		};
		method.setValue(
			"allowCard" as any,
			previousData.CreditCardNumber !== "" ? true : (false as any)
		);

		setChecked(previousData?.CreditCardNumber !== "" ? true : false);

		const showroomData = {
			EmployeeCode: previousData.SalesPersonCode,
			EmployeeName: previousData.SalesPersonName,
		};

		method.setValue("cardNumber" as any, studentObj.CardNumber as any);
		method.setValue("idNumbar" as any, studentObj as any);
		method.setValue("familyId" as any, studentObj as any);
		method.setValue("name" as any, studentObj as any);
		method.setValue("gardeLimit" as any, studentObj.Grade as any);
		method.setValue("dailyLimit" as any, studentObj.DailyLimit as any);

		setImgUrl(studentObj?.ImageUrl || "");

		method.setValue(
			"availableBalance" as any,
			previousData.AvailableBalance as any
		);
		method.setValue("netAmount" as any, previousData.NetAmount as any);
		method.setValue("total" as any, previousData.Total as any);
		method.setValue("discount" as any, previousData.DiscountPercentage as any);
		method.setValue(
			"discountAmount" as any,
			previousData.DiscountAmount as any
		);
		method.setValue("cashAmount" as any, previousData.CashAmount as any);
		method.setValue("totalPaid" as any, previousData.TotalPaid as any);
		method.setValue("paidAmount" as any, previousData.PaidAmount as any);

		method.setValue(
			"invoiceDate" as any,
			previousData.Sih_InvoiceDate_D as any
		);
		method.setValue("invoiceNumber" as any, previousData.InvoiceNumber as any);
		method.setValue("showroom" as any, previousData.Shm_ID_N as any); //todo need id
		method.setValue(
			"cmpName" as any,
			previousData.Cmp_ID_N as any //todo need id
		);
		method.setValue("salesPersonCode" as any, showroomData as any);
		method.setValue("salesPersonName" as any, showroomData as any);

		const menuItems: PosMenuItem[] = previousData.Items.map(
			(item: DetailItem, index: number) => ({
				// ...item,
				id: index.toString(),
				description: item.Description,
				unitPrice: Number(item.UnitPrice),
				quantity: Number(item.Quantity),
				amount: Number(item.Amount),
				discount: Number(item.Discount),
				netAmount: Number(item.NetAmount),
			})
		);
		dispatch(addMenuItems(menuItems));
	};

	useEffect(() => {
		const previousData: (typeof data)[0] = data[0];
		if (checked) {
			// Set values after check is complete
			method.setValue("cardType" as any, previousData?.Gem_ID_N as any);
			method.setValue(
				"cardTypeNumber" as any,
				previousData?.CreditCardNumber as any
			);
			method.setValue("cardAmount" as any, previousData?.CardAmount as any);
		}
	}, [checked, data, method]);

	const handleSubmitClick = () => {
		console.log("Submit button clicked");
		// Add your custom logic here
	};

	const handleCancelClick = () => {
		setOpenClear(true);
	};

	const handlePreviousClick = () => {
		console.log("Previous button clicked");
		setDrawerOpen(true);
		// Add your custom logic here
	};

	const handleBackClick = () => {
		console.log("Back button clicked");
		// Add your custom logic here
	};

	const validateForm = () => {
		const {
			dailyLimit,
			netAmount,
			availableBalance,
			paidAmount,
			totalPaid,
			balance,
			allowCard,
			// cashAmount,
		} = method.getValues();

		if (menuTable.length === 0)
			return setNotify({
				severity: "error",
				message: "Select a menu item to submit",
			});

		if (Number(dailyLimit) < netAmount) {
			return setNotify({
				severity: "error",
				message: "Amount cannot be greater than Daily limit " + dailyLimit,
			});
		}

		if (!allowCard) {
			if (Number(paidAmount) + Number(totalPaid) !== netTotalAmount) {
				console.log(
					"paidAmount + totalPaid",
					Number(paidAmount) + Number(totalPaid)
				);

				return setNotify({
					severity: "error",
					message: "Paid amount should be equal to Net Amount",
				});
			}
			if (balance !== 0) {
				if (balance < 0) {
					return setNotify({
						severity: "error",
						message: "Total cash paidt cannot be more than cash amount",
					});
				}
				if (netAmount > availableBalance && totalPaid === 0) {
					return setNotify({
						severity: "error",
						message: "Available balance is insufficient",
					});
				}
			}
		}

		setOpen(true);
	};

	const handleResetpage = () => {
		method.reset();
		dispatch(resetPosMenu());
		setAvailBal(0);
		setDisableAvailBalance(false);
		setDisableCashAmount(false);
		// setRefresh(true);
	};

	const handleCardDetailResetRef = (resetFn: () => void) => {
		resetCardDetailForm = resetFn;
	};

	const handleScanUnitResetRef = (resetFn: () => void) => {
		resetScanUnitForm = resetFn;
	};

	const onSubmit: SubmitHandler<PosMenuFormSchema> = (data) => {
		console.log("Form submitted:", data);

		// Validate that cardType is selected
		if (data.allowCard && (!data.cardType || data.cardType.length === 0)) {
			setNotify({
				severity: "error",
				message: "Select a card to proceed",
			});
			return;
		}

		// Validate cardNumber with a specific pattern
		const cardNumberPattern = /^\d{4}$/;

		if (
			data.allowCard &&
			(!data.cardTypeNumber ||
				!cardNumberPattern.test(data.cardTypeNumber.toString()))
		) {
			setNotify({
				severity: "error",
				message: `Card Number must be in the format XXXX - ${data.cardTypeNumber}`,
			});
			return;
		}
		console.log("card amount validate@@##", data.cardAmount);
		if (
			data.allowCard &&
			data.cardAmount &&
			Number(data.cardAmount) !== data.netAmount
		) {
			console.log(
				"data.cardAmount !== data.netAmount",
				data.cardAmount,
				data.netAmount,
				Number(data.cardAmount) !== data.netAmount
			);
			setNotify({
				severity: "error",
				message: `Card Amount should be equal to Net Amount`,
			});
			return;
		}
		if (data.allowCard && !data.cardAmount) {
			console.log("card amount validate", data.cardAmount);

			setNotify({
				severity: "error",
				message: `Card Amount cannot be zero`,
			});
			return;
		}

		// If validations pass, proceed to form validation and submission
		validateForm();
		// console.log("Form submitted successfully", data);
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
			DiscountAmount: Number(formData.discountAmount)?.toFixed(2) || "",
			GrossAmount: formData.total.toString() || "",
			InvoiceDate: moment(formData.invoiceDate).format("DD-MMM-YYYY"),
			Items: transformMenuTableToItems(menuTable),
			NetAmount: Number(formData.netAmount)?.toFixed(2) || "",
			ShowroomId: formData.showroom,
			Sih_ID_N: "",
			CardID: (formData.name as Student)?.CardID || "",
			Usr_ID_N: "1",
			Emp_ID_N: (formData.salesPersonCode as EmployeeItem)?.Emp_ID_N || "",
			Paymentdtl: [
				{
					Gem_ID_N: formData.cardType.length === 0 ? null : formData.cardType,
					Pyd_CardNo_V: formData.cardTypeNumber,
					Pyd_CardAmount_N: Number(formData.cardAmount).toFixed(2),
					Pyd_ChequeAmount_N: Number(formData.paidAmount).toFixed(2),
					Pyd_CashAmount_N: Number(formData.cashAmount).toFixed(2),
					Pyd_AmountPaid_N: Number(formData.totalPaid).toFixed(2),
					Pyd_Balance_N: Number(formData.balance).toFixed(2),
				},
			],
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
		setDrawerOpen(false);
	};

	const handleModalClearCancel = () => {
		setOpenClear(false);
	};

	const handleModalClearConfirm = () => {
		method.reset();
		dispatch(resetPosMenu());
		setOpenClear(false);
	};

	useEffect(() => {
		if (effectRan.current === false) {
			if (isView && data.length !== 0) {
				handleSetPreviousDetail();
				// console.log("cardName", isView);
			}

			effectRan.current = true; // Set the flag to true to prevent running again
		}
		if (!isView) {
			method.reset();
			method.resetField("availableBalance" as any);
			dispatch(addMenuItems([]));
		}
		return () => {
			// Reset the flag in case this component is unmounted and remounted
			effectRan.current = false;
		};
	}, [isView, pathname]);

	return (
		<>
			<Paper elevation={4} sx={{ p: 2, mt: 1.5 }}>
				<FormProvider {...method}>
					<Grid
						component={"form"}
						container
						spacing={2}
						onSubmit={method.handleSubmit(onSubmit)}>
						<LeftMenuSection
							isVeiw={isView}
							handleBackClick={handleBackClick}
							handleCancelClick={handleCancelClick}
							handlePreviousClick={handlePreviousClick}
							handleSubmitClick={handleSubmitClick}
							registerReset={handleCardDetailResetRef}
						/>

						<RightMenuSection resetFormValues={handleScanUnitResetRef} />
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
				setClose={setDrawerOpen}
				onClose={handleCloseDrawer}
				onOpen={handlePreviousClick}
			/>
		</>
	);
};

const PosMenu = () => {
	const { id } = useParams();
	const { setNotify } = useAppProvider();

	const { data, isLoading, isFetched } = GetPreviousDetails(
		{ Sih_ID_N: id || "" },
		{
			enabled: !!id,
		}
	);

	useEffect(() => {
		if (isFetched) {
			if ((data as PreviousDetailResponseType)?.Status === "1") {
				setNotify({
					severity: "success",
					message: "Previous sale detail loaded successfully",
				});
			}
		}
	}, [isFetched]);

	if (isLoading) {
		return <Loader pageLoading={true} />;
	}

	if (isFetched && (data as any)?.Status !== "1") {
		setNotify({
			severity: "error",
			message: "Error loading previous sale detail",
		});
		return <FormContainer data={[]} />;
	}

	if (isFetched && (data as any)?.status === "false") {
		setNotify({
			severity: "error",
			message: "Error loading previous sale detail",
		});
		return <FormContainer data={[]} />;
	}

	return (
		<>
			{/* <FullScreenLoader /> */}

			<FormContainer
				data={
					(isFetched &&
						(data as PreviousDetailResponseType)?.Status === "1" &&
						(data as PreviousDetailResponseType)?.Data) ||
					[]
				}
				// data={[]}
			/>
		</>
	);
};

export default PosMenu;

// const previousDummyDetailData = [
// 	{
// 		CardNumber: "C4763925",
// 		FamilyID: "FAM00333",
// 		IDNumber: "FAM00333F",
// 		DailyLimit: "5000.0000",
// 		Name: "Medda, Antonio  ",
// 		Grade: "Grade 2",
// 		SalesPersonCode: "002",
// 		SalesPersonName: "Patricia",
// 		Company_bussinessunit: "Anvin Infosystems",
// 		Showroom: "01 GENIO ",
// 		InvoiceNumber: "AI/INV008050",
// 		Sih_InvoiceDate_D: "",
// 		Total: "47.0000",
// 		NetAmount: "47.0000",
// 		CashAmount: "17.0000",
// 		TotalPaid: "17.0000",
// 		Balance: "0.0000",
// 		AvailableBalance: "4923.1600",
// 		PaidAmount: "30.0000",
// 		DiscountAmount: "0.0000",
// 		DiscountPercentage: "0",
// 		Sih_ID_N: "243469",
// 		Items: [
// 			{
// 				Description: "CAFE LATTE GRANDE - 16",
// 				Quantity: "1",
// 				Amount: "16.0000",
// 				UnitPrice: "16.0000",
// 				Discount: "",
// 				NetAmount: "16.0000",
// 			},
// 			{
// 				Description: "CAPPUCCINO GRANDE - 16",
// 				Quantity: "1",
// 				Amount: "16.0000",
// 				UnitPrice: "16.0000",
// 				Discount: "",
// 				NetAmount: "16.0000",
// 			},
// 			{
// 				Description: "CAFE MOCHA TALL -15",
// 				Quantity: "1",
// 				Amount: "15.0000",
// 				UnitPrice: "15.0000",
// 				Discount: "",
// 				NetAmount: "15.0000",
// 			},
// 		],
// 	},
// ];
