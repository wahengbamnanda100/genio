import {
  Column,
  DataTypeProvider,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";

import ActionBtnGroup from "../../common/ActionButtonGroup";
import { CompanyListType } from "./CompanySettings.type";
import CustomTable2 from "../../common/UI-component/Redesign/TableComponent/CustomTable2";
import { CustomStatusCellFormatter } from "../../common/UI-component/Role/Role-list-component";

const CompanySettingTable = () => {
  const rightFixed = ["action"];
  const columnExtensions: GridColumnExtension[] = [
    {
      columnName: "action",
      align: "center",
      width: 120,
    },
  ];

  const columns: Column[] = [
    {
      title: "Sl",
      name: "index",
    },
    { name: "Code", title: "Code" },
    { name: "Name", title: "Name" },
    { name: "Address", title: "Address" },
    { name: "Mobile", title: "Mobile" },
    { name: "Email", title: "Email-ID" },
    { name: "fax", title: "Fax-Number" },
    { name: "Website", title: "Website" },
    { name: "CRNubmer", title: "CR Nubmer" },
    { name: "SoertOrder", title: "Sort Order" },
    { name: "From", title: "From (Day)" },
    { name: "To", title: "To (Day)" },
    { name: "OTEffect", title: "OT Effect Months" },
    { name: "Status", title: "Status" },
    {
      name: "action",
      title: "action",
      getCellValue: (row: CompanyListType) => (
        <ActionBtnGroup
          row={row}
          //  onClickView={handleView}
          //  onClickPrint={handlePrint}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        />
      ),
    },
  ];
  const rows = Company;

  const handleDelete = (row: CompanyListType) => {
    console.log("Deleted row", row);
  };
  const handleEdit = (row: CompanyListType) => {
    console.log("edit row", row);
  };
  return (
    <CustomTable2
      densed={false}
      hasBoxShadow
      isLoading={false}
      grid={{
        columns,
        rows,
      }}
      table={{ columnExtensions }}
      rightColumns={rightFixed}
      hasExport
      hasPaging
      hasSearch
      hasSort
      hasToggleVisibility
    >
      {" "}
      <DataTypeProvider
        for={["Status"]}
        formatterComponent={CustomStatusCellFormatter}
      />
    </CustomTable2>
  );
};

export default CompanySettingTable;

const Company: CompanyListType[] = [
  {
    index: 1,
    Code: "1234567890",
    Name: "test",
    Address: "test",
    Mobile: "1234567890",
    Email: "test@gmail.com",
    Website: "test.com",
    CRNumber: "1234567890",
    Fax: "1234567890",
    SortOrder: "1",
    From: "12",
    To: "12",
    OTEffect: "1",
    Status: "Active",
  },
  {
    index: 2,
    Code: "1234567890",
    Name: "test",
    Address: "test",
    Mobile: "1234567890",
    Email: "test@gmail.com",
    Website: "test.com",
    CRNumber: "1234567890",
    Fax: "1234567890",
    SortOrder: "1",
    From: "12",
    To: "12",
    OTEffect: "1",
    Status: "Active",
  },
];
