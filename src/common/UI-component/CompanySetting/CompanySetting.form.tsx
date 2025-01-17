import { Grid, Typography } from "@mui/material";
import Field from "../../Form-component/field";
import {
  CompanyActiveField,
  CompanySettingFields1,
  CompanySettingFields2,
  CompanySettingFields3,
  CompanySettingFields4,
  CompanySettingFields5,
  CompanySettingFields6,
} from "./CompanySetting.type";

const CompanySettingForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {CompanySettingFields1().map((field) => (
        <Field key={field.name} {...field} />
      ))}
      {/* company details */}
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6} container spacing={1} columnSpacing={2}>
          {CompanySettingFields2()}
        </Grid>
        <Grid item xs={6} container spacing={1} columnSpacing={2}>
          {CompanySettingFields3().map((field) => (
            <Field key={field.name} {...field} />
          ))}
        </Grid>
      </Grid>

      {/* holding company */}

      <Grid
        item
        xs={12}
        container
        columnSpacing={2}
        sx={{
          border: "1px solid",
          ml: 2,
          mr: 0,
          px: 2,
          my: 2,
          pb: 2,
          borderRadius: 2,
          borderColor: "primary.main",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            textAlign={"center"}
            gutterBottom
          >
            Holding Compnay
          </Typography>
        </Grid>
        {/* <Box sx={{ border: "1px solid", width: "100%" }}> */}
        {CompanySettingFields4().map((field) => (
          <Field key={field.name} {...field} />
        ))}
        {/* </Box> */}
      </Grid>

      {/* iamge uplaod */}
      <Grid
        item
        xs={12}
        container
        columnSpacing={2}
        sx={{
          border: "1px solid",
          ml: 2,
          mr: 0,
          px: 2,
          //   my: 2,
          pb: 2,
          borderRadius: 2,
          borderColor: "primary.main",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            textAlign={"center"}
            gutterBottom
          >
            Upload images
          </Typography>
        </Grid>
        {CompanySettingFields5()}
      </Grid>

      {/* over time setting */}

      <Grid
        item
        xs={12}
        container
        rowSpacing={1}
        columnSpacing={2}
        sx={{
          border: "1px solid",
          ml: 2,
          mr: 0,
          px: 2,
          my: 2,
          pb: 2,
          borderRadius: 2,
          borderColor: "primary.main",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            fontWeight={"bold"}
            textAlign={"center"}
            gutterBottom
          >
            Over Time Setting
          </Typography>
        </Grid>
        {CompanySettingFields6().map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </Grid>

      <Field {...CompanyActiveField()} />
    </Grid>
  );
};

export default CompanySettingForm;
