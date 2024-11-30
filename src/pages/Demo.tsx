import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import {
  departmentForm,
  DepartmentFormType,
} from "../common/UI-component/Department/Department.type";
import Field from "../common/Form-component/field";
import { useLocation, useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { unitMaster } from "../services/unitMaster";
import {
  UnitMasterItem,
  UnitMasterRequestBodyType,
} from "../services/aoi.type";
import { FC, useEffect, useState } from "react";
import { useAppProvider } from "../AppProvider";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";

// import { ConstructionTwoTone } from "@mui/icons-material";

interface DemoFormContainerProps {
  formData: UnitMasterItem;
}

export const DemoFormContainer: FC<DemoFormContainerProps> = ({ formData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNotify } = useAppProvider();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const method = useForm<DepartmentFormType>({
    defaultValues: {
      FormalName: "",
      UnitCode: "",
      UnitDesc: "",
      Status: true,
    },
  });

  console.log("param", id, formData);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["DEMO"],
    mutationFn: unitMaster,

    onSuccess: (data) => {
      console.log("data", data);
      if (data.Status === "1") {
        setNotify({
          severity: "success",
          message: data.Message,
        });
        method.reset();
      } else {
        setNotify({
          severity: "error",
          message: "Unit Item save failed",
        });
      }
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setNotify({
        severity: "error",
        message: error.message,
      });
      setIsModalOpen(false);
    },
  });

  const handleSearchList = () => {
    navigate("/demo-list");
  };

  const onSubmit = (data: DepartmentFormType) => {
    console.log(data);
    setIsModalOpen(true);
  };

  const setFormValues = () => {
    const { FormalName, StatusDesc, UnitCode, UnitDesc } = formData;
    const { setValue } = method;
    setValue("FormalName", FormalName);
    setValue("UnitCode", UnitCode);
    setValue("UnitDesc", UnitDesc);
    setValue("Status", StatusDesc === "Active" ? true : false);
  };

  const handleConfirmeSave = () => {
    const data = method.getValues();
    const _data: UnitMasterRequestBodyType = {
      ...data,
      UserId: "1",
      UnitId: id ? formData.UnitID : undefined,
      Status: Number(data.Status).toString(),
    };
    mutateAsync(_data);
  };
  const handleCancelSave = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (formData) {
      setFormValues();
    }
  }, [formData]);

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
                  {id ? "Update" : "Submit"}
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
      <ConfirmationDialog
        dialogType="submit"
        open={isModalOpen}
        loading={isPending}
        setOpen={setIsModalOpen}
        title="Save Unit item"
        description={"Do you want to save the Unit item"}
        onConfirm={handleConfirmeSave}
        onCancel={handleCancelSave}
      />
    </Paper>
  );
};

const Demo = () => {
  const location = useLocation();
  const { id } = useParams();

  const { data } = location.state || {};

  return <DemoFormContainer formData={id ? data : null} />;
};

export default Demo;
