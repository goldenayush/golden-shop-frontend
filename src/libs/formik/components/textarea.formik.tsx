import { Label, Textarea } from "@/shared/ui";
import { TextareaProps } from "@/shared/ui/Textarea";
import { ErrorMessage, Field } from "formik";
import React from "react";
import ErrorMessageFormik from "./error-message.formik";

export function TextareaFormik({ className, label, ...props }: TextareaProps) {
   return (
      <div>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <Field {...props} as={Textarea} />
         {props?.name && <ErrorMessageFormik name={props?.name} />}
      </div>
   );
}
