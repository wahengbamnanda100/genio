import { Column } from "@devexpress/dx-react-grid";
import EditingCustomTable from "../../CutomTable/EditableTable";

const SalePriceTable = () => {
  const column: Column[] = [
    { name: "rowIndex", title: "Sl No." },
    { name: "partNumber", title: "Part Number" },
    { name: "description", title: "Description" },
    { name: "avgCost", title: "Average Cost" },
    { name: "sellingPrice", title: "Selling Price" },
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

export default SalePriceTable;
