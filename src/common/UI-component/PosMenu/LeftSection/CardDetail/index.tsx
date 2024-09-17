import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useRef, useCallback } from "react";
import { Student } from "../../../../../services/aoi.type";
import { useAppProvider } from "../../../../../AppProvider";
import { debounce } from "lodash"; // Optional: Use lodash for debouncing
import { StudentImage } from "../../../../../layout/MainLayout/Header/UserImage";

const CardDetail = () => {
	const theme = useTheme();
	const { setImgUrl } = useAppProvider();
	const { control, setValue } = useFormContext<cardDetailSchema>();

	const previousValuesRef = useRef<Partial<cardDetailSchema>>({});

	// Watch multiple fields with a single useWatch call to reduce re-renders
	const watchedFields = useWatch({
		control,
		name: ["cardNumber", "idNumbar", "name", "familyId"],
	});

	const [cardNumberWatch, isNumberWatch, nameWatch, famulyIdWatch] =
		watchedFields;

	// Memoized updateValues function to avoid unnecessary re-creations
	const updateValues = useCallback(
		(selectedKey: keyof cardDetailSchema, selectedValue: Student) => {
			if (selectedValue) {
				// Perform updates only if values have changed
				if (
					selectedKey !== "cardNumber" &&
					previousValuesRef.current.cardNumber !== selectedValue.CardNumber
				) {
					setValue("cardNumber", selectedValue, { shouldValidate: true });
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
					setValue("idNumbar", selectedValue, { shouldValidate: true });
				}
				if (
					selectedKey !== "name" &&
					previousValuesRef.current.name !== selectedValue.StudentName
				) {
					setValue("name", selectedValue, { shouldValidate: true });
				}
				if (
					selectedKey !== "dailyLimit" &&
					previousValuesRef.current.dailyLimit !==
						Number(selectedValue.DailyLimit).toFixed(2)
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

				const imgUrl = import.meta.env.VITE_API_URL + selectedValue.ImageUrl;
				setImgUrl(imgUrl);

				// Update previous values reference
				previousValuesRef.current = {
					...previousValuesRef.current,
					cardNumber: selectedValue.CardNumber,
					familyId: selectedValue.FamilyId,
					idNumbar: selectedValue.AdmissionNumber,
					name: selectedValue.StudentName,
					dailyLimit: Number(selectedValue.DailyLimit).toFixed(2),
					gardeLimit: selectedValue.Grade,
				};
			} else {
				setValue(selectedKey, "");
			}
		},
		[setValue] // Ensure that the function is not recreated unnecessarily
	);

	const debouncedUpdate = useCallback(
		debounce((field: keyof cardDetailSchema, value: Student) => {
			updateValues(field, value);
		}, 300), // Adjust debounce timing as needed
		[updateValues]
	);

	// Combined useEffect to handle multiple field updates
	useEffect(() => {
		const values = cardNumberWatch as Student;
		if (values) {
			debouncedUpdate("cardNumber", values);
		}

		return () => {
			debouncedUpdate.cancel(); // Cancel debounce on unmount
		};
	}, [cardNumberWatch, debouncedUpdate]);

	useEffect(() => {
		const values = isNumberWatch as Student;
		if (values) {
			debouncedUpdate("idNumbar", values);
		}

		return () => {
			debouncedUpdate.cancel();
		};
	}, [isNumberWatch, debouncedUpdate]);

	useEffect(() => {
		const values = nameWatch as Student;
		if (values) {
			debouncedUpdate("name", values);
		}

		return () => {
			debouncedUpdate.cancel();
		};
	}, [nameWatch, debouncedUpdate]);

	useEffect(() => {
		const values = famulyIdWatch as Student;
		if (values) {
			debouncedUpdate("familyId", values);
		}

		return () => {
			debouncedUpdate.cancel();
		};
	}, [famulyIdWatch, debouncedUpdate]);

	return (
		<Grid container spacing={1}>
			<Grid item container spacing={1} xs={10}>
				<Grid item xs={8}>
					<Stack
						direction={"row"}
						alignItems={"center"}
						sx={{
							border: "1px solid",
							borderColor: theme.palette.grey[400],
							borderRadius: 1,
							mb: 0.4,
						}}>
						<Box
							sx={{
								flex: 1,
								borderRight: "1px solid",
								borderColor: theme.palette.grey[400],
								bgcolor: theme.palette.primary.main,
								borderRadius: 1,
								boxShadow: theme.shadows[2],
							}}>
							<Typography
								variant="subtitle2"
								fontWeight={"medium"}
								textAlign={"center"}
								px={1}
								py={0.6}
								color={theme.palette.primary.contrastText}>
								Card Number
							</Typography>
						</Box>
						<Box sx={{ flex: 2 }}>
							<Typography
								variant="subtitle2"
								fontWeight={"medium"}
								textAlign={"start"}
								px={1}
								py={0.6}
								color={theme.palette.grey[600]}>
								{(cardNumberWatch as Student)
									? (cardNumberWatch as Student).CardNumber
									: "Select a student"}
							</Typography>
						</Box>
					</Stack>
				</Grid>
				{cardDetailFields().map((field) => (
					<Field key={field.name} {...field} {...control} />
				))}
			</Grid>
			<Grid item xs={2} justifyContent={"center"}>
				<Box sx={{ width: "120px", height: "120px" }}>
					<StudentImage
						src={
							import.meta.env.VITE_API_URL +
							(cardNumberWatch as Student)?.ImageUrl
						}
						alt={(cardNumberWatch as Student).StudentName}
						width={"100%"}
						height={"100%"}
						sxProps={{ objectFit: "cover" }}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default CardDetail;
