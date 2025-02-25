import { Box, Button, Grid, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DescriptonField, UserFields, UserFields2 } from "./user.type";
import Field from "../../common/Form-component/field";
import UserDetailTable from "./UserFormTable";
import CustomBreadcrumbs from "../../common/CustomBreadcrumb";

interface UseFromTitleProps {
  title: string;
  handleSearchList: () => void;
}
export const UserFormTitle = ({
  title,
  handleSearchList,
}: UseFromTitleProps) => {
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
        p: 1,
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

const UserForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2} rowSpacing={2}>
      <Box
        sx={{
          bgcolor: "grey.100",
          ml: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Grid item container spacing={2} mb={2}>
          <Grid item xs={6} container spacing={1} columnSpacing={2}>
            {...UserFields().map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </Grid>
          <Grid item xs={6} container spacing={1} columnSpacing={2}>
            {...UserFields2().map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </Grid>

          <Field {...DescriptonField()} />
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "grey.100",
          ml: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          mt: 2,
        }}
      >
        {/* <Grid item xs={12} spacing={2}> */}

        {/* </Grid> */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} spacing={2}>
            <Typography fontWeight={"500"} gutterBottom>
              Company Details
            </Typography>
          </Grid>

          <UserDetailTable />
        </Grid>
      </Box>
    </Grid>
  );
};

export default UserForm;
