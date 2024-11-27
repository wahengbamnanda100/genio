import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

import {
    UnitForm,
    UnitFormType,
  } from "../common/UI-component/Unit/Unit.type";

import { unitMaster } from "../services/unitMaster";

import { useMutation } from "@tanstack/react-query";
import { UnitMasterRequestBodyType } from "../services/aoi.type";

import Field from "../common/Form-component/field";
import { useAppProvider } from "../AppProvider";

import { useNavigate, useParams } from "react-router";
  export const Unit = () => {
    
  const navigate = useNavigate();
    const { id } = useParams();//in case of search id will have value based on id status visibility checking @ code 1
    const method = useForm<UnitFormType>({
      defaultValues: {
        FormalName: "",
        UnitCode: "",
        UnitDesc: "",
        Status: true,
        UnitId:"",
      },
    });
    const {
      
      setNotify,
    
      
    } = useAppProvider();
   console.log("param", id);
  
    const { mutateAsync, isPending } = useMutation({
      mutationKey: ["UNIT"],
      mutationFn: unitMaster,
  
      onSuccess: (data) => {
        if (data.statusText === "OK" && data.data.Status === "1") {
          setNotify({
            severity: "success",
            message: `Invoice number ${data.data.UnitCode} - ${data.data.Message}`,
          });
          handleResetpage();
        }
        else if (data.statusText === "OK" && data.data.Status === "-2") {
          setNotify({
          severity: "error",
					message:data.data.Message || data.data.info || "Unable to save Unit Master",
        
      });
    }
    else {
      setNotify({ severity: "error", message: "Cannot submit Unit" });
    }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  
    
    const onSubmit = (data: UnitFormType) => {
      console.log(data);
      const _data: UnitMasterRequestBodyType = {
        ...data,
        UserId: "1",
        Status: Number(data.Status).toString(),
      };
      mutateAsync(_data);
    };
    const handleSearchList = () => {
      navigate("/Unit-list");
    };
  
  	const handleResetpage = () => {
      method.reset();
   
    
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
                  Unit
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
                rowSpacing={4}
              >
                {UnitForm(!id ? true : false).map((field) => (  //@ code 1
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
  
  export default Unit;