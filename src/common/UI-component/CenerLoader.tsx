import { Box, LinearProgress } from "@mui/material";

interface CenteredLoaderProps {
  glassmorphism?: boolean;
}
const CenteredLoader: React.FC<CenteredLoaderProps> = ({
  glassmorphism = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        ...(glassmorphism && {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: 4,
        }),
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
