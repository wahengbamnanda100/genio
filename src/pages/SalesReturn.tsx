import { Box, Paper } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SalesReturnType } from "../common/UI-component/SalesReturn/SalesReturn,type";
import CustomConatainer from "../common/UI-component/CustomContainer";
import CustomerForm from "../common/UI-component/SalesReturn/CustomerForm";
import DiscountForm from "../common/UI-component/SalesReturn/DiscountForm";
import ItemTable from "../common/UI-component/SalesReturn/ItemTable";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import FormTitle from "../common/UI-component/FormTitle";

const SalesReturn = () => {
  const methods = useForm<SalesReturnType>({
    defaultValues: {
      CustomerCode: "",
    },
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
      <FormTitle title="Sales Return" onSerch={handleSearch} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} onReset={handleReset}>
          <CustomConatainer sx={pageStyles.container}>
            <CustomerForm />
            <Box sx={{ m: 2 }} />
            <ItemTable />
            <Box sx={{ m: 2 }} />
            <DiscountForm />
            <Box sx={{ m: 2 }} />
            <SubmitButtons primaryActions="Submit" secondaryActions="Cancel" />
          </CustomConatainer>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default SalesReturn;
