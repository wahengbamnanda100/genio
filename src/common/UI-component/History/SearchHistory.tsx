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
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	searchHistoryFields,
	searchHistorySchema,
} from "../../Component-types/history.type";
import Field from "../../Form-component/field";

interface ActionButtonProps {
	//todo refactor all animate button to one compoennt
	varient: "serach" | "cancel";
	onClick: () => void;
}

interface SeachButtonProps {
	onSearch: () => void;
	onCancel: () => void;
}

interface SearchHistoryProps {}

const ActionButton: FC<ActionButtonProps> = ({ varient, onClick }) => {
	return (
		<AnimateButton>
			<Button
				variant={varient === "serach" ? "contained" : "outlined"}
				color={"secondary"}
				fullWidth
				sx={{
					borderRadius: 1,
					px: 2,
					maxWidth: "40px",
					minWidth: "40px",
					maxHeight: "40px",
				}}
				onClick={onClick}>
				{varient === "serach" ? <SearchIcon /> : <ClearIcon />}
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

const SearchHistory: FC<SearchHistoryProps> = () => {
	const theme = useTheme();

	const method = useForm<searchHistorySchema>({
		defaultValues: {
			invoiceNubmer: "",
			cardNumber: "",
			studentName: "",
			admissionNumber: "",
			fromDate: new Date(),
			toDate: new Date(),
			CompanyBussinessUnit: "",
			showroom: "",
		},
	});

	const onSearch = () => {};

	const onCancel = () => {};

	return (
		<Paper
			elevation={4}
			sx={{
				border: `1px solid`,
				borderColor: theme.palette.secondary.main,
				m: 1,
			}}>
			<FormProvider {...method}>
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
					<AccordionDetails>
						<Grid container spacing={1.5}>
							{searchHistoryFields().map((field) => (
								<Field key={field.name} {...field} />
							))}
						</Grid>
					</AccordionDetails>
					<AccordionActions>
						<SearchButtonGroup onSearch={onSearch} onCancel={onCancel} />
					</AccordionActions>
				</Accordion>
			</FormProvider>
		</Paper>
	);
};

export default SearchHistory;
