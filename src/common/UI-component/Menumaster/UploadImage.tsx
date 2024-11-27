import React, {
  useState,
  CSSProperties,
  MouseEventHandler,
  useEffect,
} from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Button,
  IconButton,
  alpha,
  useTheme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import _ from "lodash";
import {
  DialogActionsStyled,
  DialogCloseIconStyled,
  DialogContentStyled,
  DialogStyled,
  DialogTitleStyled,
} from "../../ModalComponent/ConfirmationDialog.style";
import { UploadPaperComponent } from "../../ModalComponent/ConfirmationDialog";
import AnimateButton from "../Extended/AnimateButton";
import { useDispatch } from "react-redux";
import {
  setCategoryImgUrl,
  setMenuItemsImgUrl,
} from "../../../store/slices/menuMasterSlice";

interface ImageUploadComponentProps {
  src: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
  imageType?: "menu" | "category";
  apiEndpoint: string; // API endpoint for uploading the image
  sxProps?: CSSProperties;
}

const placeholderUrl =
  "https://placehold.jp/25/5b5b5b/ffffff/200x200.png?text=NO%20IMAGE%20AVAILABLE";

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  src,
  alt = "image",
  height = "30px",
  width = "30px",
  imageType = "category",
  apiEndpoint,
  sxProps,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setImgSrc(placeholderUrl);
  };

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("handleImageSelect", file);

    setIsDragOver(false);

    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      await axios
        .put(apiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("Image uploaded successfully:", response.data[0]);
          if (response.status === 200) {
            imageType === "category" &&
              dispatch(setCategoryImgUrl(response.data[0]));
            imageType === "menu" &&
              dispatch(setMenuItemsImgUrl(response.data[0]));
          } else {
            console.log("Image upload failed");
          }
        });
      setModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setLoading(false);
    }
  };

  const handleRemovePreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation(); // Prevents the label's onClick from triggering
    e.preventDefault();
    setPreviewImage(null);
    setSelectedFile(null);
    setIsDragOver(false);
  };

  const getTruncatedFileName = (maxLength: number = 10) => {
    if (!selectedFile) return null;

    const { name } = selectedFile;
    const nameParts = name.split(".");
    const extension = nameParts.pop(); // Get the file extension

    // Set a default value for the extension if it's undefined
    const validExtension = extension ? `.${extension}` : ""; // Ensure extension starts with a dot

    const baseName = nameParts.join("."); // Rejoin in case the filename has multiple dots

    // Use Lodash to truncate the base name and add the file extension
    const truncatedBaseName = _.truncate(baseName, {
      length: maxLength + validExtension.length + 3, // +3 for "..." and the dot
      omission: "...", // Define the omission string
    });

    return `${truncatedBaseName}${validExtension}`;
  };

  return (
    <>
      <AnimateButton>
        <Box
          onClick={handleImageClick}
          position="relative"
          width={width}
          height={height}
          sx={{ cursor: "pointer", ...sxProps }}
        >
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            />
          )}
          <Avatar
            alt={alt}
            src={imgSrc}
            sx={{
              width: "100%",
              height: "100%",
              opacity: loading ? 0.5 : 1,
              borderRadius: 0,
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </Box>
      </AnimateButton>

      {/* Modal for image upload */}
      <DialogStyled
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        PaperComponent={UploadPaperComponent}
        aria-labelledby="draggable-upload-dialog"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <DialogCloseIconStyled onClick={() => setModalOpen(false)}>
          <div style={{ position: "relative" }}>
            <CloseIcon />
          </div>
        </DialogCloseIconStyled>

        <DialogTitleStyled
          id="draggable-upload-dialog-title"
          dialogType={"submit"}
          sx={{
            cursor: "move",
            color: "inherit",
            fontWeight: "400",
            ":hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          Upload Image
        </DialogTitleStyled>

        <DialogContentStyled
          sx={{
            flexDirection: "column",
            boxSizing: "border-box",
            height: "100%",
            textAlign: "left",
            fontWeight: "inherit",
            // border: "1px solid",
            width: "100%",
            minHeight: "50px",
            borderRadius: 1,
          }}
        >
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            component="label"
            role={undefined}
            // onClick={(e) => e.preventDefault()}
            // htmlFor="image-upload"
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              border: `2px ${isDragOver ? "dashed" : "solid"} ${
                isDragOver ? theme.palette.primary.main : "#ccc"
              }`,
              borderRadius: 2,
              backgroundColor: isDragOver
                ? alpha(theme.palette.primary.light, 0.2)
                : "transparent",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {previewImage ? (
              <Box position="relative" width="100%">
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: alpha(theme.palette.grey[400], 0.7),
                    color: "#000",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.grey[400], 0.9),
                    },
                  }}
                  onClick={handleRemovePreview}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  component="img"
                  src={previewImage}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 1,
                    // border: "1px solid #ccc",
                  }}
                />
              </Box>
            ) : (
              <>
                <CloudUpload fontSize="large" color="primary" />
                <Box mt={1}>Drag & Drop or Click to Upload</Box>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleImageSelect}
                />
              </>
            )}
          </Box>

          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
              {getTruncatedFileName(25)}
            </Typography>
          )}
        </DialogContentStyled>
        <DialogActionsStyled dialogType={"submit"}>
          <AnimateButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </AnimateButton>
        </DialogActionsStyled>
      </DialogStyled>
    </>
  );
};

export default ImageUploadComponent;
