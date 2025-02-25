import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Popper,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import { BsTranslate } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { CustomTooltip } from "./Sidebar2";

interface ProfileSectionProps {
  open: boolean;
  userName: string;
  avatarImage: string;
  logoutHandler: () => void;
}

interface SettingItem {
  label: string;
  icon: JSX.Element;
}

const settings: SettingItem[] = [
  {
    label: "Translate",
    icon: <BsTranslate />,
  },
  {
    label: "Settings",
    icon: <LuSettings />,
  },
];

const ProfileSection: React.FC<ProfileSectionProps> = ({
  open,
  userName,
  avatarImage,
  logoutHandler,
}) => {
  // Anchor element to position the Popper
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  // Toggle popper on profile click
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Handle clicks on the settings item
  const handleItemClick = (item: SettingItem, event: React.MouseEvent) => {
    // Prevent the click from toggling the popper again
    event.stopPropagation();
    console.log("Setting clicked:", item.label);
    // Optionally close the popper
    setAnchorEl(null);
  };

  const popperOpen = Boolean(anchorEl);

  // The clickable content that includes settings icons and the profile (avatar and name)
  const avatarContent = (
    <Box
      sx={{
        flex: 2,
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
      }}
      onClick={handleClick}
    >
      {settings.map((item) => (
        <CustomTooltip
          key={item.label}
          arrow
          placement="right-end"
          title={item.label}
          disableFocusListener={open}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              p: 1,
              py: open ? 1 : 1.5,
              gap: 2,
              cursor: "pointer",
              borderRadius: 1,
              width: "100%",
              mb: 1,
              ":hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
            onClick={(e) => handleItemClick(item, e)}
          >
            {React.cloneElement(item.icon, {
              style: { fontSize: "1.3em", fontWeight: "700" },
            })}
            {open && (
              <Typography variant="body1" fontWeight="500">
                {item.label}
              </Typography>
            )}
          </Box>
        </CustomTooltip>
      ))}
      {/* <Stack direction="row" alignItems="center">
        <CustomTooltip
          arrow
          placement="right-end"
          title={"username"}
          disableFocusListener={open}
        >
          <Avatar
            src={avatarImage}
            alt="User Avatar"
            sx={{ width: 40, height: 40 }}
          />
        </CustomTooltip>
        {open && (
          <Typography variant="body1" fontWeight={"500"} ml={1}>
            {userName}
          </Typography>
        )}
      </Stack> */}
    </Box>
  );

  // The content that appears in the Popper
  const popperContent = (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
      >
        <Avatar
          src={avatarImage}
          alt="User Avatar"
          sx={{ width: 40, height: 40, mb: 1 }}
        />
        <Typography variant="h6">{userName}</Typography>
      </Stack>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 1 }}
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </Paper>
  );

  return (
    <>
      {avatarContent}
      <Popper
        open={popperOpen}
        anchorEl={anchorEl}
        placement="right-start"
        sx={{ zIndex: 2000 }}
      >
        {popperContent}
      </Popper>
    </>
  );
};

export default ProfileSection;
