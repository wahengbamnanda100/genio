import { Components, Theme } from "@mui/material";
// import { defaultPalette as palette } from "./customPalettes";

export const overridesInputBase: Pick<
	Components<Theme>,
	"MuiInputBase" | "MuiOutlinedInput"
> = {
	MuiInputBase: {
		styleOverrides: {
			input: {
				"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
					WebkitAppearance: "none",
				},
				"&[type=number]": {
					MozAppearance: "textfield",
				},
			},
			root: {
				"&.Mui-disabled": {
					backgroundColor: "rgba(0, 0, 0, 0.12)",
				},
			},
		},
	},
	// MuiOutlinedInput: {
	// 	styleOverrides: {
	// 		input: {
	// 			"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
	// 				WebkitAppearance: "none",
	// 			},
	// 			"&[type=number]": {
	// 				MozAppearance: "textfield",
	// 			},
	// 		},
	// 		root: {
	// 			"&.Mui-disabled": {
	// 				backgroundColor: "secondary", // Example styling for disabled input
	// 			},
	// 		},
	// 	},
	// },
};
