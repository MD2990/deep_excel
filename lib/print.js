import toPDF from "@lib/pdf";
import { errorAlert } from "@components/Lib/Alerts";

export default function printPdf({
  DB,
  titles,
  title,
  style = "l",
  leftTitle,
}) {
  try {
    const keys = titles.map((k) => k.value);
    const rows = DB.map((values, i) => {
      const index = i + 1;
      const data = {
        ...values,
        index,
      };
      return data;
    });

    const data = [];
    titles.map(({ label }, index) => {
      data.push({
        title: label,
        key: keys[index],
      });
      return data;
    });

    const columns = [{ title: "No.", key: "index" }, ...data];
    return toPDF({
      rows,
      columns,
      style,

      title,
      leftTitle,
    });
  } catch (e) {
    errorAlert(e.message);
  }
}
