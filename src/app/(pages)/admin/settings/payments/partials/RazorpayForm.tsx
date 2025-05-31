import React from "react";
import GridDisplay from "../../../components/GridDisplay";
import { Switch, TextField } from "@/shared/ui";
import { Field, useFormikContext } from "formik";
import { TextFieldFormik } from "@/libs/formik";

/*

 razorpayPaymentStatus: true,
         razorpayDislayName: "",
         razorpayPublishableKey: "",
         razorpaySecretKey: "",
         razorpayEnvironment: "",
         razorpayWebhookSecretKey: "",
*/
export default function RazorpayForm() {
   const formik = useFormikContext();
   const values: any = formik?.values;
   return (
      <>
         <GridDisplay //
            title="Enable?"
            content={
               <Switch
                  eleSize="sm"
                  checked={values?.razorpay?.razorpayPaymentStatus === "true"}
                  onChange={(e) => {
                     formik.setFieldValue("razorpay.razorpayPaymentStatus", JSON.stringify(e.target.checked));
                  }}
               />
            }
            hr
         />
         <GridDisplay //
            title="Dislay Name"
            content={
               <TextFieldFormik //
                  name="razorpay.razorpayDislayName"
                  placeholder="Dislay Name"
               />
            }
            hr
         />
         <GridDisplay //
            title="Publishable Key"
            content={
               <TextFieldFormik //
                  name="razorpay.razorpayPublishableKey"
                  placeholder="Publishable Key"
               />
            }
            hr
         />
         <GridDisplay //
            title="Secret Key"
            content={
               <TextFieldFormik //
                  name="razorpay.razorpaySecretKey"
                  placeholder="Secret Key"
               />
            }
            hr
         />
         <GridDisplay //
            title="Webhook Secret Key"
            content={
               <TextFieldFormik //
                  name="razorpay.razorpayWebhookSecretKey"
                  placeholder="Webhook Secret Key"
               />
            }
         />
      </>
   );
}
