import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminOrderService } from "@/services/admin/admin-order.service";
import { useEffect } from "react";

export default function useOrdersController() {
   const dispatch = useAppDispatch();
   const { getAdminOrders } = useAppSelector((state) => state.admin.adminOrder);
   console.log("getAdminOrders....", getAdminOrders.data);

   useEffect(() => {
      dispatch(adminOrderService.getAdminOrders.api());
      return () => { };
   }, []);

   return { orders: getAdminOrders.data, isLoading: getAdminOrders.isLoading };
}
