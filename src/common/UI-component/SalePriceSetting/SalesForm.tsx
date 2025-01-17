import { Grid } from "@mui/material";
import { SalePriceFields, SearchActionButtons } from "./SalesPriceSetting.type";
import Field from "../../Form-component/field";

const SalesForm = () => {
  return (
    <Grid item container spacing={1} columnSpacing={2}>
      {...SalePriceFields().map((field) => (
        <Field key={field.name} {...field} />
      ))}
      <SearchActionButtons />
    </Grid>
  );
};

export default SalesForm;
