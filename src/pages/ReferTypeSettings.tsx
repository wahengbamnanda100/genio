import { Paper, Box, Typography, Divider } from "@mui/material";
import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomContainer from "../common/UI-component/CustomContainer";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import { ReferTypeSettingsType } from "../common/UI-component/ReferTypeSettings/ReferTypeSettings.type";
import ReferTypeSettingsForm from "../common/UI-component/ReferTypeSettings/ReferTypeSettings.form";
import ReferTypeSettingTable from "../common/UI-component/ReferTypeSettings/ReferTypeSettings.table";

const ReferTypeSettings = () => {
  const methods = useForm<ReferTypeSettingsType>({
    defaultValues: {},
  });

  const handleSubmit = (data: ReferTypeSettingsType) => {
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
          Refer Type Settings
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
            <ReferTypeSettingsForm />
            <Box sx={{ m: 2 }} />
            <ReferTypeSettingTable data={[]} isLoading={false} />
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

export default ReferTypeSettings;
