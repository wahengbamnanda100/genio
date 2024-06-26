import { Components, Palette } from "@mui/material";

export const overridesFormControlLabel = (
  palette: Palette
): Pick<Components, "MuiFormControlLabel"> => ({
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        "&.Mui-disabled": {
          color: palette.text.primary,
        },
      },
    },
  },
});
