/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import {
	cardDetailFields,
	cardDetailSchema,
	cardNumberField,
	ScanUnitSchema,
	studentSearchRequestBodies,
} from "../../../../Component-types/posMenu.type";
import Field from "../../../../Form-component/field";
import { useEffect, useRef, useCallback, useState, FC } from "react";
import { Student, StudentListResponse } from "../../../../../services/aoi.type";
import { useAppProvider } from "../../../../../AppProvider";
// import { debounce } from "lodash"; // Optional: Use lodash for debouncing
import { StudentImage } from "../../../../../layout/MainLayout/Header/UserImage";
import {
	GetGradeLimit,
	// GradeLimitParamType,
	GradLimitResponse,
	// getStudentList,
	SearchStudentList,
	// searchStudentList,
} from "../../../../../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import {
	resetPosMenu,
	selectMenuTable,
} from "../../../../../store/slices/posMenuSlice";

interface CardDetailProps {
	resetFormValues: (resetFunc: () => void) => void;
}

const CardDetail: FC<CardDetailProps> = ({ resetFormValues }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { setImgUrl, setNotify } = useAppProvider();
	const { control, setValue, setFocus } = useFormContext<
		cardDetailSchema | ScanUnitSchema
	>();
	const [focusField, setFocusField] = useState<string>("");
	const [showRoom, setShowRoom] = useState<string>("");
	const [params, setParmas] = useState<any>({
		strCust_ID_N: undefined,
		strShm_ID_N: showRoom,
	});

	const menuTable = useSelector((state: RootState) => selectMenuTable(state));

	const isMediumScreen = useMediaQuery(theme.breakpoints.between(1024, 1280));
	const studentImageXs = isMediumScreen ? 3 : 2;
	const detailsXs = isMediumScreen ? 9 : 10;

	const previousValuesRef = useRef<Partial<cardDetailSchema>>({});

	// Watch multiple fields with a single useWatch call to reduce re-renders
	const [
		cardNumberWatch,
		idNumberWatch,
		nameWatch,
		familyIdWatch,
		showroomWatch,
	] = useWatch({
		control,
		name: ["cardNumber", "idNumbar", "name", "familyId", "showroom"],
	});

	// const debouncedCardNumber = useCallback(
	// 	debounce((value: string) => value, 0),
	// 	[]
	// );

	// console.log("debsddfds", debouncedCardNumber(cardNumberWatch));

	const { data, isFetched, isLoading } = SearchStudentList(
		{
			...studentSearchRequestBodies,
			ShowroomId: showRoom,
			CardNumber: cardNumberWatch!,
		},
		{
			enabled: !!cardNumberWatch,
		}
	);

	// const params: GradeLimitParamType = {
	// 	strCust_ID_N: (nameWatch as Student)?.CardID || undefined,
	// 	strShm_ID_N: showRoom,
	// };

	const {
		data: gradeData,
		isFetched: gradeIsFetched,
		refetch,
	} = GetGradeLimit(params, {
		enabled: !!(nameWatch as Student)?.CardID,
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
				setValue("cardNumber", "", {
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
				selectedKey !== "gardeLimit" &&
				previousValuesRef.current.gardeLimit !== selectedValue.Grade
			) {
				setValue("gardeLimit", selectedValue.Grade, { shouldValidate: true });
			}

			// Update the image URL
			const imgUrl = import.meta.env.VITE_API_URL + selectedValue.ImageUrl;
			setImgUrl(imgUrl);

			if (menuTable.length > 0) {
				dispatch(resetPosMenu());
			}
			// Store previous values for future reference
			previousValuesRef.current = {
				cardNumber: selectedValue.CardNumber,
				familyId: selectedValue.FamilyId,
				idNumbar: selectedValue.AdmissionNumber,
				name: selectedValue.StudentName,
				// dailyLimit: Number(selectedValue.DailyLimit).toFixed(2),
				gardeLimit: selectedValue.Grade,
			};
		},
		[focusField, setImgUrl, setValue]
	);

	// Debounced update handler
	// const debouncedUpdate = useCallback(
	// 	debounce(
	// 		(field: keyof cardDetailSchema, value: Student) =>
	// 			updateValues(field, value),
	// 		0
	// 	),
	// 	[updateValues]
	// );

	// Reset function to be triggered by parent
	const resetFormAndRefs = () => {
		previousValuesRef.current = {};
		// Reset focused field if needed
		setFocusField("");
		setFocus("cardNumber");
	};
	// Unified effect for field watchers
	// useEffect(() => {
	// 	// if (cardNumberWatch && focusField === "cardNumber") {
	// 	// 	debouncedUpdate("cardNumber", cardNumberWatch as Student);
	// 	// }
	// 	if (idNumberWatch && focusField === "idNumbar") {
	// 		debouncedUpdate("idNumbar", idNumberWatch as Student);
	// 	}
	// 	if (nameWatch && focusField === "name") {
	// 		debouncedUpdate("name", nameWatch as Student);
	// 	}
	// 	if (familyIdWatch && focusField === "familyId") {
	// 		debouncedUpdate("familyId", familyIdWatch as Student);
	// 	}
	// 	setFocusField("");
	// 	return () => {
	// 		debouncedUpdate.cancel(); // Cancel debounce on unmount
	// 	};
	// }, [
	// 	// cardNumberWatch,
	// 	idNumberWatch,
	// 	nameWatch,
	// 	familyIdWatch,
	// 	debouncedUpdate,
	// ]);

	useEffect(() => {
		// Directly update values without debounce
		if (idNumberWatch && focusField === "idNumbar") {
			updateValues("idNumbar", idNumberWatch as Student);
		}
		if (nameWatch && focusField === "name") {
			updateValues("name", nameWatch as Student);
		}
		if (familyIdWatch && focusField === "familyId") {
			updateValues("familyId", familyIdWatch as Student);
		}
		setFocusField("");
	}, [idNumberWatch, nameWatch, familyIdWatch, updateValues]);

	useEffect(() => {
		if (showroomWatch !== "") {
			setShowRoom(showroomWatch);
			setParmas({
				// ...prev,
				strCust_ID_N: (nameWatch as Student)?.CardID || undefined,
				strShm_ID_N: showroomWatch,
			});
		}
	}, [showroomWatch, (nameWatch as Student)?.CardID]);

	useEffect(() => {
		resetFormValues(resetFormAndRefs);
	}, [resetFormValues]);

	useEffect(() => {
		if (isFetched) {
			if ((data as StudentListResponse).Status === "1") {
				const student = (data as StudentListResponse).Data[0];
				console.log("_data", student);

				setValue("familyId", student, { shouldValidate: true });
				setValue("idNumbar", student, { shouldValidate: true });
				setValue("name", student, { shouldValidate: true });
				// setValue("dailyLimit", Number(student.DailyLimit).toFixed(2), {
				// 	shouldValidate: true,
				// });
				setValue("gardeLimit", student.Grade, { shouldValidate: true });

				// Update the image URL
				const imgUrl = import.meta.env.VITE_API_URL + student.ImageUrl;
				setImgUrl(imgUrl);

				if (menuTable.length > 0) {
					dispatch(resetPosMenu());
				}

				// Store previous values
				previousValuesRef.current = {
					cardNumber: student.CardNumber,
					familyId: student.FamilyId,
					idNumbar: student.AdmissionNumber,
					name: student.StudentName,
					dailyLimit: Number(student.DailyLimit).toFixed(2),
					gardeLimit: student.Grade,
				};
				setValue("cardNumber", "");
				setFocus("cardNumber");
			} else {
				setNotify({
					severity: "error",
					message: "Card number is not found",
				});
			}
			console.log("data in cardnuber", data);
		}
	}, [isFetched, data]);

	useEffect(() => {
		if (gradeIsFetched) {
			if ((gradeData as GradLimitResponse).Status === "1") {
				const gradeLimit = (gradeData as GradLimitResponse).Data[0];
				console.log("gradeLimit", gradeLimit);
				setValue("dailyLimit", Number(gradeLimit.DailyLimit).toFixed(2));
			} else {
				// setNotify({
				// 	severity: "error",
				// 	message: "Grade limit is not found",
				// });
				console.log("error in grade limit");
			}
			console.log("gradeData in cardnuber", gradeData);
		}
	}, [gradeIsFetched, gradeData]);

	useEffect(() => {
		refetch();
	}, [refetch, (nameWatch as Student)?.StudentName]);

	return (
		<Grid container spacing={1}>
			<Grid item container spacing={1} xs={detailsXs}>
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
								flex: 1.5,
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
								color={theme.palette.primary.contrastText}
								sx={{
									fontSize: "1rem", // Default font size
									[theme.breakpoints.down(1281)]: {
										fontSize: "0.75rem", // Smaller font size for screens above 1158px
									},
									[theme.breakpoints.down(1037)]: {
										fontSize: "0.65rem", // Smaller font size for screens above 1158px
									},
									[theme.breakpoints.down(1024)]: {
										fontSize: "1rem", // Smaller font size for screens above 1158px
									},
								}}>
								Card Number
							</Typography>
						</Box>
						<Box sx={{ flex: 2 }}>
							<Field {...cardNumberField(isLoading)} {...control} />
						</Box>
					</Stack>
				</Grid>
				{cardDetailFields(showroomWatch, setFocusField).map((field) => (
					<Field key={field.name} {...field} {...control} />
				))}
			</Grid>
			<Grid item xs={studentImageXs} justifyContent="center">
				<Box
					sx={{
						width: "100%",
						height: "100%",
						borderRadius: 2,
						overflow: "hidden",
					}}>
					<StudentImage
						src={
							import.meta.env.VITE_API_URL + (nameWatch as Student)?.ImageUrl
						}
						alt={(nameWatch as Student)?.StudentName}
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
