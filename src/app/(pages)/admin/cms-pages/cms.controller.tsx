import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCmsService } from "@/services/admin/admin-cms.service";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useCmsController() {
   const dispatch = useAppDispatch();
   const { getCmsPages, deleteCmsPage, updateCmsPageStatus } = useAppSelector((state) => state.admin.adminCms);
   const searchParams = useSearchParams();
   const router = useRouter();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminCmsService.getCmsPages.api(`search=${value}`));
      },
   });

   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };

   const onDeleteCmsPage = async (ids: string[]) => {
      try {
         await dispatch(adminCmsService.deleteCmsPage.api(ids)).unwrap();
         dispatch(adminCmsService.getCmsPages.api());
      } catch (error) {
         return;
      }
   };

   const onUpdateStatusCmsPage = async (body: { ids: string[]; status: boolean }) => {
      try {
         await dispatch(adminCmsService.updateCmsPageStatus.api(body)).unwrap();
         dispatch(adminCmsService.getCmsPages.api());
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      dispatch(adminCmsService.getCmsPages.api(searchParams.toString()));
      return () => {};
   }, [searchParams]);

   return { getCmsPages, setParam, debounce, onDeleteCmsPage, deleteCmsPage, onUpdateStatusCmsPage, updateCmsPageStatus };
}
