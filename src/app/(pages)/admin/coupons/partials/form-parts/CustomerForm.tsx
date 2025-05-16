import { Select, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FormikProps } from "formik";
import * as Yup from "yup";
import React from "react";
import { ICouponfields } from "../CouponForm";

type Props = {
   formik: FormikProps<ICouponfields>;
};

export default function CustomerForm({ formik }: Props) {
   return (
      <div>
         <div className="mb-3">
            <Field //
               as={Select}
               name="customer_conditions.customer_id"
               placeholder="Select Customer"
               options={[
                  { label: "Customer 1", value: "1" },
                  { label: "Customer 2", value: "2" },
               ]}
            />
            <ErrorMessage //
               name="customer_conditions.customer_id"
               component="small"
               className="field-error"
            />
         </div>
         <div className="mb-3">
            <Field //
               as={TextField}
               name="customer_conditions.email"
               label="Customer email (empty for all)"
               placeholder="Enter Customer Email"
            />
            <ErrorMessage //
               name="customer_conditions.email"
               component="small"
               className="field-error"
            />
         </div>
         <div>
            <Field //
               as={TextField}
               label="Customer's purchase"
               name="customer_conditions.purchase_amount"
               placeholder="Enter Purchase Amount"
            />
            <ErrorMessage //
               name="customer_conditions.purchase_amount"
               component="small"
               className="field-error"
            />
         </div>
      </div>
   );
}

export const customerSchemas = Yup.object().shape({
   customer_id: Yup.string().required("customer_id is required"),
   email: Yup.string().required("email is required"),
   purchase_amount: Yup.string().required("purchase_amount is required"),
});
