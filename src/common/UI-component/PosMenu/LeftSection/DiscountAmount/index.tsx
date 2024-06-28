import { Button, Grid, Stack, alpha, useTheme } from "@mui/material";
import {
	PosMenuFormSchema,
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
import { useEffect } from "react";

const DiscountAmount = () => {
	const theme = useTheme();
	const dispatch: AppDispatch = useDispatch();
	const { watch, setValue } = useFormContext<PosMenuFormSchema>();

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

	useEffect(() => {
		setValue("total", totalAmount);
	}, [totalAmount]);

	useEffect(() => {
		setValue("netAmount", netTotalAmount);
	}, [netTotalAmount]);

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

	return (
		<Grid container spacing={2} sx={{ mt: 0 }}>
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
					py={3}
					// justifyContent="center"
					// alignItems="center"
					boxShadow={theme.shadows[4]}
					bgcolor={alpha(theme.palette.secondary.main, 0.3)}>
					<Field {...netAmountField(theme)} />
					<Grid item xs={6}>
						<AnimateButton>
							<Button variant="contained" color="secondary" fullWidth>
								Submit
							</Button>
						</AnimateButton>
					</Grid>
				</Stack>
				{/* </FormProvider> */}
			</Grid>
		</Grid>
	);
};

export default DiscountAmount;
