/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Box,
	// Checkbox,
	Grid,
	Stack,
	Typography,
	alpha,
	styled,
	useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
	availableBalancefield,
	AvailableBalanceSchema,
	cardTypeField,
	cardDetailSchema,
	CardPaymentSchema,
	ExchangeRatSchema,
	paidAmountField,
	PaidAmountSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useState, useMemo, useCallback } from "react";
import { FieldProps } from "../../../../Form-component";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Student } from "../../../../../services/aoi.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { selectNetTotalAmount } from "../../../../../store/slices/posMenuSlice";
import { useLocation } from "react-router";

const PaidAmount = () => {
	const theme = useTheme();
	const { pathname } = useLocation();
	const { control, setValue, resetField, reset } = useFormContext<
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

	const [availBal, setAvailBal] = useState<number>(0);
	const [disableAvalBal, setDisableAvalBal] = useState<boolean>(false);
	const [disableCashAmt, setDisableCashAmt] = useState<boolean>(false);
	const [tempTotalAmount, setTempTotalAmount] =
		useState<number>(netTotalAmount);
	const [checked, setChecked] = useState<boolean>(false);
	// const [creditCheck, stCreditCheck] = useState<boolean>(false);

	const [
		cardNubmerWatch,
		paidAmountWatch,
		cashAmountWatch,
		totalPaidWatch,
		balanceAmountWatch,
		balanceWatch,
	] = useWatch({
		control,
		name: [
			"cardNumber",
			"paidAmount",
			"cashAmount",
			"totalPaid",
			"balanceAmount",
			"balance",
		],
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		if (cardNubmerWatch) {
			const value = cardNubmerWatch as Student;
			setAvailBal(Number(value.AvailableBalance));
		}
	}, [cardNubmerWatch]);

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
				setDisableAvalBal(true);
				setValue("availableBalance", 0);
				setValue("cashAmount", netTotalAmount);
			} else {
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
				setDisableAvalBal(false);
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
			if (!paidAmountWatch || paidAmountWatch === 0) {
				setValue("cashAmount", netTotalAmount);
				setValue("paidAmount", 0);
				setValue("balanceAmount", 0);
			}
		};

		if (!isView) {
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
					paidAmountField(disableCashAmt),
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
