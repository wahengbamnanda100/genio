import { responsiveFontSizes, ThemeOptions } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import { Components } from "@mui/material/styles/components";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import { overridesButton } from "./overrideButton";
import themePalette from "./palette";
import themeTypography from "./typography";
import { Colors, CustomTheme, Customization } from "./types";

/**
 * Represent theme style and structure as per Material-UI
 * @param {Customization} customization customization parameter object
 */
export const theme = (customization: Customization) => {
	const color: Colors = colors;

	console.log("this page is laoded @theme");

	const themeOption: CustomTheme = {
		...createTheme(),
		colors: color,
		heading: color.grey900!,
		paper: color.paper!,
		backgroundDefault: color.paper!,
		background: color.primaryLight!,
		darkTextPrimary: color.grey700!,
		darkTextSecondary: color.grey500!,
		textDark: color.grey900!,
		menuSelected: color.secondaryDark!,
		menuSelectedBack: color.secondaryLight!,
		divider: color.grey200!,
		customization,
	};

	const themeOptions: ThemeOptions = {
		direction: "ltr",
		palette: themePalette(themeOption),
		mixins: {
			toolbar: {
				minHeight: "48px",
				padding: "16px",
				"@media (min-width: 600px)": {
					minHeight: "48px",
				},
			},
		},
		typography: themeTypography(themeOption),
	};

	let themes = createTheme(themeOptions);
	// themes.components = componentStyleOverrides(themeOption) as Components;
	themes.components = {
		...(componentStyleOverrides(themeOption) as Components),
		...overridesButton(themePalette(themeOption)),
	};
	themes = responsiveFontSizes(themes);

	return themes;
};

export default theme;
