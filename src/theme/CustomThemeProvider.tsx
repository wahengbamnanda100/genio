/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
// import { useAppProvider } from "AppProvider"; //todo add in redux data
import React from "react";

import {
	defaultPalette,
	greenPalette,
	purplePalette,
	// purplePalette,
	redPalette,
} from "./customPalettes";
import { defaultTheme } from "./defaultTheme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { enUS as en } from "date-fns/locale";
import { overridesButton } from "./overrideButton";
import { overridesTooltip } from "./overridesTooltip";
import { overridesOutlinedInput } from "./overridesOutlinedInput";
import { overridesInputLabel } from "./overridesInputLabel";
import { overridesFormControlLabel } from "./overridesFormControlLabel";
import { overridesInputBase } from "./overridesInputBase";
import { overridesCheckBox } from "./overrideCheckBox";

type CustomThemeProviderProps = { children: React.ReactNode };

export const localeMap = {
	en,
};

const cacheLtr = createCache({
	key: "muiltr",
});

const palette = {
	default: defaultPalette,
	red: redPalette,
	green: greenPalette,
	purple: purplePalette,
};

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
	// const { themeColor } = useAppProvider(); //todo get from redux

	let theme = createTheme({
		direction: "ltr",
		palette: palette.default, //todo add form redux
		...defaultTheme,
		components: {
			...defaultTheme.components,
			...overridesButton(palette.default as any),
			...overridesCheckBox(palette.default as any),
			...overridesTooltip(palette.default as any),
			...overridesOutlinedInput(palette.default as any),
			...overridesInputLabel(),
			...overridesFormControlLabel(palette.default as any),
			...overridesInputBase,
		},
	});

	// React.useLayoutEffect(() => {
	//   document.body.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
	// }, [i18n.language]);

	theme = responsiveFontSizes(theme);

	return (
		<LocalizationProvider
			dateAdapter={AdapterDateFns}
			// localeText={localeMap[i18n.language as keyof typeof localeMap]}
		>
			<CacheProvider value={cacheLtr}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</CacheProvider>
		</LocalizationProvider>
	);
};

export default CustomThemeProvider;
