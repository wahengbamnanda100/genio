import React from "react";
import {
	Breadcrumbs,
	Typography,
	// Button,
	Link,
	IconButton,
	Box,
	useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

const BreadcrumbNav = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	// Only show certain segments: 'pos-menu' and the ID (last segment)
	const breadcrumbSegments = pathnames.filter((segment, index) => {
		// Show 'pos-menu' and the last segment (likely an ID)
		return segment === "pos-menu" || index === pathnames.length - 1;
	});

	const handleBackNavigation = () => {
		navigate("/pos-menu"); // Navigate back
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				marginBottom: "0.5rem",
				width: "50%",
				gap: 2,
			}}>
			{/* Back Navigation Button */}
			<IconButton
				color="primary"
				size="small"
				aria-label="Back"
				onClick={handleBackNavigation}
				sx={{
					color: theme.palette.primary.contrastText,
					bgcolor: theme.palette.primary.main,
					"&:hover": {
						outline: `1px solid ${theme.palette.primary.main}`,
						color: theme.palette.primary.main,
					},
				}}>
				<ArrowBackIcon />
			</IconButton>

			{/* Breadcrumbs */}
			<Breadcrumbs
				separator={
					<NavigateNextIcon
						fontSize="small"
						sx={{ color: theme.palette.primary.main }}
					/>
				}
				aria-label="breadcrumb">
				{/* Always have the Home link */}
				{/* <Link component={RouterLink} to="/">
					Home
				</Link> */}

				{breadcrumbSegments.map((segment, index) => {
					const isLast = index === breadcrumbSegments.length - 1;
					const to = `/${breadcrumbSegments.slice(0, index + 1).join("/")}`;

					if (segment === "pos-menu") {
						// Customize the display label for 'pos-menu'
						return isLast ? (
							<Typography key={to} color="textPrimary" fontWeight={"bold"}>
								Pos Menu
							</Typography>
						) : (
							<Link
								component={RouterLink}
								to={to}
								key={to}
								sx={{ fontWeight: "bold" }}>
								Pos Menu
							</Link>
						);
					}

					// For the last segment (ID), display it as text (without link)
					return isLast ? (
						<Typography key={to} color="textPrimary" fontWeight={"bold"}>
							{segment}
						</Typography>
					) : (
						<Link
							component={RouterLink}
							to={to}
							key={to}
							sx={{ fontWeight: "bold" }}>
							{segment}
						</Link>
					);
				})}
			</Breadcrumbs>
		</Box>
	);
};

export default BreadcrumbNav;
