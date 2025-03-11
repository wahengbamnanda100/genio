import { Box, Toolbar, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import MultiLevelSidebar from "./Sidebar/Sidebar2";
import CustomAppbar from "./Header";
import CustomSnackbar from "@/common/UI-component/Notification";

const drawerWidth = 200;
const minimizedSecondSidebarWidth = 50;
const expandedSecondSidebarWidth = 280;
const MainLayout = () => {
  // const { notify } = useAppProvider();
  const theme = useTheme();
  const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(true);
  const [secondSidebarOpen, setSecondSidebarOpen] = useState<boolean>(false);
  const [secondSidebarMinimized, setSecondSidebarMinimized] =
    useState<boolean>(true);

  const bgColor = "#fff";
  const mainSidebarWidth = leftDrawerOpened ? drawerWidth : 65;
  const secondSidebarWidth = secondSidebarMinimized
    ? minimizedSecondSidebarWidth
    : expandedSecondSidebarWidth;
  const containerWidth = secondSidebarOpen
    ? mainSidebarWidth + secondSidebarWidth
    : mainSidebarWidth;

  let marginLeft;

  if (leftDrawerOpened) {
    // If the main sidebar is open
    marginLeft = secondSidebarOpen ? containerWidth : mainSidebarWidth;
  } else {
    // If the main sidebar is closed
    marginLeft = secondSidebarOpen ? secondSidebarWidth + 60 : 60;
  }
  return (
    <>
      <CustomAppbar />
      <MultiLevelSidebar
        open={leftDrawerOpened}
        onClose={() => setLeftDrawerOpened(!leftDrawerOpened)}
        secondSidebarOpen={secondSidebarOpen}
        setSecondSidebarOpen={setSecondSidebarOpen}
        secondSidebarMinimized={secondSidebarMinimized}
        setSecondSidebarMinimized={setSecondSidebarMinimized}
        containerWidth={containerWidth}
        mainSidebarWidth={mainSidebarWidth}
        secondSidebarWidth={secondSidebarWidth}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
          background: bgColor,
          // border: "1px solid red",
        }}
      >
        <Toolbar sx={{ mb: 2 }} />
        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: `${marginLeft}px`,
            display: "flex",
            flexDirection: "column",
            // minHeight: "100vh",
            // overflowY: "auto",
            transition: theme.transitions.create("all", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
          <Box sx={{ padding: "1.1rem" }}>
            <CustomSnackbar />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
