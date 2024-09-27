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
	// const [disableAvalBal, setDisableAvalBal] = useState<boolean>(false);
	// const [disableCashAmt, setDisableCashAmt] = useState<boolean>(false);
	const [tempTotalAmount, setTempTotalAmount] =
		useState<number>(netTotalAmount);
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
		console.log("allowcard watch", allowCardWatch);
	}, [allowCardWatch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	// const resetState = () => {
	// 	setDisableAvalBal(false);
	// 	setDisableCashAmt(false);
	// 	setAvailBal(0);
	// };
	useEffect(() => {
		setAvailBal(0);
	}, [pathname]);

	useEffect(() => {
		if (nameWatch) {
			const value = nameWatch as Student;
			setAvailBal(Number(value.AvailableBalance));
			console.log("(nameWatch as Student)", value);
			// if (refresh) {
			// 	setAvailBal(0);
			// }
		}
	}, [(nameWatch as Student)?.StudentName]);

	// useEffect(() => {
	// 	console.log("cardNubmerWatch", cardNubmerWatch);
	// }, [cardNubmerWatch]);

	// Update temp total amount when netTotalAmount changes
	useEffect(() => {
		if (netTotalAmount !== tempTotalAmount) {
			setTempTotalAmount(netTotalAmount);
		}
	}, [netTotalAmount, tempTotalAmount]);

	useEffect(() => {
		const handleAvailableBalance = () => {
			if (availBal === 0) {
				// No wallet balance, transfer the entire net amount to cashAmount
				setValue("paidAmount", 0);
				console.log("Availble balance is 0", availBal);

				setDisableAvalBal(true);
				setValue("availableBalance", 0);
				if (checked) {
					setValue("cashAmount", 0);
				} else {
					setValue("cashAmount", netTotalAmount);
				}
			} else {
				const remainBalance = availBal - Number(paidAmountWatch);
				setValue("balanceAmount", remainBalance);
				// setDisableAvalBal(true);
				setDisableAvalBal(false);
				setValue("availableBalance", availBal);

				if (paidAmountWatch > availBal) {
					setValue("paidAmount", availBal);
				}
				updateCashAndBalance();
			}
		};

		const updateCashAndBalance = () => {
			const remainBalance = availBal - Number(paidAmountWatch);
			const reaminNetAmount = netTotalAmount - Number(paidAmountWatch);

			console.log(
				"remainBalance",
				remainBalance,
				"reaminNetAmount",
				reaminNetAmount,
				"paidAmountWatch",
				Number(paidAmountWatch)
			);

			setValue("cardAmount", remainBalance);

			if (remainBalance < 0) {
				setValue("cashAmount", Math.abs(remainBalance));
				setValue("balanceAmount", 0);
			} else {
				setValue("balanceAmount", remainBalance);
			}

			if (reaminNetAmount > 0) {
				if (checked) {
					setValue("cashAmount", 0);
				} else {
					setValue("cashAmount", reaminNetAmount);
				}
			} else {
				setValue("cashAmount", 0); // All paid from wallet
				setValue("balanceAmount", remainBalance);
			}
		};

		const handleCashPayment = () => {
			if (cashAmountWatch > 0 && totalPaidWatch > 0) {
				setValue("balance", cashAmountWatch - totalPaidWatch);
			} else {
				setValue("balance", 0);
			}
		};

		const handleCardPayment = () => {
			if (checked) {
				setDisableAvalBal(true);
				setDisableCashAmt(true);
				setValue("cardAmount", netTotalAmount);
				setValue("paidAmount", 0);
				setValue("totalPaid", 0);
				setValue("cashAmount", 0);
				setValue("balance", 0);
			} else {
				// setDisableAvalBal(true);
				setDisableCashAmt(false);
				// resetField(['cardType'])
				// reset({
				// 	cardType: [],
				// 	cardTypeNumber: "",
				// 	cardAmount: 0,
				// });
				setValue("cardType", []);
				setValue("cardTypeNumber", "");
				setValue("cardAmount", 0);
			}
		};

		const transferCashToCard = () => {
			if (
				checked &&
				paidAmountWatch === 0 &&
				cashAmountWatch === netTotalAmount
			) {
				setValue("cardAmount", netTotalAmount);
				setValue("cashAmount", 0);
				setValue("totalPaid", 0);
			}
		};

		const clearPaidAmount = () => {
			if (checked) {
				// setValue("cardAmount", 0);
				setValue("cardAmount", netTotalAmount);
			} else {
				if (!paidAmountWatch || paidAmountWatch === 0) {
					setValue("cashAmount", netTotalAmount);
					setValue("paidAmount", 0);
					setValue("balanceAmount", 0);
				}
			}
		};

		if (!isView || isView) {
			// Execute the logic
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
		disableAvalBal,
		cashAmountWatch,
		totalPaidWatch,
		checked,
		isView,
		refresh,
		// setValue,
	]);

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
					xs={outline ? 10 : 12}
					sx={{
						// bgcolor: outline ? bgColor : titleColor,
						bgcolor: bgColor,
						px: 2,
						pt: 1,
						pb: 0.2,
					}}>
					<Typography
						variant="body1"
						fontWeight={"medium"}
						// color={outline ? "textPrimary" : "textSecondary"}
						color={titleColor}
						// color={"textPrimary"}
					>
						{title}
					</Typography>
				</Grid>
				{outline && (
					<Grid item xs={2} sx={{ bgcolor: bgColor }}>
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
									onChange={(e) => {
										handleChange(e);
										field.onChange(e.target.checked);
									}}
									icon={<CircleOutlinedIcon fontSize="small" />}
									checkedIcon={<CheckCircleRoundedIcon fontSize="small" />}
									inputProps={{ "aria-label": "controlled" }}
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
		[]
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
					availableBalancefield(theme, disableAvalBal),
					"#ffffd8",
					"Genio Wallet",
					"#aa8800"
				)}
			</Grid>
		</Grid>
	);
};

export default PaidAmount;
