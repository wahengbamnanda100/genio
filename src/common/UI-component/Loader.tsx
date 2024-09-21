// material-ui
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

// ==============================|| LOADER ||============================== //
interface LoaderPorps {
	pageLoading: boolean;
}

const Loader: FC<LoaderPorps> = ({ pageLoading }) => (
	<>
		<Box
			sx={{ position: "fixed", top: 0, left: 0, zIndex: 1301, width: "100%" }}>
			<LinearProgress color="primary" />
		</Box>

		{/* Backdrop with Spinner when pageLoading is true */}
		{pageLoading && (
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1, // Ensuring the backdrop appears on top
				}}
				open={pageLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		)}
	</>
);

export default Loader;
