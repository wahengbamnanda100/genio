/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, Box, Grid, Typography, useTheme } from "@mui/material";
import { PaperComponent } from "./ConfirmationDialog";
import {
  DialogActionsStyled,
  DialogCloseIconStyled,
  DialogContentStyled,
  DialogStyled,
  DialogTitleStyled,
} from "./ConfirmationDialog.style";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import { AddCategoryItem } from "../UI-component/Menumaster/MenuForm.types";
import Field from "../Form-component/field";
import {
  placeholderUrl,
  // StudentImage,
} from "../../layout/MainLayout/Header/UserImage";
import { useEffect, useState } from "react";
import ImageUploadComponent from "../UI-component/Menumaster/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCategoryImgUrl } from "../../store/slices/menuMasterSlice";

// Define props type for CategoryDialog
interface CategoryDialogProps {
  title: string;
  type: "add" | "edit" | "new";
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  onConfirm: (data: any) => void;
  error: string | null;
  data: Record<string, string> | null;
}

// Define form field types
interface CategoryFormFields {
  categoryCode: string;
  categoryName: string;
  categoryImg: string;
}

export type BackendData = {
  CategoryCode: string;
  CategoryDesc: string;
  CategoryImg: string;
  CategoryId: string;
  ParentId: string;
};

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  title,
  type,
  open,
  data,
  setOpen,
  loading,
  onConfirm,
  error,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState<string>(placeholderUrl);

  // Set up form with typed fields
  const methodCategory = useForm<CategoryFormFields>({
    defaultValues: {
      categoryCode: "",
      categoryName: "",
      categoryImg: "",
    },
  });

  const imgUrl = useSelector(
    (state: RootState) => state.menuMaster.categoryImgUrl,
  );

  const onSubmit = (md: any) => {
    //todo any change
    const ParentId =
      type === "new"
        ? "0"
        : type === "add"
          ? data?.CategoryId ?? "0" // Fallback to "0" if CategoryId is undefined
          : type === "edit"
            ? data?.ParentId ?? "0" // Fallback to "0" if ParentId is undefined
            : "0";
    const backendData: BackendData = {
      CategoryCode: md.categoryCode,
      CategoryDesc: md.categoryName,
      CategoryImg: md.categoryImg,
      CategoryId: type === "edit" ? data?.CategoryId || "" : "",
      ParentId: ParentId,
    };
    console.log({ data });
    console.log("data?.ParentId", ParentId);
    onConfirm(backendData);
  };

  useEffect(() => {
    if (type === "edit" && data) {
      methodCategory.setValue("categoryCode", data.CategoryCode);
      methodCategory.setValue("categoryName", data.CategoryDesc);
      methodCategory.setValue("categoryImg", data.Image || "");
      dispatch(setCategoryImgUrl(data.Image || ""));
      setImgSrc(`${import.meta.env.VITE_API_URL}/${data.Image || ""}`);
    }
  }, [open, type, data]);

  useEffect(() => {
    if ((imgUrl && imgUrl !== "" && type === "add") || type === "new") {
      setImgSrc(`${import.meta.env.VITE_API_URL}/${imgUrl}`);
      methodCategory.setValue("categoryImg", imgUrl); // Sync with form field
      console.log("imgUrl ADD", imgUrl);
    } else if (type === "edit" && data?.Image) {
      console.log("imgUrl EDIT", imgUrl);
      setImgSrc(`${import.meta.env.VITE_API_URL}/${data.Image}`);
    } else {
      setImgSrc(placeholderUrl);
    }
  }, [imgUrl, type, data]);

  useEffect(() => {
    if (!open) {
      methodCategory.reset();
      dispatch(setCategoryImgUrl(""));
      setImgSrc(placeholderUrl);
    }
  }, [open]);

  useEffect(() => {
    console.log("img state", imgSrc);
  }, [imgSrc]);

  return (
    <DialogStyled
      open={open}
      onClose={() => setOpen(false)}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-category-dialog"
      sx={{
        "& .MuiDialog-paperWidthSm": {
          minWidth: "450px",
          maxWidth: "450px",
        },
      }}
    >
      <DialogCloseIconStyled onClick={() => setOpen(false)}>
        <div style={{ position: "relative" }}>
          <CloseIcon />
        </div>
      </DialogCloseIconStyled>
      <FormProvider {...methodCategory}>
        <form onSubmit={methodCategory.handleSubmit(onSubmit)}>
          <DialogTitleStyled
            id="draggable-dialog-title"
            dialogType={"submit"}
            sx={{
              cursor: "move",
              color: "inherit",
              fontWeight: "400",
              ":hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {title}
          </DialogTitleStyled>
          <DialogContentStyled
            sx={{
              boxSizing: "border-box",
              height: "100%",
              textAlign: "left",
              fontWeight: "inherit",
            }}
          >
            <Grid container spacing={2} padding={1} height={"100%"}>
              <Grid item xs={8} spacing={2} sx={{}}>
                {AddCategoryItem(type).map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </Grid>
              <Grid item xs={4}>
                <ImageUploadComponent
                  // src={`${import.meta.env.VITE_API_URL}/${imgUrl}`}
                  src={imgSrc}
                  alt={"alte product image"} //todo add later
                  width="100%"
                  height="100%"
                  apiEndpoint={`${import.meta.env.VITE_API_URL}/api/StockCardApi/PostAsync?TempFolderName=~/imgUpload/CategoryItemImage`}
                  sxProps={{ objectFit: "cover", borderRadius: 0 }}
                />
              </Grid>
              {error && (
                <Grid item xs={8} spacing={2}>
                  <Box
                    sx={{
                      width: "100%",
                      p: 1,
                      textAlign: "center",

                      bgcolor: alpha(theme.palette.error.main, 0.1),
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={"400"}
                      color={"error"}
                    >
                      {error}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContentStyled>
          <DialogActionsStyled dialogType={"submit"}>
            <LoadingButton
              loading={loading}
              variant="contained"
              loadingPosition="start"
              color={"secondary"}
              type="submit"
              // onClick={onConfirm}
            >
              {type === "edit" ? "Update" : "Add"}
            </LoadingButton>
          </DialogActionsStyled>
        </form>
      </FormProvider>
    </DialogStyled>
  );
};

export default CategoryDialog;
