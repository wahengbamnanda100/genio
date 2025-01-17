/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { AllocatinCateoryItem } from "../../services/aoi.type";
import { Grid, styled, Typography } from "@mui/material";

interface CategoryCardProps {
  options: AllocatinCateoryItem;
  props: any;
  isSelected: any;
}

export const StyledCard = styled("li")`
  background: #f7f7f7;
  display: flex;
  // gap: 0 1rem;
  margin-bottom: 6px;
  font-size: 12px;
  // & span {
  // 	font-weight: 400;
  // 	margin-bottom: 7px;
  // 	height: 100%;
  // }
`;

const CategoryCard: FC<CategoryCardProps> = ({
  options,
  props,
  isSelected,
}) => {
  const { CategoryCode, CategoryDesc } = options;

  return (
    <Grid
      component={StyledCard}
      {...props}
      container
      spacing={2}
      sx={{
        // p: 1,
        px: 0,
        // border: "1px solid",
        maxWidth: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: isSelected ? "primary.main" : "inherit",
        // color: isSelected ? "white" : "black",
        "&:hover": {
          // backgroundColor: highlightColor,
        },
      }}
    >
      <Grid item xs={1}>
        <Typography variant="body1" fontWeight={"400"}>
          {CategoryCode}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        {" "}
        <Typography variant="body1" fontWeight={"400"} textAlign={"center"}>
          ---
        </Typography>{" "}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" fontWeight={"400"}>
          {CategoryDesc}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CategoryCard;
