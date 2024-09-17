/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Grid, alpha, useTheme } from "@mui/material";
// // import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

// import {
// 	availableBalancefield,
// 	AvailableBalanceSchema,
// 	cardDetailSchema,
// 	CardPaymentSchema,
// 	cardTypeField,
// 	// exchangeRateField,
// 	ExchangeRatSchema,
// 	paidAmountField,
// 	PaidAmountSchema,
// } from "../../../../Component-types/posMenu.type";
// import Field from "../../../../Form-component/field";
// import { useEffect, useState } from "react";
// // import { MotionProps, motion } from "framer-motion";
// import { FieldProps } from "../../../../Form-component";
// import { useFormContext, useWatch } from "react-hook-form";
// import { Student } from "../../../../../services/aoi.type";

// import { useSelector } from "react-redux";
// import { RootState } from "../../../../../store";
// import { selectNetTotalAmount } from "../../../../../store/slices/posMenuSlice";

// const PaidAmount = () => {
// 	const theme = useTheme();

// 	const { control, setValue } = useFormContext<
// 		PaidAmountSchema &
// 			AvailableBalanceSchema &
// 			cardDetailSchema &
// 			ExchangeRatSchema &
// 			CardPaymentSchema
// 	>();

// 	// const [flip, setFlip] = useState<boolean>(false);
// 	const netTotalAmount = useSelector((state: RootState) =>
// 		selectNetTotalAmount(state)
// 	);

// 	const [availBal, setAvailBal] = useState<number>(0);
// 	const [disableAvalBal, setDisableAvalBal] = useState<boolean>(false);
// 	const [disableCashAmt, setDisableCashAmt] = useState<boolean>(false);
// 	const [tempTotalAmount, setTempTotalAmount] =
// 		useState<number>(netTotalAmount);

// 	const [
// 		cardNubmerWatch,
// 		exchangePaidWatch,
// 		rateWatch,
// 		paidAmountWatch,
// 		cashAmountWatch,
// 		totalPaidWatch,
// 		// cardTypeWatch,
// 		// balanceAmountWatch,
// 	] = useWatch({
// 		control,
// 		name: [
// 			"cardNumber",
// 			"exchangePaidAmount",
// 			"rate",
// 			"paidAmount",
// 			"cashAmount",
// 			"totalPaid",
// 			// "cardType",
// 			// "balanceAmount",
// 		],
// 	});

// 	useEffect(() => {
// 		if (netTotalAmount !== tempTotalAmount) {
// 			setTempTotalAmount(netTotalAmount);
// 		}
// 	}, [netTotalAmount]);

// 	useEffect(() => {
// 		if (disableAvalBal) {
// 			setValue("paidAmount", 0);
// 		} else {
// 			setValue("paidAmount", tempTotalAmount);
// 		}
// 	}, [tempTotalAmount, disableAvalBal]);

// 	useEffect(() => {
// 		const remainBalance = availBal - paidAmountWatch;
// 		console.log("remain balnance", remainBalance, availBal, netTotalAmount);
// 		setValue("balanceAmount", remainBalance);
// 		console.log("watch paid amount", Number(paidAmountWatch));
// 		if (Number(paidAmountWatch) === 0 && netTotalAmount !== 0) {
// 			console.log("set this to cash amount", netTotalAmount);

// 			setValue("cashAmount", netTotalAmount);
// 		}
// 		if (Number(paidAmountWatch) > 0 && Number(cashAmountWatch) > 0) {
// 			const partialAmount = cashAmountWatch - paidAmountWatch;

// 			setValue("cashAmount", partialAmount);
// 		}

// 		const remainingPaidAmt = netTotalAmount - paidAmountWatch;

// 		if (remainBalance < 0) {
// 			setValue("paidAmount", netTotalAmount + remainBalance);
// 			// setValue("balanceAmount", )
// 		}

// 		if (Math.abs(remainBalance) > 0) {
// 			setValue("cashAmount", Math.abs(remainBalance));
// 		}

// 		if (remainingPaidAmt > 0) {
// 			setValue("cashAmount", remainingPaidAmt);
// 		}
// 	}, [paidAmountWatch]);

// 	useEffect(() => {
// 		const remainiingBalance = cashAmountWatch - totalPaidWatch;
// 		console.log("cash remaining balance", remainiingBalance);
// 		setValue("balance", remainiingBalance);
// 	}, [totalPaidWatch, cashAmountWatch]);

// 	useEffect(() => {
// 		if (cashAmountWatch < 0) {
// 			setValue("totalPaid", 0);
// 			setDisableCashAmt(true);
// 		} else {
// 			setDisableCashAmt(false);
// 		}
// 	}, [cashAmountWatch]);

// 	useEffect(() => {
// 		//* avail balance effect
// 		const value = cardNubmerWatch as Student;
// 		const avalbal = value ? Number(value.AvailableBalance) : 0;
// 		setValue("availableBalance", avalbal);
// 		setAvailBal(avalbal);
// 		if (Number(value.AvailableBalance) === 0) {
// 			setValue("cashAmount", tempTotalAmount);
// 		}
// 		console.log("avail is", avalbal);
// 	}, [(cardNubmerWatch as Student).AvailableBalance, tempTotalAmount]);

// 	useEffect(() => {
// 		if (Number((cardNubmerWatch as Student)?.AvailableBalance) > 0) {
// 			console.log("avail is more than 0");

// 			setDisableAvalBal(false);
// 		} else {
// 			console.log("avail is less than 0");
// 			setValue("cashAmount", tempTotalAmount);
// 			setDisableAvalBal(true);
// 		}
// 	}, [(cardNubmerWatch as Student).AvailableBalance]);

// 	// useEffect(() => {
// 	// 	console.log("balance amount", balanceAmountWatch);
// 	// 	if (Number(balanceAmountWatch) > 0) {
// 	// 		setValue("cashAmount", Math.abs(Number(balanceAmountWatch)));
// 	// 	}
// 	// }, [balanceAmountWatch]);

// 	useEffect(() => {
// 		if (exchangePaidWatch !== 0) {
// 			setValue("exchangeAmount", exchangePaidWatch * rateWatch);
// 		}
// 	}, [exchangePaidWatch, rateWatch]);

// 	const renderFields = (fields: FieldProps[], bgColor: string) => (
// 		<Grid
// 			item
// 			container
// 			gap={1}
// 			padding={1}
// 			width={"100%"}
// 			borderRadius={2}
// 			bgcolor={alpha(bgColor, 0.1)}>
// 			{fields.map((field) => (
// 				<Field key={field.name} {...field} />
// 			))}
// 		</Grid>
// 	);

// 	return (
// 		<Grid container spacing={1} position={"relative"} sx={{}}>
// 			<Grid item container xs={12} md={4} position="relative">
// 				{renderFields(cardTypeField(), theme.palette.hotfood.light)}
// 			</Grid>
// 			<Grid item container xs={12} md={4} position="relative">
// 				{renderFields(
// 					paidAmountField(disableCashAmt),
// 					theme.palette.secondary.light
// 				)}
// 			</Grid>
// 			<Grid item container xs={12} md={4} position="relative">
// 				{renderFields(
// 					availableBalancefield(theme, disableAvalBal),
// 					theme.palette.primary.light
// 				)}
// 			</Grid>
// 		</Grid>
// 	);
// };

// export default PaidAmount;

import { Grid, alpha, useTheme } from "@mui/material";
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
		(fields: FieldProps[], bgColor: string) => (
			<Grid
				item
				container
				gap={1}
				padding={1}
				width={"100%"}
				borderRadius={2}
				bgcolor={alpha(bgColor, 0.1)}>
				{fields.map((field) => (
					<Field key={field.name} {...field} />
				))}
			</Grid>
		),
		[]
	);

	return (
		<Grid container spacing={1} position={"relative"}>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(cardTypeField(), theme.palette.hotfood.light)}
			</Grid>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(
					paidAmountField(disableCashAmt),
					theme.palette.secondary.light
				)}
			</Grid>
			<Grid item container xs={12} md={4} position="relative">
				{renderFields(
					availableBalancefield(theme, disableAvalBal),
					theme.palette.primary.light
				)}
			</Grid>
		</Grid>
	);
};

export default PaidAmount;
