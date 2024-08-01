/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, styled, Typography } from "@mui/material";
import { FC } from "react";
import { EmployeeItem } from "../../services/aoi.type";

interface EmployeeListItemProps {
	options: EmployeeItem;
	props: any;
	isSelected: any;
	highlightColor: string;
}

const EmployeeListItem: FC<EmployeeListItemProps> = ({
	options,
	highlightColor,
	isSelected,
	props,
}) => {
	const { EmployeeName, EmployeeCode } = options;

	const ResponsiveTypography = styled(Typography)(() => ({
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		display: "block",
		width: "100%",
		fontSize: "clamp(12px, 1.5vw, 10px)", // Adjust these values based on your needs
	}));

	return (
		<Grid
			// key={Emp_ID_N}
			key={props.key}
			container
			spacing={1}
			{...props}
			sx={{
				bgcolor: isSelected ? highlightColor : "inherit",
				// color: isSelected ? "white" : "black",
				"&:hover": {
					backgroundColor: highlightColor,
				},
			}}>
			<Grid item xs={2}>
				<ResponsiveTypography variant="body1" fontWeight={"medium"}>
					{EmployeeCode}
				</ResponsiveTypography>
			</Grid>
			<Grid item xs={1}>
				---
			</Grid>
			<Grid item xs={9}>
				<ResponsiveTypography variant="body1" fontWeight={"bold"}>
					{EmployeeName}
				</ResponsiveTypography>
			</Grid>
		</Grid>
	);
};

export default EmployeeListItem;
