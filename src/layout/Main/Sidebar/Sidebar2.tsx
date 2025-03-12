import { useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Typography,
  Stack,
  TooltipProps,
  styled,
  Tooltip,
} from "@mui/material";
import { BsArrowRightSquare } from "react-icons/bs";
import { BsArrowLeftSquare } from "react-icons/bs";
import CloseIcon from "@mui/icons-material/Close";

import { RiMenuUnfold3Line } from "react-icons/ri";
import { RiMenuFold3Line } from "react-icons/ri";
// import GenioLogo from "../../../../staticData/image/Genio Logo.png";
// import MiniLogo from "../../../../staticData/image/miniLogo.png";
// import { drawerWidth } from '../../MainLayout/Sidebar/sidebar.config';
import { iconMapping, menuData, MenuItem } from "./SidebarData";
import SidebarAccordion from "./SidebarAccordion";

import ProfileMenu from "./ProfileSection";

interface DemoSidebarProps {
  open: boolean;
  onClose: () => void;
  containerWidth: number;
  mainSidebarWidth: number;
  secondSidebarWidth: number;
  secondSidebarOpen: boolean;
  setSecondSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  secondSidebarMinimized: boolean;
  setSecondSidebarMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemoSidebar = ({
  open,
  onClose,
  containerWidth,
  mainSidebarWidth,
  secondSidebarWidth,
  secondSidebarOpen,
  setSecondSidebarOpen,
  secondSidebarMinimized,
  setSecondSidebarMinimized,
}: DemoSidebarProps) => {
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  const handleItemClick = (item: MenuItem) => {
    setSelectedMenu({ ...item, active: true });
    setSecondSidebarOpen(true);
  };

  const handleCloseSecondSidebar = () => {
    setSecondSidebarOpen(false);
  };

  const MenuIcon = selectedMenu?.icon ? iconMapping[selectedMenu.icon] : null;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        backgroundColor: "#f4f4f4",
        position: "fixed",
        left: 0,
        top: 65,
        width: containerWidth,
        transition: "all 0.2s ease-in-out",
        zIndex: 1000,
        // border: "1px solid red",
      }}
    >
      {/* Main Sidebar */}
      <Box
        sx={{
          width: mainSidebarWidth,
          height: "100vh",
          p: 1,
          overflow: "hidden",
          transition: "all 0.3s",
          // borderRight: "1px solid #ccc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f3f5f7",
            borderRadius: 2,
            height: "calc(100vh - 78px)",
          }}
        >
          {/* Logo Area */}
          <Box
            sx={{
              cursor: "pointer",
              mb: open ? 2 : 0,
            }}
            onClick={onClose}
          >
            <Stack
              direction={"row"}
              gap={2}
              py={2}
              justifyContent={open ? "flex-start" : "center"}
              alignItems={"center"}
              sx={{
                borderRadius: 2,
                ":hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              {open ? (
                <RiMenuFold3Line
                  style={{
                    fontSize: "1.4em",
                    fontWeight: "800",
                  }}
                />
              ) : (
                <RiMenuUnfold3Line
                  style={{
                    fontSize: "1.4em",
                    fontWeight: "800",
                  }}
                />
              )}
              {open && (
                <Typography variant="body1" fontWeight={"500"}>
                  Menu
                </Typography>
              )}
            </Stack>
          </Box>
          {/* Render First Level Menu Items from JSON */}
          <Box
            sx={{
              flex: 12,
              // border: "1px solid red",
              overflowY: "auto",
            }}
          >
            {menuData.map((menu) => {
              const IconComponent = iconMapping[menu.icon];
              return (
                <CustomTooltip
                  key={menu.label}
                  arrow
                  placement="right-end"
                  title={menu.label}
                  disableHoverListener={open}
                >
                  <Box
                    key={menu.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: open ? "flex-start" : "center",
                      p: 0.5,
                      py: open ? 1 : 1.5,
                      gap: 2,
                      cursor: "pointer",
                      borderRadius: 1,
                      mb: 1,
                      bgcolor:
                        selectedMenu?.label === menu.label ? "#000" : "inherit",
                      color:
                        selectedMenu?.label === menu.label ? "#fff" : "inherit",
                      ":hover": {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                    onClick={() => handleItemClick(menu)}
                  >
                    {IconComponent && (
                      <IconComponent
                        style={{
                          fontSize: "1.3em",
                          fontWeight: "700",
                        }}
                      />
                    )}

                    {open && (
                      <Typography variant="body1" fontWeight={"500"}>
                        {menu.label}
                      </Typography>
                    )}
                  </Box>
                </CustomTooltip>
              );
            })}
          </Box>

          <ProfileMenu open={open} />
        </Box>
      </Box>

      {/* Second Sidebar – part of the same container */}
      {secondSidebarOpen && selectedMenu && (
        <Box
          sx={{
            width: secondSidebarMinimized ? 65 : secondSidebarWidth,
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "2px 0px 10px rgba(0,0,0,0.15)",
            p: 2,
            overflowY: "auto",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: secondSidebarMinimized
                ? "center"
                : "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {!secondSidebarMinimized && (
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                {MenuIcon ? (
                  <MenuIcon
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "700",
                    }}
                  />
                ) : null}
                {!secondSidebarMinimized && (
                  <Typography variant="h6" fontWeight={"500"}>
                    {selectedMenu.label}
                  </Typography>
                )}
              </Stack>
            )}

            <Stack
              direction="row"
              spacing={1}
              justifyContent={secondSidebarMinimized ? "center" : "flex-start"}
            >
              {/* Minimize Button */}
              <IconButton
                onClick={() => setSecondSidebarMinimized((prev) => !prev)}
              >
                {secondSidebarMinimized ? (
                  <BsArrowRightSquare />
                ) : (
                  <BsArrowLeftSquare />
                )}
              </IconButton>

              {/* Close Button */}
              {!secondSidebarMinimized && (
                <IconButton onClick={handleCloseSecondSidebar}>
                  <CloseIcon />
                </IconButton>
              )}
            </Stack>
          </Box>

          <SidebarAccordion
            menuData={selectedMenu.secondMenu}
            minimised={secondSidebarMinimized}
          />
        </Box>
      )}
    </Box>
  );
};

export default DemoSidebar;

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#000", // Black background
    color: "#fff", // White text color
    boxShadow: theme.shadows[3], // Apply shadow
    padding: "8px 12px", // Adjust padding
    borderRadius: "6px", // Optional: Rounded corners
    fontSize: "14px", // Optional: Adjust font size
    zIndex: 1500,
  },
}));
