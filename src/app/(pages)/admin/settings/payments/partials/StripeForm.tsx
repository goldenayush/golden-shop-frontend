import { TextFieldFormik } from "@/libs/formik";
import { Card } from "@/shared/components";
import { Radio, Switch } from "@/shared/ui";
import { Field, useFormikContext } from "formik";
import React from "react";
import GridDisplay from "../../../components/GridDisplay";

export default function StripeForm() {
   const formik = useFormikContext();
   const values: any = formik?.values;
   return (
      <>
         <GridDisplay //
            title="Enable?"
            content={
               <Switch
                  eleSize="sm"
                  checked={values?.stripe?.stripePaymentStatus === "true"}
                  onChange={(e) => {
                     formik.setFieldValue("stripe.stripePaymentStatus", JSON.stringify(e.target.checked));
                  }}
               />
            }
            hr
         />
         <GridDisplay //
            title="Dislay Name"
            content={
               <TextFieldFormik //
                  name="stripe.stripeDislayName"
                  placeholder="Dislay Name"
               />
            }
            hr
         />
         <GridDisplay //
            title="Publishable Key"
            content={
               <TextFieldFormik //
                  name="stripe.stripePublishableKey"
                  placeholder="Publishable Key"
               />
            }
            hr
         />
         <GridDisplay //
            title="Secret Key"
            content={
               <TextFieldFormik //
                  name="stripe.stripeSecretKey"
                  placeholder="Secret Key"
               />
            }
            hr
         />
         <GridDisplay //
            title="Webhook Secret Key"
            content={
               <TextFieldFormik
                  name="stripe.stripeWebhookSecretKey"
                  placeholder="Secret Key"
                  instruction={
                     <span>
                        Your webhook url should be: <br /> https://yourdomain.com/api/stripe/webhook
                     </span>
                  }
               />
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
                     name="stripe.stripePaymentMode"
                     value="authorizeOnly"
                     checked={values?.stripe?.stripePaymentMode === "authorizeOnly"}
                  />
                  <div className="mt-2" />
                  <Field
                     as={Radio} //
                     label="Capture"
                     name="stripe.stripePaymentMode"
                     value="capture"
                     checked={values?.stripe?.stripePaymentMode === "capture"}
                  />
               </>
            }
         />
      </>
   );
}
