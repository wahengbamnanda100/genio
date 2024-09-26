/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
	cardNumberField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useRef, useCallback, useState, FC } from "react";
import { Student } from "../../../../../services/aoi.type";
import { useAppProvider } from "../../../../../AppProvider";
import { debounce } from "lodash"; // Optional: Use lodash for debouncing
import { StudentImage } from "../../../../../layout/MainLayout/Header/UserImage";

interface CardDetailProps {
	resetFormValues: (resetFunc: () => void) => void;
}

const CardDetail: FC<CardDetailProps> = ({ resetFormValues }) => {
	const theme = useTheme();
	const { setImgUrl } = useAppProvider();
	const { control, setValue } = useFormContext<cardDetailSchema>();
	const [focusField, setFocusField] = useState<string>("");

	const previousValuesRef = useRef<Partial<cardDetailSchema>>({});

	// Watch multiple fields with a single useWatch call to reduce re-renders
	const [cardNumberWatch, idNumberWatch, nameWatch, familyIdWatch] = useWatch({
		control,
		name: ["cardNumber", "idNumbar", "name", "familyId"],
	});

	// Memoized updateValues function to avoid unnecessary re-creations
	const updateValues = useCallback(
		(selectedKey: keyof cardDetailSchema, selectedValue: Student) => {
			if (!selectedValue || focusField !== selectedKey) return;

			// Update the form only if values have changed
			if (
				selectedKey !== "cardNumber" &&
				previousValuesRef.current.cardNumber !== selectedValue.CardNumber
			) {
				setValue("cardNumber", selectedValue, {
					shouldValidate: true,
				});
			}
			if (
				selectedKey !== "familyId" &&
				previousValuesRef.current.familyId !== selectedValue.FamilyId
			) {
				setValue("familyId", selectedValue, { shouldValidate: true });
			}
			if (
				selectedKey !== "idNumbar" &&
				previousValuesRef.current.idNumbar !== selectedValue.AdmissionNumber
			) {
				setValue("idNumbar", selectedValue, {
					shouldValidate: true,
				});
			}
			if (
				selectedKey !== "name" &&
				previousValuesRef.current.name !== selectedValue.StudentName
			) {
				setValue("name", selectedValue, { shouldValidate: true });
			}
			if (
				selectedKey !== "dailyLimit" &&
				previousValuesRef.current.dailyLimit !== selectedValue.DailyLimit
			) {
				setValue("dailyLimit", Number(selectedValue.DailyLimit).toFixed(2), {
					shouldValidate: true,
				});
			}
			if (
				selectedKey !== "gardeLimit" &&
				previousValuesRef.current.gardeLimit !== selectedValue.Grade
			) {
				setValue("gardeLimit", selectedValue.Grade, { shouldValidate: true });
			}

			// Update the image URL
			const imgUrl = import.meta.env.VITE_API_URL + selectedValue.ImageUrl;
			setImgUrl(imgUrl);

			// Store previous values for future reference
			previousValuesRef.current = {
				cardNumber: selectedValue.CardNumber,
				familyId: selectedValue.FamilyId,
				idNumbar: selectedValue.AdmissionNumber,
				name: selectedValue.StudentName,
				dailyLimit: Number(selectedValue.DailyLimit).toFixed(2),
				gardeLimit: selectedValue.Grade,
			};
		},
		[focusField, setImgUrl, setValue]
	);

	// Debounced update handler
	const debouncedUpdate = useCallback(
		debounce(
			(field: keyof cardDetailSchema, value: Student) =>
				updateValues(field, value),
			300
		),
		[updateValues]
	);

	// Reset function to be triggered by parent
	const resetFormAndRefs = () => {
		// Reset form fields
		// reset();
		// Reset previous values reference
		previousValuesRef.current = {};
		// Reset focused field if needed
		setFocusField("");
	};
	// Unified effect for field watchers
	useEffect(() => {
		if (cardNumberWatch && focusField === "cardNumber") {
			debouncedUpdate("cardNumber", cardNumberWatch as Student);
		}
		if (idNumberWatch && focusField === "idNumbar") {
			debouncedUpdate("idNumbar", idNumberWatch as Student);
		}
		if (nameWatch && focusField === "name") {
			debouncedUpdate("name", nameWatch as Student);
		}
		if (familyIdWatch && focusField === "familyId") {
			debouncedUpdate("familyId", familyIdWatch as Student);
		}

		return () => {
			debouncedUpdate.cancel(); // Cancel debounce on unmount
		};
	}, [
		cardNumberWatch,
		idNumberWatch,
		nameWatch,
		familyIdWatch,
		debouncedUpdate,
	]);

	useEffect(() => {
		resetFormValues(resetFormAndRefs);
	}, [resetFormValues]);

	return (
		<Grid container spacing={1}>
			<Grid item container spacing={1} xs={10}>
				<Grid item xs={8}>
					<Stack
						direction="row"
						alignItems="center"
						sx={{
							borderRadius: 1,
							mb: 0.4,
						}}>
						<Box
							sx={{
								flex: 1,
								borderRight: `1px solid ${theme.palette.grey[400]}`,
								bgcolor: theme.palette.primary.main,
								borderRadius: 1,
								height: "100%",
								boxShadow: theme.shadows[2],
							}}>
							<Typography
								variant="subtitle2"
								fontWeight="medium"
								textAlign="center"
								px={1}
								py={0.6}
								color={theme.palette.primary.contrastText}>
								Card Number
							</Typography>
						</Box>
						<Box sx={{ flex: 2 }}>
							<Field {...cardNumberField(setFocusField)} {...control} />
						</Box>
					</Stack>
				</Grid>
				{cardDetailFields(setFocusField).map((field) => (
					<Field key={field.name} {...field} {...control} />
				))}
			</Grid>
			<Grid item xs={2} justifyContent="center">
				<Box sx={{ width: "120px", height: "120px" }}>
					<StudentImage
						src={
							import.meta.env.VITE_API_URL +
							(cardNumberWatch as Student)?.ImageUrl
						}
						alt={(cardNumberWatch as Student)?.StudentName}
						width="100%"
						height="100%"
						sxProps={{ objectFit: "cover" }}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default CardDetail;
