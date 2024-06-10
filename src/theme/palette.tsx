import { PaletteMode } from "@mui/material";
import { CustomTheme } from "./types";

/**
 * Color intention that you want to use in your theme
 * @param {Theme} theme - Theme customization object
 */

export interface ThemePalette {
	mode: PaletteMode;
	common: {
		black: string;
	};
	primary: {
		light: string;
		main: string;
		dark: string;
		200: string;
		800: string;
	};
	secondary: {
		light: string;
		main: string;
		dark: string;
		200: string;
		800: string;
	};
	error: {
		light: string;
		main: string;
		dark: string;
	};
	orange: {
		light: string;
		main: string;
		dark: string;
	};
	warning: {
		light: string;
		main: string;
		dark: string;
	};
	success: {
		light: string;
		200: string;
		main: string;
		dark: string;
	};
	grey: {
		50: string;
		100: string;
		500: string;
		600: string;
		700: string;
		900: string;
	};
	dark: {
		light: string;
		main: string;
		dark: string;
		800: string;
		900: string;
	};
	text: {
		primary: string;
		secondary: string;
		dark: string;
		hint: string;
	};
	background: {
		paper: string;
		default: string;
	};
}

export default function themePalette(theme: CustomTheme): ThemePalette {
	return {
		mode: theme.customization?.navType ?? "light",
		common: {
			black: theme.colors.darkPaper ?? "#000",
		},
		primary: {
			light: theme.colors?.primaryLight ?? "#fff",
			main: theme.colors?.primaryMain ?? "#fff",
			dark: theme.colors?.primaryDark ?? "#fff",
			200: theme.colors?.primary200 ?? "#fff",
			800: theme.colors?.primary800 ?? "#fff",
		},
		secondary: {
			light: theme.colors?.secondaryLight ?? "#fff",
			main: theme.colors?.secondaryMain ?? "#fff",
			dark: theme.colors?.secondaryDark ?? "#fff",
			200: theme.colors?.secondary200 ?? "#fff",
			800: theme.colors?.secondary800 ?? "#fff",
		},
		error: {
			light: theme.colors?.errorLight ?? "#fff",
			main: theme.colors?.errorMain ?? "#fff",
			dark: theme.colors?.errorDark ?? "#fff",
		},
		orange: {
			light: theme.colors?.orangeLight ?? "#fff",
			main: theme.colors?.orangeMain ?? "#fff",
			dark: theme.colors?.orangeDark ?? "#fff",
		},
		warning: {
			light: theme.colors?.warningLight ?? "#fff",
			main: theme.colors?.warningMain ?? "#fff",
			dark: theme.colors?.warningDark ?? "#fff",
		},
		success: {
			light: theme.colors?.successLight ?? "#fff",
			200: theme.colors?.success200 ?? "#fff",
			main: theme.colors?.successMain ?? "#fff",
			dark: theme.colors?.successDark ?? "#fff",
		},
		grey: {
			50: theme.colors?.grey50 ?? "#fff",
			100: theme.colors?.grey100 ?? "#fff",
			500: theme.colors?.darkTextSecondary ?? "#fff",
			600: theme.colors?.heading ?? "#fff",
			700: theme.colors?.darkTextPrimary ?? "#fff",
			900: theme.colors?.textDark ?? "#fff",
		},
		dark: {
			light: theme.colors?.darkTextPrimary ?? "#fff",
			main: theme.colors?.darkLevel1 ?? "#fff",
			dark: theme.colors?.darkLevel2 ?? "#fff",
			800: theme.colors?.darkBackground ?? "#fff",
			900: theme.colors?.darkPaper ?? "#fff",
		},
		text: {
			primary: theme.colors?.darkTextPrimary ?? "#fff",
			secondary: theme.colors?.darkTextSecondary ?? "#fff",
			dark: theme.colors?.textDark ?? "#fff",
			hint: theme.colors?.grey100 ?? "#fff",
		},
		background: {
			paper: theme.paper ?? "#fff",
			default: theme.backgroundDefault ?? "#fff",
		},
	};
}
