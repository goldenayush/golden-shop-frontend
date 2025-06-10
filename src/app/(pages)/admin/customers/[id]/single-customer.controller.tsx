import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCustomerService } from "@/services/admin/admin-customer.service";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useSingleCustomerController() {
   const dispatch = useAppDispatch();
   const { getSingleCustomer } = useAppSelector((state) => state.admin.adminCustomer);
   const { id } = useParams<{ id: string }>();

   useEffect(() => {
      if (id) {
         dispatch(adminCustomerService.getSingleCustomer.api(id));
      }
      return () => {};
   }, [id]);

   return { meOrders: [], getSingleCustomer };
}
