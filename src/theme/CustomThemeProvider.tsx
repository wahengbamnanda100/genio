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
import { enUS as en, arSA as ar } from "date-fns/locale";
import { overridesButton } from "./overrideButton";
import { overridesTooltip } from "./overridesTooltip";
import { overridesOutlinedInput } from "./overridesOutlinedInput";
import { overridesInputLabel } from "./overridesInputLabel";
import { overridesFormControlLabel } from "./overridesFormControlLabel";
import { overridesInputBase } from "./overridesInputBase";
import { overridesCheckBox } from "./overrideCheckBox";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { PickersLocaleText } from "@mui/x-date-pickers";

type CustomThemeProviderProps = { children: React.ReactNode };

export const localeMap = {
  en,
  ar,
};

const localeTextMap: Record<string, Partial<PickersLocaleText<Date>>> = {
  en: {
    previousMonth: "Previous month",
    nextMonth: "Next month",
    openPreviousView: "open previous view",
    openNextView: "open next view",
    cancelButtonLabel: "Cancel",
    clearButtonLabel: "Clear",
    okButtonLabel: "OK",
    todayButtonLabel: "Today",
    // Add other labels as needed
  },
  ar: {
    previousMonth: "الشهر السابق",
    nextMonth: "الشهر القادم",
    openPreviousView: "فتح العرض السابق",
    openNextView: "فتح العرض التالي",
    cancelButtonLabel: "إلغاء",
    clearButtonLabel: "مسح",
    okButtonLabel: "موافق",
    todayButtonLabel: "اليوم",
    // Add other labels as needed
  },
};

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const palette = {
  default: defaultPalette,
  red: redPalette,
  green: greenPalette,
  purple: purplePalette,
};

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  // const { themeColor } = useAppProvider(); //todo get from redux
  const { i18n } = useTranslation();

  let theme = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr",
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

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  theme = responsiveFontSizes(theme);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap[i18n.language as keyof typeof localeMap]}
      localeText={localeTextMap[i18n.language as keyof typeof localeTextMap]}
    >
      <CacheProvider value={i18n.language === "ar" ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </LocalizationProvider>
  );
};

export default CustomThemeProvider;
