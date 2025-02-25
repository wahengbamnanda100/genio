import { alpha, Components, Palette } from "@mui/material";

export const overridesOutlinedInput = (
  palette: Palette,
): Pick<Components, "MuiOutlinedInput"> => ({
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.text.primary, // Focus state
          borderWidth: "2px", // Optional: ensures consistency with notchedOutline
        },
        "&.Mui-disabled": {
          color: palette.secondary.dark,
          borer: palette.secondary.main,
          backgroundColor: alpha(palette.secondary.light, 0.4),
        },
      },
      notchedOutline: {
        borderColor: palette.info.light,
        border: `2px solid ${palette.info.light}`,
        // border: `2px solid black`,
      },
      input: {
        color: palette.text.primary,
        zIndex: "1",
        fontWeight: "400",
        fontSize: "1rem",
        "&:-webkit-autofill": {
          transition:
            "background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
        },
      },
      // disabled: {
      // 	color: palette.secondary.dark,
      // 	borer: palette.secondary.dark,
      // 	backgroundColor: "white",
      // },
    },
  },
});
