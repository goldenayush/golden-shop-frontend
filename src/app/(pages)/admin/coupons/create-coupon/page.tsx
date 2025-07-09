"use client";
import React from "react";
import CouponForm from "../partials/CouponForm";
import useCreateCouponController from "./create-coupon-controller";
export default function CreateCouponPage() {

   const { onSubmit, isCreating } = useCreateCouponController();


   return (
      <div>
         <CouponForm onSubmit={onSubmit} loading={isCreating} />

      </div>
   );
}
