import { Grid } from "@mui/material";
import { ConfigurationSettingFields1 } from "./ConfigureSetting.type";
import Field from "../../Form-component/field";

const ConfigurationForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {ConfigurationSettingFields1().map((field) => (
        <Field key={field.name} {...field} />
      ))}
    </Grid>
  );
};

export default ConfigurationForm;
