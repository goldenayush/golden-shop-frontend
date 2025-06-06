import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCmsService } from "@/services/admin/admin-cms.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useSingleCmsController() {
   const dispatch = useAppDispatch();
   const { getSingleCmsPage } = useAppSelector((state) => state.admin.adminCms);
   const { id } = useParams<{ id: string }>();
   const router = useRouter();

   const onUpdateCmsPage = async (body: any) => {
      try {
         const { seo, ...res } = body;
         await dispatch(adminCmsService.updateCmsPage.api({ ...res, ...seo })).unwrap();
         router.replace(`/admin/cms-pages`);
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (id) {
         dispatch(adminCmsService.getSingleCmsPage.api(id));
      }
      return () => {};
   }, [id]);

   return { getSingleCmsPage, onUpdateCmsPage };
}
