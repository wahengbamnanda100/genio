import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Field from "../../Form-component/field";
import { ReferTypeField } from "./ReferTypeSettings.type";

const ReferTypeSettingsForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      <Field {...ReferTypeField()} />
      <Grid item container xs={3} spacing={1} columnSpacing={2}>
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

export default ReferTypeSettingsForm;
