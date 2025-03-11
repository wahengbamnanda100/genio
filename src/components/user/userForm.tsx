import { Box, Grid, Typography } from "@mui/material";
import Field from "../../common/Form-component/field";
import UserDetailTable from "./UserFormTable";
import {
  ActiveCheckbox,
  DescriptonField,
  UserFields,
  UserFields2,
} from "./user.input.components";
import { Dispatch, SetStateAction } from "react";
// import { method } from "lodash";

// import { useFormContext } from "react-hook-form";
// import { UserFormType } from "./user.type";

const UserForm = ({
  userIdDisable,
  employeeFocus,
  roleFocus,
}: {
  userIdDisable: boolean;
  reset: boolean;
  employeeFocus: Dispatch<SetStateAction<string>>;
  roleFocus: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2} rowSpacing={2}>
      <Box
        sx={{
          bgcolor: "grey.100",
          ml: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Grid item container spacing={2} mb={2}>
          <Grid item xs={6} container spacing={1} columnSpacing={2}>
            {...UserFields(userIdDisable, employeeFocus).map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </Grid>
          <Grid item xs={6} container spacing={1} columnSpacing={2}>
            {...UserFields2(true, roleFocus).map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </Grid>

          <Field {...DescriptonField()} />
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "grey.100",
          ml: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          mt: 2,
        }}
      >
        {/* <Grid item xs={12} spacing={2}> */}

        {/* </Grid> */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} spacing={2}>
            <Typography fontWeight={"500"} gutterBottom>
              Company Details
            </Typography>
          </Grid>

          <UserDetailTable />
        </Grid>
      </Box>
      <Grid item container xs={12} spacing={2}>
        <Field {...ActiveCheckbox()} />
      </Grid>
    </Grid>
  );
};

export default UserForm;
