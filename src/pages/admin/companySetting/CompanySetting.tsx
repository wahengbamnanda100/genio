import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCompanySettingForm } from "@/hooks/admin/companySetting/useCompanySettingForm";
import CompanySettingForm from "@/components/companySetting/CompanySettingForm";
import CustomBreadcrumbs from "@/common/CustomBreadcrumb";

const CompanySettings = () => {
  const { method, handleSearchList } = useCompanySettingForm();

  return (
    <Box
      sx={
        {
          // py: 2,
        }
      }
    >
      <Grid
        container
        // justifyContent={"center"}
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
            Create
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

        <Grid item xs={12} mt={1} px={2}>
          <FormProvider {...method}>
            <CompanySettingForm />
          </FormProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanySettings;
