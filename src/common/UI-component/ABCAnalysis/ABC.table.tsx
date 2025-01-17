/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, GridColumnExtension } from "@devexpress/dx-react-grid";
import { useState } from "react";
import { ABCDetailsType } from "./ABC.type";
import CustomTable from "../../CutomTable/CustomTable";
import { ListFilterCellComponent } from "../../CutomTable/components/customComponent";

interface ABCProps {
  data: any[];
  isLoading: boolean;
}
const ABCTable = ({ data, isLoading }: ABCProps) => {
  const [columnExtension] = useState<GridColumnExtension[]>([
    {
      columnName: "action",
      align: "center",
    },
  ]);

  const [leftColumns] = useState(["index"]);
  const [rightColumns] = useState(["action"]);

  const columns: Column[] = [
    {
      title: "Sl",
      name: "rowIndex",
      getCellValue: (row: ABCDetailsType) => {
        if (data && data) {
          return (
            data.findIndex(
              (dataRow: ABCDetailsType) =>
                dataRow.Description === row.Description,
            ) + 1
          );
        }
        return "";
      },
    },
    {
      name: "Description",
      title: "Description",
    },
    {
      name: "Qunatity",
      title: "Qunatity",
    },
    {
      name: "Cost",
      title: "Cost",
    },
  ];

  return (
    <CustomTable
      hasBoxShadow
      isLoading={isLoading}
      grid={{
        columns,
        rows: data,
      }}
      table={{
        columnExtensions: columnExtension,
        // rowComponent: EmployeeAllowanceListTableRowComponent,
      }}
      //   pagingState={{
      //     currentPage: Number(searchQuery?.Page) - 1,
      //     onCurrentPageChange: (currentPage) =>
      //       setSearchQuery({
      //         ...searchQuery,
      //         Page: (currentPage + 1).toString(),
      //       }),
      //     pageSize: Number(searchQuery.Rows),
      //     onPageSizeChange: (pageSize) =>
      //       setSearchQuery({
      //         ...searchQuery,
      //         Page: "1",
      //         Rows: pageSize.toString(),
      //       }),
      //   }}
      //   customPaging={{
      //     totalCount: Number(totalCount),
      //   }} //todo count page
      tableFilterRow={{
        cellComponent: ListFilterCellComponent,
      }}
      tableColumnVisibility={{
        columnExtensions: [
          { columnName: "rowIndex", togglingEnabled: false },
          { columnName: "action", togglingEnabled: false },
        ],
      }}
      groupingState={{
        columnExtensions: [
          { columnName: "rowIndex", groupingEnabled: false },
          { columnName: "action", groupingEnabled: false },
        ],
      }}
      filteringState={{
        columnExtensions: [
          { columnName: "rowIndex", filteringEnabled: false },
          { columnName: "action", filteringEnabled: false },
        ],
      }}
      integratedFiltering={{
        columnExtensions: [
          {
            columnName: "CardSwipe",
            predicate: (value, filter) => filter.value === value,
          },
        ],
      }}
      sortingState={{
        columnExtensions: [{ columnName: "action", sortingEnabled: false }],
      }}
      rightColumns={rightColumns}
      leftColumns={leftColumns}
      hasExport
      //   hasPaging
      hasSearch
      hasSort
      hasFilter
      hasGrouping
      hasToggleVisibility
    ></CustomTable>
  );
};

export default ABCTable;
