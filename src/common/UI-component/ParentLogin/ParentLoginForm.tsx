import { Grid } from "@mui/material";
import Field from "../../Form-component/field";
import { ParentLoginFields } from "./ParentLogin.type";

const ParentLoginPasswordForm = () => {
  return (
    <Grid item container spacing={2} columnSpacing={2}>
      {...ParentLoginFields().map((field) => (
        <Field key={field.name} {...field} />
      ))}
    </Grid>
  );
};

export default ParentLoginPasswordForm;
