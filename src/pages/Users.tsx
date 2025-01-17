import { Box, Divider, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RoleType } from "../common/UI-component/Role/Role.type";
import CustomContainer from "../common/UI-component/CustomContainer";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import UsersForm from "../common/UI-component/Users/UsersForm";
import UserTable from "../common/UI-component/Users/UserTable";
import Field from "../common/Form-component/field";
import { ActiveCheckbox } from "../common/UI-component/Users/User.type";

const Users = () => {
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
        // maxHeight: `calc(100vh - 89px)`,
      },
      container: {
        // width: { md: "60%", sm: "80%", xs: "100%" },
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
          Users
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
            <UsersForm />
            <Box sx={{ m: 2 }} />
            <UserTable />

            <Field {...ActiveCheckbox()} />
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

export default Users;
