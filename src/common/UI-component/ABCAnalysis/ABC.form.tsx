import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CheckIcon from "@mui/icons-material/Check";

import { ABCAnalysisFields } from "./ABC.type";
import Field from "../../Form-component/field";

const ABCAnalysisForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {ABCAnalysisFields().map((field) => (
        <Field key={field.name} {...field} />
      ))}
      <Grid item container xs={8} spacing={1} columnSpacing={2}>
        {" "}
        <Grid item xs={1.5}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<VisibilityIcon />}
          >
            View
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<DownloadDoneIcon fontSize="small" />}
            sx={{ fontSize: "0.75rem" }}
          >
            HR Password Update Format 1
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<DownloadDoneIcon fontSize="small" />}
            sx={{ fontSize: "0.75rem" }}
          >
            HR Password Update Format 2
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<CheckIcon fontSize="small" />}
            sx={{ fontSize: "0.75rem" }}
          >
            Summary of Orders E-mail
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ABCAnalysisForm;
