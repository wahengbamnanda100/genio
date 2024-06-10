// types.ts

import { PaletteMode, Theme } from "@mui/material";

export interface Customization {
	fontFamily?: string;
	borderRadius?: number;
	navType: PaletteMode;
}

export interface Colors {
	darkPaper?: string;
	primaryLight?: string;
	primaryMain?: string;
	primaryDark?: string;
	primary200?: string;
	primary800?: string;
	secondaryLight?: string;
	secondaryMain?: string;
	secondaryDark?: string;
	secondary200?: string;
	secondary800?: string;
	errorLight?: string;
	errorMain?: string;
	errorDark?: string;
	orangeLight?: string;
	orangeMain?: string;
	orangeDark?: string;
	warningLight?: string;
	warningMain?: string;
	warningDark?: string;
	successLight?: string;
	success200?: string;
	successMain?: string;
	successDark?: string;
	grey50?: string;
	grey100?: string;
	grey200?: string;
	grey300?: string;
	grey400?: string;
	grey500?: string;
	grey600?: string;
	grey700?: string;
	grey900?: string;
	paper?: string;
	darkTextPrimary?: string;
	darkLevel1?: string;
	darkLevel2?: string;
	darkBackground?: string;
	darkTextSecondary?: string;
	heading?: string;
	textDark?: string;
}

export interface CustomTheme extends Theme {
	customization: Customization;
	colors: Colors;
	grey500?: string;
	heading: string;
	paper: string;
	backgroundDefault: string;
	background: string;
	darkTextPrimary: string;
	darkTextSecondary: string;
	textDark: string;
	menuSelected: string;
	menuSelectedBack: string;
	divider: string;
}
