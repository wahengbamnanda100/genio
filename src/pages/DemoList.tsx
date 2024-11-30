import { Button, Grid, Paper } from "@mui/material";
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
import {
  UnitMasterListDeleteReqType,
  UnitMasterSearchReqType,
} from "../services/aoi.type";
import { unitMasterDelete, UnitMasterSearch } from "../services/unitMaster";
import { getValueOrDefault } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useAppProvider } from "../AppProvider";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";

const DemoList = () => {
  const navigate = useNavigate();
  const { setNotify } = useAppProvider();
  const [expanded, setExpanded] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowDeleteId, setRowDeleteId] = useState<string>("");
  const [queryParam, setQueryParam] = useState<UnitMasterSearchReqType>({
    UnitCode: "",
    UnitDesc: "",
    FormalName: "",
    Status: "-1", //todo add Page and Rows for pagination
    Page: "1",
    Rows: "10",
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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["demo-delete"],
    mutationFn: unitMasterDelete,
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
    navigate("/demo");
  };

  const onSearch = (data: UnitmMasterListSchema) => {
    console.log("Search form", data);
    const backendData: UnitMasterSearchReqType = {
      // ...queryParam //todo later add this after Page and Rows
      ...data,
      ...queryParam,
      UnitCode: getValueOrDefault(data.UnitCode, "UnitCode", ""),
      UnitDesc: getValueOrDefault(data.UnitDesc, "UnitDesc", ""),
      FormalName: getValueOrDefault(data.FormalName, "FormalName", ""),
      Status: getValueOrDefault(data.Status, "Status", "-1"),
    };

    setQueryParam(backendData);
  };

  const handleDelete = (id: string) => {
    setRowDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmeDelete = () => {
    const data: UnitMasterListDeleteReqType = {
      UnitMasterId: rowDeleteId,
    };

    mutateAsync(data);
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Paper
        sx={{ py: 2, mt: 4, border: "1px solid", borderColor: "primary.main" }}
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
              searchQuery={queryParam}
              setSearchQuery={setQueryParam}
              totalCount={data?.OverallCount || "0"}
              isLoading={isLoading}
              onDeleteClick={handleDelete}
              data={isFetched && data?.Data ? data?.Data : []}
            />
          </Grid>
        </Grid>
      </Paper>

      <ConfirmationDialog
        dialogType="delete"
        open={isModalOpen}
        loading={isPending}
        setOpen={setIsModalOpen}
        title="Delete Unit item"
        description={"Do you want to Delete the Unit item"}
        onConfirm={handleConfirmeDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default DemoList;
