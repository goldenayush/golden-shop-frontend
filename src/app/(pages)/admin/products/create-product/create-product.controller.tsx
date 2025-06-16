import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminProductService } from "@/services/admin/admin-product.service";

export default function useCreateProductController() {
   const dispatch = useAppDispatch();
   const { createProduct } = useAppSelector((state) => state.admin.product);

   const onSubmit = async (body: any) => {
      try {
         await dispatch(adminProductService.createProduct.api(body)).unwrap();
      } catch (error) {
         return;
      }
   };
   return { onSubmit, isCreating: createProduct.isLoading };
}
