import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";

interface ActionIconBtnProps {
  children: ReactNode;
  variant: "print" | "view" | "delete" | "edit";
  onClick: () => void;
}

const ActionIconBtn: FC<ActionIconBtnProps> = ({
  children,
  variant,
  onClick,
}) => {
  return (
    <Tooltip title={variant}>
      <IconButton
        onClick={onClick}
        sx={{
          borderRadius: 0,
          color:
            variant === "print" || variant === "edit"
              ? "black"
              : variant === "view"
                ? "secondary.main"
                : "red",
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

interface ActionBtnGroupProps<T> {
  row: T;
  onClickPrint?: (row: T) => void;
  onClickView?: (row: T) => void;
  onClickDelete?: (row: T) => void;
  onClickEdit?: (row: T) => void;
}

const ActionBtnGroup = <T,>({
  row,
  onClickPrint,
  onClickView,
  onClickDelete,
  onClickEdit,
}: ActionBtnGroupProps<T>) => {
  return (
    <Stack
      direction="row"
      gap={0.5}
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      {onClickPrint && (
        <ActionIconBtn variant="print" onClick={() => onClickPrint(row)}>
          <PrintIcon fontSize="small" />
        </ActionIconBtn>
      )}
      {onClickView && (
        <ActionIconBtn variant="view" onClick={() => onClickView(row)}>
          <RemoveRedEyeIcon fontSize="small" />
        </ActionIconBtn>
      )}
      {onClickEdit && (
        <ActionIconBtn variant="edit" onClick={() => onClickEdit(row)}>
          <EditIcon fontSize="small" />
        </ActionIconBtn>
      )}
      {onClickDelete && (
        <ActionIconBtn variant="delete" onClick={() => onClickDelete(row)}>
          <DeleteOutlineIcon fontSize="small" />
        </ActionIconBtn>
      )}
    </Stack>
  );
};

export default ActionBtnGroup;
