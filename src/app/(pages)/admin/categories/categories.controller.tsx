import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCategoryService } from "@/services/admin/admin-category.service";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useCategoriesController() {
   const { fetchCategories, deleteMultipleCategory } = useAppSelector((state) => state.admin.category);
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminCategoryService.fetchCategories.api(`search=${value}`));
         console.log(value);
      },
   });

   const dispatch = useAppDispatch();
   const searchParams = useSearchParams();
   const router = useRouter();
   /* event  handlers here */
   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };
   const onSeleteMultipleCategory = (ids: string[]) => {
      dispatch(adminCategoryService.deleteMultipleCategory.api(ids));
   };

   const getBreadcrumbs = (categoryId: string, categories: any[]) => {
      const trail = [];
      let current = categories.find((cat) => cat?.id === categoryId);

      while (current) {
         trail.unshift(current?.CategoryDescription?.name || "Unnamed");
         current = current?.parentId ? categories?.find((cat) => cat?.id === current?.parentId) : null;
      }

      return trail.join(" > ");
   };

   useEffect(() => {
      dispatch(adminCategoryService.fetchCategories.api(searchParams.toString()));
      return () => {};
   }, [searchParams]);

   return { fetchCategories, onSeleteMultipleCategory, deleteMultipleCategory, getBreadcrumbs, setParam, debounce };
}
/*
 TODO: 
     need pagination res
*/
