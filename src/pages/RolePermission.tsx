import { Paper, Box, Typography, Divider, Grid } from "@mui/material";
import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CustomContainer from "../common/UI-component/CustomContainer";
import { RoleType } from "../common/UI-component/Role/Role.type";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import RolePermissionForm from "../common/UI-component/RolePermission/RolePermissionForm";
import RolePermissionTable from "../common/UI-component/RolePermission/RolePermission.table";

const RolePermission = () => {
  const methods = useForm<RoleType>({
    defaultValues: {
      RoleCode: "",
      RoleName: "",
      RoleDesc: "",
      RoleStatus: true,
      ApproveAutority: false,
      costView: false,
    },
  });

  const handleSubmit = (data: RoleType) => {
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
          Roles Permissions
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
            <RolePermissionForm />
            <Box sx={{ m: 2 }} />
            <Grid item xs={12}>
              {" "}
              <Divider
                textAlign="left"
                sx={{ color: "primary.main", opacity: 1, border: "1p" }}
              >
                <Typography variant="body1" fontWeight={"500"} gutterBottom>
                  Role Pemissions List
                </Typography>
              </Divider>
            </Grid>

            <Box sx={{ m: 2 }} />
            <RolePermissionTable />
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

export default RolePermission;
