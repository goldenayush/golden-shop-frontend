"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import GeneralFormSection, { generalFormSchemas } from "./form-parts/GeneralForm";
import DiscountType, { discountTypeSchemas } from "./form-parts/DiscountTypeForm";
import OrderConditions, { orderConditionsSchemas } from "./form-parts/OrderForm";
import CustomerForm, { customerSchemas } from "./form-parts/CustomerForm";
import * as Yup from "yup";
import { Card } from "@/shared/components";
import { Button } from "@/shared/ui";

const couponfields = {
   general: {
      coupon_code: "2025HOLI",
      description: "Use code 2025HOLI at checkout and enjoy FLAT 20% OFF on all lenses, frames, and goggles.",
      status: true,
      discount_amount: 1500,
      start_date: new Date(),
      end_date: new Date(),
      isFree: true,
   },
   discount_type: {
      name: "3",
      target_products: "12",
      list: [],
   },
   order_conditions: {
      min_purchase_amount: 1500,
      min_purchase_qty: 5,
      list: [],
   },
   customer_conditions: {
      customer_id: "2",
      email: "user@gmail.com",
      purchase_amount: "1500",
   },
};

export type ICouponfields = typeof couponfields;
export default function CouponForm() {
   const [initialValues, setInitialValues] = useState(couponfields);
   const onSubmit = (value: any) => {
      console.log(value);
   };
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
            initialValues={initialValues}
            onSubmit={onSubmit}
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
