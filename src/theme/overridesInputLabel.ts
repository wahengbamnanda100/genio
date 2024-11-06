import { Components, Theme } from "@mui/material";

export const overridesInputLabel = (): Pick<Components, "MuiInputLabel"> => ({
  MuiInputLabel: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        color: "#3b3b3b",
        fontWeight: "500",
        fontSize: "0.875rem",
        ...(ownerState.size !== "small" && {
          fontSize: "0.85rem",
          //   backgroundColor: "red",
          top: -10,
          left: -2,
          // padding: 0,
          // height: 20,
          padding: (theme as Theme).spacing(0.2),
          marginBottom: (theme as Theme).spacing(3),
        }),
        ...(ownerState.size === "small" && {
          fontSize: "0.85rem",
          // backgroundColor: "red",
          top: -5,
          // padding: 0,
          // height: 20,
          padding: (theme as Theme).spacing(0.2),
          marginBottom: (theme as Theme).spacing(1.5),
        }),
        // Apply the default size adjustments if ownerState.size is medium or undefined
        ...((ownerState.size === "normal" || ownerState.size === undefined) &&
          !ownerState.multiline && {
            fontSize: "0.9rem",
            top: -3, // Adjust label position for medium/normal inputs
            padding: (theme as Theme).spacing(0.3),
            marginBottom: (theme as Theme).spacing(1.2),
          }),

        ...(ownerState.shrink && {
          // When shrink is true, increase the font size
          top: 0,
          fontSize: "1em", // Larger font size for shrunk label
        }),
      }),
    },
  },
});
