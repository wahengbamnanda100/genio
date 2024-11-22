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
import { MenuMasterSaveReqType } from "../services/aoi.type";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { arrayToStringWithDot } from "../utils/utils";

const transformSetToObjects = (arr: Set<string>, defaultCmpId: string) => {
  if (arr.size === 0) {
    return [
      {
        Cmp_ID_N: defaultCmpId,
        CheckboxSelect: "true",
      },
    ];
  }

  return Array.from(arr).map((cmpId) => ({
    Cmp_ID_N: cmpId,
    CheckboxSelect: "true",
  }));
};

const MenuMaster = () => {
  const theme = useTheme();
  const { setNotify } = useAppProvider();
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
        methods.reset();
      } else {
        setNotify({
          severity: "success",
          message: "Menu Save Successfully",
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

  const handleSubmit = (data: MenuMasterFormType) => {
    const backendData: MenuMasterSaveReqType = {
      AllowNegativeStock: Number(data.allownegative).toString(),
      Usr_ID_N: "1",
      CategoryID,
      ManufacturerId: data.manufacturer,
      CountryId: data.country,
      MaterialId: data.metarialType,
      PartNo: data.partNumber,
      Barcode: data.barcode,
      SupplierPartNo: data.supplierPartNumber,
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
      Unh_ID_N: "1038", //todo verify
      PreviousCost: data.previousCost,
      PurchaseRate: data.purchaseRate,
      AverageCost: data.averageCost,
      PreviousSalesPrice: data.previousSalesPrice,
      DiscountMargin: data.discountMargin,
      SalesPriceNormal: data.sellingPrice,
      SalesPriceAgency: data.sellingPriceAgency,
      SalesPriceDealer: data.sellingPriceDealer,
      Note: data.notes,
      SerialNumber: Number(data.serialNo).toString(),
      EffectInventory: Number(data.effectInventory).toString(),
      Image: data.categoryImage,
      LedgerID: null,
      FinancilYearID: financialyearid, //todo
      MinSalesPrice: data.minimumSalesPrice,
      ArabDescription: data.arabicDescription,
      TaxApplicable: "0", //todo
      TaxPer: "0", //todo
      RateIncTax: "0", //todo
      FormType: "2", //todo
      AddOnDetails: arrayToStringWithDot(data.addOnDetails),
      DietCategory: arrayToStringWithDot(data.dietCategory),
      MenuMasterID: "", //todo change it later for edit
      TblStockCard: transformSetToObjects(data.addCompanies, Cmp_ID_N),
    };

    console.log(backendData);
    mutateAsync(backendData);
  };

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
            <CustomMenuList />
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
              onReset={() => methods.reset()}
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
                  Submit
                </LoadingButton>
                <Button variant="outlined" color="primary" type="reset">
                  Cancel
                </Button>
              </Stack>
            </form>
          </Grid>
        </FormProvider>
      </MenuContainer>
    </Paper>
  );
};

export default MenuMaster;
