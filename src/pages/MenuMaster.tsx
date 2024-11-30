import { Button, Grid, Paper, Stack, useTheme } from "@mui/material";
import MenuContainer from "../common/UI-component/Menumaster/MenuContainer";
import CustomMenuList from "../common/UI-component/Menumaster/MenuList";
import { FormProvider, useForm } from "react-hook-form";
import MenuForm from "../common/UI-component/Menumaster/MenuForm";
import { LoadingButton } from "@mui/lab";
import { MenuMasterFormType } from "../common/UI-component/Menumaster/MenuForm.types";
import { useMutation } from "@tanstack/react-query";
import { ConfigMenuMaster, MenuMssterSave } from "../services/menuMaster";
import { useAppProvider } from "../AppProvider";
import {
  MenuMasterListType,
  MenuMasterSaveReqType,
} from "../services/aoi.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { convertStringArray, transformSetToObjects } from "../utils/utils";
import ConfirmationDialog from "../common/ModalComponent/ConfirmationDialog";
import { useEffect, useState, FC } from "react";
import { setMenuItemsImgUrl } from "../store/slices/menuMasterSlice";
import { useLocation, useParams } from "react-router";

interface MenuFormContainerProps {
  formData: MenuMasterListType | null;
}

const MenuFormContainer: FC<MenuFormContainerProps> = ({ formData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setNotify } = useAppProvider();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const Cmp_ID_N: string = localStorage.getItem("CmpId")!;

  const financialyearid: string = localStorage.getItem("finYear")!;

  const methods = useForm<MenuMasterFormType>({
    //todo set types
    defaultValues: {
      categoryTitle: "",
      dietCategory: [],
      partNumber: "",
      barcode: "",
      supplierPartNumber: "",
      categoryImage: "",

      purchaseDiscription: "",
      salesDescription: "",

      arabicDescription: "",

      manufactoreAll: false,
      manufacturer: "",
      country: "",
      metarialType: "",
      brand: "",
      model: "",
      make: "",
      specification: "",
      budgetCode: "",
      reOrderLevel: "",
      minimumQuantity: "",
      maximumQuantity: "",
      wastagePercentage: "",
      leadTime: "",
      stockUnit: "",
      previousCost: "",
      averageCost: "",
      purchaseRate: "",
      previousSalesPrice: "",
      discountMargin: "",
      minimumSalesPrice: "",
      sellingPrice: "",
      sellingPriceAgency: "",
      sellingPriceDealer: "",
      shelfLife: "",
      addOnDetails: [],

      allownegative: false,
      serialNo: false,
      effectInventory: true,

      notes: "",
      active: true,

      addCompanies: new Set(),
    },
  });

  const {
    data,
    isLoading: configLoading,
    isFetched,
  } = ConfigMenuMaster({ intacmid: 167 }, null, {
    enabled: true,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["menu-master-save"],
    mutationFn: MenuMssterSave,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setNotify({
          severity: "success",
          message: "Menu Save Successfully",
        });
        dispatch(setMenuItemsImgUrl(""));
        methods.reset();
        setIsModalOpen(false);
      } else {
        setNotify({
          severity: "error",
          message: "Menu save failded",
        });
      }
    },
    onError: () => {
      setNotify({
        severity: "error",
        message: "Menu Save Failed",
      });
    },
  });

  const CategoryID = useSelector(
    (state: RootState) => state.menuMaster.categoryId,
  );

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleConfirmeSave = () => {
    const data = methods.getValues();
    const backendData: MenuMasterSaveReqType = {
      AllowNegativeStock: Number(data.allownegative).toString(),
      Usr_ID_N: "1",
      CategoryID,
      ManufacturerId: data.manufacturer,
      CountryId: data.country,
      MaterialId: data.metarialType,
      PartNo: data.partNumber,
      Barcode: data.barcode,
      SupplierPartNumber: data.supplierPartNumber,
      PurchaseDesc: data.purchaseDiscription,
      SalesDesc: data.salesDescription,
      Brand: data.brand,
      Model: data.model,
      Make: data.make,
      Specification: data.specification,
      Status: Number(data.active).toString(), //todo verify this
      ReOrderLevel: data.reOrderLevel,
      MinQty: data.minimumQuantity,
      MaxQty: data.maximumQuantity,
      WastagePer: data.wastagePercentage,
      ShelfLife: data.shelfLife,
      LeadTime: data.leadTime,
      UnitID: data.stockUnit, //todo verify
      PreviousCost: data.previousCost,
      PurchaseRate: data.purchaseRate,
      AverageCost: data.averageCost,
      PreviousSalesPrice: data.previousSalesPrice,
      DiscountMargin: data.discountMargin,
      SalesPriceNormal: data.sellingPrice,
      SalesPriceAgency: data.sellingPriceAgency,
      SalesPriceDealer: data.sellingPriceDealer,
      Notes: data.notes,
      SerialNumber: Number(data.serialNo).toString(),
      EffectInventory: Number(data.effectInventory).toString(),
      StockcardImagepath: data.categoryImage,
      FinancilYearID: financialyearid, //todo
      MinSalesPrice: data.minimumSalesPrice,
      ArabDescription: data.arabicDescription,

      FormType: "2", //todo
      AddOnDetails: convertStringArray(data.addOnDetails, "toString") as string,
      DietCategory: convertStringArray(data.dietCategory, "toString") as string,
      MenuMasterID: "", //todo change it later for edit
      TblStockCard: transformSetToObjects(data.addCompanies, Cmp_ID_N),
      Stm_ID_N: id ? formData && formData?.Stm_ID_N : null,
    };

    mutateAsync(backendData);
  };
  const handleCancelSave = () => {
    setIsModalOpen(false);
  };

  const setFormFields = (data: MenuMasterListType) => {
    const { setValue } = methods;

    setValue(
      "dietCategory",
      convertStringArray(data.DietCategoryId, "toArray") as string[],
    );
    setValue("partNumber", data.Partnumber);
    setValue("barcode", data.Barcode);
    setValue("supplierPartNumber", data.SupplierPartNo);
    // setValue("categoryImage", (data?.StockcardImagepath as string) || ""); //todo add base url
    dispatch(setMenuItemsImgUrl(data.StockcardImagepath as string));
    setValue("purchaseDiscription", data.Purchasedescription);
    setValue("salesDescription", data.Salesdescription);
    setValue("arabicDescription", data.ArabicSalesDesc);
    setValue("manufacturer", data.ManufacturerId); //todo manufatruer data is comming wrong
    setValue("country", data.CountryId); //todo country name is coming wrong
    setValue("metarialType", data.MaterialId);
    setValue("brand", data.Brand);
    setValue("model", data.Model);
    setValue("make", data.Make);
    setValue("specification", data.Specification);
    setValue("reOrderLevel", data.ReOrderLevel);
    setValue("minimumQuantity", data.MinQty);
    setValue("maximumQuantity", data.MaxQty);
    setValue("wastagePercentage", data.WastagePer);
    setValue("leadTime", data.LeadTime);
    setValue("stockUnit", data.UnitID);
    setValue("previousCost", data.PreviousCost);
    setValue("averageCost", data.AverageCost);
    setValue("purchaseRate", data.PurchaseRate);
    setValue("previousSalesPrice", data.PreviousSalesPrice);
    setValue("discountMargin", data.DiscountMargin);
    setValue("minimumSalesPrice", data.MinSalesPrice);
    setValue("sellingPrice", data.SalesPriceNormal);
    setValue("sellingPriceAgency", data.SalesPriceAgency);
    setValue("sellingPriceDealer", data.SalesPriceDealer);
    setValue("shelfLife", data.ShelfLife);
    setValue(
      "addOnDetails",
      convertStringArray(data.AddOnDetails, "toArray") as string[],
    );
    setValue("allownegative", data.AllowNegativeStock === "1" ? true : false);
    setValue("serialNo", data.SerialNumber === "1" ? true : false);
    setValue("effectInventory", data.EffectInventory === "1" ? true : false);
    setValue("active", data.StatusId === "1" ? true : false);
    setValue("notes", data.Notes);
  };

  const handleReset = () => {
    if (id && formData) {
      setFormFields(formData);
      return;
    }
    methods.reset();
    dispatch(setMenuItemsImgUrl(""));
  };

  useEffect(() => {
    dispatch(setMenuItemsImgUrl(""));

    return () => {
      dispatch(setMenuItemsImgUrl(""));
    };
  }, []);

  useEffect(() => {
    if (formData) {
      console.log("this is a edit page", formData);
      setFormFields(formData);
    }
  }, [formData]);

  return (
    <Paper sx={{ mt: 4, p: 2, px: 3 }}>
      <MenuContainer>
        <FormProvider {...methods}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              maxHeight: "85vh",
              minHeight: "85vh",
              borderRight: "1px solid",
              borderRightColor: theme.palette.primary.main,
              // overflowY: "auto",
            }}
          >
            <CustomMenuList
              categoryId={id ? formData?.CategoryID : undefined}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            sx={{
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              onReset={handleReset}
            >
              <MenuForm
                config={isFetched ? data! : null}
                configLoading={configLoading}
              />

              {/* <MenuForm /> */}
              <Stack
                direction={"row"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                gap={2}
                mb={4}
                px={2}
              >
                <LoadingButton
                  loading={isPending} //todo change later
                  variant="contained"
                  loadingPosition="start"
                  color={"secondary"}
                  type={"submit"}
                >
                  {id ? "Update" : "Submit"}
                </LoadingButton>
                <Button variant="outlined" color="primary" type="reset">
                  Cancel
                </Button>
              </Stack>
            </form>
          </Grid>
        </FormProvider>
      </MenuContainer>

      <ConfirmationDialog
        dialogType="submit"
        open={isModalOpen}
        loading={isPending}
        setOpen={setIsModalOpen}
        title="Save Menu item"
        description={"Do you want to save the Menu item"}
        onConfirm={handleConfirmeSave}
        onCancel={handleCancelSave}
      />
    </Paper>
  );
};

const MenuMaster = () => {
  const location = useLocation();
  const { id } = useParams();
  const { data } = location.state || {};

  return <MenuFormContainer formData={id ? data : null} />;
};

export default MenuMaster;
