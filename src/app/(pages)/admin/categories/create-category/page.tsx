"use client";
import React from "react";
import CategoryForm from "../partials/CategoryForm";
import useCreateCategoryController from "./create-category.controller";
import { PageHeader } from "@/shared/components";
// import { PageHeader } from "@/shared/components";

export default function CreateCategoryPage() {
   const ctrl = useCreateCategoryController();
   return (
      <div className="p-7">
         <PageHeader backLink="/admin/categories" heading="Create a new category" />
         <CategoryForm //
            onSubmit={ctrl.onSubmit}
            submitting={ctrl.isCreating}
         />
      </div>
   );
}
