/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import CustomContainer from "../common/UI-component/CustomContainer";
import Field from "../common/Form-component/field";
import {
  CategoryAllocationType,
  CategoryItem,
  // CategoryItem,
  ShowroomListField,
} from "../common/UI-component/CategoryAllocation/CategoryAllcoation.type";
import { FormProvider, useForm } from "react-hook-form";
import CategoryList from "../common/UI-component/CategoryAllocation/CategoryList";
import { useEffect, useMemo } from "react";
import { AllocationShowroomById } from "../services/CategoryAllocation";
import {
  AllocationShowroomCatItem,
  AllocationShowroomCatResType,
} from "../services/aoi.type";
import { useAppProvider } from "../AppProvider";

interface TransformedCategoryItem {
  categoryCode: string;
  categoryName: string;
}

const filterAndTransformCategoryData = (
  data: CategoryItem[] | null | undefined,
): TransformedCategoryItem[] => {
  if (!data || !Array.isArray(data)) {
    return []; // Return an empty array if data is null, undefined, or not an array
  }

  return data
    .filter((item) => item && item.categoryCode && item.categoryName) // Filter out invalid items
    .map((item) => ({
      categoryCode: item.categoryCode?.CategoryCode || "", // Assign CategoryCode from categoryCode
      categoryName: item.categoryName?.CategoryDesc || "", // Assign CategoryDesc from categoryName
    }));
};

function transformCategoryData(categories: AllocationShowroomCatItem[]) {
  return categories.map((category: AllocationShowroomCatItem) => ({
    categoryCode: category,
    categoryName: category,
  }));
}

const CategoryAllocation = () => {
  const { setNotify } = useAppProvider();

  const methods = useForm<CategoryAllocationType>({
    defaultValues: {
      showroomName: "",
      // categoryList: INITIAL_CATEGORIES,
      categoryList: [],
    },
  });

  const showroomWatch = methods.watch("showroomName");

  const { data, isLoading, isFetched } = AllocationShowroomById(
    { ShowroomId: showroomWatch },
    {
      enabled: showroomWatch !== "",
    },
  );

  const handleSubmit = (data: CategoryAllocationType) => {
    // const filterData = filterNonEmptyObjects(data?.categoryList);
    const filterData = filterAndTransformCategoryData(data?.categoryList);
    console.log({ data });
    console.log({ filterData });
  };

  const handleReset = () => {
    methods.reset();
  };

  const setCategoryItems = (data: AllocationShowroomCatResType) => {
    if (data.Status === "1") {
      const details = data.Data;
      const itemsDetails =
        details && details.length !== 0 ? transformCategoryData(details) : [];

      methods.setValue("categoryList", itemsDetails);

      setNotify({
        severity: "success",
        message: data.Message,
      });
    }
  };

  useEffect(() => {
    if (isFetched && data) {
      console.log(data);
      methods.setValue("categoryList", []);
      setCategoryItems(data);
    }

    return () => {
      methods.setValue("categoryList", []);
    };
  }, [isFetched, data, methods]);

  const pageStyles = useMemo(
    () => ({
      paper: {
        mt: 4,
        p: 2,
        px: 3,
        minHeight: `calc(100vh - 89px)`,
        maxHeight: `calc(100vh - 89px)`,
      },
      container: {
        width: { md: "60%", sm: "80%", xs: "100%" },
        margin: "auto",
        p: 2,
        height: "100%",
        boxShadow: 2,
      },
    }),
    [],
  );

  return (
    <Paper sx={pageStyles.paper}>
      <Box sx={{ pb: 2, pt: 1 }}>
        <Typography variant="h6" fontWeight={"500"} gutterBottom>
          Category Allocation
        </Typography>
        <Divider
          sx={{ borderBottom: "1px solid", borderBottomColor: "primary.main" }}
        />
      </Box>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          onReset={handleReset}
        >
          <CustomContainer sx={pageStyles.container}>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={"500"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                Select a Showroom
              </Typography>
            </Grid>
            <Field {...ShowroomListField()} />
            <CategoryList isLoading={isLoading} />
          </CustomContainer>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default CategoryAllocation;
