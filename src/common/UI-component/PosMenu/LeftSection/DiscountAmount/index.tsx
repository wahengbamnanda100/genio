/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Stack, alpha, useTheme } from "@mui/material";
import {
	AvailableBalanceSchema,
	DiscountAmountSchema,
	NetAmountSchema,
	cardDetailSchema,
	discountAmountField,
	netAmountField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import AnimateButton from "../../../Extended/AnimateButton";
import { useFormContext } from "react-hook-form";
import { AppDispatch, RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
	selectNetTotalAmount,
	selectTotalAmount,
	setNetTotalAmount,
	selectDiscountAmount,
	setDiscountPercentage,
	selectDiscountPercent,
	selectDiscountDisable,
} from "../../../../../store/slices/posMenuSlice";
import { FC, useEffect, useState } from "react";
import { Student } from "../../../../Form-component/formField.type";

interface DiscountAmountProps {
	// onSubmit: (data: unknown) => void;
}

const DiscountAmount: FC<DiscountAmountProps> = () => {
	const theme = useTheme();
	const dispatch: AppDispatch = useDispatch();
	const { watch, setValue } = useFormContext<
		| DiscountAmountSchema
		| AvailableBalanceSchema
		| cardDetailSchema
		| NetAmountSchema
	>();
	const [balanceAmount, setBalanceAmount] = useState<number>(0);

	const totalAmount = useSelector((state: RootState) =>
		selectTotalAmount(state)
	);
	const netTotalAmount = useSelector((state: RootState) =>
		selectNetTotalAmount(state)
	);

	const discountAmount = useSelector((state: RootState) =>
		selectDiscountAmount(state)
	);

	const discountPercent = useSelector((state: RootState) =>
		selectDiscountPercent(state)
	);

	const discountDisable = useSelector((state: RootState) =>
		selectDiscountDisable(state)
	);

	const changeDiscountPercentAmount = watch("discount");
	const changeDiscountAmount = watch("discountAmount");
	const changeCardNumberAmount = watch("cardNumber");

	useEffect(() => {
		if (changeCardNumberAmount) {
			const value = changeCardNumberAmount as Student;
			const availableBalance = Number(value.AvailableBalance);

			if (!isNaN(availableBalance)) {
				const balance = availableBalance - netTotalAmount;
				setBalanceAmount(balance);
			}
		}
	}, [changeCardNumberAmount, netTotalAmount]);

	useEffect(() => {
		setValue("total", totalAmount);
	}, [totalAmount]);

	useEffect(() => {
		setValue("netAmount", netTotalAmount);
		// setValue("paidAmount", netTotalAmount);
		// setValue("balanceAmount", balanceAmount);
	}, [netTotalAmount, balanceAmount]);

	useEffect(() => {
		setValue("discountAmount", discountAmount);
	}, [discountAmount]);

	useEffect(() => {
		setValue("discount", discountPercent);
	}, [discountPercent]);

	useEffect(() => {
		if (changeDiscountPercentAmount && changeDiscountPercentAmount !== 0)
			dispatch(setNetTotalAmount(changeDiscountPercentAmount));
		else dispatch(setNetTotalAmount(0));
	}, [changeDiscountPercentAmount]);

	useEffect(() => {
		if (changeDiscountAmount && changeDiscountAmount !== 0)
			dispatch(setDiscountPercentage(changeDiscountAmount));
		else if (changeDiscountAmount && changeDiscountAmount > totalAmount)
			dispatch(setDiscountPercentage(totalAmount));
		else dispatch(setDiscountPercentage(0));
	}, [changeDiscountAmount]);

	// const onSubmit: SubmitHandler<PosMenuFormSchema> = (data) => {
	// 	console.log("handle submit", data);
	// };

	return (
		<>
			<Grid container columnSpacing={2} sx={{ mt: 0, px: 0, py: 1 }}>
				<Grid item xs={6}>
					{/* <FormProvider {...method}> */}
					<Grid container spacing={1}>
						{discountAmountField(theme, discountDisable).map((field) => (
							<Field key={field.name} {...field} />
						))}
					</Grid>
					{/* </FormProvider> */}
				</Grid>
				<Grid item xs={6} container alignItems="center" justifyContent="center">
					{/* <FormProvider {...netAmountMethod}> */}
					<Stack
						flexDirection={"row"}
						width={"100%"}
						borderRadius={1}
						gap={2}
						p={2}
						py={1.5}
						// justifyContent="center"
						alignItems="flex-end"
						boxShadow={theme.shadows[4]}
						bgcolor={alpha(theme.palette.secondary.main, 0.3)}>
						<Field {...netAmountField()} />
						<Grid item xs={6}>
							<AnimateButton>
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									fullWidth
									sx={{ p: 1.4 }}
									// onClick={handleSubmit(onSubmit)}
								>
									Submit
								</Button>
							</AnimateButton>
						</Grid>
					</Stack>
					{/* </FormProvider> */}
				</Grid>
			</Grid>
		</>
	);
};

export default DiscountAmount;
