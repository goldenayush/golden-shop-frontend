"use client";
import React from "react";
import CmsForm from "../partials/CmsForm";
import { PageHeader } from "@/shared/components";
import useCreateCmsController from "./create-page.controller";

export default function CreateCmsPage() {
   const ctrl = useCreateCmsController();
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/cms-pages"
            heading="Create a new page"
         />
         <CmsForm //
            loading={ctrl.createCmsPage.isLoading}
            onSubmit={ctrl.onCreateCmsPage}
         />
      </div>
   );
}
