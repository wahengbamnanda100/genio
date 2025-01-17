import { Box, Divider, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomContainer from "../common/UI-component/CustomContainer";
import CountryForm from "../common/UI-component/Country/CountryForm";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import { CountryType } from "../common/UI-component/Country/Country.type";

const Country = () => {
  const methods = useForm<CountryType>({
    defaultValues: {
      contry: "",
      nationality: "",
      active: true,
    },
  });

  const handleSubmit = (data: CountryType) => {
    console.log({ data });
  };

  const handleReset = () => {
    methods.reset();
  };

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
        p: 3,
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
          Country
        </Typography>
        <Divider
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "primary.main",
          }}
        />
      </Box>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          onReset={handleReset}
        >
          <CustomContainer sx={pageStyles.container}>
            <CountryForm />
            <Box sx={{ m: 2 }} />
            <SubmitButtons
              primaryActions="Submit"
              secondaryActions="Cancel"
              placement="center"
            />
          </CustomContainer>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default Country;
