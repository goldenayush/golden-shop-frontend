"use client";
import { Loading, PageHeader } from "@/shared/components";
import CmsForm from "../partials/CmsForm";
import useSingleCmsController from "./single-cms.controller";

export default function CmsSinglePage() {
   const ctrl = useSingleCmsController();
   if (ctrl.getSingleCmsPage.isLoading) {
      return <Loading className="h-[70vh] text-3xl" />;
   }
   const page = ctrl.getSingleCmsPage.data;
   if (!page) {
      return null;
   }

   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/cms-pages"
            heading={`Editing ${page.cmsPageDescription.name}`}
         />
         <CmsForm onSubmit={ctrl.onUpdateCmsPage} patchValues={page} />
      </div>
   );
}
