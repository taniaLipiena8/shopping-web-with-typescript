import { Field,  useField } from "formik";
import { CustomFormProps } from "./IProps";

const CustomSelect = ({ label, ...props }: CustomFormProps) => {
    const [field, meta] = useField(props)
  return (
    <>
            <label>{label}</label>
            <Field as="select" {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""} />

            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </>
  )
}

export default CustomSelect