import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import NavigationScroll from "./layout/NavigationScroll";
import router from "./routes";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import store from "./store";
import AppProvider from "./AppProvider";

// const AppContent = () => { }

function App() {
	const queryClient = new QueryClient();
	console.log("this page is loaded @app");

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<StyledEngineProvider injectFirst>
					<AppProvider>
						<CustomThemeProvider>
							<CssBaseline />
							<NavigationScroll>
								<RouterProvider router={router} />
							</NavigationScroll>
						</CustomThemeProvider>
					</AppProvider>
				</StyledEngineProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
