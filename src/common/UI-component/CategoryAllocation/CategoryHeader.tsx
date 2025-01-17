import { Button, Grid, Typography } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const CategoryListHeader = ({
  disabled,
  onDeleteAll,
}: {
  disabled: boolean;
  onDeleteAll: () => void;
}) => {
  return (
    <Grid item container xs={12} spacing={1}>
      <Grid item xs={1} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="body1" fontWeight={"500"}>
          SL No
        </Typography>
      </Grid>
      <Grid item xs={2} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="body1" fontWeight={"500"}>
          Category Code
        </Typography>
      </Grid>
      <Grid item xs={7.4} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="body1" fontWeight={"500"}>
          Category Name
        </Typography>
      </Grid>
      <Grid item xs={1.6} justifyContent={"center"} alignItems={"center"}>
        <Button
          size="small"
          color="error"
          variant="text"
          disabled={disabled}
          startIcon={<DeleteSweepIcon fontSize="small" />}
          onClick={onDeleteAll}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
          }}
        >
          Delete All
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategoryListHeader;
