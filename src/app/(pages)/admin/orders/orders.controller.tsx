import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminOrderService } from "@/services/admin/admin-order.service";
import { useDebounce } from "@/shared/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useOrdersController() {
   const dispatch = useAppDispatch();
   const { getOrders } = useAppSelector((state) => state.admin.adminOrder);

   const router = useRouter();
   const searchParams = useSearchParams();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminOrderService.getOrders.api(`search=${value}`));
         console.log(value);
      },
   });

   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };


   useEffect(() => {
      dispatch(adminOrderService.getOrders.api());
      return () => { };
   }, []);

   return { debounce, setParam, orders: getOrders.data, isLoading: getOrders.isLoading }
}