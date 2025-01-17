import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApprovalAuthorityFieldType } from "../common/UI-component/ApprovalAuthorirty/ApprovalAuthority.type";
import { Paper, Box, Typography, Divider } from "@mui/material";
import CustomContainer from "../common/UI-component/CustomContainer";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import ApprovalAuthorityForm, {
  ApprovalAuthorityDetail,
} from "../common/UI-component/ApprovalAuthorirty/ApprovalAuthority.form";

const ApprovalAuthority = () => {
  const methods = useForm<ApprovalAuthorityFieldType>({
    defaultValues: {
      Module: "",
      ApprovalType: "",
      EnableReporting: false,
      NoReportingLevel: "",
    },
  });

  const handleSubmit = (data: ApprovalAuthorityFieldType) => {
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
          Approval Authority
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
            <ApprovalAuthorityForm />
            <Box sx={{ m: 2 }} />
            <ApprovalAuthorityDetail />
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

export default ApprovalAuthority;
