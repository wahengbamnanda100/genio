import { lighten, styled, TextField, TableRow } from "@mui/material";
import { Table } from "@devexpress/dx-react-grid-material-ui";

export const LoadingShade = styled("div")`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.3);
	& .loading_icon {
		position: absolute;
		font-size: 20;
		top: calc(45% - 10px);
		left: calc(50% - 10px);
	}
`;

export const TableStyled = styled(Table.Table)(({ theme }) => ({
	boxShadow: `inset 0 0 0 1px ${theme.palette.grey[500]}`,
	"& th, & td": {
		border: `1px solid ${theme.palette.grey.A100}`,
		padding: 5,
	},
	"& tr.TableSelectRow-selected": {
		backgroundColor: `#d8e7ed !important`,
	},
}));

export const TableHeadStyled = styled(Table.TableHead)(({ theme }) => ({
	"& .TableInvisibleRow-row": {
		display: "none",
	},
	"& tr:first-of-type": {
		backgroundColor: lighten(theme.palette.primary.main, 0.92),
		"& th": {
			color: theme.palette.primary.main,
			fontSize: theme.typography.fontSize,
			fontWeight: theme.typography.fontWeightBold,
			backgroundColor: "inherit",
		},
	},
	"& tr:nth-of-type(3)": {
		display: "none",
	},
}));

export const TableSummaryRowStyled = styled(TableRow)`
	background-color: ${({ theme }) => lighten(theme.palette.primary.main, 0.92)};
	font-weight: ${({ theme }) => theme.typography.fontWeightBold};
	& td {
		.TableSummaryItem-item {
			color: ${({ theme }) => theme.palette.primary.main};
		}
	}
`;

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
	marginRight: 20,
	fontWeight: theme.typography.fontWeightRegular,
	"& .MuiOutlinedInput-input": {
		padding: "9.5px 14px",
	},
	"& .MuiTextField-root": {
		marginRight: "14px",
	},
}));
