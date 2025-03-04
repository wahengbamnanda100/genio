import { Button, Grid, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomBreadcrumbs from "@/common/CustomBreadcrumb";

interface UseFromTitleProps {
  title: string;
  handleSearchList: () => void;
}

const UserFormTitle = ({ title, handleSearchList }: UseFromTitleProps) => {
  return (
    <Grid
      component={"form"}
      container
      rowSpacing={1}
      sx={{
        width: "100%",
        borderRadius: 1,
        overflowY: "hidden",
        overflowX: "hidden",
        // p: 1,
      }}
    >
      <Grid
        item
        xs={12}
        textAlign={"end"}
        px={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomBreadcrumbs />
      </Grid>

      <Grid
        item
        xs={12}
        textAlign={"end"}
        px={2}
        mb={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={"medium"}>
          {title}
        </Typography>

        <Button
          variant="contained"
          startIcon={<SearchOutlinedIcon />}
          onClick={handleSearchList}
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
          Search List
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserFormTitle;
