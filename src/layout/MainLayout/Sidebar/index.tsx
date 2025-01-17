/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Drawer,
  Toolbar,
  useMediaQuery,
  Theme,
  ListItemButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { lighten, Stack, styled } from "@mui/system";
import routes, { drawerWidth, RouteConfig } from "./sidebar.config"; // Adjust the import to your actual routes file

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  padding: theme.spacing(1),
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 4,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  marginBottom: theme.spacing(1.5),
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface ParentListItemProps {
  route: RouteConfig;
  color: string;
  hasChildren: boolean;
  openRoute: { [key: string]: boolean };
  parentIsActive: boolean;
  onToggle: (path: string) => void;
}

const ParentListItem: React.FC<ParentListItemProps> = ({
  route,
  color,
  hasChildren,
  openRoute,
  parentIsActive,
  onToggle,
}) => (
  <StyledListItem
    onClick={() => hasChildren && onToggle(route.path)}
    LinkComponent={Link}
    component={!hasChildren ? (Link as any) : undefined}
    to={!hasChildren ? route.path : undefined}
    sx={{
      outline: parentIsActive ? `1px solid ${color}` : "none",
      backgroundColor: parentIsActive
        ? color
          ? lighten(color, 0.95)
          : "transparent"
        : "transparent",
      color: parentIsActive ? color : "text.primary",
      "& .expandIcon": {
        color: parentIsActive ? color : "default",
      },
      ":hover": {
        "& .MuiListItemIcon-root": {
          color,
        },
        "& .MuiListItemText-root": {
          color,
        },
        "& .expandIcon": {
          color,
        },
      },
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: "36px",
        width: "36px",
        color: parentIsActive ? color : "default",
        fontSize: "20px",
        "& .muiltr-i4bv87-MuiSvgIcon-root": {
          width: "0.8em",
        },
      }}
    >
      {route.icon}
    </ListItemIcon>
    <ListItemText
      primary={route.title}
      primaryTypographyProps={{
        fontWeight: 500,
        color: parentIsActive ? color : "default",
      }}
    />
    {hasChildren ? (
      openRoute[route.path] ? (
        <ExpandLess className="expandIcon" />
      ) : (
        <ExpandMore className="expandIcon" />
      )
    ) : null}
  </StyledListItem>
);

const SidebarContent: React.FC = () => {
  const location = useLocation();
  const [openRoute, setOpenRoute] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (path: string) => {
    setOpenRoute((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  // Checks if the current path matches any child path of a given route
  const isChildRouteActive = (children: RouteConfig[]) =>
    children.some((child) => location.pathname === `/${child.path}`);

  return (
    <SidebarContainer>
      <List component="nav">
        {routes.map((route: RouteConfig) => {
          const hasChildren = route.children && route.children.length > 0;
          const parentIsActive =
            route.children &&
            hasChildren &&
            isChildRouteActive(route?.children);

          return (
            <Stack key={route.path} direction={"column"} gap={0}>
              <ParentListItem
                route={route}
                color={route.color ? route.color : "default"}
                hasChildren={hasChildren || false}
                openRoute={openRoute}
                parentIsActive={parentIsActive || false}
                onToggle={handleToggle}
              />

              {/* Render child items if available */}
              {hasChildren && (
                <Collapse
                  in={openRoute[route.path]}
                  timeout="auto"
                  unmountOnExit
                >
                  <StyledList disablePadding>
                    {route.children &&
                      route.children.map((child: RouteConfig) => {
                        const childIsActive =
                          location.pathname === `/${child.path}`;

                        return (
                          <ParentListItem
                            key={child.path}
                            color={route.color ? route.color : "default"}
                            route={child}
                            hasChildren={false}
                            openRoute={openRoute}
                            parentIsActive={childIsActive}
                            onToggle={handleToggle}
                          />
                        );
                      })}
                  </StyledList>
                </Collapse>
              )}
            </Stack>
          );
        })}
      </List>
    </SidebarContainer>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const isTemporary = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(1080),
  );

  return (
    <Drawer
      variant={isTemporary ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        flexShrink: 1,
        [`& .MuiDrawer-paper`]: {
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
