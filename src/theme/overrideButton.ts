import { Components, lighten, Palette } from "@mui/material";

// Extend the ButtonPropsVariantOverrides interface
declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		login: true;
		common: true;
	}
	interface ButtonPropsColorOverrides {
		previousSale: true;
		breakfast: true;
		grab: true;
		hotfood: true;
		itemButton: true;
	}
}

declare module "@mui/material/styles" {
	interface Palette {
		previousSale: Palette["primary"];
		breakfast: Palette["primary"];
		grab: Palette["primary"];
		hotfood: Palette["primary"];
		itemButton: Palette["primary"];
	}
	interface PaletteOptions {
		previousSale?: PaletteOptions["primary"];
		breakfast?: PaletteOptions["primary"];
		grab?: PaletteOptions["primary"];
		hotfood?: PaletteOptions["primary"];
		itemButton?: PaletteOptions["primary"];
	}
}

export const overridesButton = (
	palette: Palette
): Pick<Components, "MuiButton"> => ({
	MuiButton: {
		variants: [
			{
				props: { variant: "login" },
				style: {
					color: palette.primary.contrastText,
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
					color: palette.primary.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.primary.main, 0.1),
					},
					border: `1px solid ${palette.primary.main}`,
				},
			},
			{
				props: { variant: "common", color: "previousSale" },
				style: {
					backgroundColor: palette.previousSale.main,
					color: palette.previousSale.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.previousSale.main, 0.1),
					},
					border: `1px solid ${palette.previousSale.main}`,
				},
			},
			{
				props: { variant: "common", color: "breakfast" },
				style: {
					backgroundColor: palette.breakfast.main,
					color: palette.breakfast.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.breakfast.main, 0.1),
					},
					border: `1px solid ${palette.breakfast.main}`,
				},
			},
			{
				props: { variant: "common", color: "grab" },
				style: {
					backgroundColor: palette.grab.main,
					color: palette.grab.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.grab.main, 0.1),
					},
					border: `1px solid ${palette.grab.main}`,
				},
			},
			{
				props: { variant: "common", color: "hotfood" },
				style: {
					backgroundColor: palette.hotfood.main,
					color: palette.hotfood.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.hotfood.main, 0.1),
					},
					border: `1px solid ${palette.hotfood.main}`,
				},
			},
			{
				props: { variant: "common", color: "itemButton" },
				style: {
					backgroundColor: palette.itemButton.main,
					color: palette.itemButton.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.itemButton.main, 0.1),
					},
					border: `1px solid ${palette.hotfood.main}`,
				},
			},
			{
				props: { variant: "common", className: "cancel" },
				style: {
					backgroundColor: palette.primary.contrastText,
					color: palette.primary.main,
					"&:hover": {
						backgroundColor: palette.primary.contrastText,
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
					backgroundColor: palette.error.contrastText,
					color: palette.error.main,
					"&:hover": {
						backgroundColor: palette.primary.contrastText,
					},
					border: `1px solid ${palette.error.main}`,
				},
			},
			{
				props: { variant: "common", color: "secondary" },
				style: {
					backgroundColor: palette.primary.contrastText,
					color: palette.primary.main,
					"&:hover": {
						backgroundColor: palette.primary.contrastText,
					},
					border: `1px solid ${palette.primary.main}`,
				},
			},
			{
				props: { variant: "common", color: "warning" },
				style: {
					backgroundColor: palette.warning.main,
					color: palette.warning.contrastText,
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
					color: palette.error.contrastText,
					"&:hover": {
						backgroundColor: lighten(palette.error.main, 0.1),
					},
					border: `1px solid ${palette.error.main}`,
				},
			},
		],
	},
});
