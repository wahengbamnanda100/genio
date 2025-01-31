/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RoleListTable from "../common/UI-component/Role/Role.List";
import { useNavigate } from "react-router";
import { useState } from "react";
import { UnitMasterSearchReqType } from "../services/aoi.type";

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
    navigate("/role");
  };

  const handleDelete = (id: string) => {
    console.log("id", id);
  };

  return (
    <>
      <Paper
        sx={{
          py: 2,
          mt: 4,
          border: "1px solid",
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
      </Paper>
    </>
  );
};

export default RoleList;

const RoleMockData: any[] = [
  {
    id: "1",
    RoleCode: "Admin",
    RoleName: "Administartor",
    Description: "Administartor for all department",
    Status: "Active",
  },
  {
    id: "2",
    RoleCode: "Admin 1",
    RoleName: "Administartor 1",
    Description: "Administartor for all department 1",
    Status: "Active",
  },
];
