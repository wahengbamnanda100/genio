/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Grid, Typography, styled } from "@mui/material";
import { Student } from "../../services/aoi.type";

export const StyledStudentCard = styled("li")`
	background: #f7f7f7;
	display: flex;
	// gap: 0 1rem;
	margin-bottom: 6px;
	font-size: 12px;
	// & span {
	// 	font-weight: 400;
	// 	margin-bottom: 7px;
	// 	height: 100%;
	// }
`;

export const StyledStudentImageContainer = styled("div")`
	height: 100%;
`;

// export const StyledStudentDataContainer = styled("div")`
// 	width: 100%;
// 	display: grid;
// 	grid-template-columns: 1fr 1fr;
// 	gap: 0 1rem;
// `;

export const StyledStudentData = styled("span")`
	color: ${({ theme }) => theme.palette.primary.main};
	font-weight: 600 !important;
`;

export const StyledEmployeeField = styled("span")`
	font-size: 10px;
`;

interface AvatarComponentProps {
	src: string;
	alt: string;
}

const ResponsiveTypography = styled(Typography)(() => ({
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	display: "block",
	width: "100%",
	fontSize: "clamp(12px, 1.5vw, 10px)", // Adjust these values based on your needs
}));

const AvatarComponent: React.FC<AvatarComponentProps> = ({ src, alt }) => (
	<Grid
		component={StyledStudentImageContainer}
		item
		xs={2}
		sx={{
			// border: "1px solid",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}>
		<Avatar alt={alt} src={src} sx={{ margin: "auto" }} />
	</Grid>
);

interface DetailsComponentProps {
	familyId: string;
	studentName: string;
	grade: string;
	cardNo: string;
	admissionNo: string;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
	familyId,
	studentName,
	grade,
	cardNo,
	admissionNo,
}) => (
	<Grid item container rowSpacing={1} columnSpacing={1} xs={8} sx={{ px: 1 }}>
		<Grid item xs={12}>
			<Typography sx={{ fontSize: "10px", fontWeight: "medium" }}>
				{" "}
				{familyId}
			</Typography>
		</Grid>
		<Grid item xs={8}>
			<Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
				{studentName}
			</Typography>
		</Grid>
		<Grid item xs={4}>
			<Typography sx={{ fontSize: "12px" }}>{grade}</Typography>
		</Grid>
		<Grid item xs={6}>
			<Typography sx={{ fontSize: "12px" }}>{cardNo}</Typography>
		</Grid>
		<Grid item xs={6}>
			<Typography sx={{ fontSize: "12px" }}>{admissionNo}</Typography>
		</Grid>
	</Grid>
);

interface BalanceComponentProps {
	balance: string;
}

const BalanceComponent: React.FC<BalanceComponentProps> = ({ balance }) => (
	<Grid
		item
		xs={2}
		sx={{
			// border: "1px solid",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			fontWeight: "medium",
		}}>
		<ResponsiveTypography
			sx={{ fontSize: "12px", margin: "auto", fontWeight: "bold" }}>
			{balance}
		</ResponsiveTypography>
	</Grid>
);

interface StudentCardProps {
	options: Student;
	props: any;
	isSelected: any;
	highlightColor: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
	options,
	props,
	isSelected,
	highlightColor,
}) => {
	const {
		StudentName,
		CardNumber,
		AdmissionNumber,
		FamilyId,
		AvailableBalance,
		Grade,
		ImageUrl,
	} = options;

	return (
		<Grid
			component={StyledStudentCard}
			{...props}
			container
			sx={{
				// p: 1,
				px: 0,
				// border: "1px solid",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: isSelected ? highlightColor : "inherit",
				// color: isSelected ? "white" : "black",
				"&:hover": {
					backgroundColor: highlightColor,
				},
			}}>
			<AvatarComponent src={`${ImageUrl}`} alt={StudentName} />
			<DetailsComponent
				familyId={FamilyId}
				studentName={StudentName}
				grade={Grade}
				cardNo={CardNumber}
				admissionNo={AdmissionNumber}
			/>
			<BalanceComponent balance={AvailableBalance} />
		</Grid>
	);
};

export default StudentCard;
