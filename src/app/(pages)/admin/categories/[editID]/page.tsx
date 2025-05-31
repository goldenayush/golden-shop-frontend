"use client";
import React from "react";
import CategoryForm from "../partials/CategoryForm";
import useEditCategoryController from "./edit-category.controller";
import { Loading, PageHeader } from "@/shared/components";

export default function CategoryEditPage() {
   const ctrl = useEditCategoryController();
   if (ctrl.fetching) {
      return <Loading className="h-[70vh] text-3xl" />;
   }
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/categories"
            heading={`Editing  ${ctrl?.data?.CategoryDescription?.name}`}
         />
         <CategoryForm //
            onSubmit={ctrl.onSubmit}
            submitting={ctrl.isUpdating}
            patchValues={ctrl?.data}
         />
      </div>
   );
}
