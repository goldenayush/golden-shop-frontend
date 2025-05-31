import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCategoryService } from "@/services/admin/admin-category.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useEditCategoryController() {
   const router = useRouter();
   const dispatch = useAppDispatch();
   const params = useParams<{ editID?: string }>();
   const { singleCategory, updateCategory } = useAppSelector((state) => state.admin.category);

   const onSubmit = async (body: any) => {
      try {
         const category = singleCategory.data;
         body.id = category?.id;
         body.categoryDescription = {
            ...body.categoryDescription,
            id: category?.CategoryDescription?.id,
         };
         const { parentId, ...payload } = body;
         await dispatch(adminCategoryService.updateCategory.api(payload));
         router.replace("/admin/categories");
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (params?.editID) {
         dispatch(adminCategoryService.singleCategory.api(params?.editID));
      }
      return () => {};
   }, [params.editID]);

   return {
      onSubmit,
      isUpdating: updateCategory.isLoading,
      fetching: singleCategory.isLoading,
      data: singleCategory.data,
   };
}
