"use client";
import React from "react";
import CollectionForm from "../partials/CollectionForm";
import useSingleCollectionsController from "./single-collections.controller";
import { Loading, PageHeader } from "@/shared/components";

export default function CollectionSinglePage() {
   const ctrl = useSingleCollectionsController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-3xl" />;
   }
   if (!ctrl?.data) {
      return null;
   }
   return (
      <div className="py-7 px-4 w-full md:w-[70%] mx-auto">
         <PageHeader //
            backLink="/admin/attributes"
            heading={`Editing  ${ctrl?.data?.name}`}
         />
         <CollectionForm //
            onSubmit={ctrl.onSubmit}
            patchValues={ctrl?.data}
            loading={ctrl.isUpdating}
         />
      </div>
   );
}
