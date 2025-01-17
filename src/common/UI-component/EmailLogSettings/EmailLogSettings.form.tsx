import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { EmailLogSettingsFields } from "./EmailLogSettings.type";
import Field from "../../Form-component/field";

const EmailLogSettingForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {EmailLogSettingsFields().map((field) => (
        <Field key={field.name} {...field} />
      ))}
      <Grid
        item
        container
        xs={3}
        spacing={1}
        columnSpacing={2}
        sx={{ marginLeft: "auto" }}
      >
        {" "}
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailLogSettingForm;
