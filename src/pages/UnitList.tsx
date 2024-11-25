import { Button, Grid, Paper, Toolbar } from "@mui/material";
import SearchBox from "../common/UI-component/SearchBox";
import { FormProvider, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
    UnitListSearchFields,
    SearchListUnit,
  } from "../common/UI-component/Unit/Unit.type";

import Field from "../common/Form-component/field";
import { useState } from "react";
import UnitListTable from "../common/UI-component/Unit/UnitListTable";
import { useNavigate } from "react-router";

const UnitList = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  const method = useForm<SearchListUnit>({
    defaultValues: {
      UnitCodeSrc: "",
      UnitDescSrc: "",
      FormalNameSrc: "",
      StatusSrc: false,
    },
  });

  const handleCreate = () => {
    navigate("/Unit");
  };

  const onSearch = (data: SearchListUnit) => {
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
                title="Search Unit"
                onCancel={() => method.reset()}
              >
                {UnitListSearchFields().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchBox>
            </FormProvider>
          </Grid>
          <Grid item xs={12}>
            <UnitListTable isLoading={false} data={[]} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UnitList;
