import { ErrorMessage, Field, useField } from "formik";
import { CustomFormProps } from "./IProps";

const CustomSelect = ({ label, ...props }: CustomFormProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label}</label>
      <Field
        as="select"
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />

      <ErrorMessage name={field.name} className="error">{(msg) => <div className="error">{msg}</div>}</ErrorMessage>
    </>
  );
};

export default CustomSelect;
