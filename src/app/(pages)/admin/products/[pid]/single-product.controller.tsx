import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminProductService } from "@/services/admin/admin-product.service";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function singleProductController() {
   const dispatch = useAppDispatch();
   const { pid } = useParams<{ pid: string }>();
   const { singleProduct, updateProduct } = useAppSelector((state) => state.admin.product);
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         const { description, inventory, images, id, ...rest } = body;
         const payload = {
            id,
            ...rest,
            productDescription: {
               ...description,
               productId: pid,
               id,
            },
            productImages: images,
            productInventory: {
               ...inventory,
               productId: pid,
               id,
            },
         };
         await dispatch(adminProductService.updateProduct.api(payload)).unwrap();
         router.replace("/admin/products");
      } catch (error) {
         return;
      }
   };
   useEffect(() => {
      if (pid) {
         dispatch(adminProductService.singleProduct.api(pid));
      }
      return () => {};
   }, [pid]);

   return {
      isfetching: singleProduct.isLoading,
      data: singleProduct.data,
      onSubmit,
      isUpdating: updateProduct.isLoading,
   };
}
