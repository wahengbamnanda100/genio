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
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
	searchHistoryFields,
	searchHistorySchema,
} from "../../Component-types/history.type";
import Field from "../../Form-component/field";
import moment from "moment";
import {
	PreviousSaleListItemType,
	ShowroomItemType,
} from "../../../services/aoi.type";
import { ShowroomList } from "../../../services";
import { getDropDownValues } from "../../../utils/utils";

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
	expanded: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
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

const SearchHistory: FC<SearchHistoryProps> = ({
	onSearch,
	expanded,
	setExpanded,
}) => {
	const theme = useTheme();

	const { setValue, reset, control } = useFormContext<searchHistorySchema>();
	const previousValuesRef = useRef<Partial<searchHistorySchema>>({});

	const [showroomOptions, setShowroomOptions] = useState<
		{ label: string; value: string }[]
	>([]);

	const [showroomParams, setShowroomParams] = useState<{
		BusinessUnitId: string;
		Usr_ID_N: string;
	}>({
		BusinessUnitId: "",
		Usr_ID_N: JSON.parse(localStorage.getItem("userDetail")!)?.UserId || "",
	});

	const [fromDate] = useWatch({ control, name: ["fromDate"] });
	const [toDate] = useWatch({ control, name: ["toDate"] });

	const [invoiceWatch] = useWatch({ control, name: ["invoiceNubmer"] });
	const [cardNumberWatch] = useWatch({ control, name: ["cardNumber"] });
	const [admissionWatch] = useWatch({ control, name: ["admissionNumber"] });
	const [studentNameWatch] = useWatch({ control, name: ["studentName"] });
	const [bussinessUnitWatch] = useWatch({
		control,
		name: ["CompanyBussinessUnit"],
	});

	const updateValue = (
		selectedKey: keyof searchHistorySchema,
		selectedValue: PreviousSaleListItemType
	) => {
		if (selectedValue) {
			if (
				selectedKey !== "cardNumber" &&
				previousValuesRef.current.cardNumber !== selectedValue.CardNumber
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
				cardNumber: selectedValue.CardNumber,
				admissionNumber: selectedValue.AdmissionNumber,
				studentName: selectedValue.StudentName,
				invoiceNubmer: selectedValue.InvoiceNumber,
			};
		} else {
			setValue(selectedKey, "");
		}
	};

	const onCancel = () => {
		reset();
	};

	const { data, isFetched } = ShowroomList(showroomParams);

	useEffect(() => {
		if (isFetched) {
			if (data.Status === "1") {
				const dropDownValues = getDropDownValues<ShowroomItemType>(
					data?.Data,
					"ShowroomDesc",
					"ShowroomId"
				);

				setShowroomOptions(dropDownValues);
			} else {
				setShowroomOptions([]);
			}
		}

		//console.log("comp unit watch in api call", bussinessUnitWatch);
	}, [isFetched, data]);

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

	useEffect(() => {
		if (bussinessUnitWatch) {
			setShowroomOptions([]);
			setShowroomParams((prev) => ({
				...prev,
				BusinessUnitId: bussinessUnitWatch as string,
			}));
		}
		//console.log("comp unit watch", bussinessUnitWatch);
	}, [bussinessUnitWatch]);

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
				expanded={expanded}
				onChange={() => setExpanded(!expanded)}
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
							showroomOptions,
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
