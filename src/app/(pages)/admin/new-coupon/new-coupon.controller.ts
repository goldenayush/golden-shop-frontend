import React, { useState } from "react";

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

export default function useNewCouponController() {
   const [initialValues, setInitialValues] = useState(couponfields);
   const onSubmit = (value: any) => {
      console.log(value);
   };
   return { onSubmit, initialValues };
}
