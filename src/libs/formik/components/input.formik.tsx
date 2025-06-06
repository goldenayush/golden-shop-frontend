import { Label, TextField } from "@/shared/ui";
import { TextFieldProps } from "@/shared/ui/TextField";
import { Field } from "formik";
import React from "react";
import ErrorMessageFormik from "./error-message.formik";

export function TextFieldFormik({ label, className, eleSize, ...props }: TextFieldProps) {
   return (
      <div>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <Field {...props} as={TextField} />
         {props?.name && <ErrorMessageFormik name={props?.name} />}
      </div>
   );
}
