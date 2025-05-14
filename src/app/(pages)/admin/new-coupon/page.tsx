"use client";
import { Card } from "@/shared/components";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import useNewCouponController from "./new-coupon.controller";
import { Form, Formik } from "formik";
import OrderConditions, { orderConditionsSchemas } from "./partials/OrderForm";
import { Button } from "@/shared/ui";
import * as Yup from "yup";
import DiscountType, { discountTypeSchemas } from "./partials/DiscountTypeForm";
import GeneralFormSection, { generalFormSchemas } from "./partials/GeneralForm";
import CustomerForm, { customerSchemas } from "./partials/CustomerForm";

export default function NewCouponPage() {
   const ctrl = useNewCouponController();
   return (
      <div className="p-7">
         <div className="flex items-center gap-3 mb-3">
            <button
               type="button"
               className="border p-2 rounded-sm cursor-pointer border-[#8c9196]
            text-[#6c7277]">
               <IoArrowBack size={22} />
            </button>
            <h2 className="text-[20px] font-semibold">Create a new coupon</h2>
         </div>
         <Formik
            initialValues={ctrl.initialValues}
            onSubmit={ctrl.onSubmit}
            validationSchema={Yup.object().shape({
               general: generalFormSchemas,
               discount_type: discountTypeSchemas,
               order_conditions: orderConditionsSchemas,
               customer_conditions: customerSchemas,
            })}>
            {(formik) => (
               <Form>
                  <Card heading="General" className="p-5 grid grid-cols-12 gap-3">
                     <GeneralFormSection formik={formik} />
                  </Card>
                  <Card className="p-5 mt-3" heading="Discount Type">
                     <DiscountType formik={formik} />
                  </Card>
                  <div className="grid grid-cols-12 gap-3 mt-3">
                     <Card className="col-span-8 p-5 mt-3" heading="Order conditions">
                        <OrderConditions formik={formik} />
                     </Card>
                     <Card className="col-span-4 p-5 mt-3" heading="Customer conditions">
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
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                           Save
                        </Button>
                     </div>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
}
