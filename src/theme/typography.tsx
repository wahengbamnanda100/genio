/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomTheme } from "./types";

const themeTypography = (theme: CustomTheme): any => {
	return {
		fontFamily: theme.customization?.fontFamily ?? "Roboto, sans-serif",
		h6: {
			fontWeight: 500,
			color: theme.heading ?? "",
			fontSize: "1rem", // Updated fontSize
		},
		h5: {
			fontSize: "1.25rem", // Updated fontSize
			color: theme.heading ?? "",
			fontWeight: 500,
		},
		h4: {
			fontSize: "1.5rem", // Updated fontSize
			color: theme.heading ?? "",
			fontWeight: 600,
		},
		h3: {
			fontSize: "1.75rem", // Updated fontSize
			color: theme.heading ?? "",
			fontWeight: 600,
		},
		h2: {
			fontSize: "2rem", // Updated fontSize
			color: theme.heading ?? "",
			fontWeight: 700,
		},
		h1: {
			fontSize: "2.5rem", // Updated fontSize
			color: theme.heading ?? "",
			fontWeight: 700,
		},
		subtitle1: {
			fontSize: "1rem", // Updated fontSize
			fontWeight: 500,
			color: theme.textDark ?? "",
		},
		subtitle2: {
			fontSize: "0.875rem", // Updated fontSize
			fontWeight: 400,
			color: theme.darkTextSecondary ?? "",
		},
		caption: {
			fontSize: "0.75rem", // Kept as is
			color: theme.darkTextSecondary ?? "",
			fontWeight: 400,
		},
		body1: {
			fontSize: "1rem", // Updated fontSize
			fontWeight: 400,
			lineHeight: "1.5em", // Updated lineHeight
		},
		body2: {
			letterSpacing: "0em",
			fontSize: "0.875rem", // Updated fontSize
			fontWeight: 400,
			lineHeight: "1.5em",
			color: theme.darkTextPrimary ?? "",
		},
		button: {
			textTransform: "none", // Ensure that textTransform is properly typed
		},
		customInput: {
			marginTop: 1,
			marginBottom: 1,
			"& > label": {
				top: 23,
				left: 0,
				color: theme.colors.grey500 ?? "",
				'&[data-shrink="false"]': {
					top: 5,
				},
			},
			"& > div > input": {
				padding: "30.5px 14px 11.5px !important",
			},
			"& legend": {
				display: "none",
			},
			"& fieldset": {
				top: 0,
			},
		},
		mainContent: {
			backgroundColor: theme.background ?? "",
			width: "100%",
			minHeight: "calc(100vh - 88px)",
			flexGrow: 1,
			padding: "20px",
			marginTop: "88px",
			marginRight: "20px",
			borderRadius: `${theme.customization?.borderRadius ?? 4}px`,
		},
		menuCaption: {
			fontSize: "0.875rem", // Updated fontSize
			fontWeight: 500,
			color: theme.heading ?? "",
			padding: "6px",
			textTransform: "capitalize",
			marginTop: "10px",
		},
		subMenuCaption: {
			fontSize: "0.75rem", // Updated fontSize
			fontWeight: 500,
			color: theme.darkTextSecondary ?? "",
			textTransform: "capitalize",
		},
		commonAvatar: {
			cursor: "pointer",
			borderRadius: "8px",
		},
		smallAvatar: {
			width: "22px",
			height: "22px",
			fontSize: "1rem",
		},
		mediumAvatar: {
			width: "34px",
			height: "34px",
			fontSize: "1.2rem",
		},
		largeAvatar: {
			width: "44px",
			height: "44px",
			fontSize: "1.5rem",
		},
	};
};

export default themeTypography;
