import ConfirmationDialog from "@/common/ModalComponent/ConfirmationDialog";
import SubmitButtons from "@/common/UI-component/SubmitButtons";
import { UserFormType } from "@/components/user/user.type";
import UserForm from "@/components/user/userForm";
import UserFormTitle from "@/components/user/userFormTitle";
import { useUserForm } from "@/hooks/admin/user/useUserForm";
import { useUserFormByID } from "@/hooks/admin/user/useUserFormByID";
import { setResetToggle } from "@/store/slices/admin/user/companyrestSlice";
import { Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";

interface UserFOrmCOnatienrProps {
  detailById: UserFormType;
  id?: string;
  isView: boolean;
  isEdit: boolean;
}

const UserFormContainer = ({
  detailById,
  id,
  isView,
  isEdit,
}: UserFOrmCOnatienrProps) => {
  const dispatch = useDispatch();
  const {
    method,
    isModalOpen,
    isPending,
    reset,
    userTitle,
    setEmpFocus,
    setRoleFocus,
    setIsModalOpen,
    handleSeachList,
    handleSubmit,
    handleSave,
  } = useUserForm(detailById, id);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        sx={{
          width: "100%",
          borderRadius: 1,
          overflowY: "hidden",
          overflowX: "hidden",
          p: 1,
        }}
      >
        <UserFormTitle
          breadcrumbTitle={userTitle}
          title={isEdit ? "Edit" : isView ? "View" : "Create"}
          handleSearchList={handleSeachList}
        />
        <FormProvider {...method}>
          <Grid item container xs={12} mt={1} px={2} mb={2} rowSpacing={2}>
            <UserForm
              reset={reset}
              userIdDisable={false}
              employeeFocus={setEmpFocus}
              roleFocus={setRoleFocus}
            />
            <SubmitButtons
              primaryActions="Submit"
              secondaryActions="Cancel"
              onSubmit={method.handleSubmit(handleSubmit)}
              onCancel={() => {
                dispatch(setResetToggle(true));
                method.reset();
              }}
              placement="center"
            />
          </Grid>
        </FormProvider>
      </Grid>

      <ConfirmationDialog
        open={isModalOpen}
        loading={isPending}
        onCancel={() => setIsModalOpen(false)}
        dialogType="submit"
        title="User"
        description="Confirm to save"
        onConfirm={handleSave}
      />
    </>
  );
};

const User = () => {
  const { id, isEdit, isView, detailById } = useUserFormByID();
  return (
    <UserFormContainer
      detailById={detailById}
      id={id}
      isView={isView}
      isEdit={isEdit}
    />
  );
};

export default User;
