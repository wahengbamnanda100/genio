import { PaletteOptions } from "@mui/material";
import { green, deepPurple, red } from "@mui/material/colors";

import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		previousSale: Palette["primary"];
		breakfast: Palette["primary"];
		grab: Palette["primary"];
		hotfood: Palette["primary"];
		itemButton: Palette["primary"];
		gradientColor: Palette["primary"];
	}

	interface PaletteOptions {
		previousSale?: PaletteOptions["primary"];
		breakfast?: PaletteOptions["primary"];
		grab?: PaletteOptions["primary"];
		hotfood?: PaletteOptions["primary"];
		itemButton?: PaletteOptions["primary"];
		gradientColor?: PaletteOptions["primary"];
	}
}

export const defaultPalette: PaletteOptions = {
	mode: "light",
	primary: {
		// light: "#E7F6FF",
		light: "#61c2ff",
		main: "#0D7ABF",
		dark: "#07477F",
		contrastText: "#fff",
	},
	secondary: {
		light: "#adf0ad",
		main: `#68B767`,
		dark: "#13692F",
		contrastText: "#ffffff",
	},
	error: {
		light: "#cf6b6f ",
		main: "#f7050d",
		dark: "#ad0e13",
		contrastText: "#fff",
	},
	warning: {
		light: "#FFF6E8",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#fff",
	},
	info: {
		light: "#E2E3EC",
		main: "#F6A316",
		dark: "#BC6716",
		contrastText: "#000",
	},
	success: {
		light: "#00a14a",
		main: "#009F49",
		dark: "#000",
		contrastText: "#000",
	},
	text: {
		primary: "#000",
		secondary: "#ffff",
		disabled: "#13692F",
	},
	previousSale: {
		light: "#E2E3EC",
		main: "#F6A316",
		dark: "#BC6716",
		contrastText: "#fff",
	},
	breakfast: {
		main: "#EA5154",
		light: "#eb8a8c",
		dark: "#BD4186",
		contrastText: "#fff",
	},
	grab: {
		main: "#48C0E6",
		light: "#91d7ed",
		dark: "#006DFF",
		contrastText: "#000",
	},
	hotfood: {
		main: "#FDCF00",
		light: "#eddb8a",
		dark: "#C98A0C",
		contrastText: "#000",
	},
	itemButton: {
		main: "#305468",
		light: "#8dcef2",
		dark: "#15252e",
		contrastText: "#000",
	},
	gradientColor: {
		main: `linear-gradient(90deg, #13692F 0%, #0D7ABF 100%)`,
		light: "#00a14a",
		dark: "#000",
		contrastText: "#000",
	},
	action: {
		active: "rgba(0, 0, 0, 0.54)",
		hover: "rgba(0, 0, 0, 0.04)",
		hoverOpacity: 0.04,
		selected: "#E8EDF1",
		selectedOpacity: 0.08,
		disabled: "rgba(0, 0, 0, 0.26)",
		disabledBackground: "rgba(0, 0, 0, 0.12)",
		disabledOpacity: 0.38,
		focus: "rgba(0, 0, 0, 0.12)",
		focusOpacity: 0.12,
		activatedOpacity: 0.12,
	},
};

export const greenPalette: PaletteOptions = {
	primary: {
		main: green[500],
		light: "#7986cb",
		dark: "#000",
		contrastText: "#ffffff",
	},
	secondary: {
		light: "#FCB03F",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#ffffff",
	},
	error: {
		light: "#FFCCCC ",
		main: "#EC7474",
		dark: "#000",
		contrastText: "#000",
	},
	warning: {
		light: "#FFF6E8",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#fff",
	},
	info: {
		light: "#E2E3EC",
		main: "#2D9CDB",
		dark: "#000",
		contrastText: "#000",
	},
	success: {
		light: "#00a14a",
		main: "#009F49",
		dark: "#000",
		contrastText: "#000",
	},
	text: {
		primary: "#000",
		secondary: "#0072bb",
		disabled: "#303f9f",
	},
	action: {
		active: "rgba(0, 0, 0, 0.54)",
		hover: "rgba(0, 0, 0, 0.04)",
		hoverOpacity: 0.04,
		selected: "#E8EDF1",
		selectedOpacity: 0.08,
		disabled: "rgba(0, 0, 0, 0.26)",
		disabledBackground: "rgba(0, 0, 0, 0.12)",
		disabledOpacity: 0.38,
		focus: "rgba(0, 0, 0, 0.12)",
		focusOpacity: 0.12,
		activatedOpacity: 0.12,
	},
};

export const purplePalette: PaletteOptions = {
	primary: {
		main: deepPurple[500],
		light: "#7986cb",
		dark: "#000",
		contrastText: "#ffffff",
	},
	secondary: {
		light: "#FCB03F",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#000",
		// gradient: `linear-gradient(to right, "#FCB03F , #FC9D10)`,
	},
	error: {
		light: "#FFCCCC ",
		main: "#EC7474",
		dark: "#000",
		contrastText: "#000",
	},
	warning: {
		light: "#FFF6E8",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#fff",
	},
	info: {
		light: "#E2E3EC",
		main: "#2D9CDB",
		dark: "#000",
		contrastText: "#000",
	},
	success: {
		light: "#00a14a",
		main: "#009F49",
		dark: "#000",
		contrastText: "#000",
	},
	text: {
		primary: "#000",
		secondary: "#0072bb",
		disabled: "#303f9f",
	},
	action: {
		active: "rgba(0, 0, 0, 0.54)",
		hover: "rgba(0, 0, 0, 0.04)",
		hoverOpacity: 0.04,
		selected: "#E8EDF1",
		selectedOpacity: 0.08,
		disabled: "rgba(0, 0, 0, 0.26)",
		disabledBackground: "rgba(0, 0, 0, 0.12)",
		disabledOpacity: 0.38,
		focus: "rgba(0, 0, 0, 0.12)",
		focusOpacity: 0.12,
		activatedOpacity: 0.12,
	},
};

export const redPalette: PaletteOptions = {
	primary: {
		main: red[500],
		light: "#7986cb",
		dark: "#000",
		contrastText: "#ffffff",
	},
	secondary: {
		light: "#FCB03F",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#000",
	},
	error: {
		light: "#FFCCCC ",
		main: "#EC7474",
		dark: "#000",
		contrastText: "#000",
	},
	warning: {
		light: "#FFF6E8",
		main: "#FC9D10",
		dark: "#000",
		contrastText: "#fff",
	},
	info: {
		light: "#E2E3EC",
		main: "#2D9CDB",
		dark: "#000",
		contrastText: "#000",
	},
	success: {
		light: "#00a14a",
		main: "#009F49",
		dark: "#000",
		contrastText: "#000",
	},
	text: {
		primary: "#000",
		secondary: "#0072bb",
		disabled: "#303f9f",
	},
	action: {
		active: "rgba(0, 0, 0, 0.54)",
		hover: "rgba(0, 0, 0, 0.04)",
		hoverOpacity: 0.04,
		selected: "#E8EDF1",
		selectedOpacity: 0.08,
		disabled: "rgba(0, 0, 0, 0.26)",
		disabledBackground: "rgba(0, 0, 0, 0.12)",
		disabledOpacity: 0.38,
		focus: "rgba(0, 0, 0, 0.12)",
		focusOpacity: 0.12,
		activatedOpacity: 0.12,
	},
};
