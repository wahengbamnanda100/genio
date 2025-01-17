import { Button, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormProvider, UseFormReturn } from "react-hook-form";
import SearchBox from "../SearchBox";
import { Dispatch, FC, SetStateAction } from "react";
import { FieldProps } from "../../Form-component";
import Field from "../../Form-component/field";

interface ListComponentProps {
  title: string;
  formMethods: UseFormReturn;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onCreate: () => void;
  onSearch: () => void;
  formFieldArray: () => FieldProps[];
}

const ListComponent: FC<ListComponentProps> = ({
  title,
  formMethods,
  expanded,
  onCreate,
  onSearch,
  setExpanded,
  formFieldArray,
}) => {
  return (
    <>
      <Paper
        sx={{
          py: 2,
          mt: 4,
          border: "1px solid",
          borderColor: "primary.main",
        }}
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
              onClick={onCreate}
            >
              Create New
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...formMethods}>
              <SearchBox
                expanded={expanded}
                setExpanded={setExpanded}
                onSearch={formMethods.handleSubmit(onSearch)}
                title={title}
                onCancel={() => formMethods.reset()}
              >
                {formFieldArray().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchBox>
            </FormProvider>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ListComponent;
