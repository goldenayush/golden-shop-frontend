import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCategoryService } from "@/services/admin/admin-category.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function useCreateCategoryController() {
   const router = useRouter();
   const dispatch = useAppDispatch();
   const { createCategory } = useAppSelector((state) => state.admin.category);
   const onSubmit = async (body: any) => {
      try {
         console.log(body);
         await dispatch(adminCategoryService.createCategory.api(body));
         router.replace("/admin/categories");
      } catch (error) {
         return;
      }
   };

   return { onSubmit, isCreating: createCategory.isLoading };
}
