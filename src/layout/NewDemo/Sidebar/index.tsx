// MultiLevelSidebar.tsx
import React, { useState, ReactNode } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Store,
  Mail,
  Settings,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";

// Define your MenuItem type. Notice that a submenu item can either be in `subMenu` or `children`.
export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  subMenu?: MenuItem[]; // First-level submenu
  children?: MenuItem[]; // Additional nested children
}

// Sample menu data
const mainMenu: MenuItem[] = [
  {
    key: "overview",
    label: "Overview",
    icon: <Home />,
  },
  {
    key: "store",
    label: "Store",
    icon: <Store />,
    subMenu: [
      {
        key: "products",
        label: "Products",
        // Nested children under the "Products" submenu
        children: [{ key: "product1", label: "Product 1" }],
      },
      { key: "orders", label: "Orders" },
      { key: "inventory", label: "Inventory" },
    ],
  },
  {
    key: "emails",
    label: "Emails",
    icon: <Mail />,
    subMenu: [
      { key: "inbox", label: "Inbox" },
      { key: "sent", label: "Sent" },
      { key: "drafts", label: "Drafts" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings />,
    subMenu: [
      { key: "profile", label: "Profile" },
      { key: "security", label: "Security" },
      { key: "preferences", label: "Preferences" },
    ],
  },
];

// Sidebar widths
const drawerWidthOpen = 250;
const drawerWidthClosed = 60;

// A recursive component to render menu items (including nested ones)
interface RenderMenuItemsProps {
  items: MenuItem[];
  level?: number;
  sidebarOpen: boolean;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({
  items,
  level = 0,
  sidebarOpen,
}) => {
  // Track which menu items (by key) are expanded.
  // (A real app might want a more sophisticated state management for nested items.)
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <List disablePadding>
      {items.map((item) => {
        // Check if the item has nested items (either subMenu or children)
        const hasChildren = Boolean(item.subMenu || item.children);
        return (
          <Box key={item.key}>
            <ListItemButton
              onClick={() => hasChildren && handleToggle(item.key)}
              sx={{
                pl: 2 + level * 2,
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: sidebarOpen ? 40 : 0,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
              {sidebarOpen && <ListItemText primary={item.label} />}
              {hasChildren &&
                (expandedItems[item.key] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {hasChildren && (
              <Collapse
                in={expandedItems[item.key]}
                timeout="auto"
                unmountOnExit
              >
                {/* Render either children (if defined) or subMenu */}
                {item.children && (
                  <RenderMenuItems
                    items={item.children}
                    level={level + 1}
                    sidebarOpen={sidebarOpen}
                  />
                )}
                {item.subMenu && (
                  <RenderMenuItems
                    items={item.subMenu}
                    level={level + 1}
                    sidebarOpen={sidebarOpen}
                  />
                )}
              </Collapse>
            )}
          </Box>
        );
      })}
    </List>
  );
};

const MultiLevelSidebar: React.FC = () => {
  // Global state to toggle sidebar expanded/minimized
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        {/* Toggle Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "flex-end" : "center",
            p: 1,
          }}
        >
          <IconButton onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider />

        {/* Render the Main Menu */}
        {/* When minimized, we show a tooltip for each icon */}
        {sidebarOpen ? (
          <RenderMenuItems items={mainMenu} sidebarOpen={sidebarOpen} />
        ) : (
          <List disablePadding>
            {mainMenu.map((item) => (
              <Tooltip key={item.key} title={item.label} placement="right">
                <ListItemButton sx={{ justifyContent: "center", p: 1.5 }}>
                  {item.icon && (
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        )}
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Main Content</h1>
        <p>
          Here is your main application content. Click the toggle button to
          collapse/expand the sidebar.
        </p>
      </Box>
    </Box>
  );
};

export default MultiLevelSidebar;
