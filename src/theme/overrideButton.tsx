import { alpha, Components, darken, lighten } from "@mui/material";
import { ThemePalette } from "./palette";

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		login: true;
		common: true;
	}
}

export const overridesButton = (
	palette: ThemePalette
): Pick<Components, "MuiButton"> => ({
	MuiButton: {
		variants: [
			{
				props: { variant: "login" },
				style: {
					color: palette.text.primary,
					backgroundColor: palette.primary.main,
					fontSize: "1.2rem",
					fontWeight: "500",
					padding: "0.75rem 1.7rem",
					width: "100%",
					"&:hover": {
						backgroundColor: lighten(palette.primary.main, 0.1),
					},
				},
			},
			{
				props: { variant: "common" },
				style: {
					textTransform: "capitalize",
					fontSize: "1rem",
					fontWeight: "500",
					cursor: "pointer",
					boxSizing: "border-box",
					marginLeft: "0.5rem",
					padding: "0.2rem 0.9rem",
					width: "fit-content",
					minHeight: "2.3rem",
				},
			},
			{
				props: { variant: "common", color: "primary" },
				style: {
					backgroundColor: palette.primary.main,
					color: palette.text.primary,
					"&:hover": {
						backgroundColor: lighten(palette.primary.main, 0.1),
					},
					border: `1px solid ${palette.primary.main}`,
				},
			},
			{
				props: { variant: "common", className: "cancel" },
				style: {
					backgroundColor: palette.text.secondary,
					color: palette.primary.main,
					"&:hover": {
						backgroundColor: palette.primary.dark,
					},
					border: `1px solid ${palette.primary.main}`,
				},
			},
			{
				props: {
					variant: "common",
					className: "cancel_delete",
				},
				style: {
					backgroundColor: palette.error.dark,
					color: palette.error.main,
					"&:hover": {
						backgroundColor: palette.primary.dark,
					},
					border: `1px solid ${palette.error.main}`,
				},
			},
			{
				props: { variant: "common", color: "secondary" },
				style: {
					backgroundColor: palette.primary.dark,
					color: palette.primary.main,
					"&:hover": {
						backgroundColor: palette.primary.dark,
					},
					border: `1px solid ${palette.primary.main}`,
				},
			},
			{
				props: { variant: "common", color: "warning" },
				style: {
					backgroundColor: palette.warning.main,
					color: palette.warning.dark,
					"&:hover": {
						backgroundColor: lighten(palette.warning.main, 0.1),
					},
					border: `1px solid ${palette.warning.main}`,
				},
			},
			{
				props: { variant: "common", color: "error" },
				style: {
					backgroundColor: palette.error.main,
					color: palette.text.secondary,
					"&:hover": {
						backgroundColor: lighten(palette.error.main, 0.1),
					},
					border: `1px solid ${palette.error.main}`,
				},
			},
			{
				props: { variant: "outlined", color: "primary" },
				style: {
					// backgroundColor: palette.error.main,
					color: palette.text.primary,
					"&:hover": {
						// backgroundColor: lighten(palette.error.main, 0.1),
						border: `2px solid ${darken(palette.primary.main, 0.2)}`,
					},
					border: `2px solid ${palette.primary.main}`,
				},
			},
			{
				props: { variant: "contained", color: "primary" },
				style: {
					// backgroundColor: palette.error.main,
					color: palette.text.primary,
					"&:hover": {
						// backgroundColor: lighten(palette.error.main, 0.1),
						border: `2px solid ${darken(palette.primary.main, 0.2)}`,
					},
					"&:disabled": {
						backgroundColor: alpha(palette.primary.main, 0.7),
					},
					border: `2px solid ${palette.primary.main}`,
				},
			},
		],
	},
});
