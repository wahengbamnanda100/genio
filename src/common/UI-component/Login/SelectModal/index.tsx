import { FC, useEffect, useState } from "react";
import CustomDialog from "./Modal";
import {
	Box,
	Button,
	Chip,
	DialogActions,
	DialogContent,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Radio,
	Skeleton,
	Typography,
} from "@mui/material";
import { CalendarToday, Business } from "@mui/icons-material";
import { useNavigate } from "react-router";
import {
	FyBussinessUnitResponseType,
	FyResponseType,
	GetFinancialYear,
	GetFyCompanyList,
} from "../../../../services/login";
import { useAppProvider } from "../../../../AppProvider";

interface SelectCompanyModalProps {
	open: boolean;
	onClose: () => void;
}

interface SelectableListItemProps {
	primaryText: string;
	secondaryText: string;
	isSelected: boolean;
	onSelect: () => void;
	ChipLabel?: string;
}

const SelectableListItem: FC<SelectableListItemProps> = ({
	primaryText,
	secondaryText,
	isSelected,
	onSelect,
	ChipLabel,
}) => (
	<ListItemButton onClick={onSelect} dense>
		<Radio checked={isSelected} sx={{ color: "primary.main" }} />
		<ListItemText
			primary={
				<Typography variant="body1" sx={{ fontWeight: "medium" }}>
					{primaryText}
				</Typography>
			}
			secondary={
				<Typography
					component="span"
					variant="subtitle2"
					fontWeight="400"
					color="text.primary">
					{secondaryText}
				</Typography>
			}
		/>
		{ChipLabel && (
			<Chip
				label={ChipLabel}
				size="small"
				color="primary"
				variant="outlined"
				sx={{ fontWeight: "bold" }}
			/>
		)}
	</ListItemButton>
);

const renderScrollableList = <T,>(
	items: T[],
	keySelector: (item: T) => string | number,
	loading: boolean,
	renderItem: (item: T) => React.ReactNode,
	emptyMessage: string = "No data found"
) => (
	<List
		sx={{
			maxHeight: items.length > 5 ? "300px" : "auto",
			overflowY: items.length > 5 ? "auto" : "visible",
			"&::-webkit-scrollbar": {
				width: "0.4em",
			},
			"&::-webkit-scrollbar-thumb": {
				backgroundColor: "rgba(0,0,0,.2)",
				borderRadius: "4px",
			},
		}}>
		{loading ? (
			<ListItem disablePadding divider>
				<Skeleton variant="text" width="80%" height={40} />
			</ListItem>
		) : items.length === 0 ? (
			<ListItem disablePadding>
				<Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
					{emptyMessage}
				</Typography>
			</ListItem>
		) : (
			items.map((item) => (
				<ListItem key={keySelector(item)} disablePadding divider>
					{renderItem(item)}
				</ListItem>
			))
		)}
	</List>
);

const SelectCompanyModal: FC<SelectCompanyModalProps> = ({ open, onClose }) => {
	const navigate = useNavigate();
	const { setNotify } = useAppProvider();
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [selectedCompany, setSelectedCompany] = useState<string>("");

	const userData = JSON.parse(localStorage.getItem("userDetail")!);

	const {
		data: financialYearData,
		isLoading: isLoadingYears,
		isFetched: isFetchedYears,
	} = GetFinancialYear("", {
		enabled: open,
	});

	const {
		data: companyData,
		isLoading: isLoadingCompanies,
		isFetched: isFetchedCompanies,
	} = GetFyCompanyList(
		{
			empid: userData?.EmpId || null,
			userid: userData?.UserId || "",
			financialyearid: selectedYear,
		},
		"",
		{
			enabled: open && selectedYear !== "",
		}
	);

	const handleSubmit = () => {
		console.log("Selected Year:", selectedYear);
		console.log("Selected Company:", selectedCompany);
		localStorage.setItem("CmpId", selectedCompany);
		onClose();
		navigate("/");
		setNotify({ severity: "success", message: "Login Successfully" });
	};

	useEffect(() => {
		if (isFetchedYears) {
			console.log("Financial Year Data:", financialYearData);
			// Set the selectedYear to the first item if not already set
			const firstYear = (financialYearData as FyResponseType).Data[0];
			if (firstYear && !selectedYear) {
				setSelectedYear(firstYear.financialyearid);
			}
		}
		if (isFetchedCompanies) {
			console.log("Company Data:", companyData);
			// Set the selectedCompany to the first item if not already set
			const firstCompany = (companyData as FyBussinessUnitResponseType).Data[0];
			if (firstCompany && !selectedCompany) {
				setSelectedCompany(firstCompany.Cmp_ID_N);
			}
		}
	}, [
		financialYearData,
		isFetchedYears,
		isFetchedCompanies,
		companyData,
		selectedYear,
		selectedCompany,
	]);

	const financialYearList =
		(isFetchedYears &&
			(financialYearData as FyResponseType).Status === "1" &&
			(financialYearData as FyResponseType).Data) ||
		[];
	const companyList =
		(isFetchedCompanies &&
			(companyData as FyBussinessUnitResponseType).Status === "1" &&
			(companyData as FyBussinessUnitResponseType).Data) ||
		[];

	return (
		<CustomDialog open={open} onClose={onClose} transitionType="slide">
			<DialogContent>
				<Box>
					{/* Financial Year Selection */}
					<Paper elevation={3} sx={{ mb: 2 }}>
						<Typography
							variant="body1"
							gutterBottom
							fontWeight="bold"
							sx={{ display: "flex", alignItems: "center", p: 1 }}>
							<CalendarToday color="primary" fontSize="small" sx={{ mr: 1 }} />
							Select Financial Year
						</Typography>
						{renderScrollableList(
							financialYearList,
							(item) => item.financialyearid,
							isLoadingYears,
							(year) => (
								<SelectableListItem
									primaryText={year?.Description || ""}
									secondaryText={`${year.StartDate} to ${year?.EndDate || ""}`}
									isSelected={selectedYear === year?.financialyearid}
									onSelect={() => setSelectedYear(year?.financialyearid || "")}
									ChipLabel={`FY ${year?.Code || ""}`}
								/>
							)
						)}
					</Paper>

					{/* Company Selection */}
					<Paper elevation={3} sx={{ mb: 2 }}>
						<Typography
							variant="body1"
							gutterBottom
							fontWeight="bold"
							sx={{ display: "flex", alignItems: "center", p: 1 }}>
							<Business color="primary" fontSize="small" sx={{ mr: 1 }} />
							Select Company
						</Typography>
						{renderScrollableList(
							companyList,
							(item) => item.Cmp_ID_N,
							isLoadingCompanies,
							(company) => (
								<SelectableListItem
									primaryText={company?.CmpName || ""}
									secondaryText={`Company Code: ${company?.CmpCode || ""}`}
									isSelected={selectedCompany === company?.Cmp_ID_N}
									onSelect={() => setSelectedCompany(company?.Cmp_ID_N || "")}
								/>
							)
						)}
					</Paper>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={!selectedYear || !selectedCompany}
					sx={{ mb: 2, mx: 2 }}>
					Submit
				</Button>
			</DialogActions>
		</CustomDialog>
	);
};

export default SelectCompanyModal;
