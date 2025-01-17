import { Grid } from "@mui/material";
import {
  CustomerFormFields,
  InvoiceFields,
  RegistrationFields,
  SalesFields,
  UploadPreviewGrid,
} from "./SalesReturn,type";
import Field from "../../Form-component/field";

const CustomerForm = () => {
  return (
    <Grid item container spacing={1} columnSpacing={2}>
      <Grid item container spacing={1} xs={12} sm={6} md={6}>
        {...CustomerFormFields().map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </Grid>
      <Grid item container spacing={1} xs={12} sm={6} md={6}>
        {...InvoiceFields().map((field) => (
          <Field key={field.name} {...field} />
        ))}
        {...RegistrationFields().map((field) => (
          <Field key={field.name} {...field} />
        ))}
        <UploadPreviewGrid />

        {...SalesFields().map((field) => <Field key={field.name} {...field} />)}
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
