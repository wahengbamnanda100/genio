import React, { memo, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import { HiPlusSmall } from "react-icons/hi2";
import { HiMiniMinus } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router";
import { CustomTooltip } from "./Sidebar2";
import { IconType } from "react-icons/lib";

interface SubMenuItem {
  label: string;
  path: string;
  icon?: IconType;
}

interface AccordionMenu {
  accordionTitle: string;
  icon?: React.ElementType;
  items: SubMenuItem[];
}

interface SidebarAccordionProps {
  menuData: AccordionMenu[];
  minimised?: boolean;
  activePath?: string;
}

const SidebarAccordion: React.FC<SidebarAccordionProps> = ({
  menuData,
  minimised,
  activePath,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleItemClick = (path: string) => {
    console.log("event clicked", path);
    navigate(path);
  };

  const MenuIcon = (icon?: IconType) => {
    if (icon) {
      return React.createElement(icon, {
        style: { fontSize: "20px", color: "#000" },
      });
    }
    return <GoDotFill style={{ fontSize: "1em" }} />;
  };

  return (
    <>
      {menuData.map((accordion, index) => {
        const SubMenuIcon = accordion.icon
          ? React.createElement(accordion.icon, {
              style: { fontSize: "20px", color: "#000" },
            })
          : null;

        return (
          <Accordion
            key={index}
            expanded={expanded === accordion.accordionTitle}
            onChange={handleChange(accordion.accordionTitle)}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === accordion.accordionTitle ? (
                  <HiMiniMinus />
                ) : (
                  <HiPlusSmall />
                )
              }
              sx={{
                minHeight: "40px",
                "& .MuiAccordionSummary-content": { margin: "0px" },
                paddingLeft: "8px",
                paddingRight: "12px",
                backgroundColor:
                  expanded === accordion.accordionTitle ? "#f6f6f6" : "inherit",
                "&:hover": {
                  backgroundColor: "#f6f6f6", // Light hover effect
                  borderRadius: "6px",
                },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1.5}>
                {SubMenuIcon}
                {!minimised && (
                  <Typography variant="body1" fontWeight={500}>
                    {accordion.accordionTitle}
                  </Typography>
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ position: "relative", padding: 0, mt: 1 }}>
              {/* Vertical Connector Line */}
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "0px",
                  bottom: "0px",
                  width: "2px",
                  backgroundColor: "#E0E0E0",
                  zIndex: "100",
                }}
              />
              <List
                disablePadding
                sx={{ background: "transparent", zIndex: "500" }}
              >
                {accordion.items.map((subItem) => (
                  <CustomTooltip
                    key={subItem.label}
                    arrow
                    placement="right-end"
                    title={subItem.label}
                    disableHoverListener={!minimised}
                  >
                    <ListItemButton
                      key={subItem.path}
                      onClick={() => handleItemClick(subItem.path)}
                      sx={{
                        paddingY: "6px",
                        paddingLeft: "24px",
                        position: "relative",
                        "&:hover": {
                          // backgroundColor: "#f6f6f6",
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.08,
                          ),
                          borderRadius: "6px",
                          "& .dot-icon": {
                            opacity: 1, // Show dot on hover
                          },
                        },
                        "&.Mui-selected": {
                          // backgroundColor: "#f6f6f6",
                          backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.6,
                          ),
                          borderRadius: "6px",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: "8px",
                            width: "6px",
                            height: "6px",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            top: "50%",
                            transform: "translateY(-50%)",
                          },
                          "& .dot-icon": {
                            opacity: 1, // Show dot when selected
                          },
                        },
                        "& .dot-icon": {
                          opacity: 1,
                          marginLeft: "-18px",
                          transition: "opacity 0.2s ease-in-out",
                          marginRight: "20px",
                        },
                      }}
                      selected={activePath === subItem.path}
                    >
                      <span className="dot-icon">
                        {MenuIcon(subItem?.icon)}
                      </span>

                      {!minimised && (
                        <ListItemText
                          primary={subItem.label}
                          primaryTypographyProps={{
                            fontWeight:
                              activePath === subItem.path ? "bold" : "normal",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </CustomTooltip>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default memo(SidebarAccordion);
