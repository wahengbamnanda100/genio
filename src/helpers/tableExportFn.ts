/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@devexpress/dx-react-grid";
import saveAs from "file-saver";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
	AlignmentType,
	Document,
	Footer,
	Packer,
	PageNumber,
	NumberFormat,
	Paragraph,
	TextRun,
	Table as WordTable,
	TableCell,
	TableRow,
	VerticalAlign,
	convertInchesToTwip,
} from "docx";
import { format } from "date-fns";
import { CustomTableProps } from "../common/CutomTable/CustomTable.types";
import moment from "moment";

export const EXPORT_TYPES = [
	"Excel",
	"Word",
	"PDF",
	"CSV",
	"TXT",
	"JSON",
] as const;

export type tableExportFnProps = {
	rows: readonly any[];
	columns: readonly Column[];
	customExport: CustomTableProps["customExport"];
	selected: (typeof EXPORT_TYPES)[number];
};

type FormatMap = {
	Date: (v: Date) => string;
	Status: (v: number) => "Active" | "Inactive";
};

const formatMap: FormatMap = {
	Date: (v: Date) => format(new Date(v), "dd-MMM-yyyy"),
	Status: (v: number) => (v ? "Active" : "Inactive"),
};

export const tableExportFn = ({
	rows,
	columns,
	customExport,
	selected,
}: tableExportFnProps) => {
	const customcolumns = columns.filter(
		(el) =>
			![...(customExport?.columnsToRemove ?? []), "Action"].includes(el.name)
	);
	const customRows = rows.map((row, index) => {
		if (columns.find((el) => el.name === "Status")) {
			return {
				...row,
				Status: formatMap.Status(row.Status),
				RowIndex: index + 1,
				...Object.fromEntries(
					customExport?.formatCells?.map((el) => [
						el.name,
						formatMap[el.type](row[el.name]),
					]) ?? []
				),
			};
		}
		return {
			...row,
			RowIndex: index + 1,
			...Object.fromEntries(
				customExport?.formatCells?.map((el) => [
					el.name,
					formatMap[el.type](row[el.name]),
				]) ?? []
			),
		};
	});
	if (selected === "Excel") {
		exportExcelCsvTxt({
			rows: customRows,
			columns: customcolumns,
			type: "Excel",
		});
	}
	if (selected === "CSV") {
		exportExcelCsvTxt({
			rows: customRows,
			columns: customcolumns,
			type: "CSV",
		});
	}
	if (selected === "TXT") {
		exportExcelCsvTxt({
			rows: customRows,
			columns: customcolumns,
			type: "TXT",
		});
	}
	if (selected === "JSON") {
		exportJSON({
			rows: customRows,
			columns: customcolumns,
		});
	}
	if (selected === "PDF") {
		exportPDF({
			rows: customRows,
			columns: customcolumns,
			pageOrientation: customExport?.pageOrientation,
		});
	}
	if (selected === "Word") {
		exportWord({
			rows: customRows,
			columns: customcolumns,
		});
	}
};

// const exportWord = ({ rows, columns }: { rows: any[]; columns: Column[] }) => {
//   const doc = new Document({
//     sections: [
//       {
//         properties: {
//           page: {
//             pageNumbers: {
//               start: 1,
//               formatType: NumberFormat.DECIMAL,
//             },
//           },
//         },
//         footers: {
//           default: new Footer({
//             children: [
//               new Paragraph({
//                 alignment: AlignmentType.LEFT,
//                 children: [
//                   new TextRun({
//                     children: [
//                       "Page ",
//                       PageNumber.CURRENT,
//                       " of ",
//                       PageNumber.TOTAL_PAGES,
//                     ],
//                   }),
//                 ],
//               }),
//             ],
//           }),
//         },
//         children: [
//           new WordTable({
//             rows: [
//               new TableRow({
//                 children: columns.map(
//                   ({ title }) =>
//                     new TableCell({
//                       children: [
//                         new Paragraph({
//                           children: [
//                             new TextRun({
//                               text: title,
//                               bold: true,
//                             }),
//                           ],
//                           alignment: AlignmentType.CENTER,
//                         }),
//                       ],
//                       verticalAlign: VerticalAlign.CENTER,
//                       margins: {
//                         top: convertInchesToTwip(0.03),
//                         bottom: convertInchesToTwip(0.03),
//                         right: convertInchesToTwip(0.1),
//                         left: convertInchesToTwip(0.1),
//                       },
//                     })
//                 ),
//               }),
//               ...rows.map(
//                 (row) =>
//                   new TableRow({
//                     children: columns.map(
//                       ({ name }) =>
//                         new TableCell({
//                           children: [
//                             new Paragraph({
//                               children: [new TextRun(row[name])],
//                             }),
//                           ],
//                           verticalAlign: VerticalAlign.CENTER,
//                           margins: {
//                             top: convertInchesToTwip(0.03),
//                             bottom: convertInchesToTwip(0.03),
//                             right: convertInchesToTwip(0.1),
//                             left: convertInchesToTwip(0.1),
//                           },
//                         })
//                     ),
//                   })
//               ),
//             ],
//           }),
//         ],
//       },
//     ],
//   });

//   Packer.toBlob(doc).then((blob) => {
//     saveAs(blob, "DataGrid.docx");
//   });
// };

const exportWord = ({ rows, columns }: { rows: any[]; columns: Column[] }) => {
	const doc = new Document({
		sections: [
			{
				properties: {
					page: {
						pageNumbers: {
							start: 1,
							formatType: NumberFormat.DECIMAL,
						},
					},
				},
				footers: {
					default: new Footer({
						children: [
							new Paragraph({
								alignment: AlignmentType.LEFT,
								children: [
									new TextRun({
										children: [
											"Page ",
											PageNumber.CURRENT,
											" of ",
											PageNumber.TOTAL_PAGES,
										],
									}),
								],
							}),
						],
					}),
				},
				children: [
					new WordTable({
						rows: [
							new TableRow({
								children: columns.map(
									({ title }) =>
										new TableCell({
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: title,
															bold: true,
														}),
													],
													alignment: AlignmentType.CENTER,
												}),
											],
											verticalAlign: VerticalAlign.CENTER,
											margins: {
												top: convertInchesToTwip(0.03),
												bottom: convertInchesToTwip(0.03),
												right: convertInchesToTwip(0.1),
												left: convertInchesToTwip(0.1),
											},
										})
								),
							}),
							...rows.map((row) => {
								const rowData = columns.map(({ name }) => row[name] ?? "Nill");
								return new TableRow({
									children: rowData.map(
										(data) =>
											new TableCell({
												children: [
													new Paragraph({
														children: [new TextRun(data)],
													}),
												],
												verticalAlign: VerticalAlign.CENTER,
												margins: {
													top: convertInchesToTwip(0.03),
													bottom: convertInchesToTwip(0.03),
													right: convertInchesToTwip(0.1),
													left: convertInchesToTwip(0.1),
												},
											})
									),
								});
							}),
						],
					}),
				],
			},
		],
	});

	Packer.toBlob(doc).then((blob: any) => {
		saveAs(blob, "DataGrid.docx");
	});
};

const exportPDF = ({
	rows,
	columns,
	pageOrientation = "portrait",
}: {
	rows: any[];
	columns: Column[];
	pageOrientation?: "landscape" | "portrait";
}) => {
	const doc = new jsPDF(pageOrientation);

	const addFooters = (docs: any) => {
		const pageCount = docs.internal.getNumberOfPages();

		docs.setFont("helvetica", "italic");

		docs.setFontSize(8);
		for (let i = 1; i <= pageCount; i++) {
			docs.setPage(i);
			const time = moment()
				.locale("en-GB")
				.format("DD-MMM-YYYY hh:mm:ss A")
				.toString();
			docs.text(time, 5, 287, {
				align: "left",
			});
			docs.text(
				"Page " + String(i) + " of " + String(pageCount),
				docs.internal.pageSize.width / 2,
				287,
				{
					align: "center",
				}
			);
			docs.text("Admin", docs.internal.pageSize.width - 15, 287, {
				align: "left",
			});
		}
	};

	try {
		doc.text("Anvin", 5, 5, {
			align: "left",
		});

		// var imgData = 'data:image/jpg;base64,' + window.btoa('https://cdn.dribbble.com/users/5765756/screenshots/14312386/corporate_logo_design_-_logo_design_-_business_logos_4x.jpg');

		// doc.addImage(imgData, 5, 5, 100, 100);
		doc.text("Masters Logistics", doc.internal.pageSize.width / 2, 5, {
			align: "center",
		});
		doc.setFontSize(12);
		doc.text("Middle East", doc.internal.pageSize.width / 2, 11, {
			align: "center",
		});
		let [_, section, type, tableName] = window.location.pathname.split("/");
		console.log(section, type, tableName);
		tableName = `${tableName[0].toUpperCase() + tableName.slice(1)}`;
		doc.setFontSize(10);
		doc.text(`${tableName}`, doc.internal.pageSize.width / 2, 17, {
			align: "center",
		});

		autoTable(doc, {
			theme: "grid",
			body: rows,
			columns: columns.map(({ name, title }) => ({
				header: title,
				dataKey: name,
			})),
			headStyles: {
				fontStyle: "bold",
				textColor: "#3c77bd",
				fillColor: "#eaf3f9",
				valign: "middle",
				halign: "center",
				lineWidth: 0.1,
			},
			startY: 22,
			horizontalPageBreak: true,
			horizontalPageBreakRepeat: "RowIndex",
			// didDrawPage: (data) => {
			//   let footer = "Page " + doc.getNumberOfPages() + " of " + data.pageCount;
			//   doc.setFontSize(10);
			//   const pageSize = doc.internal.pageSize;
			//   const pageHeight = pageSize.height
			//     ? pageSize.height
			//     : pageSize.getHeight();
			//   doc.text(footer, data.settings.margin.left, pageHeight - 10);
			// },
			// margin: { top: 10 },
		});

		addFooters(doc);
		doc.save("a4.pdf");
	} catch (err) {
		console.log(err);
	}
};

const exportJSON = ({ rows, columns }: { rows: any[]; columns: Column[] }) => {
	const convertData = {
		header: columns.map(({ title }) => title),
		data: rows.map((row) =>
			Object.fromEntries(
				Object.keys(row).map((key) => [
					columns.find((column) => column.name === key)?.title,
					row[key],
				])
			)
		),
	};
	saveAs(
		new Blob([JSON.stringify(convertData)], { type: "text/plain" }),
		`DataGrid.json`
	);
};

const exportExcelCsvTxt = ({
	rows,
	columns,
	type,
}: {
	rows: any[];
	columns: Column[];
	type: "Excel" | "CSV" | "TXT";
}) => {
	const columnsWidth = Object.fromEntries(
		columns.map((column) => [
			column.name,
			Math.max(
				...[
					...rows.map((row) => String(row[column.name]).length),
					column.title?.length ?? 0,
				]
			) * 1.5,
		])
	);
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet("sheet");
	sheet.columns = columns.map(({ name, title }) => ({
		header: title,
		key: name,
		width: columnsWidth[name],
	}));
	sheet.addRows(rows);
	sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
	sheet.getRow(1).font = { bold: true };
	workbook[type === "Excel" ? "xlsx" : "csv"].writeBuffer().then((buffer) => {
		saveAs(
			new Blob([buffer], { type: "application/octet-stream" }),
			`DataGrid.${type === "Excel" ? "xlsx" : type === "CSV" ? "csv" : "txt"}`
		);
	});
};
