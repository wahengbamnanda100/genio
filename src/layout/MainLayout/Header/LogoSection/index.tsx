import { Box, ButtonBase } from "@mui/material";
import genioLogo from "../../../../../public/staticData/image/genioLogoPng.png";

const LogoSection = () => {
	// const defaultId = useSelector((state) => state.customization.defaultId);
	// const dispatch = useDispatch();
	return (
		<Box
			component={ButtonBase}
			onClick={() => console.log("clicked logo")}
			sx={{
				display: "flex",
				justifyContent: "flex-start",
				alignItems: "center",
				cursor: "pointer",
			}}>
			<img src={genioLogo} alt="logo" style={{ width: "120px" }} />
		</Box>
	);
};

export default LogoSection;
