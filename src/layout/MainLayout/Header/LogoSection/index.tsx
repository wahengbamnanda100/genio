import { ButtonBase } from "@mui/material";
// import { Link } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const LogoSection = () => {
	// const defaultId = useSelector((state) => state.customization.defaultId);
	// const dispatch = useDispatch();
	return (
		<ButtonBase
			disableRipple
			// onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
			onClick={() => {
				console.log("logo clicked");
			}}
			// component={Link}
			// to={config.defaultPath}
		>
			<LogoDevIcon />
		</ButtonBase>
	);
};

export default LogoSection;
