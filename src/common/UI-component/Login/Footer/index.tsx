import { Grid, Stack, Typography } from "@mui/material";

const LoginFooter = () => {
	return (
		<Grid
			container
			sx={{
				p: 2,
				alignSelf: "flex-start",

				// justifyContent: "flex-end",
				pl: "4rem",
				pb: "1rem",
			}}>
			<Grid item xs={4}>
				<Stack>
					<Typography variant="body1" fontWeight={"medium"}>
						Privacy Policy | Terms & Conditions
					</Typography>
					<Typography variant="subtitle2" fontWeight={"light"}>
						Copyright {new Date().getFullYear()} All Rights Reserved
					</Typography>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default LoginFooter;
