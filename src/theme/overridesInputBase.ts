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
					// fontSize: 8,
					// height: 39,
					"&.Mui-disabled": {
						color: theme.palette.text.disabled,
						backgroundColor: alpha(theme.palette.secondary.light, 0.4),
					},
				}),
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
};
