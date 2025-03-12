import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Icon,
  Menu,
  MenuItem,
  Stack,
  // Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GenioLogo from "../../../../staticData/image/Genio Logo.png";
import {
  lsCmpImg,
  lsCmpName,
  lsUserCode,
  lsUserImg,
  lsUserName,
  queryCache,
} from "@/utils/utils";
import ConfirmationDialog from "@/common/ModalComponent/ConfirmationDialog";
import { useNavigate } from "react-router";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [open, setOpen] = React.useState<boolean>(false);

  const domain = localStorage.getItem("domain");
  const domainUrl = domain ? domain : import.meta.env.VITE_API_URL;

  const cmpLogo = lsCmpImg
    ? `${domainUrl}${lsCmpImg.startsWith("..") ? lsCmpImg.replace(/^\.{1,2}/, "") : lsCmpImg}?timestamp=${new Date().getTime()}`
    : "";

  const userImg = lsUserImg
    ? `${domainUrl}${lsUserImg.startsWith("..") ? lsUserImg.replace(/^\.{1,2}/, "") : lsUserImg}?timestamp=${new Date().getTime()}`
    : "";

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality here.
    setOpen(true);
    handleCloseMenu();
  };

  const handleConfirm = async () => {
    localStorage.clear();
    await queryCache.clear();
    navigate("/login", { replace: true });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // console.log({ userImg });
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ background: "white", boxShadow: 4, px: 2 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section: Logo and Company Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={GenioLogo}
              alt="logo"
              sx={{ height: 40 }}
            />
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{ borderRight: "1px solid black", height: 30 }}
            />
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <Avatar src={cmpLogo} sx={{ width: 32, height: 32 }} />
              <Typography variant="h6" sx={{ color: "black" }}>
                {lsCmpName}
              </Typography>
            </Stack>
          </Box>

          {/* Center Section: Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "white",
                borderRadius: 3,
                px: 3,
                py: 0.4,
                outline: "1px solid #ccc",
                width: "300px",
              }}
            >
              <InputBase placeholder="Search here" fullWidth />
              <SearchIcon sx={{ color: "gray" }} />
            </Box>
          </Box>

          {/* Right Section: Notifications and Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Notifications */}
            <Badge
              badgeContent={21}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "error.main",
                  color: "white",
                },
              }}
            >
              <IconButton
                size="small"
                sx={{
                  background: "#e0e7ff",
                  borderRadius: "50%",
                  color: "black",
                }}
              >
                <NotificationsIcon />
              </IconButton>
            </Badge>

            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{ borderRight: "1px solid black", height: 30 }}
            />

            {/* Profile Section */}
            <Box
              onClick={handleProfileClick}
              sx={{
                display: "flex",
                alignItems: "center",
                background: menuOpen ? "#f0f0f0" : "white",
                borderRadius: 2,
                color: "black",
                px: 2,
                py: 0.4,
                outline: "1px solid #ccc",
                cursor: "pointer",
                boxShadow: menuOpen ? 4 : 0,
              }}
            >
              <Avatar
                src={userImg}
                sx={{ background: "#90caf9", width: 32, height: 32, mr: 1 }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {`Hello, ${lsUserName}`}
                </Typography>
                <Typography variant="caption" color="gray">
                  {lsUserCode}
                </Typography>
              </Box>
              <Icon sx={{ ml: 1 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </Icon>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              px: 1,
              width: "180px",
              boxShadow: 4,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              borderRadius: 1,
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1, fontWeight: "500" }} />
          <Typography> Logout</Typography>
        </MenuItem>
      </Menu>

      <ConfirmationDialog
        dialogType="logout"
        open={open}
        setOpen={setOpen}
        title="Logout"
        description="Do you want to logout?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default AppHeader;
