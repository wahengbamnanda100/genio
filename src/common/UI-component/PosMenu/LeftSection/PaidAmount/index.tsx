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
import { useFormContext, useWatch } from "react-hook-form";
import { Student } from "../../../../../services/aoi.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { selectNetTotalAmount } from "../../../../../store/slices/posMenuSlice";

const PaidAmount = () => {
	const theme = useTheme();
	const { control, setValue } = useFormContext<
		PaidAmountSchema &
			AvailableBalanceSchema &
			cardDetailSchema &
			ExchangeRatSchema &
			CardPaymentSchema
	>();

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

	// Update temp total amount when netTotalAmount changes
	useEffect(() => {
		if (netTotalAmount !== tempTotalAmount) {
			setTempTotalAmount(netTotalAmount);
		}
	}, [netTotalAmount, tempTotalAmount]);

	// Handle balance calculation and cash amount changes
	useEffect(() => {
		const remainBalance = availBal - paidAmountWatch;
		// const remainingPaidAmt = netTotalAmount - paidAmountWatch;

		if (availBal === 0) {
			setValue("paidAmount", 0);
			setDisableAvalBal(true);
			setValue("cashAmount", tempTotalAmount);
		} else {
			if (tempTotalAmount > availBal) {
				console.log("tempTotalAmount", tempTotalAmount);

				setValue("paidAmount", tempTotalAmount - (tempTotalAmount - availBal));
				setValue("balanceAmount", 0);
				setValue("cashAmount", tempTotalAmount - paidAmountWatch);
			} else {
				setValue("paidAmount", tempTotalAmount);
				setValue("balanceAmount", remainBalance);
			}
		}

		if (availBal > 0 && paidAmountWatch) {
			console.log("remaing bal ", availBal, paidAmountWatch);

			setValue("balanceAmount", availBal - paidAmountWatch);
		}

		if (balanceAmountWatch < 0 && availBal > 0) {
			setValue("cashAmount", Math.abs(balanceAmountWatch));
		}

		if (cashAmountWatch > 0 && totalPaidWatch > 0) {
			setValue("balance", cashAmountWatch - totalPaidWatch);
		}

		setDisableCashAmt(checked);

		if (checked) {
			// setDisableCashAmt(true);
			setValue("cardAmount", netTotalAmount);
			setValue("paidAmount", 0);
			setValue("totalPaid", 0);
			if (availBal > 0) {
				if (netTotalAmount > availBal) {
					setValue("paidAmount", netTotalAmount - (tempTotalAmount - availBal));
					setValue("balanceAmount", 0);
					setValue("cashAmount", netTotalAmount - paidAmountWatch);
				} else {
					setValue("paidAmount", netTotalAmount);
					setValue("balanceAmount", remainBalance);
				}
			}
			setValue("cashAmount", 0);
			setValue("balance", 0);
		} else {
			setValue("cardAmount", 0);
		}

		// if (disableAvalBal) {
		// 	setValue("paidAmount", 0);
		// } else {
		// 	setValue("paidAmount", Math.min(tempTotalAmount, availBal));
		// }

		// if (remainBalance < 0) {
		// 	setValue("paidAmount", netTotalAmount + remainBalance);
		// }

		// if (remainingPaidAmt > 0) {
		// 	setValue("cashAmount", remainingPaidAmt);
		// }
	}, [
		paidAmountWatch,
		netTotalAmount,
		availBal,
		tempTotalAmount,
		disableAvalBal,
		balanceAmountWatch,
		totalPaidWatch,
		checked,
		setValue,
	]);

	// Handle total paid amount and cash amount updates
	// useEffect(() => {
	// 	const remainingBalance = cashAmountWatch - totalPaidWatch;
	// 	setValue("balance", remainingBalance);
	// }, [totalPaidWatch, cashAmountWatch, setValue]);

	// Handle availability balance when cashAmount changes
	// useEffect(() => {
	// 	if (cashAmountWatch < 0) {
	// 		setValue("totalPaid", 0);
	// 		setDisableCashAmt(true);
	// 	} else {
	// 		setDisableCashAmt(false);
	// 	}
	// }, [cashAmountWatch, setValue]);

	// Update available balance and disable status based on cardNumber
	useEffect(() => {
		const value = cardNubmerWatch as Student;
		const avalbal = value ? Number(value.AvailableBalance) : 0;
		setValue("availableBalance", avalbal);
		setAvailBal(avalbal);

		// if (Number(value.AvailableBalance) === 0) {
		// 	setValue("cashAmount", tempTotalAmount);
		// }

		if (Number(value?.AvailableBalance) === 0) {
			setDisableAvalBal(true);
		} else {
			setDisableAvalBal(false);
		}
	}, [cardNubmerWatch]);

	// Update exchange amount based on rate and exchangePaidWatch
	// useEffect(() => {
	// 	if (exchangePaidWatch !== 0) {
	// 		setValue("exchangeAmount", exchangePaidWatch * rateWatch);
	// 	}
	// }, [exchangePaidWatch, rateWatch, setValue]);

	// Memoize field rendering to avoid unnecessary re-renders
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
						<Checkbox
							size="small"
							value={checked}
							onChange={handleChange}
							icon={<CircleOutlinedIcon fontSize="small" />}
							checkedIcon={<CheckCircleRoundedIcon fontSize="small" />}
							inputProps={{ "aria-label": "controlled" }}
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
