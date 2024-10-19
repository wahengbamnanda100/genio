/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// /* eslint-disable @typescript-eslint/no-explicit-any */

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
	// Checkbox,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useAppProvider } from "../../../../../AppProvider";
import { Student } from "../../../../../services/aoi.type";
import { RootState } from "../../../../../store";
import { selectNetTotalAmount } from "../../../../../store/slices/posMenuSlice";
import {
	availableBalancefield,
	AvailableBalanceSchema,
	cardDetailSchema,
	CardPaymentSchema,
	cardTypeField,
	ExchangeRatSchema,
	paidAmountField,
	PaidAmountSchema,
} from "../../../../Component-types/posMenu.type";
import { FieldProps } from "../../../../Form-component";
import Field from "../../../../Form-component/field";

interface PaidAmountProps {
	// registerReset: (resetFunc: () => void) => void;
}

const PaidAmount: FC<PaidAmountProps> = () => {
	const theme = useTheme();
	const { pathname } = useLocation();
	const {
		refresh,
		availBal,
		setAvailBal,
		checked,
		setChecked,
		disableAvailableBalance: disableAvalBal,
		setDisableAvailBalance: setDisableAvalBal,
		disableCashAmount: disableCashAmt,
		setDisableCashAmount: setDisableCashAmt,
	} = useAppProvider();
	const { control, setValue } = useFormContext<
		PaidAmountSchema &
			AvailableBalanceSchema &
			cardDetailSchema &
			ExchangeRatSchema &
			CardPaymentSchema
	>();

	const isView = pathname.includes("view");

	const netTotalAmount = useSelector((state: RootState) =>
		selectNetTotalAmount(state)
	);

	// const [availBal, setAvailBal] = useState<number>(0);
	// const [checkDisabled, setCheckDisabled] = useState<boolean>(false);
	const [checkDisabled, setCheckDisable] = useState<boolean>(false);
	// const [tempTotalAmount, setTempTotalAmount] =
	// 	useState<number>(netTotalAmount);
	const [, setFocusField] = useState<string>("");
	// const [checked, setChecked] = useState<boolean>(false);
	// const [creditCheck, stCreditCheck] = useState<boolean>(false);

	const [
		nameWatch,
		// cardNubmerWatch,
		paidAmountWatch,
		cashAmountWatch,
		totalPaidWatch,
		// balanceAmountWatch,
		// balanceWatch,
		allowCardWatch,
	] = useWatch({
		control,
		name: [
			"name",
			// "cardNumber",
			"paidAmount",
			"cashAmount",
			"totalPaid",
			// "balanceAmount",
			// "balance",
			"allowCard",
		],
	});

	useEffect(() => {
		// const isView = pathname.includes("view");
		setChecked(false);
	}, []);

	useEffect(() => {
		if (allowCardWatch) setChecked(true);
		else setChecked(false);
		//console.log("allowcard watch", allowCardWatch);
	}, [allowCardWatch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		setAvailBal(0);
	}, [pathname]);

	useEffect(() => {
		if (availBal > 0) {
			if (availBal >= netTotalAmount) {
				//console.log("setCheckDisable(true);", availBal);

				setCheckDisable(true);
			} else {
				//console.log("setCheckDisable(false);", availBal);
				setCheckDisable(false);
			}
		} else {
			//console.log("setCheckDisable(false) outter;", availBal);
			setCheckDisable(false);
		}
	}, [availBal, netTotalAmount, setCheckDisable]);

	useEffect(() => {
		if (nameWatch) {
			const value = nameWatch as Student;
			setAvailBal(Number(value.AvailableBalance));
			//console.log("(nameWatch as Student)", value);
			// if (refresh) {
			// 	setAvailBal(0);
			// }
		} else {
			setAvailBal(0);
		}
	}, [(nameWatch as Student)?.StudentName]);

	// Update temp total amount when netTotalAmount changes
	// useEffect(() => {
	// 	if (netTotalAmount !== tempTotalAmount) {
	// 		setTempTotalAmount(netTotalAmount);
	// 	}
	// }, [netTotalAmount, tempTotalAmount]);

	useEffect(() => {
		const handleAvailableBalance = () => {
			if (availBal === 0) {
				// No wallet balance, transfer the entire net amount to cashAmount
				setValue("paidAmount", 0);
				setDisableAvalBal(true);
				setValue("availableBalance", 0);

				if (checked) {
					setValue("cashAmount", 0); // Set cash amount to 0 if card is checked
				} else {
					setValue("cashAmount", netTotalAmount); // Transfer net amount to cash if card is not checked
				}
			} else {
				// Wallet has balance, set paidAmount to min of netTotalAmount or available balance
				const initialPaidAmount = Math.min(availBal, netTotalAmount);
				setValue("paidAmount", initialPaidAmount);
				const remainingBalance = availBal - Number(paidAmountWatch);

				// Update balance amount and availability
				setValue("balanceAmount", remainingBalance);
				setDisableAvalBal(false);
				setValue("availableBalance", availBal);

				updateCashAndBalance(); // Trigger update for cash/card amounts based on remaining balance
			}
		};

		const updateCashAndBalance = () => {
			const remainingNetAmount = netTotalAmount - Number(paidAmountWatch);

			// Card payment handling
			if (checked) {
				setValue("cardAmount", remainingNetAmount); // Transfer remaining amount to card if checked
				setValue("cashAmount", 0); // Disable cash payment
			} else {
				// Cash payment handling
				if (cashAmountWatch !== remainingNetAmount) {
					setValue("cashAmount", Math.max(0, remainingNetAmount));
					setDisableCashAmt(false); // Enable cash payment if necessary
					// setCheckDisabled(false);
				} else {
					setDisableCashAmt(true); // Disable if already at the correct amount
					// setCheckDisabled(true);
					// setValue("totalPaid", 0); //todo
				}
			}
		};

		const handleCashPayment = () => {
			// Update balance if cash payment is applied
			if (cashAmountWatch > 0 && totalPaidWatch > 0) {
				const balance = cashAmountWatch - totalPaidWatch;
				setValue("balance", Math.max(0, balance));
			} else {
				setValue("balance", 0); // Set balance to 0 if no cash payment
			}
		};

		const handleCardPayment = () => {
			if (checked) {
				// Card is selected, disable other payments and set all to card
				setDisableAvalBal(true);
				setDisableCashAmt(true);
				setValue("cardAmount", netTotalAmount);
				setValue("paidAmount", 0);
				setValue("totalPaid", 0);
				setValue("cashAmount", 0);
				setValue("balance", 0);
			} else {
				// Card is deselected, reset card-related values
				if (Number(cashAmountWatch) > 0) {
					setDisableCashAmt(false);
				} else {
					setDisableCashAmt(true);
					setValue("totalPaid", 0);
				}
				setValue("cardType", []); // Reset card type
				setValue("cardTypeNumber", ""); // Reset card number
				setValue("cardAmount", 0); // Reset card amount
			}
		};

		const transferCashToCard = () => {
			// If switching from cash to card payment, transfer the net amount
			if (
				checked &&
				paidAmountWatch === 0 &&
				cashAmountWatch === netTotalAmount
			) {
				setValue("cardAmount", netTotalAmount); // Move amount to card
				setValue("cashAmount", 0); // Set cash to 0
				setValue("totalPaid", 0); // Reset total paid
			}
		};

		const clearPaidAmount = () => {
			if (checked) {
				// Clear paid amount if card is selected
				setValue("cardAmount", netTotalAmount);
			} else if (!paidAmountWatch || paidAmountWatch === 0) {
				// Clear cash and balance amounts if no paid amount
				setValue("cashAmount", netTotalAmount);
				setValue("balanceAmount", 0);
			}
		};

		// Only execute this logic when the view is not readonly
		if (!isView) {
			handleAvailableBalance();
			handleCashPayment();
			handleCardPayment();
			transferCashToCard();
			clearPaidAmount();
		}
	}, [
		paidAmountWatch,
		netTotalAmount,
		availBal,
		cashAmountWatch,
		totalPaidWatch,
		checked,
		isView,
		refresh,
		setValue,
		setDisableAvalBal,
		setDisableCashAmt,
	]);

	// useEffect(() => {
	// 	// debugger;
	// 	const handleAvailableBalance = () => {
	// 		if (availBal === 0) {
	// 			// No wallet balance, transfer the entire net amount to cashAmount
	// 			setValue("paidAmount", 0);
	// 			//console.log("Available balance is 0", availBal);

	// 			setDisableAvalBal(true);
	// 			setValue("availableBalance", 0);
	// 			if (checked) {
	// 				setValue("cashAmount", 0);
	// 			} else {
	// 				setValue("cashAmount", netTotalAmount);
	// 			}
	// 		} else {
	// 			// Wallet has balance, start with setting paidAmount to netTotalAmount or available balance, whichever is smaller
	// 			const initialPaidAmount = Math.min(availBal, netTotalAmount);
	// 			if (paidAmountWatch !== initialPaidAmount) {
	// 				setValue("paidAmount", initialPaidAmount);
	// 			}
	// 			const remainingBalance = availBal - Number(paidAmountWatch);
	// 			setValue("balanceAmount", remainingBalance);
	// 			setDisableAvalBal(false);
	// 			setValue("availableBalance", availBal);

	// 			if (paidAmountWatch > availBal) {
	// 				setValue("paidAmount", availBal);
	// 			}
	// 			updateCashAndBalance();
	// 		}
	// 	};

	// 	const updateCashAndBalance = () => {
	// 		const remainingBalance = availBal - Number(paidAmountWatch);
	// 		const remainingNetAmount = netTotalAmount - Number(paidAmountWatch);

	// 		//console.log(
	// 			"paidAmountWatch",
	// 			paidAmountWatch,
	// 			"remainingBalance",
	// 			remainingBalance,
	// 			"remainingNetAmount",
	// 			remainingNetAmount,
	// 			"paidAmountWatch",
	// 			Number(paidAmountWatch)
	// 		);

	// 		if (checked) {
	// 			// If card is checked, handle cardAmount logic
	// 			setValue("cardAmount", remainingNetAmount);
	// 			setValue("cashAmount", 0); // Disable cash payment when card is selected
	// 		} else {
	// 			// Update cash amount only if it is necessary

	// 			if (cashAmountWatch !== remainingNetAmount) {
	// 				setValue("cashAmount", Math.max(0, remainingNetAmount));
	// 				setDisableCashAmt(false);
	// 			} else {
	// 				setDisableCashAmt(true);
	// 			}
	// 		}

	// 		// Update balance amount if it changes
	// 		if (remainingBalance !== availBal) {
	// 			setValue("balanceAmount", remainingBalance < 0 ? 0 : remainingBalance);
	// 		}
	// 	};

	// 	const handleCashPayment = () => {
	// 		if (cashAmountWatch > 0 && totalPaidWatch > 0) {
	// 			const balance = cashAmountWatch - totalPaidWatch;
	// 			if (balance !== 0) setValue("balance", balance);
	// 		} else {
	// 			setValue("balance", 0);
	// 		}
	// 	};

	// 	const handleCardPayment = () => {
	// 		if (checked) {
	// 			setDisableAvalBal(true);
	// 			setDisableCashAmt(true);
	// 			setValue("cardAmount", netTotalAmount);
	// 			setValue("paidAmount", 0);
	// 			setValue("totalPaid", 0);
	// 			setValue("cashAmount", 0);
	// 			setValue("balance", 0);
	// 		} else {
	// 			if (Number(cashAmountWatch) > 0) setDisableCashAmt(false);
	// 			else setDisableCashAmt(true);
	// 			setValue("cardType", []);
	// 			setValue("cardTypeNumber", "");
	// 			setValue("cardAmount", 0);
	// 		}
	// 	};

	// 	const transferCashToCard = () => {
	// 		if (
	// 			checked &&
	// 			paidAmountWatch === 0 &&
	// 			cashAmountWatch === netTotalAmount
	// 		) {
	// 			setValue("cardAmount", netTotalAmount);
	// 			setValue("cashAmount", 0);
	// 			setValue("totalPaid", 0);
	// 		}
	// 	};

	// 	const clearPaidAmount = () => {
	// 		if (checked) {
	// 			setValue("cardAmount", netTotalAmount);
	// 		} else if (!paidAmountWatch || paidAmountWatch === 0) {
	// 			setValue("cashAmount", netTotalAmount);
	// 			setValue("balanceAmount", 0);
	// 		}
	// 	};

	// 	if (!isView) {
	// 		// Execute the logic
	// 		handleAvailableBalance();
	// 		handleCashPayment();
	// 		handleCardPayment();
	// 		transferCashToCard();
	// 		clearPaidAmount();
	// 	}
	// }, [
	// 	paidAmountWatch,
	// 	netTotalAmount,
	// 	availBal,
	// 	disableAvalBal,
	// 	cashAmountWatch,
	// 	totalPaidWatch,
	// 	checked,
	// 	isView,
	// 	refresh,
	// ]);

	const renderFields = useCallback(
		(
			fields: FieldProps[],
			bgColor: string,
			title: string,
			titleColor: string,
			outline?: boolean
		) => (
			<Grid
				item
				container
				sx={{
					borderRadius: 1,
					overflow: "hidden",
					justifyContent: "center",
					alignItems: "center",
					bgcolor: bgColor,
					// outline: outline ? `1px solid ${titleColor}` : "",
					outline: `1px solid ${titleColor}`,
				}}>
				<Grid
					item
					xs={outline ? 9 : 12}
					sx={{
						// bgcolor: outline ? bgColor : titleColor,
						bgcolor: bgColor,
						pl: 2,
						pt: 1,
						pb: 0.2,
						// [theme.breakpoints.down(1024)]: {

						// },
					}}>
					<Typography
						variant="body1"
						fontWeight={"medium"}
						// color={outline ? "textPrimary" : "textSecondary"}
						color={titleColor}
						// color={"textPrimary"}
						sx={{
							[theme.breakpoints.between(1025, 1218)]: {
								fontSize: "0.8rem",
							},
							[theme.breakpoints.between(1023, 1025)]: {
								fontSize: "0.79rem",
							},
						}}>
						{title}
					</Typography>
				</Grid>
				{outline && (
					<Grid
						item
						xs={3}
						sx={{
							bgcolor: bgColor,
							textAlign: "end",
							pr: 1,
							[theme.breakpoints.down(1400)]: {
								// mr: 1,
							},
						}}>
						{/* <Checkbox
							size="small"
							value={checked}
							onChange={handleChange}
							icon={<CircleOutlinedIcon fontSize="small" />}
							checkedIcon={<CheckCircleRoundedIcon fontSize="small" />}
							inputProps={{ "aria-label": "controlled" }}
						/> */}
						<Controller
							name="allowCard" // Name for your checkbox
							control={control}
							render={({ field }) => (
								<Checkbox
									{...field}
									size="small"
									checked={field.value}
									disabled={checkDisabled}
									onChange={(e) => {
										handleChange(e);
										field.onChange(e.target.checked);
									}}
									icon={<CircleOutlinedIcon fontSize="small" />}
									checkedIcon={<CheckCircleRoundedIcon fontSize="small" />}
									inputProps={{ "aria-label": "controlled" }}
									sx={{
										// Customize the size (height and width) of the checkbox
										width: 24, // Set the width
										height: 24, // Set the height
										px: 1,
										"& .MuiSvgIcon-root": {
											fontSize: 24, // Adjust the size of the icon inside the checkbox
										},
									}}
								/>
							)}
						/>
					</Grid>
				)}
				<Grid
					item
					container
					gap={1.5}
					padding={1}
					width={"100%"}
					borderRadius={2}
					// bgcolor={alpha(bgColor, 0.5)}>
					bgcolor={bgColor}>
					{fields.map((field) => (
						<Field key={field.name} {...field} />
					))}
				</Grid>
			</Grid>
		),
		[checkDisabled]
	);

	return (
		<Grid container spacing={1} position={"relative"} sx={{ pt: 1 }}>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(
					cardTypeField(!checked),
					"#e9f1fb",
					"Credit/Debit Card",
					"#0073a4",
					true
				)}
			</Grid>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(
					paidAmountField(theme, disableCashAmt),
					"#eefced",
					"Cash Payment",
					"#26891d"
				)}
			</Grid>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(
					availableBalancefield(theme, disableAvalBal, setFocusField),
					"#ffffd8",
					"Genio Wallet",
					"#aa8800"
				)}
			</Grid>
		</Grid>
	);
};

export default PaidAmount;
