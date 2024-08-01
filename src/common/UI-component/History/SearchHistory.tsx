/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	alpha,
	Button,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import AnimateButton from "../Extended/AnimateButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
	searchHistoryFields,
	searchHistorySchema,
} from "../../Component-types/history.type";
import Field from "../../Form-component/field";
import moment from "moment";
import { PreviousSaleListItemType } from "../../../services/aoi.type";

interface ActionButtonProps {
	//todo refactor all animate button to one compoennt
	varient: "serach" | "cancel";
	onClick: any;
}

interface SeachButtonProps {
	onSearch: any;
	onCancel: () => void;
}

interface SearchHistoryProps {
	onSearch: any;
}

const ActionButton: FC<ActionButtonProps> = ({ varient, onClick }) => {
	return (
		<AnimateButton>
			<Button
				variant={varient === "serach" ? "contained" : "outlined"}
				color={"secondary"}
				fullWidth
				type={varient === "serach" ? "submit" : "button"}
				sx={{
					borderRadius: 1,
					px: 2,
					// maxWidth: "40px",
					// minWidth: "40px",
					// maxHeight: "40px",
				}}
				startIcon={varient === "serach" ? <SearchIcon /> : <ClearIcon />}
				onClick={onClick}>
				{varient}
			</Button>
		</AnimateButton>
	);
};

const SearchButtonGroup: FC<SeachButtonProps> = ({ onSearch, onCancel }) => {
	return (
		<Stack direction={"row"} gap={2}>
			<ActionButton varient="serach" onClick={onSearch} />
			<ActionButton varient="cancel" onClick={onCancel} />
		</Stack>
	);
};

const SearchHistory: FC<SearchHistoryProps> = ({ onSearch }) => {
	const theme = useTheme();

	const { setValue, reset, control } = useFormContext<searchHistorySchema>();
	const previousValuesRef = useRef<Partial<searchHistorySchema>>({});

	// const onSearch = (data: any) => {
	// 	console.log("search data", data);
	// 	const serachData = {
	// 		InvoiceNumber: data?.invoiceNubmer?.InvoiceNumber || "",
	// 		CardNumber: data?.cardNumber?.AdmissionNumber || "",
	// 		StudentName: data?.studentName?.StudentName || "",
	// 		ShowroomId: data?.showroom || "",
	// 		BussinessUnitId: data?.CompanyBussinessUnit || "",
	// 		AdmissionNUmber: data?.admissionNumber?.AdmissionNumber || "",
	// 		FromDate: moment(data.fromDate).format("DD-MMM-YYYY"),
	// 		ToDate: moment(data.toDate).format("DD-MMM-YYYY"),
	// 		Cmp_ID_N: "1", //todo add later
	// 	};

	// 	console.log("backend search data", serachData);
	// };

	const onCancel = () => {
		reset();
	};

	const [fromDate] = useWatch({ control, name: ["fromDate"] });
	const [toDate] = useWatch({ control, name: ["toDate"] });

	const [invoiceWatch] = useWatch({ control, name: ["invoiceNubmer"] });
	const [cardNumberWatch] = useWatch({ control, name: ["cardNumber"] });
	const [admissionWatch] = useWatch({ control, name: ["admissionNumber"] });
	const [studentNameWatch] = useWatch({ control, name: ["studentName"] });

	const updateValue = (
		selectedKey: keyof searchHistorySchema,
		selectedValue: PreviousSaleListItemType
	) => {
		if (selectedValue) {
			if (
				selectedKey !== "cardNumber" &&
				previousValuesRef.current.cardNumber !== selectedValue.AdmissionNumber
			) {
				setValue("cardNumber", selectedValue);
			}
			if (
				selectedKey !== "invoiceNubmer" &&
				previousValuesRef.current.invoiceNubmer !== selectedValue.InvoiceNumber
			) {
				setValue("invoiceNubmer", selectedValue);
			}
			if (
				selectedKey !== "studentName" &&
				previousValuesRef.current.studentName !== selectedValue.StudentName
			) {
				setValue("studentName", selectedValue);
			}
			if (
				selectedKey !== "admissionNumber" &&
				previousValuesRef.current.admissionNumber !==
					selectedValue.AdmissionNumber
			) {
				setValue("admissionNumber", selectedValue);
			}

			previousValuesRef.current = {
				...previousValuesRef.current,
				cardNumber: selectedValue.AdmissionNumber,
				admissionNumber: selectedValue.AdmissionNumber,
				studentName: selectedValue.StudentName,
				invoiceNubmer: selectedValue.InvoiceNumber,
			};
		} else {
			setValue(selectedKey, "");
		}
	};

	useEffect(() => {
		const value = invoiceWatch as PreviousSaleListItemType;
		updateValue("invoiceNubmer", value);
	}, [invoiceWatch]);

	useEffect(() => {
		const value = cardNumberWatch as PreviousSaleListItemType;
		updateValue("cardNumber", value);
	}, [cardNumberWatch]);

	useEffect(() => {
		const value = admissionWatch as PreviousSaleListItemType;
		updateValue("admissionNumber", value);
	}, [admissionWatch]);

	useEffect(() => {
		const value = studentNameWatch as PreviousSaleListItemType;
		updateValue("studentName", value);
	}, [studentNameWatch]);

	return (
		<Paper
			elevation={4}
			sx={{
				border: `1px solid`,
				borderColor: theme.palette.secondary.main,
				m: 2,
			}}>
			<Accordion
				component={"form"}
				sx={{
					backgroundColor: alpha(theme.palette.secondary.main, 0.1),
					boxShadow: theme.shadows[4],
				}}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3-content"
					id="panel3-header">
					<Stack direction={"row"} alignItems={"center"}>
						<SearchIcon />
						<Typography variant="body1" fontWeight={"medium"} pl={1}>
							Search History
						</Typography>
					</Stack>
				</AccordionSummary>
				<Divider
					sx={{
						mb: 1,
						mx: 2,
						borderBottom: "0.01em solid",
						borderBlockColor: theme.palette.secondary.main,
					}}
				/>
				<AccordionDetails sx={{ pb: 0.4 }}>
					<Grid container spacing={1.5}>
						{searchHistoryFields(
							moment(fromDate).format("DD-MMMM-YYYY"),
							moment(toDate).format("DD-MMMM-YYYY")
						).map((field) => (
							<Field key={field.name} {...field} />
						))}
					</Grid>
				</AccordionDetails>
				<AccordionActions sx={{ px: 2 }}>
					<SearchButtonGroup onSearch={onSearch} onCancel={onCancel} />
				</AccordionActions>
			</Accordion>
		</Paper>
	);
};

export default SearchHistory;
