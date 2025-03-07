import { Components, Theme } from "@mui/material";

export const overridesInputBase: Pick<
  Components<Theme>,
  "MuiInputBase" | "MuiOutlinedInput"
> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        // Apply size styling only when not multiline
        ...(ownerState.size === "small" &&
          !ownerState.multiline && {
            fontSize: "1em",
            height: 30,
            "&.Mui-disabled": {
              // color: theme.palette.text.disabled,
              // backgroundColor: alpha(theme.palette.secondary.light, 0.4),
              color: theme.palette.grey[500],
              backgroundColor: theme.palette.grey[200],
            },
          }),
        ...(ownerState.size === "medium" &&
          !ownerState.multiline && {
            fontSize: "1em",
            height: 35, // Customize the height for medium size here
            "&.Mui-disabled": {
              color: theme.palette.grey[500],
              backgroundColor: theme.palette.grey[200],
            },
          }),
        notchedOutline: {
          "& legend": {
            fontSize: "0.9rem",
            transition: "width 200ms",
          },
        },
      }),
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
        },
        "&[type=number]": {
          MozAppearance: "textfield",
        },
      },
    },
  },
};
