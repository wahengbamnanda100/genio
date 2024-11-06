import { Grid } from "@mui/material";
import { FC } from "react";

interface MenuContainer {
  children: React.ReactNode;
}
const MenuContainer: FC<MenuContainer> = ({ children }) => {
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
      }}
    >
      {children}
    </Grid>
  );
};

export default MenuContainer;
