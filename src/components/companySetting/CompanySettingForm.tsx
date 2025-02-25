import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";

import {
  CompanyActiveField,
  CompanySettingFields1,
  CompanySettingFields2,
  CompanySettingFields3,
  CompanySettingFields4,
  CompanySettingFields5,
  CompanySettingFields6,
} from "./CompanySettings.type";
import Field from "../../common/Form-component/field";

const CompanySettingForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2} rowSpacing={2}>
      <Box
        sx={{ bgcolor: "grey.100", ml: 2, p: 2, boxShadow: 3, borderRadius: 2 }}
      >
        <Grid item container spacing={2} mb={2}>
          {CompanySettingFields1().map((field) => (
            <Field key={field.name} {...field} />
          ))}
        </Grid>

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
      </Box>

      <Grid item container columnSpacing={2} xs={12} mt={1}>
        {/* over time setting */}

        <Grid item xs={8} container rowSpacing={1} columnSpacing={2}>
          <Stack
            direction={"column"}
            sx={{
              bgcolor: "grey.100",
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              width: "100%",
              ml: 2,
            }}
          >
            <Typography variant="body1" fontWeight={"bold"} gutterBottom mb={1}>
              Holding Compnay
            </Typography>
            <Grid item container xs={12} spacing={2}>
              {CompanySettingFields4().map((field) => (
                <Field key={field.name} {...field} />
              ))}
            </Grid>

            <Divider sx={{ borderBottom: "1px solid", mb: 1 }} />

            <Typography variant="body1" fontWeight={"bold"} gutterBottom mb={1}>
              Over Time Setting
            </Typography>
            <Grid item container xs={12} spacing={2}>
              {CompanySettingFields6().map((field) => (
                <Field key={field.name} {...field} />
              ))}
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={4} container columnSpacing={2} rowSpacing={1}>
          <Box
            sx={{
              bgcolor: "grey.100",
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              width: "100%",
              ml: 2,
            }}
          >
            <Typography variant="body1" fontWeight={"bold"} gutterBottom mb={1}>
              Upload images
            </Typography>
            <Grid item container xs={12} spacing={2}>
              {CompanySettingFields5()}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid item container xs={12} justifyContent={"space-between"}>
        <Field {...CompanyActiveField()} />
        <Grid item container xs={2} columnSpacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                  outline: "1px solid black",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "inherit",
                bgcolor: "inherit",
                outline: "1px solid black",
                outlineColor: "black",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanySettingForm;
