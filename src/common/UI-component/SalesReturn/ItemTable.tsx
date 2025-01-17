import { Column } from "@devexpress/dx-react-grid";
import EditingCustomTable from "../../CutomTable/EditableTable";

const ItemTable = () => {
  const column: Column[] = [
    { name: "slno", title: "Sl No." },
    { name: "PartNumber", title: "Part Number" },
    { name: "Description", title: "Description" },
    { name: "InvoiceQunatity", title: "Invoice Quantity" },
    { name: "ReturnQunattity", title: "Return Quantity" },
    { name: "Unit", title: "Unit" },
    { name: "UnitPrice", title: "Unit Price" },
    { name: "Amount", title: "Amount" },
    { name: "Discount", title: "Discount" },
    { name: "DiscountAmount", title: "Discount Amount" },
    { name: "SalesPrice", title: "Salse Pricet" },
    { name: "Status", title: "Status" },
    { name: "UpdateOrder", title: "Update Order" },
    { name: "action", title: "Action" },
  ];

  return (
    <EditingCustomTable
      hasHorizontalPadding={false}
      hasVerticalPadding={false}
      hasBoxShadow={false}
      isLoading={false}
      dynamicResize={false}
      grid={{
        columns: column,
        rows: [],
      }}
    ></EditingCustomTable>
  );
};

export default ItemTable;
