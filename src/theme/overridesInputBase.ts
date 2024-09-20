import { Components, Theme, alpha } from "@mui/material";
// import { defaultPalette as palette } from "./customPalettes";

export const overridesInputBase: Pick<
	Components<Theme>,
	"MuiInputBase" | "MuiOutlinedInput"
> = {
	MuiInputBase: {
		styleOverrides: {
			root: ({ ownerState, theme }) => ({
				...(ownerState.size === "small" && {
					fontSize: "1em",
					height: 30,
					"&.Mui-disabled": {
						color: theme.palette.text.disabled,
						backgroundColor: alpha(theme.palette.secondary.light, 0.4),
					},
				}),
				notchedOutline: {
					"& legend": {
						fontSize: "0.9rem",
						transition: "width 200ms",
					},
				},
			}),
			input: {
				"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
					WebkitAppearance: "none",
				},
				"&[type=number]": {
					MozAppearance: "textfield",
				},
			},
		},
	},
	// MuiOutlinedInput: {
	// 	styleOverrides: {
	// 		root: ({ ownerState }) => ({
	// 			...(ownerState.size === "small" && {
	// 				height: 30,
	// 				fontSize: "0.87em",
	// 			}),
	// 		}),
	// 		notchedOutline: {
	// 			"& legend": {
	// 				fontSize: "0.8rem",
	// 				transition: "width 200ms",
	// 			},
	// 		},
	// 	},
	// },
};
