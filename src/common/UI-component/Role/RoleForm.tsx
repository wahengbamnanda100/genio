import { Grid } from "@mui/material";
import { RolesFields } from "./Role.type";
import Field from "../../Form-component/field";

const RoleForm = () => {
  return (
    <Grid item container spacing={2} columnSpacing={2}>
      {...RolesFields().map((field) => <Field key={field.name} {...field} />)}
    </Grid>
  );
};

export default RoleForm;
