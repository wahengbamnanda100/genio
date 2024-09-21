// import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
// import { useFormContext, useWatch } from "react-hook-form";
// import {
// 	cardDetailFields,
// 	cardDetailSchema,
// 	cardNumberField,
// } from "../../../../Component-types/posMenu.type";
// import Field from "../../../../Form-component/field";
// import { useEffect, useRef, useCallback, useState } from "react";
// import { Student } from "../../../../../services/aoi.type";
// import { useAppProvider } from "../../../../../AppProvider";
// import { debounce } from "lodash"; // Optional: Use lodash for debouncing
// import { StudentImage } from "../../../../../layout/MainLayout/Header/UserImage";

// const CardDetail = () => {
// 	const theme = useTheme();
// 	const { setImgUrl } = useAppProvider();
// 	const { control, setValue } = useFormContext<cardDetailSchema>();
// 	const [focusField, setFocusField] = useState<string>("");

// 	const previousValuesRef = useRef<Partial<cardDetailSchema>>({});

// 	// Watch multiple fields with a single useWatch call to reduce re-renders
// 	const watchedFields = useWatch({
// 		control,
// 		name: ["cardNumber", "idNumbar", "name", "familyId"],
// 	});

// 	const [cardNumberWatch, isNumberWatch, nameWatch, famulyIdWatch] =
// 		watchedFields;

// 	// Memoized updateValues function to avoid unnecessary re-creations
// 	const updateValues = useCallback(
// 		(selectedKey: keyof cardDetailSchema, selectedValue: Student) => {
// 			if (selectedValue) {
// 				if (focusField === selectedKey) {
// 					// Perform updates only if values have changed
// 					console.log("====================================");
// 					console.log("selectedValue", selectedValue);
// 					console.log("====================================");
// 					// console.log("selectedValue", selectedValue);
// 					if (
// 						selectedKey !== "cardNumber" &&
// 						previousValuesRef.current.cardNumber !== selectedValue.CardNumber
// 					) {
// 						setValue("cardNumber", selectedValue, { shouldValidate: true });
// 					}
// 					if (
// 						selectedKey !== "familyId" &&
// 						previousValuesRef.current.familyId !== selectedValue.FamilyId
// 					) {
// 						setValue("familyId", selectedValue, { shouldValidate: true });
// 					}
// 					if (
// 						selectedKey !== "idNumbar" &&
// 						previousValuesRef.current.idNumbar !== selectedValue.AdmissionNumber
// 					) {
// 						setValue("idNumbar", selectedValue, { shouldValidate: true });
// 					}
// 					if (
// 						selectedKey !== "name" &&
// 						previousValuesRef.current.name !== selectedValue.StudentName
// 					) {
// 						setValue("name", selectedValue, { shouldValidate: true });
// 					}
// 					if (
// 						selectedKey !== "dailyLimit" &&
// 						previousValuesRef.current.dailyLimit !==
// 							Number(selectedValue.DailyLimit).toFixed(2)
// 					) {
// 						setValue(
// 							"dailyLimit",
// 							Number(selectedValue.DailyLimit).toFixed(2),
// 							{
// 								shouldValidate: true,
// 							}
// 						);
// 					}
// 					if (
// 						selectedKey !== "gardeLimit" &&
// 						previousValuesRef.current.gardeLimit !== selectedValue.Grade
// 					) {
// 						setValue("gardeLimit", selectedValue.Grade, {
// 							shouldValidate: true,
// 						});
// 					}

// 					const imgUrl = import.meta.env.VITE_API_URL + selectedValue.ImageUrl;
// 					setImgUrl(imgUrl);

// 					// Update previous values reference
// 					previousValuesRef.current = {
// 						...previousValuesRef.current,
// 						cardNumber: selectedValue.CardNumber,
// 						familyId: selectedValue.FamilyId,
// 						idNumbar: selectedValue.AdmissionNumber,
// 						name: selectedValue.StudentName,
// 						dailyLimit: Number(selectedValue.DailyLimit).toFixed(2),
// 						gardeLimit: selectedValue.Grade,
// 					};
// 				}
// 			} else {
// 				setValue(selectedKey, "");
// 			}
// 		},
// 		[focusField] // Ensure that the function is not recreated unnecessarily
// 	);

// 	const debouncedUpdate = useCallback(
// 		debounce((field: keyof cardDetailSchema, value: Student) => {
// 			console.log("field", field);

// 			console.log("====================================");
// 			console.log("debounce updatate", value);
// 			console.log("====================================");
// 			updateValues(field, value);
// 		}, 300), // Adjust debounce timing as needed
// 		[updateValues]
// 	);

// 	// Combined useEffect to handle multiple field updates
// 	useEffect(() => {
// 		const values = cardNumberWatch as Student;
// 		console.log("====================================");
// 		console.log("cardNumberWatch", cardNumberWatch);
// 		console.log("====================================");
// 		if (values) {
// 			console.log("call card watch", values);
// 			if (focusField === "cardNumber") {
// 				debouncedUpdate("cardNumber", values);
// 			}
// 			debouncedUpdate("cardNumber", values);
// 		}

// 		return () => {
// 			debouncedUpdate.cancel(); // Cancel debounce on unmount
// 		};
// 	}, [cardNumberWatch, debouncedUpdate]);

// 	useEffect(() => {
// 		const values = isNumberWatch as Student;
// 		if (values) {
// 			console.log("field and value for isNumberWatch", values);
// 			if (focusField === "idNumber") {
// 				debouncedUpdate("idNumbar", values);
// 			}
// 		}

// 		return () => {
// 			debouncedUpdate.cancel();
// 		};
// 	}, [isNumberWatch, debouncedUpdate]);

// 	useEffect(() => {
// 		const values = nameWatch as Student;
// 		if (values) {
// 			console.log("field and value for nameWatch", values);
// 			if (focusField === "name") {
// 				debouncedUpdate("name", values);
// 			}
// 			// debouncedUpdate("name", values);
// 		}

// 		return () => {
// 			debouncedUpdate.cancel();
// 		};
// 	}, [nameWatch, debouncedUpdate]);

// 	useEffect(() => {
// 		const values = famulyIdWatch as Student;
// 		if (values) {
// 			console.log("field and value for famulyIdWatch", values);
// 			if (focusField === "familyId") {
// 				debouncedUpdate("familyId", values);
// 			}
// 			// debouncedUpdate("familyId", values);
// 		}

// 		return () => {
// 			debouncedUpdate.cancel();
// 		};
// 	}, [famulyIdWatch, debouncedUpdate]);

// 	useEffect(() => {
// 		console.log("setFocusField", focusField);
// 	}, [focusField]);

// 	return (
// 		<Grid container spacing={1}>
// 			<Grid item container spacing={1} xs={10}>
// 				<Grid item xs={8}>
// 					<Stack
// 						direction={"row"}
// 						alignItems={"center"}
// 						sx={{
// 							// border: "1px solid",
// 							// borderColor: theme.palette.grey[400],
// 							borderRadius: 1,
// 							mb: 0.4,
// 						}}>
// 						<Box
// 							sx={{
// 								flex: 1,
// 								borderRight: "1px solid",
// 								borderColor: theme.palette.grey[400],
// 								bgcolor: theme.palette.primary.main,
// 								borderRadius: 1,
// 								height: "100%",
// 								boxShadow: theme.shadows[2],
// 							}}>
// 							<Typography
// 								variant="subtitle2"
// 								fontWeight={"medium"}
// 								textAlign={"center"}
// 								px={1}
// 								py={0.6}
// 								color={theme.palette.primary.contrastText}>
// 								Card Number
// 							</Typography>
// 						</Box>
// 						<Box sx={{ flex: 2 }}>
// 							{/* <Typography
// 								variant="subtitle2"
// 								fontWeight={"medium"}
// 								textAlign={"start"}
// 								px={1}
// 								py={0.6}
// 								color={theme.palette.grey[600]}>
// 								{(cardNumberWatch as Student)
// 									? (cardNumberWatch as Student).CardNumber
// 									: "Select a student"}
// 							</Typography> */}
// 							<Field {...cardNumberField(setFocusField)} {...control} />
// 						</Box>
// 					</Stack>
// 				</Grid>
// 				{cardDetailFields(setFocusField).map((field) => (
// 					<Field key={field.name} {...field} {...control} />
// 				))}
// 			</Grid>
// 			<Grid item xs={2} justifyContent={"center"}>
// 				<Box sx={{ width: "120px", height: "120px" }}>
// 					<StudentImage
// 						src={
// 							import.meta.env.VITE_API_URL +
// 							(cardNumberWatch as Student)?.ImageUrl
// 						}
// 						// src="https://images.pexels.com/photos/28172953/pexels-photo-28172953/free-photo-of-a-woman-with-a-scarf-on-her-head-in-a-wheat-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// 						alt={(cardNumberWatch as Student)?.StudentName}
// 						width={"100%"}
// 						height={"100%"}
// 						sxProps={{ objectFit: "cover" }}
// 					/>
// 				</Box>
// 			</Grid>
// 		</Grid>
// 	);
// };

// export default CardDetail;

import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
	cardNumberField,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useRef, useCallback, useState } from "react";
import { Student } from "../../../../../services/aoi.type";
import { useAppProvider } from "../../../../../AppProvider";
import { debounce } from "lodash"; // Optional: Use lodash for debouncing
import { StudentImage } from "../../../../../layout/MainLayout/Header/UserImage";

const CardDetail = () => {
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
