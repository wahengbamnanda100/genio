/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  CategoryAllocationType,
  CategoryItem,
} from "./CategoryAllcoation.type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FC, useEffect, useMemo, useState } from "react";
import CategoryListItems from "./CategoryListItem";
import CategoryListHeader from "./CategoryHeader";
import EmptyCategory from "./EmptyCategory";
import SkeletonCategory from "./SkeletonCategory";
import ConfirmationDialog from "../../ModalComponent/ConfirmationDialog";

interface CategoryListProps {
  // onSubmit: (data: CategoryAllocationType) => void;
  isLoading: boolean;
}

const CategoryList: FC<CategoryListProps> = ({ isLoading }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { control, watch, setValue } = useFormContext<CategoryAllocationType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categoryList",
  });

  const handleAdd = () => {
    append({ categoryCode: "", categoryName: "" });
  };

  const categoryList = useMemo(() => {
    const handleDelete = (id: number) => {
      remove(id);
    };

    return fields.map((field, index) => (
      <CategoryListItems
        key={field.id}
        index={index}
        data={field as CategoryItem}
        onDelete={handleDelete}
      />
    ));
  }, [fields, remove]);

  const handleDeleteAll = () => {
    setValue("categoryList", []);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const renderContent = {
    loading: <SkeletonCategory />,
    empty: <EmptyCategory />,
    default: categoryList,
  };

  const watchCategoryItems = watch("categoryList");

  useEffect(() => {
    watchCategoryItems?.map((field, index) => {
      setValue(`categoryList.${index}.categoryCode`, field.categoryCode);
      setValue(`categoryList.${index}.categoryName`, field.categoryName);
    });
  }, [watchCategoryItems, setValue]);

  return (
    <Box item container spacing={1} component={Grid} sx={{ pt: 2 }}>
      <Grid item xs={12}>
        <Divider textAlign="left" sx={{ color: "primary.main", opacity: 1 }}>
          <Typography variant="body1" fontWeight={"500"} gutterBottom>
            Category List
          </Typography>
        </Divider>
      </Grid>

      <CategoryListHeader
        onDeleteAll={() => setModalOpen(true)}
        disabled={watchCategoryItems?.length === 0}
      />
      <Grid item xs={12}>
        <Divider
          sx={{ borderBottom: "1px solid", borderBottomColor: "primary.main" }}
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: `calc(100vh - 410px)`,
        }}
      >
        {isLoading
          ? renderContent.loading
          : fields.length === 0
            ? renderContent.empty
            : renderContent.default}
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={handleAdd}
        >
          Add Category
        </Button>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            // onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth type="reset">
            Cancel
          </Button>
        </Grid>
      </Grid>

      <ConfirmationDialog
        open={modalOpen}
        setOpen={setModalOpen}
        title="Remove all"
        description="DO you want to remove all category list"
        onConfirm={handleDeleteAll}
        dialogType="delete"
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default CategoryList;
