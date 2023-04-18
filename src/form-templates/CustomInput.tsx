import { ErrorMessage, Field, useField } from "formik";
import { CustomFormProps } from "./IProps";

const CustomInput = ({ label, ...props }: CustomFormProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label}</label>
      <Field
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      <ErrorMessage name={field.name} className="error">{msg => <div className="error">{msg}</div>}</ErrorMessage>
    </>
  );
};

export default CustomInput;
