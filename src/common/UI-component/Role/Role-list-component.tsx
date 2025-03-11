import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Box, lighten, Typography, useTheme } from "@mui/material";

export const CustomStatusCellFormatter: React.ComponentType<
  DataTypeProvider.ValueFormatterProps
> = ({ value }) => {
  const theme = useTheme();
  const status = value === "True" ? "Active" : "Inactive";
  const color: string =
    value === "True" ? theme.palette.success.main : theme.palette.error.main;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: lighten(color, 0.8),
          borderRadius: "0.5rem",
          width: "fit-content",
          padding: "0.2rem 0.5rem",
        }}
      >
        <Typography sx={{ color, fontWeight: "400", fontSize: "1em" }}>
          {status}
        </Typography>
      </Box>
    </Box>
  );
};
