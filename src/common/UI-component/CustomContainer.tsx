import { Grid, GridProps, SxProps } from "@mui/material";
import { FC } from "react";

interface CustomConatainerProps extends GridProps {
  children: React.ReactNode;
  sx?: SxProps;
}

const CustomConatainer: FC<CustomConatainerProps> = ({ children, sx }) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        border: "1px solid",
        borderRadius: 1,
        borderColor: "primary.main",
        overflowY: "hidden",
        overflowX: "hidden",
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};

export default CustomConatainer;
