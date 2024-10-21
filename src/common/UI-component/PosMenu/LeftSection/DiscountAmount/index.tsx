import { Button, Grid, alpha, useTheme } from "@mui/material";
import { debounce } from "lodash";
import { FC, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import {
	selectDiscountAmount,
	selectDiscountDisable,
	selectDiscountPercent,
	selectNetTotalAmount,
	selectTotalAmount,
	setNetTotalAmount,
} from "../../../../../store/slices/posMenuSlice";
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
// import { Student } from "../../../../Form-component/formField.type";

interface DiscountAmountProps {
	isView: boolean;
}

const calculateDiscountPercentage = (
	totalAmount: number,
	discountPercentage: number
): number => {
	if (totalAmount === 0 || discountPercentage === 0) {
		return 0;
	}
	const discountAmount = (totalAmount * discountPercentage) / 100;
	return parseFloat(discountAmount.toFixed(2)); // Limit to two decimal places
};

const DiscountAmount: FC<DiscountAmountProps> = ({ isView }) => {
	const theme = useTheme();
	const dispatch: AppDispatch = useDispatch();
	const { watch, setValue } = useFormContext<
		| DiscountAmountSchema
		| AvailableBalanceSchema
		| cardDetailSchema
		| NetAmountSchema
	>();
	// const [balanceAmount, setBalanceAmount] = useState<number>(0);

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
	// const changeNameAmount = watch("name");

	// Use debouncing to optimize the performance and avoid frequent re-renders
	const updateDiscount = useCallback(
		debounce((discount: number) => {
			dispatch(setNetTotalAmount(discount));
		}, 300),
		[]
	);

	// useEffect(() => {
	// 	if (changeNameAmount) {
	// 		const value = changeNameAmount as Student;
	// 		const availableBalance = Number(value.AvailableBalance);

	// 		if (!isNaN(availableBalance)) {
	// 			const balance = availableBalance - netTotalAmount;
	// 			setBalanceAmount(balance);
	// 		}
	// 	}
	// }, [changeNameAmount, netTotalAmount]);

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
		if (changeDiscountPercentAmount && changeDiscountPercentAmount > 100) {
			setValue("discount", 100);
		}

		if (changeDiscountPercentAmount && changeDiscountPercentAmount <= 100) {
			const percentage = calculateDiscountPercentage(
				totalAmount,
				changeDiscountPercentAmount
			);

			if (percentage !== discountAmount) {
				if (percentage > totalAmount) {
					setValue("discountAmount", totalAmount);
					dispatch(setNetTotalAmount(totalAmount));
				} else {
					setValue("discountAmount", percentage);
					updateDiscount(percentage); // Use debounced function
				}
			}
		} else if (
			changeDiscountAmount &&
			changeDiscountAmount !== discountAmount
		) {
			updateDiscount(changeDiscountAmount); // Use debounced function
		} else if (!changeDiscountPercentAmount) {
			console.log("discount amount !!! % == ", changeDiscountPercentAmount);
			setValue("discount", 0);
			setValue("discountAmount", 0);
		}

		console.log("discount amount % == ", changeDiscountPercentAmount);
	}, [changeDiscountPercentAmount]);

	useEffect(() => {
		const discountAmount = changeDiscountAmount ?? 0;
		const total = totalAmount ?? 0;

		if (discountAmount > total && discountAmount !== total) {
			setValue("discountAmount", total);
		} else if (discountAmount !== 0 && discountAmount !== netTotalAmount) {
			updateDiscount(discountAmount); // Use debounced function
		} else if (discountAmount === 0 && netTotalAmount !== 0) {
			dispatch(setNetTotalAmount(0));
		}
	}, [changeDiscountAmount]);

	return (
		<Grid
			container
			columnSpacing={2}
			justifyContent="center"
			alignItems="center">
			<Grid item xs={6}>
				<Grid container spacing={1}>
					{discountAmountField(theme, discountDisable).map((field) => (
						<Field key={field.name} {...field} />
					))}
				</Grid>
			</Grid>
			<Grid item xs={6} container alignItems="center" justifyContent="center">
				<Grid
					item
					container
					spacing={1}
					xs={12}
					alignItems="flex-end"
					sx={{
						boxShadow: theme.shadows[4],
						bgcolor: alpha(theme.palette.secondary.main, 0.3),
						borderRadius: 1,
						p: 1,
					}}>
					<Field {...netAmountField()} />
					<Grid item xs={6}>
						<AnimateButton>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isView}
								fullWidth
								sx={{ p: 1.4, pt: 1 }}>
								Submit
							</Button>
						</AnimateButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DiscountAmount;
