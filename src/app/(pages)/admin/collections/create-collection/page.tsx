"use client";
import React from "react";
import CollectionForm from "../partials/CollectionForm";
import useCreateCollectionController from "./create-collection.controller";
import { PageHeader } from "@/shared/components";
//import { PageHeader } from "@/shared/components";

export default function CreateCollectionPage() {
   const ctrl = useCreateCollectionController();
   return (
      <div className="py-7 w-full md:w-[70%] mx-auto">
         <PageHeader //
            backLink="/admin/collections"
            heading="Create a new collectiont"
         />
         <CollectionForm onSubmit={ctrl.onSubmit} loading={ctrl.isCreating} />
      </div>
   );
}
