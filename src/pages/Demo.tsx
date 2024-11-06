import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import {
  departmentForm,
  DepartmentFormType,
} from "../common/UI-component/Department/Department.type";
import Field from "../common/Form-component/field";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { unitMaster } from "../services/unitMaster";
import { UnitMasterRequestBodyType } from "../services/aoi.type";

// import { ConstructionTwoTone } from "@mui/icons-material";

export const Demo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const method = useForm<DepartmentFormType>({
    defaultValues: {
      FormalName: "",
      UnitCode: "",
      UnitDesc: "",
      Status: true,
    },
  });

  console.log("param", id);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["DEMO"],
    mutationFn: unitMaster,

    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSearchList = () => {
    navigate("/demo-list");
  };

  const onSubmit = (data: DepartmentFormType) => {
    console.log(data);
    const _data: UnitMasterRequestBodyType = {
      ...data,
      UserId: "1",
      Status: Number(data.Status).toString(),
    };
    mutateAsync(_data);
  };

  return (
    <Paper sx={{ mt: 4, p: 2, px: 3 }}>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          onReset={() => method.reset()}
        >
          <Grid
            container
            justifyContent={"center"}
            sx={{
              width: "100%",
              rder: "1px solid",
              borderRadius: 1,
              borderColor: "primary.main",
              overflowY: "hidden",
              overflowX: "hidden",
              p: 2,
            }}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="h6"
                textAlign={"center"}
                gutterBottom
                flex={1}
              >
                Department
              </Typography>
              <Button
                startIcon={<SearchIcon />}
                variant="contained"
                onClick={handleSearchList}
              >
                Search List
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 2, mb: 2 }} />
            </Grid>
            <Grid
              item
              container
              sx={{ width: "50%", margin: "auto" }}
              rowSpacing={2}
            >
              {departmentForm(!id ? true : false).map((field) => (
                <Field key={field.name} {...field} />
              ))}
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={"flex-end"}
              mb={2}
              mt={2}
            >
              <Grid item xs={0.8}>
                <Button variant="contained" disabled={isPending} type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={0.8}>
                <Button variant="outlined" type="reset">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default Demo;
