/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import SearchBox from "../common/UI-component/SearchBox";
import Field from "../common/Form-component/field";
import MenUMasterTable from "../common/UI-component/Menumaster/MenuMasterTable";
import {
  MenuMasterListSearchType,
  menuMasterSearchField,
  menuSearchQuery,
} from "../common/UI-component/Menumaster/MenuMasterList.type";
import { MenuMasterListReqType } from "../services/aoi.type";
import { MenuMasterList, MenuMssterListDelete } from "../services/menuMaster";
import { getValueOrDefault } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import { useAppProvider } from "../AppProvider";

const MenuMasterLIst = () => {
  const navigate = useNavigate();
  const { setNotify } = useAppProvider();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteID, setDeleteId] = useState<string>("");

  const [searchQuery, setSearchQuery] =
    useState<MenuMasterListReqType>(menuSearchQuery);

  const method = useForm<MenuMasterListSearchType>({
    defaultValues: {
      Partnumber: "",
      SupplierPartNumber: "",
      PurchaseDescription: "",
      Barcode: "",
      CategoryName: "",
      SalesDescription: "",
      Manufacturer: "",
      MaterialType: "",
      SerialNumber: "",
      EffectInventory: "",
      NegativeStock: "",
      Status: "-1",
      DietCategory: "",
    },
  });

  const { data, isLoading, isFetched, refetch } = MenuMasterList(searchQuery, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["menu-master-delete"],
    mutationFn: MenuMssterListDelete,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setNotify({
          severity: "success",
          message: data?.Message || "Menu Master Deleted Successfully",
        });
        refetch();
      } else if (data.Status === "-2") {
        setNotify({
          severity: "info",
          message: data.Message || "Deletion failed",
        });
      } else {
        setNotify({
          severity: "error",
          message: data.Message || "Deletion failed",
        });
      }
      setIsModalOpen(false);
    },
  });

  const handleCreateNew = () => {
    navigate("/menu-master");
  };

  const onSearch = (data: MenuMasterListSearchType) => {
    const backendData: MenuMasterListReqType = {
      ...searchQuery,
      ...data,
      Partnumber: getValueOrDefault(data.Partnumber, "Partnumber", ""),
      SupplierPartNumber: getValueOrDefault(
        data.SupplierPartNumber,
        "Categoryname",
        "",
      ),
      PurchaseDescription: getValueOrDefault(
        data.PurchaseDescription,
        "Categoryname",
        "",
      ),
      Barcode: getValueOrDefault(data.Barcode, "Categoryname", ""),
      CategoryName: getValueOrDefault(data.CategoryName, "Categoryname", ""),
      SalesDescription: getValueOrDefault(
        data.SalesDescription,
        "Categoryname",
        "",
      ),
      Manufacturer: getValueOrDefault(data.Manufacturer, "Categoryname", ""),
      SerialNumber: getValueOrDefault(data.SerialNumber, "", "-1"),
      EffectInventory: getValueOrDefault(data.EffectInventory, "", "-1"),
      NegativeStock: getValueOrDefault(data.NegativeStock, "", "-1"),
    };

    setSearchQuery(backendData);

    console.log({ data });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmeDelete = () => {
    mutateAsync({
      Stm_ID_N: deleteID,
    });
    // setIsModalOpen(false);
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Paper sx={{ py: 2, mt: 4 }}>
        <Grid
          container
          justifyContent={"center"}
          sx={{
            width: "100%",
            // border: "1px solid",
            borderRadius: 1,
            // borderColor: "primary.main",
            overflowY: "hidden",
            overflowX: "hidden",
            p: 1,
          }}
        >
          <Grid item xs={12} textAlign={"end"} px={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateNew}
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
                title="Search Menu Master"
                onCancel={() => method.reset()}
              >
                {menuMasterSearchField().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchBox>
            </FormProvider>
          </Grid>
          <Grid item xs={12}>
            <MenUMasterTable
              isLoading={isLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onDeleteClick={handleDelete}
              totalPageCount={(isFetched && data?.OverallCount) || "0"}
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
        title="Delete Menu item"
        description={"Do you want to delete the Menu item"}
        onConfirm={handleConfirmeDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default MenuMasterLIst;

// const MenuMasterLIst = () => {
//   return <div>MenuMasterLIst</div>;
// };
