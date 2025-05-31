import React from "react";
import GridDisplay from "../../../components/GridDisplay";
import { Radio, Switch, TextField } from "@/shared/ui";
import { Field, Formik, useFormikContext } from "formik";
import { TextFieldFormik } from "@/libs/formik";

export default function PaypalForm() {
   const formik = useFormikContext();
   const values: any = formik?.values;
   return (
      <>
         <GridDisplay //
            title="Enable?"
            content={
               <Switch //
                  eleSize="sm"
                  checked={values?.paypal?.paypalPaymentStatus === "true"}
                  onChange={(e) => {
                     formik.setFieldValue("paypal.paypalPaymentStatus", JSON.stringify(e.target.checked));
                  }}
               />
            }
            hr
         />
         <GridDisplay //
            title="Dislay Name"
            content={
               <TextFieldFormik //
                  name="paypal.paypalDislayName"
                  placeholder="Dislay Name"
               />
            }
            hr
         />
         <GridDisplay //
            title="Client ID"
            content={
               <TextFieldFormik //
                  name="paypal.paypalClientId"
                  placeholder="Client ID"
               />
            }
            hr
         />
         <GridDisplay //
            title="Client Secret"
            content={
               <TextFieldFormik //
                  name="paypal.paypalClientSecret"
                  placeholder="Secret Key"
               />
            }
            hr
         />
         <GridDisplay //
            title="Environment"
            content={
               <>
                  <Field
                     as={Radio} //
                     label="Sandbox"
                     name="paypal.paypalEnvironment"
                     value="sandbox"
                     checked={values?.paypal.paypalEnvironment === "sandbox"}
                  />
                  <div className="mt-2" />
                  <Field
                     as={Radio} //
                     label="Live"
                     name="paypal.paypalEnvironment"
                     value="live"
                     checked={values?.paypal?.paypalEnvironment === "live"}
                  />
               </>
            }
            hr
         />
         <GridDisplay //
            title="Payment mode"
            content={
               <>
                  <Field
                     as={Radio} //
                     label="Authorize only"
                     name="paypal.paypalPaymentMode"
                     value="authorizeOnly"
                     checked={values?.paypal.paypalPaymentMode === "authorizeOnly"}
                  />
                  <div className="mt-2" />
                  <Field
                     as={Radio} //
                     label="Capture"
                     name="paypal.paypalPaymentMode"
                     value="capture"
                     checked={values?.paypal?.paypalPaymentMode === "capture"}
                  />
               </>
            }
            hr
         />
      </>
   );
}
