import { Grid } from "@mui/material";
import { RolePermissionFields } from "./RolePermission.type";
import Field from "../../Form-component/field";

const RolePermissionForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {...RolePermissionFields().map((field) => (
        <Field key={field.name} {...field} />
      ))}
    </Grid>
  );
};

export default RolePermissionForm;
