/* eslint-disable no-unused-vars */
import jsPDF from "jspdf";
import { getDateTime } from "@lib/helpers";
import font from "@public/Amiri-Regular-normal";
import autoTable from "jspdf-autotable";

export default function toPDF({
  rows,
  columns,
  title,
  style = "p",
  leftTitle,
}) {
  var doc = new jsPDF(style, "pt"); // l or p

  // This is for adding arabic font support
  doc.addFileToVFS("Amiri.ttf", font);
  doc.addFont("Amiri.ttf", "Amiri", "normal");
  doc.setFont("Amiri");
  const width = doc.internal.pageSize.getWidth();
  const coordinates = width / 2;
  const rightCoordinates = width - 45;
  // get left coordinates
  const leftCoordinates = width / 14;

  const totalPagesExp = "{total_pages_count_string}";
  let pageHeight =
    doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  let pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.autoTable({
    columns: columns,
    body: rows,
    headStyles: {
      halign: "center",
      fillColor: "#c3e5eb",
      textColor: "#333333",
      fontStyle: "Arial",
      font: "Amiri",
      /* font: "times", */
    },

    styles: {
      fillStyle: "F", // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
      minCellHeight: 20,
      // 'auto', 'wrap' or a number },
      valign: "middle", // top, middle, bottom
      overflow: "linebreak", // visible, hidden, ellipsize or linebreak
      cellPadding: 4,
      fontSize: 9,
      font: "Amiri", // helvetica, times, courier
      lineColor: 200,
      lineWidth: 0.1,
      halign: "center",
      cellWidth: "auto",

      fontStyle: "normal", // normal, bold, italic, bolditalic
    },
    didDrawPage: (data) => {
      if (doc.internal.getNumberOfPages() === 1) {
        //center Title

        doc.text(title, coordinates, 30, "center");
        // eslint-disable-next-line no-unused-expressions
        leftTitle &&
          doc.text(leftTitle, leftCoordinates, 35, "left", doc.setFontSize(7));

        // if style is landscape then change the x axis

        doc.text(
          getDateTime(),
          rightCoordinates,
          35,
          "right",
          doc.setFontSize(8)
        );
      }

      let footerStr = "Page " + doc.internal.getNumberOfPages();
      if (typeof doc.putTotalPages === "function") {
        footerStr = footerStr + " of " + totalPagesExp;
      }
      doc.setFontSize(8);

      doc.text(
        footerStr,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    },
  });
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save("table.pdf");
}
