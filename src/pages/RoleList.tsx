/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RoleListTable from "../common/UI-component/Role/Role.List";
import { useNavigate } from "react-router";
import { useState } from "react";
import { UnitMasterSearchReqType } from "../services/aoi.type";
import BasicBreadcrumbs from "../common/UI-component/Breadcrumbs/BreadCrumbs";

const RoleList = () => {
  const navigate = useNavigate();

  const [queryParam, setQueryParam] = useState<UnitMasterSearchReqType>({
    UnitCode: "",
    UnitDesc: "",
    FormalName: "",
    Status: "-1", //todo add Page and Rows for pagination
    Page: "1",
    Rows: "10",
  });

  const handleCreate = () => {
    // navigate("/role");
    navigate("/demo-layout/roles/create");
  };

  const handleDelete = (id: string) => {
    console.log("id", id);
  };

  return (
    <>
      <Box
        sx={{
          py: 2,
          mt: 4,
          // border: "1px solid",
          borderColor: "primary.main",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
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
            <BasicBreadcrumbs
              pages={[
                { label: "Home", href: "/" },
                { label: "Role", href: "/" },
                { label: "List", href: "/" },
              ]}
            />
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
            <Typography variant="h6" color={"primary"} fontWeight={"medium"}>
              Role List
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Create New
            </Button>
          </Grid>
          <Grid item xs={12}>
            {/* <FormProvider {...method}>
                <SearchBox
                  expanded={expanded}
                  setExpanded={setExpanded}
                  onSearch={method.handleSubmit(onSearch)}
                  title="Search Deparment"
                  onCancel={() => method.reset()}
                >
                  {unitMasterSearchFields().map((field) => (
                    <Field key={field.name} {...field} />
                  ))}
                </SearchBox>
              </FormProvider> */}
          </Grid>
          <Grid item xs={12} mt={1} px={2}>
            <RoleListTable
              searchQuery={queryParam}
              setSearchQuery={setQueryParam}
              totalCount={"0"}
              isLoading={false}
              onDeleteClick={handleDelete}
              data={RoleMockData}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoleList;

const RoleMockData: any[] = [
  {
    id: "1",
    RoleCode: "Admin",
    RoleName: "Administrator",
    Description: "Administrator for all departments",
    Status: "Active",
  },
  {
    id: "2",
    RoleCode: "Admin1",
    RoleName: "Administrator 1",
    Description: "Administrator for all departments 1",
    Status: "Active",
  },
  {
    id: "3",
    RoleCode: "Manager",
    RoleName: "Department Manager",
    Description: "Manager for specific departments",
    Status: "Active",
  },
  {
    id: "4",
    RoleCode: "Supervisor",
    RoleName: "Team Supervisor",
    Description: "Supervisor for team operations",
    Status: "Inactive",
  },
  {
    id: "5",
    RoleCode: "Analyst",
    RoleName: "Data Analyst",
    Description: "Analyzes data and generates reports",
    Status: "Active",
  },
  {
    id: "6",
    RoleCode: "Developer",
    RoleName: "Software Developer",
    Description: "Develops and maintains software applications",
    Status: "Active",
  },
  {
    id: "7",
    RoleCode: "Support",
    RoleName: "Technical Support",
    Description: "Provides technical support to users",
    Status: "Inactive",
  },
  {
    id: "8",
    RoleCode: "HR",
    RoleName: "Human Resources",
    Description: "Manages employee relations and recruitment",
    Status: "Active",
  },
  {
    id: "9",
    RoleCode: "Finance",
    RoleName: "Finance Manager",
    Description: "Manages financial operations and budgeting",
    Status: "Active",
  },
  {
    id: "10",
    RoleCode: "Intern",
    RoleName: "Intern",
    Description: "Temporary intern role for training purposes",
    Status: "Inactive",
  },
];
