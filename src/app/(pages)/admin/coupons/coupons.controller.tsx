import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { adminCouponsService } from "@/services/admin/admin-coupons.service";

export default function useCouponsController() {
   const { getAllCoupons } = useAppSelector((state) => state.admin.coupons);
   const dispatch = useAppDispatch();
   const searchParams = useSearchParams();
   const router = useRouter();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminCouponsService.getAllCoupons.api(`search=${value}`));
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
      dispatch(adminCouponsService.getAllCoupons.api(searchParams.toString()));
      return () => { };
   }, [searchParams]);

   return {
      coupons: getAllCoupons.data,
      isFetching: getAllCoupons.isLoading,
      pagination: getAllCoupons.pagination,
      debounce,
      setParam,
   };
}

