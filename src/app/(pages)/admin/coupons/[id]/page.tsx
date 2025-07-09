"use client";
import React from "react";
import CouponForm from "../partials/CouponForm";
import useCreateCouponController from "../create-coupon/create-coupon-controller";
import { CreateCoupon } from "@/types/coupons.type";


export default function SingleCouponPage() {
   const { onSubmit, isCreating } = useCreateCouponController();
   return (
      <div>
         <CouponForm onSubmit={async (data: CreateCoupon) => {
         }} loading={isCreating} />
      </div>
   );
}
