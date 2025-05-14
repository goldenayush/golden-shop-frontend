import { Label, TextField } from "@/shared/ui";
import { TextFieldProps } from "@/shared/ui/TextField";
import { ErrorMessage, Field } from "formik";
import React from "react";

export function TextFieldFormik({ label, className, eleSize, ...props }: TextFieldProps) {
   return (
      <div>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <Field {...props} as={TextField} />
         {props?.name && <ErrorMessage name={props?.name} component="small" className="text-red-500 text-xs" />}
      </div>
   );
}
