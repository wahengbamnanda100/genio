import { Button, Grid, Paper, Toolbar } from "@mui/material";
import SearchBox from "../common/UI-component/SearchBox";
import { FormProvider, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import Field from "../common/Form-component/field";
import { useState } from "react";
import DemoListTable from "../common/UI-component/Department/DemoListTable";
import { useNavigate } from "react-router";
import {
  unitMasterSearchFields,
  UnitmMasterListSchema,
} from "../common/Component-types/UnitMaster.type";
import { UnitMasterSearchReqType } from "../services/aoi.type";
import { UnitMasterSearch } from "../services/unitMaster";
import { getValueOrDefault } from "../utils/utils";

const DemoList = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [queryParam, setQueryParam] = useState<UnitMasterSearchReqType>({
    UnitCode: "",
    UnitDesc: "",
    FormalName: "",
    Status: "-1", //todo add Page and Rows for pagination
  });

  const method = useForm<UnitmMasterListSchema>({
    defaultValues: {
      UnitCode: "",
      UnitDesc: "",
      FormalName: "",
      Status: "-1",
    },
  });

  const { data, isLoading, isFetched } = UnitMasterSearch(queryParam);

  const handleCreate = () => {
    navigate("/demo");
  };

  const onSearch = (data: UnitmMasterListSchema) => {
    console.log("Search form", data);
    const backendData: UnitMasterSearchReqType = {
      // ...queryParam //todo later add this after Page and Rows
      ...data,
      UnitCode: getValueOrDefault(data.UnitCode, "UnitCode", ""),
      UnitDesc: getValueOrDefault(data.UnitDesc, "UnitDesc", ""),
      FormalName: getValueOrDefault(data.FormalName, "FormalName", ""),
      Status: getValueOrDefault(data.Status, "Status", "-1"),
    };

    setQueryParam(backendData);
  };

  // useEffect(() => {
  //   refetch();
  // }, [queryParam]);
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
                title="Search Deparment"
                onCancel={() => method.reset()}
              >
                {unitMasterSearchFields().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchBox>
            </FormProvider>
          </Grid>
          <Grid item xs={12}>
            <DemoListTable
              isLoading={isLoading}
              data={isFetched && data?.Data ? data?.Data : []}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default DemoList;
