"use client";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GeneralFormSection, { generalFormSchemas } from "./form-parts/GeneralForm";
import DiscountType, { discountTypeSchemas } from "./form-parts/DiscountTypeForm";
import OrderConditions, { orderConditionsSchemas } from "./form-parts/OrderForm";
import CustomerForm, { customerSchemas } from "./form-parts/CustomerForm";
import * as Yup from "yup";
import { Card, PageHeader } from "@/shared/components";
import { Button } from "@/shared/ui";
import { CreateCoupon } from "@/types/coupons.type";


const defaultValues: CreateCoupon = {
   status: true,
   description: "",
   discountAmount: 0,
   freeShipping: false,
   discountType: "",
   coupon: "",
   targetProducts: { maxQty: 0, products: [] },
   condition: { orderQty: 0, orderTotal: 0, requiredProducts: [] },
   userCondition: { emails: "", groups: [], purchased: 0 },
   buyxGety: [],
   maxUsesTimePerCoupon: 0,
   maxUsesTimePerCustomer: 0,
   startDate: new Date().toISOString().split("T")[0],
   endDate: new Date().toISOString().split("T")[0],
};
type Props = {
   onSubmit: (data: any) => Promise<void>;
   loading?: boolean;
   patchValues?: CreateCoupon | null;
};
export default function CouponForm({ onSubmit, loading, patchValues }: Props) {
   const [initialValues, setInitialValues] = useState<CreateCoupon>(defaultValues);
   useEffect(() => {
      if (patchValues) {
         setInitialValues({
            status: patchValues.status,
            description: patchValues.description,
            discountAmount: patchValues.discountAmount,
            freeShipping: patchValues.freeShipping,
            discountType: patchValues.discountType,
            coupon: patchValues.coupon,
            targetProducts: patchValues.targetProducts,
            condition: patchValues.condition,
            userCondition: patchValues.userCondition,
            buyxGety: patchValues.buyxGety,
            maxUsesTimePerCoupon: patchValues.maxUsesTimePerCoupon,
            maxUsesTimePerCustomer: patchValues.maxUsesTimePerCustomer,
            startDate: patchValues.startDate ? new Date(patchValues.startDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            endDate: patchValues.endDate ? new Date(patchValues.endDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
         });
      }
      return () => { }
   }, [patchValues]);
   return (
      <div className="p-7">
         <PageHeader backLink="/admin/coupons" heading={patchValues ? "Update Coupon" : "Create a new coupon"} />
         <Formik
            enableReinitialize={Boolean(patchValues)}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={couponValidationSchema}
         >
            {(formik) => (
               <Form>
                  <Card heading="General" className="p-5 grid grid-cols-12 gap-3">
                     <GeneralFormSection formik={formik} />
                  </Card>
                  <Card className="p-5 mt-3" heading="Discount Type">
                     <DiscountType formik={formik} />
                  </Card>
                  <div className="grid grid-cols-12 gap-3 mt-3">
                     <Card className="col-span-12 lg:col-span-8 p-5 mt-3" heading="Order conditions">
                        <OrderConditions formik={formik} />
                     </Card>
                     <Card className="col-span-12 lg:col-span-4 p-5 mt-3" heading="Customer conditions">
                        <CustomerForm formik={formik} />
                     </Card>
                  </div>
                  <hr className="my-5 border-t-1 border-[#e1e3e5]" />
                  <div className="flex justify-between items-center">
                     <div>
                        <Button type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer">
                           Cancel
                        </Button>
                     </div>
                     <div>
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                           Save
                        </Button>
                     </div>
                  </div>
               </Form>
            )}
         </Formik>
      </div >
   );
}
const couponValidationSchema = Yup.object().shape({
   // General fields
   coupon: Yup.string().required("Coupon code is required"),
   description: Yup.string().required("Description is required"),
   status: Yup.boolean().required("Status is required"),
   discountAmount: Yup.number().required("Discount amount is required"),
   startDate: Yup.date().required("Start date is required"),
   endDate: Yup.date().min(Yup.ref("startDate"), "End date cannot be before start date").required("End date is required"),
   freeShipping: Yup.boolean().required("freeShipping is required"),
   // Discount type fields
   discountType: Yup.string().required("Discount type is required"),

   // Order conditions
   condition: Yup.object().shape({
      orderQty: Yup.number().required("Order quantity is required"),
      orderTotal: Yup.number().required("Order total is required"),
      requiredProducts: Yup.array(),
   }),
   // Customer conditions
   userCondition: Yup.object().shape({
      emails: Yup.string().required("Email is required"),
      groups: Yup.array().required("Groups are required"),
      purchased: Yup.number().required("Purchased amount is required"),
   }),
   buyxGety: Yup.array().of(
      Yup.object().shape({
         buyQty: Yup.number()
            .typeError("Buy Qty must be a number"),

         getQty: Yup.number()
            .typeError("Get Qty must be a number"),
         maxY: Yup.number()
            .typeError("Max Y must be a number"),

         discount: Yup.number()
            .typeError("Discount must be a number")
      })
   ),
   maxUsesTimePerCoupon: Yup.number(),
   maxUsesTimePerCustomer: Yup.number(),
});