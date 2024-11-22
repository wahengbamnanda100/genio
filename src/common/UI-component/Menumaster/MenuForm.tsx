import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import {
  ArabicSaleDescForm,
  CategoryDetail,
  // categoryDetail,
  ChckboxActive,
  ChckboxGroup,
  MenuMasterFormType,
  Notes,
  ProductOtherDetail1,
  PusrchaseDescForm,
  SalesDescForm,
  //   Notes,
  // productOtherDetail1,
} from "./MenuForm.types";
import Field from "../../Form-component/field";
import {
  placeholderUrl,
  // StudentImage,
} from "../../../layout/MainLayout/Header/UserImage";
import { FC, useState } from "react";
import ImageUploadComponent from "./UploadImage";
import { useNavigate } from "react-router";
import AddCompanyModal, {
  CompanyData,
} from "../../ModalComponent/SelectCompany/AddCompanyModal";
import { useFormContext } from "react-hook-form";
import { MenuMasterComapnyList } from "../../../services/menuMaster";

interface MenuFormProps {
  config: number | null;
  configLoading: boolean;
}

const MenuForm: FC<MenuFormProps> = ({ config, configLoading }) => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const { getValues, setValue, watch } = useFormContext<MenuMasterFormType>();
  const [companyModal, setCompanyModal] = useState<boolean>(false);
  const financialyearid: string = localStorage.getItem("finYear")!;
  // const Cmp_ID_N: string = localStorage.getItem("CmpId")!;
  const manufactureAllWatch = watch("manufactoreAll");

  const {
    data: companyListData,
    isLoading,
    isFetched,
  } = MenuMasterComapnyList(
    { financialyearid, Cmp_ID_N: "" },
    {
      enabled: companyModal,
    },
  );

  const handleCopy = () => {
    const getPruchaseDescription = getValues("purchaseDiscription");
    setValue("salesDescription", getPruchaseDescription);
  };

  const handleSelectCompanies = (companies: Set<string>) => {
    setValue("addCompanies", companies);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    check: boolean,
  ) => {
    e.stopPropagation();
    console.log(check);
    setValue("manufactoreAll", check);
  };

  const companyList: CompanyData[] = isFetched
    ? (companyListData?.Data as CompanyData[])
    : [];

  return (
    <Grid
      item
      container
      rowSpacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <Grid
        item
        xs={12}
        mb={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={"bold"}
          gutterBottom
          marginTop={1}
          sx={{
            justifySelf: "center",
            textAlign: "center",
            flex: 1,
          }}
        >
          Product Details
        </Typography>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{ justifySelf: "end" }}
          onClick={() => navigate("/menu-master-list")}
        >
          Search List
        </Button>
      </Grid>

      <Grid item container spacing={2} xs={12} component={Paper} sx={{}}>
        <Grid item container spacing={2} xs={10.5}>
          {CategoryDetail(config, configLoading)?.map((field) => (
            <Field key={field.name} {...field} />
          ))}

          <Grid item xs={10.5} />
          <Grid item xs={10.5} />
          <Grid item xs={10.5} />
        </Grid>
        <Grid item xs={1.5} justifyContent="center">
          <ImageUploadComponent
            src={placeholderUrl}
            alt={"alte product image"} //todo add later
            width="100%"
            height="100%"
            apiEndpoint="#"
            sxProps={{ objectFit: "cover", borderRadius: 0 }}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Grid item container xs={5.5}>
          <Field {...PusrchaseDescForm()} />
        </Grid>

        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleCopy}
            sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>

        <Grid item container xs={5.5}>
          <Field {...SalesDescForm()} />
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={12}>
          <Field {...ArabicSaleDescForm()} />
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid item container spacing={2} xs={12}>
        {ProductOtherDetail1(manufactureAllWatch, handleCheckboxChange)?.map(
          (field) => <Field key={field.name} {...field} />,
        )}
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Field {...ChckboxGroup()} />
      </Grid>
      <Grid item container spacing={2} xs={12} height={"50px"}>
        <Field {...Notes()} />
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Field {...ChckboxActive(true)} />
            {/* //todo check later */}
          </Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="text" onClick={() => setCompanyModal(true)}>
              Add to Group Companies
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12}></Grid>

      <AddCompanyModal
        data={companyList}
        loading={isLoading}
        open={companyModal}
        setOpen={setCompanyModal}
        title="Select Companies"
        onSelectCompaines={handleSelectCompanies} // Pass the callback function here
      />
    </Grid>
  );
};

export default MenuForm;
