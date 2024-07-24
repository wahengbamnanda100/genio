import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
	return (
		<Box
			sx={{
				height: "80vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Typography variant="h4" fontWeight={"bold"} color={"grey.600"}>
				Page Not Found
			</Typography>
		</Box>
	);
};

export default PageNotFound;
