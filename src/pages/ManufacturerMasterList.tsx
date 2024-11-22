import { Button, Grid, Paper, Toolbar } from "@mui/material";
import SearchBox from "../common/UI-component/SearchBox";
import { FormProvider, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
    SearchListManufacturer,
    ManufacturerListSearchFields,
} from "../common/UI-component/Manufacturer/Manufacturer.type";

import Field from "../common/Form-component/field";
import { useState } from "react";
import ManufacturerListTable from "../common/UI-component/Manufacturer/ManufacturerListTable";
import { useNavigate } from "react-router";
import { ManufacturerMasterListSchema } from "../common/Component-types/Manufacturer.type";

const ManufacturerMasterList = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  const method = useForm<ManufacturerMasterListSchema>({
      defaultValues: {
        ManufacturerCode: "",
        ManufacturerName:"",
        Address:"",
        Phonenumber:"",
        Status: false,
      },
    });




  const handleCreate = () => {
    navigate("/Manufacturer");
  };

  const onSearch = (data: ManufacturerMasterListSchema) => {
    console.log("Search form", data);
  };
  return (
    <>
      <Toolbar />
      <Paper>
        <Grid
          container
          justifyContent={"center"}
          sx={{
            width: "100%",
            border: "1px solid",
            borderRadius: 1,
            borderColor: "primary.main",
            overflowY: "hidden",
            overflowX: "hidden",
            p: 1,
          }}
        >
          <Grid item xs={12} textAlign={"end"} px={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Create New
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...method}>
              <SearchBox
                expanded={expanded}
                setExpanded={setExpanded}
                onSearch={method.handleSubmit(onSearch)}
                title="Search Manufacturer"
                onCancel={() => method.reset()}
              >
                {ManufacturerListSearchFields().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchBox>
            </FormProvider>
          </Grid>
          <Grid item xs={12}>
            <ManufacturerListTable isLoading={false} data={[]} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ManufacturerMasterList;
