import { alpha, Box, Grid, useTheme } from "@mui/material";
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
import { addCategoryItem } from "../UI-component/Menumaster/MenuForm.types";
import Field from "../Form-component/field";
import {
  placeholderUrl,
  StudentImage,
} from "../../layout/MainLayout/Header/UserImage";
import { useEffect } from "react";
import ImageUploadComponent from "../UI-component/Menumaster/UploadImage";

// Define props type for CategoryDialog
interface CategoryDialogProps {
  title: string;
  type: "add" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  onConfirm: (data: any) => void;
  editData: Record<string, string> | null;
}

// Define form field types
interface CategoryFormFields {
  categoryCode: string;
  categoryName: string;
  categoryImg: string;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  title,
  type,
  open,
  setOpen,
  loading,
  onConfirm,
  editData,
}) => {
  const theme = useTheme();

  // Set up form with typed fields
  const methodCategory = useForm<CategoryFormFields>({
    defaultValues: {
      categoryCode: "",
      categoryName: "",
      categoryImg: "",
    },
  });

  const onSubmit = (data: any) => {
    //todo any change
    onConfirm(data);
  };

  useEffect(() => {
    console.log("type", type, editData);

    if (type === "edit" && editData) {
      methodCategory.setValue("categoryCode", editData.itemId);
      methodCategory.setValue("categoryName", editData.label);
      // methodCategory.setValue("categoryImg", editData.categoryImg); //todo later
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      methodCategory.reset(); // Resets to defaultValues when dialog closes
    }
  }, [open]);

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
              fontWeight: "inherit",
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
                {addCategoryItem(type).map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </Grid>
              <Grid item xs={4}>
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
              Add
            </LoadingButton>
          </DialogActionsStyled>
        </form>
      </FormProvider>
    </DialogStyled>
  );
};

export default CategoryDialog;
