import { Paper, Box, Typography, Divider } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomContainer from "../common/UI-component/CustomContainer";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import { EmailAlertFieldsDetailsType } from "../common/UI-component/EmailALert/EmailAlert.type";
import EmailAlertTable from "../common/UI-component/EmailALert/EmailAlert.table";

const EmailAlert = () => {
  const methods = useForm<EmailAlertFieldsDetailsType>({
    defaultValues: {
      EmailDetail: [],
    },
  });

  const handleSubmit = (data: EmailAlertFieldsDetailsType) => {
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
          Email Alert Setting
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
            <EmailAlertTable data={[]} isLoading={false} />
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

export default EmailAlert;
