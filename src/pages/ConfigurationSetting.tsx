import { useMemo } from "react";
import { ConfigrationType } from "../common/UI-component/ConfigurationSetting/ConfigureSetting.type";
import { FormProvider, useForm } from "react-hook-form";
import { Paper, Box, Typography, Divider } from "@mui/material";

import CustomContainer from "../common/UI-component/CustomContainer";
import ConfigurationForm from "../common/UI-component/ConfigurationSetting/Configuration.form";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import ConfigurationSettingsTable from "../common/UI-component/ConfigurationSetting/ConfigurationSetting.table";

const ConfigurationSetting = () => {
  const methods = useForm<ConfigrationType>({
    defaultValues: {},
  });

  const handleSubmit = (data: ConfigrationType) => {
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
      },
      container: {
        width: "100%",
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
          Configuration Settings
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
            <ConfigurationForm />
            <Box sx={{ m: 2 }} />
            <ConfigurationSettingsTable data={[]} isLoading={false} />
            <Box sx={{ m: 2 }} />

            <SubmitButtons
              primaryActions="Submit"
              secondaryActions="Cancel"
              placement="flex-end"
            />
          </CustomContainer>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default ConfigurationSetting;
