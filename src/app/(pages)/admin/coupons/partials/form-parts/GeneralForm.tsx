import { Checkbox, DatePicker, Switch, Textarea, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { CreateCoupon } from "@/types/coupons.type";

type Props = {
   formik: FormikProps<CreateCoupon>;
};

export default function GeneralFormSection({ formik }: Props) {
   return (
      <>
         <div className="col-span-12">
            <Field //
               as={TextField}
               label="Coupon code"
               placeholder="Enter coupon code"
               name="coupon"
            />
            <ErrorMessage component="small" className="field-error" name="coupon" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Textarea}
               rows={4}
               label="Description"
               placeholder="Description"
               name="description"
            />
            <ErrorMessage component="small" className="field-error" name="description" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Switch}
               eleSize="sm"
               label="Status"
               name="status"
               checked={formik?.values?.status}
            />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={TextField}
               type="number"
               label="Discount amount"
               placeholder="Discount amount"
               name="discountAmount"
            />
            <ErrorMessage component="small" className="field-error" name="discountAmount" />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={DatePicker}
               label="Start date"
               name="startDate"
            />
            <ErrorMessage component="small" className="field-error" name="startDate" />
         </div>
         <div className="col-span-12 md:col-span-4">
            <Field //
               as={DatePicker}
               label="End date"
               name="endDate"
            />
            <ErrorMessage component="small" className="field-error" name="endDate" />
         </div>
         <div className="col-span-12">
            <Field //
               as={Checkbox}
               name="freeShipping"
               label="Free shipping?"
               checked={formik?.values?.freeShipping}
               id="isFree"
            />
         </div>
      </>
   );
}

export const generalFormSchemas = Yup.object().shape({
   coupon: Yup.string().required("Coupon code is required"),
   description: Yup.string().required("Description is required"),
   status: Yup.boolean().required("Status is required"),
   discountAmount: Yup.number().required("Discount amount is required"),
   startDate: Yup.date().required("Start date is required"),
   endDate: Yup.date().min(Yup.ref("startDate"), "End date cannot be before start date").required("End date is required"),
   freeShipping: Yup.boolean().required("freeShipping is required"),
});
