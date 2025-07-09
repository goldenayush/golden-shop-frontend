import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/shared/hooks";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminProductService } from "@/services/admin/admin-product.service";

export default function useProductsController() {
   const { getProducts, deleteProduct, updateStatusProduct } = useAppSelector((state) => state.admin.product);
   const dispatch = useAppDispatch();
   const router = useRouter();
   const searchParams = useSearchParams();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminProductService.getProducts.api(`search=${value}`));

      },
   });

   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };

   const onDeleteProduct = async (ids: string[]) => {
      await dispatch(adminProductService.deleteProduct.api(ids));
   };

   const onUpdateStatusProduct = async (ids: string[], status: boolean) => {
      await dispatch(adminProductService.updateStatusProduct.api({ status, ids }));
   };

   useEffect(() => {
      dispatch(adminProductService.getProducts.api(searchParams.toString()));
      return () => { };
   }, [searchParams]);

   return { setParam, getProducts, onDeleteProduct, deleteProduct, onUpdateStatusProduct, updateStatusProduct, debounce };
}

