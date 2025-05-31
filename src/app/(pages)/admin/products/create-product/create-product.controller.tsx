import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminProductService } from "@/services/admin/admin-product.service";
import { useRouter } from "next/navigation";

export default function useCreateProductController() {
   const dispatch = useAppDispatch();
   const { createProduct } = useAppSelector((state) => state.admin.product);
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         await dispatch(adminProductService.createProduct.api(body)).unwrap();
         router.replace("/admin/products");
      } catch (error) {
         return;
      }
   };
   return { onSubmit, isCreating: createProduct.isLoading };
}
