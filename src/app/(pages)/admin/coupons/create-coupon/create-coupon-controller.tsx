"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCouponsService } from "@/services/admin/admin-coupons.service";
import { useRouter } from "next/navigation";

export default function useCreateCouponController() {
  const dispatch = useAppDispatch();
  const { createCoupon } = useAppSelector((state) => state.admin.coupons);
  const router = useRouter();

  const onSubmit = async (body: any) => {
    try {
      let payload = {
        ...body,
        discountAmount: Number(body.discountAmount),
        condition: {
          ...body.condition,
          orderQty: Number(body.condition?.orderQty),
          orderTotal: Number(body.condition?.orderTotal),
          requiredProducts: body.condition?.requiredProducts?.map((item: any) => ({
            ...item,
            value: item.value.map((element: any) =>
              element.id,
            ),
          })),
        },
        startDate: new Date(body.startDate).toISOString(),
        endDate: new Date(body.endDate).toISOString(),
      };
      await dispatch(adminCouponsService.createCoupon.api(payload)).unwrap();
      router.replace("/admin/coupons");
    } catch (error) {
      return;
    }
  };

  return {
    isCreating: createCoupon.isLoading,
    onSubmit,
  };
}
