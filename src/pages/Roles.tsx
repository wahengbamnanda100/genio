import {
  Box,
  Button,
  // Divider,
  Grid,
  // Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RoleType } from "../common/UI-component/Role/Role.type";
import CustomContainer from "../common/UI-component/CustomContainer";
import RoleForm from "../common/UI-component/Role/RoleForm";
import SubmitButtons from "../common/UI-component/SubmitButtons";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import BasicBreadcrumbs from "../common/UI-component/Breadcrumbs/BreadCrumbs";

const Roles = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm<RoleType>({
    defaultValues: {
      RoleCode: "",
      RoleName: "",
      RoleDesc: "",
      RoleStatus: true,
      ApproveAutority: false,
      costView: false,
    },
  });

  const handleSubmit = (data: RoleType) => {
    console.log({ data });
  };

  const handleReset = () => {
    methods.reset();
  };

  const handleSearchList = () => {
    navigate("/role-list");
  };

  const pageStyles = useMemo(
    () => ({
      paper: {
        mt: 4,
        p: 2,
        px: 3,
        minHeight: `calc(100vh - 89px)`,
        maxHeight: `calc(100vh - 89px)`,
      },
      container: {
        bgColor: theme.palette.background.paper,
        width: { md: "60%", sm: "80%", xs: "100%" },
        margin: "auto",
        p: 3,
        height: "100%",
        boxShadow: 2,
      },
    }),
    [],
  );

  return (
    <Box sx={pageStyles.paper}>
      <Box component={Grid} container sx={{ pb: 1, pt: 0 }}>
        <Grid
          item
          xs={12}
          mb={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <BasicBreadcrumbs />
        </Grid>

        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" fontWeight={"500"} gutterBottom>
            {t("Roles")}
          </Typography>
          <Button
            startIcon={<SearchIcon />}
            variant="contained"
            onClick={handleSearchList}
          >
            {t("Search-List")}
          </Button>
        </Grid>
      </Box>

      {/* <Divider
        sx={{
          borderBottom: "1px solid",
          borderBottomColor: "primary.main",
          mb: 2,
        }}
      /> */}

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          onReset={handleReset}
        >
          <CustomContainer sx={pageStyles.container}>
            <RoleForm />
            <Box sx={{ m: 2 }} />
            <SubmitButtons
              primaryActions={t("submit")}
              secondaryActions={t("cancel")}
              placement="center"
            />
          </CustomContainer>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Roles;
