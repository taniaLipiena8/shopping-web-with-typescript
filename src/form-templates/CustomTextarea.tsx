import { Field,  useField } from "formik";
import { CustomFormProps } from "./IProps";

const CustomTextarea = ({ label, ...props }: CustomFormProps) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label>{label}</label>
            <Field as='textarea' {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""} />

            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </>
    )
}

export default CustomTextarea