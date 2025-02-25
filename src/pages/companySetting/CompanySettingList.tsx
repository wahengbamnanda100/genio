/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { FormProvider } from "react-hook-form";
import { useCompanySettingList } from "../../hooks/companySetting/useCompanySetting";
import CustomBreadcrumbs from "../../common/CustomBreadcrumb";
import SearchContainer from "../../common/SearchButtons";
import { CompanySettingSeachField } from "../../components/companySetting/CompanySettings.type";
import Field from "../../common/Form-component/field";
import CompanySettingTable from "../../components/companySetting/CompanySettingTable";

const CompanySettingList = () => {
  const { method, expanded, setExpanded, handleCreateNew } =
    useCompanySettingList();

  const onSubmit = (data: any) => {
    console.log("data in search", data);
  };

  return (
    <>
      <Box
        sx={
          {
            // py: 2,
            // mt: 1,
          }
        }
      >
        <Grid
          container
          justifyContent={"center"}
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
            }}
          >
            <Typography variant="h6" fontWeight={"medium"}>
              Company Settings
            </Typography>
            <Stack direction={"row"} gap={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  setExpanded(!expanded);
                }}
                sx={{
                  color: expanded ? "white" : "inherit",
                  bgcolor: expanded ? "black" : "inherit",
                  outline: "1px solid black",
                  outlineColor: "black",
                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                  },
                }}
              >
                <SearchOutlinedIcon />
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNew}
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
                Create New
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} px={2} mt={1}>
            <Collapse in={expanded} timeout={300} unmountOnExit>
              <Box
                sx={{
                  bgcolor: "grey.100",
                  padding: 2,
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              >
                {" "}
                <FormProvider {...method}>
                  <SearchContainer
                    onSearch={method.handleSubmit(onSubmit)}
                    onCancel={() => method.reset()}
                    itemsNo={CompanySettingSeachField().length}
                  >
                    {CompanySettingSeachField().map((field) => (
                      <Field key={field.name} {...field} />
                    ))}
                  </SearchContainer>
                </FormProvider>
              </Box>
            </Collapse>
          </Grid>

          <Grid item xs={12} mt={1} px={2}>
            <CompanySettingTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanySettingList;
