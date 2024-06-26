import { Components } from "@mui/material";

export const overridesInputLabel = (): Pick<Components, "MuiInputLabel"> => ({
	MuiInputLabel: {
		styleOverrides: {
			root: {
				color: "#3b3b3b",
				fontWeight: "500",
				fontSize: "0.875rem",
			},
		},
	},
});
