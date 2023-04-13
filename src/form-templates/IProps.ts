import { FieldHookConfig } from "formik";

export type CustomFormProps = {
  label: string;
} & FieldHookConfig<any>;
