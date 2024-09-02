import { Container, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorElement = () => {
	const error = useRouteError();
	console.error(error);

	let errorMessage;
	if (isRouteErrorResponse(error)) {
		errorMessage = error.data;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else {
		errorMessage = "An unknown error occurred";
	}

	return (
		<Container>
			<Typography variant="h5" fontWeight={"medium"}>
				Oops! Something went wrong.
			</Typography>

			<Typography color={"error"}>{errorMessage}</Typography>
		</Container>
	);
};

export default ErrorElement;
