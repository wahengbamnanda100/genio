import { Outlet } from "react-router-dom";
import CustomSnackbar from "../common/UI-component/Notification";
import { useAppProvider } from "../AppProvider";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
	const { notify } = useAppProvider();
	return (
		<>
			<Outlet />
			{notify && <CustomSnackbar />}
		</>
	);
};

export default MinimalLayout;
