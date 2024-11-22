import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import {manufacturerForm,ManufacturerFormType,} from "../common/UI-component/Manufacturer/Manufacturer.type";
import Field from "../common/Form-component/field";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { ManufacturerMaster } from "../services/ManufacturerMaster";
import { ManufacturerMasterRequestBodyType } from "../services/aoi.type";
import { useAppProvider } from "../AppProvider";


export default function Manufacturer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const method = useForm<ManufacturerFormType>({
      defaultValues: {
        ManufacturerCode: "",
        ManufacturerName: "",
        Address: "",
        PhoneNumber:"",
        FaxNumber:"",
        EMailID: "", 
        Status: true
      }
    });

    const {setNotify} = useAppProvider();
  
    console.log("param", id);
  
    const { mutateAsync, isPending } = useMutation({
      mutationKey: ["DEMO"],
      mutationFn: ManufacturerMaster,
  
      onSuccess: (data) => {
        console.log("data", data);
        setNotify({
					severity: "success",
					message: `${data.data.Message}`,
				});
        method.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  
    const handleSearchList = () => {
      navigate("/ManufacturerMasterList");
    };
  
    const onSubmit = (data: ManufacturerFormType) => {
      console.log(data);
      const _data: ManufacturerMasterRequestBodyType = {
        ManCode:data.ManufacturerCode,
        ManName:data.ManufacturerName,
        Address:data.Address,
        PhoneNumber:data.PhoneNumber,
        FaxNumber:data.FaxNumber,
        Email:data.EMailID,
        UserId: "1",
        ManId:"",
        Status: Number(data.Status).toString()
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
                Manufacturer
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
              columnSpacing={2}
             >
              {manufacturerForm(!id ? true : false).map((field) => (
                <Field key={field.name} {...field} />
              ))}
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={"center"}
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
  )
}
