import { Components, Theme } from "@mui/material";

export const overridesInputLabel = (): Pick<Components, "MuiInputLabel"> => ({
	MuiInputLabel: {
		styleOverrides: {
			root: ({ ownerState, theme }) => ({
				color: "#3b3b3b",
				fontWeight: "500",
				fontSize: "0.875rem",
				...(ownerState.size === "small" && {
					fontSize: "0.85rem",
					// backgroundColor: "red",
					top: -5,
					// padding: 0,
					// height: 20,
					padding: (theme as Theme).spacing(0.2),
					marginBottom: (theme as Theme).spacing(1.5),
				}),
				...(ownerState.shrink && {
					// When shrink is true, increase the font size
					top: 0,
					fontSize: "1em", // Larger font size for shrunk label
				}),
			}),
		},
	},
});
