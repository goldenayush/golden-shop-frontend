import React from "react";
import GridDisplay from "../../../components/GridDisplay";
import { Switch, TextField } from "@/shared/ui";
import { Field, useFormikContext } from "formik";
import { TextFieldFormik } from "@/libs/formik";

export default function CodForm() {
   const formik = useFormikContext();
   const values: any = formik?.values;
   return (
      <>
         <GridDisplay //
            title="Enable?"
            content={
               <Switch //
                  eleSize="sm"
                  checked={values?.cod?.codPaymentStatus === "true"}
                  onChange={(e) => {
                     formik.setFieldValue("cod.codPaymentStatus", JSON.stringify(e.target.checked));
                  }}
               />
            }
            hr
         />
         <GridDisplay //
            title="Dislay Name"
            content={<TextFieldFormik placeholder="Dislay Name" name="cod.codDislayName" />}
         />
      </>
   );
}
