/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { ScrollableCardContainer, StyledSwitch } from "./User.styled";
import { ShowroomListType } from "./user.type";
import { fetchShowroomData } from "@/store/slices/admin/user/userShoroom.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

export const SwitchCell = <T,>({
  row,
  checked,
  disabled = false,
  onChangeSwitch,
}: {
  row: T;
  checked: boolean;
  disabled?: boolean;
  onChangeSwitch: (event: React.ChangeEvent<HTMLInputElement>, row: T) => void;
}) => {
  return (
    <StyledSwitch
      disabled={disabled}
      checked={checked}
      onChange={(event) => onChangeSwitch(event, row)}
      inputProps={{ "aria-label": "switch_default" }}
    />
  );
};

export const AllocateButton = ({
  rowId,
  open,
  disabled = false,
  setOpen,
}: {
  rowId: string;
  open: boolean;
  disabled?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Button
      size="small"
      variant={disabled ? "text" : "outlined"}
      disabled={disabled}
      onClick={() => {
        setOpen(!open);
        dispatch(fetchShowroomData(rowId));
      }}
      sx={{
        color: open ? "white" : "inherit",
        bgcolor: open ? "black" : "inherit",
        "&.Mui-disabled": {
          backgroundColor: (theme) => theme.palette.grey[100],
          color: (theme) => theme.palette.grey[800],
        },
      }}
    >
      {disabled ? "Select Showroom" : "Allocate"}
    </Button>
  );
};

export const AllocateDrawer = ({
  open,
  toggleDrawer,
  onSelect,
  onCancel,
}: {
  open: boolean;
  toggleDrawer: (open: boolean) => any;
  onSelect: () => void;
  onCancel: () => void;
}) => {
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Toolbar sx={{ mb: 1 }} />
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{
          maxHeight: "calc(100vh - 74px)",
          minHeight: "calc(100vh - 74px)",
        }}
      >
        <Stack>
          <AllocateTitle setOpen={toggleDrawer(false)} />
          <ShowroomList />
        </Stack>

        <ShowroomSelectButtons onSelect={onSelect} onCancel={onCancel} />
      </Stack>
    </SwipeableDrawer>
  );
};

const AllocateTitle = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
    >
      <IconButton sx={{ flex: 0.5 }} onClick={() => setOpen(false)}>
        <CloseIcon />
      </IconButton>
      <Typography
        variant="h6"
        fontWeight={"medium"}
        sx={{ flex: 8, textAlign: "center" }}
      >
        Allocate Showroom
      </Typography>
    </Stack>
  );
};

const ShowroomList = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.userShowroom,
  );
  const [showrooms, setShowrooms] = useState<ShowroomListType[]>(data);
  const [defaultShowroom, setDefaultShowroom] = useState<number | null>(null);

  useEffect(() => {
    setShowrooms(data);
  }, [data]);

  const handleSelectChange = (id: number) => {
    setShowrooms((prevShowrooms) =>
      prevShowrooms.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const handleDefaultChange = (id: number) => {
    setDefaultShowroom(id);

    setShowrooms((prevShowrooms) =>
      prevShowrooms.map((item) => ({ ...item, isDefault: item.id === id })),
    );
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  if (showrooms?.length === 0) {
    return (
      <Box
        sx={{ mt: 1, p: 1, m: 4, bgcolor: (theme) => theme.palette.grey[300] }}
      >
        <Typography
          variant="h6"
          fontWeight={"medium"}
          padding={4}
          sx={{ color: (theme) => theme.palette.grey[800] }}
        >
          No Showroom Data Found
        </Typography>
      </Box>
    );
  }

  return (
    <Stack direction={"column"} gap={2} minWidth={"400px"} height={"100%"}>
      <ScrollableCardContainer>
        {showrooms.map((showroom, index) => (
          <React.Fragment key={showroom.id}>
            <ShowroomCard
              checked={showroom.selected}
              switched={defaultShowroom === showroom.id}
              title={showroom.name}
              onChange={() => handleSelectChange(showroom.id)}
              onChangeDefault={() => handleDefaultChange(showroom.id)}
            />
            {index !== showrooms.length - 1 && (
              <Divider
                flexItem
                variant="middle"
                sx={{ borderBottom: "1px solid" }}
              />
            )}
          </React.Fragment>
        ))}
      </ScrollableCardContainer>
    </Stack>
  );
};

const ShowroomSelectButtons = ({
  onSelect,
  onCancel,
}: {
  onSelect: () => void;
  onCancel: () => void;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      width={"100%"}
      px={8}
      pb={2}
    >
      <Button variant="contained" fullWidth size="small" onClick={onSelect}>
        Select
      </Button>
      <Button variant="outlined" fullWidth size="small" onClick={onCancel}>
        Cancel
      </Button>
    </Stack>
  );
};

interface ShowroomCardProps {
  checked: boolean;
  switched: boolean;
  title: string;
  onChange: () => void;
  onChangeDefault: () => void;
}
const ShowroomCard = ({
  checked,
  switched,
  title,
  onChange,
  onChangeDefault,
}: ShowroomCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 2,
        gap: 1,
        mb: 1,
        p: 1,
      }}
    >
      <Checkbox checked={checked} onChange={onChange} />
      <Stack direction={"column"} gap={1}>
        <Typography variant="body2" fontWeight={"medium"}>
          {title}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={2}
        >
          <Typography variant="subtitle2" fontWeight={"400"}>
            Default
          </Typography>{" "}
          <StyledSwitch
            checked={!checked ? false : switched}
            disabled={!checked}
            onChange={onChangeDefault}
            inputProps={{ "aria-label": "switch_default_card" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
