import React, { useState } from "react";
import {
  Box,
  Typography,
  Popper,
  Button,
  Paper,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

import { BsTranslate } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import Flags from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

interface ProfileSectionProps {
  open: boolean;
}

interface SettingItem {
  label: string;
  icon: JSX.Element;
}

const languages = [
  { code: "en", name: "english" },
  { code: "ar", name: "arabic" },
];

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

const ProfileSection: React.FC<ProfileSectionProps> = ({ open }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openTranslate, setOpenTranslate] = useState(false);
  const [translateAnchorEl, setTranslateAnchorEl] =
    useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleItemClick = (
    item: SettingItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    console.log("Setting clicked:", item.label);
    if (item.label === "Translate") {
      setOpenTranslate(!openTranslate);
      setTranslateAnchorEl(translateAnchorEl ? null : event.currentTarget);
    } else {
      // Handle other settings
      // Optionally close the popper
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setOpenTranslate(false);
    setTranslateAnchorEl(null);
  };

  const handleSelectLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  //  const popperOpen = Boolean(anchorEl);
  //  const id = popperOpen ? "settings-popper" : undefined;
  const translatePopperId = openTranslate ? "translate-popper" : undefined;

  console.log({ open });

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
        // <CustomTooltip
        //   key={item.label}
        //   arrow
        //   placement="right-end"
        //   title={item.label}
        //   disableFocusListener={true}
        // >
        <Box
          component={Button}
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
            color: "#000",
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
        // </CustomTooltip>
      ))}
    </Box>
  );

  return (
    <>
      {avatarContent}
      {/* Language Selection Popper */}
      <Popper
        id={translatePopperId}
        open={openTranslate}
        anchorEl={translateAnchorEl}
        placement="right-start"
        modifiers={[
          { name: "offset", options: { offset: [10, 0] } },
          {
            name: "zIndex",
            options: { zIndex: 100000 },
          },
          {
            name: "arrow",
            options: {
              element: ".translate-popper",
              padding: 0,
            },
          },
        ]}
        sx={{
          zIndex: 2000,
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            elevation={4}
            sx={{ boxShadow: theme.shadows[5], mt: 1, minWidth: 150 }}
          >
            <List>
              {languages.map((language) => (
                <ListItemButton
                  key={language.code}
                  disabled={i18n.language === language.code}
                  sx={{
                    textAlign: "left",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                  onClick={() => handleSelectLanguage(language.code)}
                >
                  <ListItemIcon>
                    {language.code === "en" ? (
                      <Flags.GB
                        style={{
                          height: 20,
                          border: "1px solid black",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Flags.QA
                        style={{
                          height: 20,
                          border: "1px solid black",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={t(language.name)} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ProfileSection;
