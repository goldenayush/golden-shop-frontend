import { Label, Textarea } from "@/shared/ui";
import { TextareaProps } from "@/shared/ui/Textarea";
import { ErrorMessage, Field } from "formik";
import React from "react";

export function TextareaFormik({ className, label, ...props }: TextareaProps) {
   return (
      <div>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <Field {...props} as={Textarea} />
         {props?.name && <ErrorMessage name={props?.name} component="small" className="text-red-500 text-xs" />}
      </div>
   );
}
