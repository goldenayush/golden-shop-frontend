import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCmsService } from "@/services/admin/admin-cms.service";
import { useRouter } from "next/navigation";

export default function useCreateCmsController() {
   const { createCmsPage } = useAppSelector((state) => state.admin.adminCms);
   const dispatch = useAppDispatch();
   const router = useRouter();

   const onCreateCmsPage = async (body: any) => {
      try {
         const { seo, ...rest } = body;
         await dispatch(adminCmsService.createCmsPage.api({ ...seo, ...rest })).unwrap();
         router.replace("/admin/cms-pages");
      } catch (error) {
         return;
      }
   };

   return { onCreateCmsPage, createCmsPage };
}
