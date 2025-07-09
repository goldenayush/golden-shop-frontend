import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminOrderService } from "@/services/admin/admin-order.service";
import { useDebounce } from "@/shared/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useOrdersController() {
   const dispatch = useAppDispatch();
   const { getOrders } = useAppSelector((state) => state.admin.adminOrder);
   const orders = getOrders.data || [];
   const pagination = getOrders.pagination;

   const router = useRouter();
   const searchParams = useSearchParams();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminOrderService.getOrders.api(`search=${value}`))
      },
   });

   // const setParam = (queryObj: any) => {
   //    const params = new URLSearchParams(searchParams.toString());
   //    for (const key in queryObj) {
   //       params.set(key, queryObj[key]);
   //    }
   //    router.push("?" + params.toString());
   // };
   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         if (queryObj[key] !== undefined && queryObj[key] !== null) {
            params.set(key, queryObj[key]);
         }
      }
      router.push("?" + params.toString());
   };

   const onUpdateOrderStatus = async (ids: string[], status: string) => {
      // await dispatch(adminOrderService.updateAdminOrderStatus.api(JSON.stringify({ status, ids })));
      await dispatch(adminOrderService.updateAdminOrderStatus.api({ status, ids }));

   };

   useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("limit")) params.set("limit", "5");
      dispatch(adminOrderService.getOrders.api(params.toString()));
      return () => { };
   }, [searchParams]);

   return { debounce, setParam, orders, isLoading: getOrders.isLoading, pagination, onUpdateOrderStatus }
}