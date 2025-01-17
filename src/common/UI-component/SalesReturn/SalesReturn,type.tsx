import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { FieldProps } from "../../Form-component";
import { ChangeEvent, useState } from "react";

export type MenuItems = {
  PartNumber: string;
  Description: string;
  InvoiceQunatity: string;
  ReturnQunattity: string;
  Unit: string;
  UnitPrice: string;
  Amount: string;
  Discount: string;
  DiscountAmount: string;
  SalesPrice: string;
  Status: string;
  UpdateOrder: string;
};

export type SalesReturnType = {
  CustomerCode: string;
  CustomerName: string;
  LedgerCode: string;
  LedgerName: string;
  Address: string;
  ContactPerson: string;
  Designation: string;
  MobileNumber: string;
  Email: string;

  InvoiceNumber: string;
  ReturnNumber: string;
  ReturnDate: string;
  LPONubmer: string;
  CompanyName: string;
  Showwroom: string;

  RegistrationDate: string;
  PaymentType: string;
  File: File | null;

  SalesEngineerCode: string;
  SalseEngineerName: string;
  ProjectCode: string;
  ProjectName: string;

  menuItems: MenuItems[] | [];

  ReturnBy: string;
  SalesDiscount: string;
  NetSalesTotal: string;
  Notes: string;

  GrossAmount: string;
  DiscountPercentage: string;
  DiscountAmount: string;
  NetAmount: string;
};

export const CustomerFormFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "CustomerCode",
    label: "Customer Code",
    hasErrorMessage: true,
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "CustomerName",
    label: "Customer Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 8,
  },
  {
    fieldType: "text",
    name: "LedgerCode",
    label: "Ledger Code",
    hasErrorMessage: true,
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "LedgerName",
    label: "Ledger Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 8,
  },
  {
    fieldType: "text",
    name: "Address",
    label: "Address",
    hasErrorMessage: true,
    multiline: true,
    rows: 2,
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "ContactPerson",
    label: "Ciontact Person",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Designation",
    label: "Designation",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "MobileNumber",
    label: "Mobile Number",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Email",
    label: "Email",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
];

export const InvoiceFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "InvoiceNumber",
    label: "Invoice Number",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },

  {
    fieldType: "text",
    name: "ReturnNumber",
    label: "Return Number",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },

  {
    fieldType: "text",
    name: "ReturnDate",
    label: "Return Date",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "LPONubmer",
    label: "LPO Number",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "CompanyName",
    label: "Company Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Showwroom",
    label: "Showroom",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
];

export const RegistrationFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "RegistrationDate",
    label: "Registration Date",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "PaymentType",
    label: "Payment Type",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
];

export const SalesFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "SalesEngineerCode",
    label: "Sales Engineer Code",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "SalseEngineerName",
    label: "Sales Engineer Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "ProjectCode",
    label: "Project Code",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "ProjectName",
    label: "Project Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
];

export const ReturnFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "ReturnBy",
    label: "Return By",
    hasErrorMessage: true,
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "SalesDiscount",
    label: "Sales Discount",
    hasErrorMessage: true,
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "NetSalesTotal",
    label: "Net Sales Total",
    hasErrorMessage: true,
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "Notes",
    label: "Notes",
    hasErrorMessage: true,
    multiline: true,
    rows: 2,
    size: "medium",
    xs: 12,
  },
];

export const DiscountFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "GrossAmount",
    label: "Gross Amount",
    hasErrorMessage: true,
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "DiscountPercentage",
    label: "Discount Percentage",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "DiscountAmount",
    label: "Discount Amount",
    hasErrorMessage: true,
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "NetAmount",
    label: "Net Amount",
    hasErrorMessage: true,
    size: "medium",
    xs: 12,
  },
];

// type UploadResponse = {
//   url: string;
// };

export const UploadPreviewGrid: React.FC = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleUploadClick = () => setUploadModalOpen(true);
  const handlePreviewClick = () => setPreviewModalOpen(true);
  const handleCancel = () => {
    setFileName("");
    setFileUrl("");
    setFile(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      //   const response = await apiClient.post<UploadResponse>(
      //     "/upload",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     },
      //   );
      //   setFileName(file.name);
      //   setFileUrl(response.data.url);
      setUploadModalOpen(false);
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  return (
    <Grid item container spacing={2} xs={12} sm={6} md={6}>
      <Grid item xs={12}>
        {!fileUrl ? (
          <Button variant="contained" fullWidth onClick={handleUploadClick}>
            Upload File
          </Button>
        ) : (
          <>
            <Typography variant="body1">{fileName}</Typography>
            <Button variant="outlined" onClick={handlePreviewClick}>
              Preview
            </Button>
            <Button variant="text" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Grid>

      {/* Upload Modal */}
      <Modal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Upload File</Typography>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleFileUpload}
            disabled={!file}
          >
            Upload
          </Button>
        </Box>
      </Modal>

      {/* Preview Modal */}
      <Modal open={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">File Preview</Typography>
          {fileUrl ? (
            <img src={fileUrl} alt={fileName} style={{ width: "100%" }} />
          ) : (
            <Typography variant="body1">No preview available</Typography>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};
