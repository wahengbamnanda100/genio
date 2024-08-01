import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useAppProvider } from "../../AppProvider";
import { useEffect } from "react";

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction="up" />;
}

const CustomSnackbar = () => {
	const { notify, setNotify } = useAppProvider();

	useEffect(() => {
		if (notify) {
			window.addEventListener("mousedown", () => {
				setNotify(undefined);
			});
		}
	}, [notify]);

	const handleClose = () => {
		setNotify(undefined);
	};

	return (
		<Snackbar
			open={!!notify}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			TransitionComponent={SlideTransition}
			autoHideDuration={6000}
			onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity={notify?.severity}
				variant="filled"
				sx={{ width: "100%" }}>
				{notify?.message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
