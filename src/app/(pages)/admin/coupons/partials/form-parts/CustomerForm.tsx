import { Select, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FormikProps } from "formik";
import * as Yup from "yup";
import React from "react";
import { CreateCoupon } from "@/types/coupons.type";
type Props = {
   formik: FormikProps<CreateCoupon>;
};

export default function CustomerForm({ formik }: Props) {
   return (
      <div>
         <div className="mb-3">
            <Field //
               as={TextField}
               name="userCondition.emails"
               label="Customer Email(s)"
               placeholder="Enter Customer Email(s)"
            />
            <ErrorMessage //
               name="userCondition.emails"
               component="small"
               className="field-error"
            />
         </div>
         <div className="mb-3">
            <Field //
               as={Select}
               name="userCondition.groups"
               label="Customer Groups"
               options={[
                  { label: "Group 1", value: "1" },
                  { label: "Group 2", value: "2" },
               ]}
               multi
            />
            <ErrorMessage //
               name="userCondition.groups"
               component="small"
               className="field-error"
            />
         </div>
         <div>
            <Field //
               as={TextField}
               label="Purchased Amount"
               name="userCondition.purchased"
               placeholder="Enter Purchased Amount"
            />
            <ErrorMessage //
               name="userCondition.purchased"
               component="small"
               className="field-error"
            />
         </div>
      </div>
   );
}

export const customerSchemas = Yup.object().shape({
   emails: Yup.string().required("Email is required"),
   groups: Yup.array().of(Yup.string()).required("Groups are required"),
   purchased: Yup.number().required("Purchased amount is required"),
});
