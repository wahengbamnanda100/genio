import { Button, Grid, Paper, Toolbar } from "@mui/material";
import SearchBox from "../common/UI-component/SearchBox";
import { FormProvider, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {ManufacturerListSearchFields} from "../common/UI-component/Manufacturer/Manufacturer.type";
import Field from "../common/Form-component/field";
import { useEffect, useState } from "react";
import ManufacturerListTable from "../common/UI-component/Manufacturer/ManufacturerListTable";
import { useNavigate } from "react-router";
import { ManufacturerMasterDelete, ManufacturerMasterSearch } from "../services/ManufacturerMaster";
import { ManufacturerMasterListDeleteReqType, ManufacturerMasterSearchRequestBodyType } from "../services/aoi.type";
import { getValueOrDefault } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import { useAppProvider } from "../AppProvider";



const ManufacturerMasterList = () => {
  const { setNotify } = useAppProvider();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowDeleteId, setRowDeleteId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<ManufacturerMasterSearchRequestBodyType>({
    ManufacturerCode:"",
    ManufacturerName:"",
    Address:"",
    Phonenumber:"",
    Status:"1",
    Page:"1",
    Rows:"10"
  });

  


  const method = useForm<ManufacturerMasterSearchRequestBodyType>({
      defaultValues: {
        ManufacturerCode: "",
        ManufacturerName:"",
        Address:"",
        Phonenumber:"",
        Status: "1",
        Page:"1",
        Rows:"10"
      },
    });


  const { data, isLoading, isFetched,refetch } = ManufacturerMasterSearch(searchQuery,{
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });


  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["Manufacturer-Delete"],
    mutationFn: ManufacturerMasterDelete,
    onSuccess: (data) => {
      if (data.Status === "1") {

        setNotify({
          severity: "success",
          message: data.Message,
        });
          

      } else {
        setNotify({
          severity: "info",
          message: "Cannot delete this Unit item, reference exists",
        });
      }
      setIsModalOpen(false);
    },
  });


  const handleCreate = () => {
    navigate("/Manufacturer");
  };

  const onSearch = (data: ManufacturerMasterSearchRequestBodyType) => {
    console.log("Search form", data);
    const backendData: ManufacturerMasterSearchRequestBodyType = {
      // ...queryParam //todo later add this after Page and Rows
      ...data,
      ...searchQuery,
      ManufacturerCode: getValueOrDefault(data.ManufacturerCode, "ManufacturerCode", ""),
      ManufacturerName: getValueOrDefault(data.ManufacturerName, "ManufacturerName", ""),
      Address: getValueOrDefault(data.Address, "Address", ""),
      Phonenumber:getValueOrDefault(data.Phonenumber, "Phonenumber", ""),
      Status: getValueOrDefault(data.Status, "Status", "-1"),
    };
    setSearchQuery(backendData);
  };


  const handleDelete = (id: string) => {
    setRowDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmeDelete = () => {
      const data: ManufacturerMasterListDeleteReqType = {
        ManufacturerId: rowDeleteId,
      };
      console.log('delete Clicked',data); 
      mutateAsync(data);
      refetch();  
    };
    
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    refetch();
  }, []);

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
            <ManufacturerListTable
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            totalCount={(isFetched && data?.OverallCount) || "0"} 
            isLoading={isLoading}
            onDeleteClick={handleDelete}
            data={isFetched && data?.Data ? data?.Data:[]}
             />
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationDialog
        dialogType="delete"
        open={isModalOpen}
        loading={isPending}
        setOpen={setIsModalOpen}
        title="Delete Manufacturer Item"
        description={"Do you want to Delete the Manufacturer Item"}
        onConfirm={handleConfirmeDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default ManufacturerMasterList;


