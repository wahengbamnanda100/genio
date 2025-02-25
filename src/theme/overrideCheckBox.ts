import { Components, Palette } from "@mui/material";

export const overridesCheckBox = (
  palette: Palette,
): Pick<Components, "MuiCheckbox"> => ({
  MuiCheckbox: {
    styleOverrides: {
      root: {
        // color: palette.primary.main,
        color: palette.text.primary,
        borderRadius: "0.2rem",
        // "&.Mui-disabled": {
        //   color: palette.text.primary,
        // },
        "&.Mui-checked": {
          color: palette.text.primary, // Blue fill when checked
        },
      },
    },
  },
});
