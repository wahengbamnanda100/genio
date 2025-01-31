import TranslateIcon from "@mui/icons-material/Translate";
import {
  IconButton,
  Popper,
  ClickAwayListener,
  Paper,
  List,
  ListItemText,
  useTheme,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/3x2";

const languages = [
  { code: "en", name: "english" },
  { code: "ar", name: "arabic" },
];

const TranslateButton = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // Anchor element for the popper
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "translate-popper" : undefined;

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code); // Change the language
    handleClose(); // Close the language selection menu
  };

  return (
    <>
      <IconButton
        aria-label="translate"
        onClick={handleClick}
        sx={{ color: open ? "secondary.light" : "inherit" }}
      >
        <TranslateIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        modifiers={[
          { name: "offset", options: { offset: [0, 10] } },
          {
            name: "zIndex",
            options: { zIndex: 10000 },
          },
          {
            name: "arrow",
            options: {
              element: ".translate-popper",
              padding: 0,
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            elevation={4}
            sx={{ boxShadow: theme.shadows[5], mt: 1, minWidth: 150 }}
          >
            {/* <Arrow /> */}
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
                          // marginRight: 8,
                          border: "1px solid black",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Flags.QA
                        style={{
                          height: 20,
                          // marginLeft: 8,
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

export default TranslateButton;

//  <MenuItem
//                       onClick={() => {
//                         i18n.changeLanguage("en");
//                         handleClose();
//                       }}
//                       disabled={i18n.language === "en"}
//                     >
//                       <Flags.GB
//                         style={
//                           i18n.language === "ar"
//                             ? {
//                                 height: 20,
//                                 marginLeft: 8,
//                                 border: "1px solid black",
//                                 borderRadius: "4px",
//                               }
//                             : {
//                                 height: 20,
//                                 marginRight: 8,
//                                 border: "1px solid black",
//                                 borderRadius: "4px",
//                               }
//                         }
//                       />

//                       <Typography variant="inherit">
//                         {t("language_english")}
//                       </Typography>
//                     </MenuItem>

//                     <MenuItem
//                       onClick={() => {
//                         i18n.changeLanguage("ar");
//                         handleClose();
//                       }}
//                       disabled={i18n.language === "ar"}
//                     >
//                       <Flags.QA
//                         style={
//                           i18n.language === "ar"
//                             ? {
//                                 height: 20,
//                                 marginLeft: 8,
//                                 border: "1px solid black",
//                                 borderRadius: "4px",
//                               }
//                             : {
//                                 height: 20,
//                                 marginRight: 8,
//                                 border: "1px solid black",
//                                 borderRadius: "4px",
//                               }
//                         }
//                       />
//                       <Typography variant="inherit">
//                         {t("language_arabic")}
//                       </Typography>
//                     </MenuItem>
