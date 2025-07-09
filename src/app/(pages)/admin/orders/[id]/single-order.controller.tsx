import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminOrderService } from "@/services/admin/admin-order.service";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

export default function singleOrderController() {
   const dispatch = useAppDispatch();
   const { id } = useParams<{ id: string }>();
   const { getAdminSingleOrders } = useAppSelector((state) => state.admin.adminOrder);

   const router = useRouter();

   // const onSubmit = async (body: any) => {
   //    try {
   //       await dispatch(adminOrderService.updateProduct.api(body)).unwrap();
   //    } catch (error) {
   //       return;
   //    }
   // };

   useEffect(() => {
      if (id) {
         dispatch(adminOrderService.getAdminSingleOrders.api(id));
      }
      return () => { };
   }, [id]);

   const cancelOrder = useCallback(() => {
      if (id) {
         dispatch(adminOrderService.cancelAdminOrder.api(id));
      }
   }, [id, dispatch]);

   return {
      isfetching: getAdminSingleOrders.isLoading,
      orderById: getAdminSingleOrders.data,
      cancelOrder,
      // onSubmit,
      // isUpdating: updateProduct.isLoading,
   };
}
