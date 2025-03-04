import { Box, Button, Collapse, Grid, Stack, Typography } from "@mui/material";
import { FormProvider, UseFormReturn } from "react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";

import CustomBreadcrumbs from "../../common/CustomBreadcrumb";
import SearchContainer from "../../common/SearchButtons";
import { userListSearchType, UserSearchField } from "./user.type";
import Field from "../../common/Form-component/field";
import React from "react";

interface UserSearchFieldProps {
  method: UseFormReturn<userListSearchType>;
  expanded: boolean;
  onSubmit: (data: userListSearchType) => void;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateNew: () => void;
}

const UserSearchList = ({
  method,
  expanded,
  onSubmit,
  setExpanded,
  handleCreateNew,
}: UserSearchFieldProps) => {
  return (
    <Grid item container spacing={2}>
      <Grid
        item
        xs={12}
        textAlign={"end"}
        px={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomBreadcrumbs />
      </Grid>
      <Grid
        item
        xs={12}
        textAlign={"end"}
        px={2}
        mb={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={"medium"}>
          User
        </Typography>
        <Stack direction={"row"} gap={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setExpanded(!expanded);
            }}
            sx={{
              color: expanded ? "white" : "inherit",
              bgcolor: expanded ? "black" : "inherit",
              outline: "1px solid black",
              outlineColor: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
          >
            <SearchOutlinedIcon />
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                color: "black",
                outline: "1px solid black",
              },
            }}
          >
            Create New
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} px={2}>
        <Collapse in={expanded} unmountOnExit sx={{}}>
          <Box
            sx={{
              bgcolor: "grey.100",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              mb: 2,
              mt: 1,
            }}
          >
            <FormProvider {...method}>
              <SearchContainer
                onSearch={method.handleSubmit(onSubmit)}
                onCancel={() => method.reset()}
                itemsNo={UserSearchField().length}
              >
                {UserSearchField().map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </SearchContainer>
            </FormProvider>
          </Box>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default UserSearchList;
