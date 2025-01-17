import { Box, Grid, Typography, useTheme } from "@mui/material";

const EmptyCategory = () => {
    const theme = useTheme();

    return (
      <Grid xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={"500"}
            sx={{ color: theme.palette.grey[500] }}
          >
            No Category Found
          </Typography>
        </Box>
      </Grid>
    );
}

export default EmptyCategory;