import { Grid } from "@mui/material";
import { DescriptonField, UserFields, UserFields2 } from "./User.type";
import Field from "../../Form-component/field";

const UsersForm = () => {
  return (
    <Grid item container spacing={1} columnSpacing={2}>
      <Grid item xs={6} container spacing={1} columnSpacing={2}>
        {...UserFields().map((field) => <Field key={field.name} {...field} />)}
      </Grid>
      <Grid item xs={6} container spacing={1} columnSpacing={2}>
        {...UserFields2().map((field) => <Field key={field.name} {...field} />)}
      </Grid>
      <Field {...DescriptonField()} />
    </Grid>
  );
};

export default UsersForm;
