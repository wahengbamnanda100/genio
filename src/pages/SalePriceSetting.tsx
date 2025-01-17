import { Box, Paper } from "@mui/material";
import { useMemo } from "react";
import FormTitle from "../common/UI-component/FormTitle";
import { FormProvider, useForm } from "react-hook-form";
import CustomConatainer from "../common/UI-component/CustomContainer";
import SalesForm from "../common/UI-component/SalePriceSetting/SalesForm";
import SalePriceTable from "../common/UI-component/SalePriceSetting/SalesPriceTable";
import Field from "../common/Form-component/field";
import { SalesNotes } from "../common/UI-component/SalePriceSetting/SalesPriceSetting.type";
import SubmitButtons from "../common/UI-component/SubmitButtons";

const SalePriceSetting = () => {
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = () => {};

  const handleReset = () => {
    methods.reset();
  };

  const handleSearch = () => {};

  const pageStyles = useMemo(
    () => ({
      paper: {
        mt: 4,
        p: 2,
        px: 3,
        minHeight: `calc(100vh - 89px)`,
        // maxHeight: `calc(100vh - 89px)`,
      },
      container: {
        width: "100%",
        margin: "auto",
        p: 2,
        height: "100%",
        boxShadow: 2,
        // maxHeight: `calc(100vh - 180px)`,
        // scrollBehavior: "smooth",
        // overflowY: "auto",
      },
    }),
    [],
  );

  return (
    <Paper sx={pageStyles.paper}>
      <FormTitle title="Sales Price Setting" onSerch={handleSearch} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} onReset={handleReset}>
          <CustomConatainer sx={pageStyles.container} spacing={1}>
            <SalesForm />
            <Box sx={{ m: 2 }} />
            <SalePriceTable />
            <Box sx={{ m: 2 }} />
            <Field {...SalesNotes()} />
            <Box sx={{ m: 2 }} />
            <SubmitButtons primaryActions="Submit" secondaryActions="Cancel" />
          </CustomConatainer>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default SalePriceSetting;
