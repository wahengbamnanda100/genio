import { Grid } from "@mui/material";
import Field from "../../Form-component/field";
import { countryFields } from "./Country.type";

const CountryForm = () => {
  return (
    <Grid item container spacing={2} columnSpacing={2}>
      {...countryFields().map((field) => <Field key={field.name} {...field} />)}
    </Grid>
  );
};

export default CountryForm;
