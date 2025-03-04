import { Box, LinearProgress } from "@mui/material";

const CenteredLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <LinearProgress
        sx={{
          width: "50%",
          maxWidth: 450,
          height: 8,
          borderRaius: 10,
          bgcolor: "grey.500",
          "& .MuiLinearProgress-bar": {
            bgcolor: "black",
            borderRadius: 10,
          },
        }}
      />
    </Box>
  );
};

export default CenteredLoader;
