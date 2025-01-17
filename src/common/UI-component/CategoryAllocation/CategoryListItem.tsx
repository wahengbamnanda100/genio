/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Typography } from "@mui/material";
import {
  CategoryAllocationType,
  CategoryItem,
  CategoryListFields,
} from "./CategoryAllcoation.type";
import Field from "../../Form-component/field";
import { useFormContext } from "react-hook-form";

interface CategoryListItemsProps {
  index: number;
  data: CategoryItem;
  onDelete: (id: number) => void;
}

const CategoryListItems: FC<CategoryListItemsProps> = ({
  index,
  // data,
  onDelete,
}) => {
  const { setValue } = useFormContext<CategoryAllocationType>();

  const handleChangeCode = (name: string, value: any) => {
    console.log({ name, value });
    const [, index, child] = name.split(".");

    if (child === "categoryName") {
      setValue(`categoryList.${Number(index)}.categoryCode`, value);
      return;
    }
    if (child === "categoryCode") {
      setValue(`categoryList.${Number(index)}.categoryName`, value);
      return;
    }
  };

  const categoryFields = useMemo(
    () => CategoryListFields(index, handleChangeCode),
    [index],
  );

  return (
    <Grid item container xs={12} spacing={1}>
      <Grid
        item
        xs={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="body1" fontWeight={"500"}>
          {index + 1}
        </Typography>
      </Grid>
      {categoryFields.map((field) => (
        <Field key={field.name} {...field} />
      ))}
      <Grid
        item
        xs={0.6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={0}
      >
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(index)}
          sx={{ p: 1, mr: 0.6 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CategoryListItems;
