import { Grid } from "@mui/material";
import { DiscountFields, ReturnFields } from "./SalesReturn,type";
import Field from "../../Form-component/field";

const DiscountForm = () => {
  return (
    <Grid item container spacing={1} columnSpacing={2}>
      <Grid item container spacing={1} xs={12} sm={8} md={8}>
        {...ReturnFields().map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </Grid>
      <Grid item container spacing={1} xs={12} sm={4} md={4}>
        {...DiscountFields().map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </Grid>
    </Grid>
  );
};

export default DiscountForm;
