import { Grid } from "@mui/material";
import { RolesFields } from "./Role.type";
import Field from "../../Form-component/field";
import { useTranslation } from "react-i18next";

const RoleForm = () => {
  const { t } = useTranslation();
  return (
    <Grid item container spacing={2} columnSpacing={2}>
      {...RolesFields(t).map((field) => <Field key={field.name} {...field} />)}
    </Grid>
  );
};

export default RoleForm;
