import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminFileUploadService } from "@/services/admin/admin-file-upload.service";
import { adminProductService } from "@/services/admin/admin-product.service";
import { arrayPipeline } from "@/shared/functions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function useCreateProductController() {
   const dispatch = useAppDispatch();
   const { createProduct } = useAppSelector((state) => state.admin.product);
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         await dispatch(adminProductService.createProduct.api(body)).unwrap();
      } catch (error) {
         return;
      }
   };
   return { onSubmit, isCreating: createProduct.isLoading };
}
