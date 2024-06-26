import { Grid } from "@mui/material";

import GenioLogo from "../../../../../public/staticData/image/genioLogoPng.png";

const LoginHeader = () => {
	return (
		<Grid
			container
			sx={{
				p: 2,
				alignSelf: "flex-start",
				textAlign: "right",
				justifyContent: "flex-end",
				pr: "4rem",
			}}>
			<Grid item xs={1.5} component={"img"} src={GenioLogo} alt="logo" />
		</Grid>
	);
};

export default LoginHeader;
