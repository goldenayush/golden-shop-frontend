import { Checkbox, DatePicker, Switch, Textarea, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { ICouponfields } from "../CouponForm";

type Props = {
   formik: FormikProps<ICouponfields>;
};

export default function GeneralFormSection({ formik }: Props) {
   return (
      <>
         <div className="col-span-12">
            <Field //
               as={TextField}
               label="Coupon code"
               placeholder="Enter coupon code"
               name="general.coupon_code"
            />
            <ErrorMessage component="small" className="field-error" name="general.coupon_code" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Textarea}
               rows={4}
               label="Description"
               placeholder="Description"
               name="general.description"
            />
            <ErrorMessage component="small" className="field-error" name="general.description" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Switch}
               eleSize="sm"
               label="Status"
               name="general.status"
               checked={formik?.values?.general?.status}
            />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={TextField}
               label="Discount amount"
               placeholder="Discount amount"
               name="general.discount_amount"
            />
            <ErrorMessage component="small" className="field-error" name="general.discount_amount" />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={DatePicker}
               label="Start date"
               name="general.start_date"
            />
            <ErrorMessage component="small" className="field-error" name="general.start_date" />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={DatePicker}
               label="End date"
               name="general.end_date"
            />
            <ErrorMessage component="small" className="field-error" name="general.end_date" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Checkbox}
               name="general.isFree"
               label="Free shipping?"
               checked={formik?.values?.general?.isFree}
               id="isFree"
            />
         </div>
      </>
   );
}

export const generalFormSchemas = Yup.object().shape({
   coupon_code: Yup.string().required("Coupon code is required"),
   description: Yup.string().required("Description is required"),
   status: Yup.boolean().required("Status is required"),
   discount_amount: Yup.number().required("Discount amount is required"),
   start_date: Yup.date().required("Start date is required"),
   end_date: Yup.date().min(Yup.ref("start_date"), "End date cannot be before start date").required("End date is required"),
   isFree: Yup.boolean().required("isFree is required"),
});
