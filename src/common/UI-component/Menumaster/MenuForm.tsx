import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  // useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import {
  categoryDetail,
  chckboxActive,
  chckboxGroup,
  Notes,
  //   Notes,
  productOtherDetail1,
} from "./MenuForm.types";
import Field from "../../Form-component/field";
import {
  placeholderUrl,
  // StudentImage,
} from "../../../layout/MainLayout/Header/UserImage";
import { useState } from "react";
import ImageUploadComponent from "./UploadImage";
import { useNavigate } from "react-router";

const MenuForm = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [salesDescription, setSalesDescription] = useState("");
  const [arabicDescription, setArabicDescription] = useState("");

  // Function to copy purchase description to sales description
  const handleCopy = () => {
    setSalesDescription(purchaseDescription);
  };
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
          {categoryDetail().map((field) => (
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
        <Grid item xs={5.5}>
          <TextField
            variant="outlined"
            label="Purchase Description"
            multiline
            fullWidth
            rows={4}
            value={purchaseDescription}
            onChange={(e) => setPurchaseDescription(e.target.value)}
            sx={{ backgroundColor: "#f0fdf4" }}
          />
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

        <Grid item xs={5.5}>
          <TextField
            variant="outlined"
            label="Sales Description"
            multiline
            fullWidth
            rows={4}
            value={salesDescription}
            onChange={(e) => setSalesDescription(e.target.value)}
            sx={{ backgroundColor: "#f0fdf4" }}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="مميزات الوصف"
            multiline
            fullWidth
            rows={4}
            value={arabicDescription}
            onChange={(e) => setArabicDescription(e.target.value)}
            sx={{
              backgroundColor: "#f0fdf4",
              direction: "rtl", // RTL text direction for Arabic input
              "& .MuiInputLabel-root": {
                transformOrigin: "top right", // Align the label to the right
                right: 25,
                left: "unset",
                textAlign: "right",
              },
              "& .MuiInputBase-root": {
                textAlign: "right", // Align text inside input to the right
                direction: "rtl",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                direction: "rtl", // Apply RTL to the fieldset outline
                textAlign: "right",
              },
            }}
            InputLabelProps={{
              style: {
                direction: "rtl",
                textAlign: "right",
              },
              //   shrink: true, // Keeps the label in place when there's text
            }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid item container spacing={2} xs={12}>
        {productOtherDetail1().map((field) => (
          <Field key={field.name} {...field} />
        ))}
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Field {...chckboxGroup()} />
      </Grid>
      <Grid item container spacing={2} xs={12} height={"50px"}>
        <Field {...Notes()} />
        {/* <Grid item xs={12}>
          <TextField fullWidth name="note" multiline rows={4} label="Notes" />
        </Grid> */}
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Field {...chckboxActive()} />
      </Grid>
    </Grid>
  );
};

export default MenuForm;
