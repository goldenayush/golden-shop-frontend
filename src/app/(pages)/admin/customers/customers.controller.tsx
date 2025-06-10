import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCustomerService } from "@/services/admin/admin-customer.service";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useCustomersController() {
   const dispatch = useAppDispatch();
   const { getCustomers, updateCustomerStatus } = useAppSelector((state) => state.admin.adminCustomer);
   const searchParams = useSearchParams();
   const router = useRouter();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminCustomerService.getCustomers.api(`search=${value}`));
      },
   });

   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };

   const onUpdateCustomerStatus = async (body: { ids: string[]; status: boolean }) => {
      try {
         await dispatch(adminCustomerService.updateCustomerStatus.api(body)).unwrap();
         dispatch(adminCustomerService.getCustomers.api(searchParams.toString()));
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      dispatch(adminCustomerService.getCustomers.api(searchParams.toString()));
      return () => {};
   }, [searchParams]);

   return { getCustomers, setParam, debounce, onUpdateCustomerStatus, updateCustomerStatus };
}
