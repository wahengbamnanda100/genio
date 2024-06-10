import {
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import theme from "./theme";
import { Customization } from "./theme/types";
import NavigationScroll from "./layout/NavigationScroll";
import router from "./routes";

// const AppContent = () => { }

function App() {
	const queryClient = new QueryClient();
	const customisation: Customization = { navType: "light" };
	console.log("this page is loaded @app");

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme(customisation)}>
					<CssBaseline />
					<NavigationScroll>
						<RouterProvider router={router} />
					</NavigationScroll>
				</ThemeProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

export default App;
