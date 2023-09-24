import * as Yup from "yup";

export const remValidationSchema = Yup.object().shape({
  start_date: Yup.date().required("Start date is required"),
  expiry_date: Yup.date()
    .required("Expiry date is required")
    .when("start_date", (start_date, schema) => {
      if (start_date) {
        const dayAfter = new Date(start_date.getTime() + 86400000);

        return schema.min(dayAfter, "End date has to be after than start date");
      }

      return schema;
    }),

  category: Yup.string().required("Category is Required"),
  sub_category: Yup.string().required("Sub Category is Required"),
  added_by: Yup.string().required("Employee Name is Required"),
  type: Yup.string().required("Permission Type is Required"),
  req_alarm: Yup.number()
    .min(1, "Number of days must be at least 1 day")
    .required("Number of days is Required"),
});

export const qualityValidationSchema = Yup.object().shape({
  exl_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  exl_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  good_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  good_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  normal_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  normal_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  weak_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  weak_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  very_weak_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  very_weak_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  field_name: Yup.string()
    .min(1, "Field Name Must Be At least 2 characters")
    .required("Field Name is Required"),
  db: Yup.string().required("Database is Required"),
});
export const coverageValidationSchema = Yup.object().shape({
  exl_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  exl_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  good_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  good_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  normal_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  normal_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  weak_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  weak_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  very_weak_start: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  very_weak_end: Yup.number()
    .typeError("Value Must Be a Number")
    .required("Value is Required"),
  field_name: Yup.string()
    .min(1, "Field Name Must Be At least 2 characters")
    .required("Field Name is Required"),
  db: Yup.string().required("Database is Required"),
});

// get current date and format it to YYYY-MM-DD and add trailing zero to month and day
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  return `${year}-${monthStr}-${dayStr}`;
};
