import React from "react";
import GridDisplay from "../../../components/GridDisplay";
import { Switch, TextField } from "@/shared/ui";
import { TextFieldFormik } from "@/libs/formik";
import { Field, useFormikContext } from "formik";

export default function PhoneForm() {
   const formik = useFormikContext();
   const values: any = formik?.values;

   return (
      <>
         <GridDisplay //
            title="Enable?"
            content={
               <Switch
                  eleSize="sm"
                  checked={values?.phonepe?.phonepePaymentStatus === "true"}
                  onChange={(e) => {
                     formik.setFieldValue("phonepe.phonepePaymentStatus", JSON.stringify(e.target.checked));
                  }}
               />
            }
            hr
         />
         <GridDisplay //
            title="Dislay Name"
            content={<TextFieldFormik placeholder="Dislay Name" name="phonepe.phonepeDislayName" />}
            hr
         />
         <GridDisplay //
            title="Key"
            content={<TextFieldFormik placeholder="Key" name="phonepe.phonepeKey" />}
            hr
         />
         <GridDisplay //
            title="Merchant Id"
            content={<TextFieldFormik placeholder="Merchant Id" name="phonepe.phonepeMerchantId" />}
            hr
         />

         <GridDisplay //
            title="Key Id"
            content={<TextFieldFormik placeholder="Key Id" name="phonepe.phonepeKeyId" />}
         />
      </>
   );
}
