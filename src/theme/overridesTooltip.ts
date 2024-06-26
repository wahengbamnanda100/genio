import { Components, Palette, lighten } from "@mui/material";

export const overridesTooltip = (
  palette: Palette
): Pick<Components, "MuiTooltip"> => ({
  MuiTooltip: {
    styleOverrides: {
      tooltipPlacementRight: {
        backgroundColor: lighten(palette.primary.main, 0.82),
        color: palette.primary.main,
        fontSize: "15px",
        padding: "8px",
      },
      arrow: {
        color: lighten(palette.primary.main, 0.82),
      },
    },
  },
});
