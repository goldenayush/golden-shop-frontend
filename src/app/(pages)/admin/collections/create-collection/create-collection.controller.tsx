import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCollectionService } from "@/services/admin/admin-collection.service";
import { useRouter } from "next/navigation";

export default function useCreateCollectionController() {
   const { createCollection } = useAppSelector((state) => state.admin.collection);
   const dispatch = useAppDispatch();
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         await dispatch(adminCollectionService.createCollection.api(body)).unwrap();
         router.replace("/admin/collections");
      } catch (error) {
         return;
      }
   };
   return {
      onSubmit,
      isCreating: createCollection.isLoading,
   };
}
