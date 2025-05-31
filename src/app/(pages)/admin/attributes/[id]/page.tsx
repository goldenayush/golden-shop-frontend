"use client";
import React from "react";
import AttributeForm from "../partials/AttributeForm";
import useSingleAttributeController from "./single-attribute.controller";
import { Loading, PageHeader } from "@/shared/components";

export default function SingleAttributePage() {
   const ctrl = useSingleAttributeController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-3xl" />;
   }
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/attributes"
            heading={`Editing  ${ctrl?.data?.attributeName}`}
         />
         <AttributeForm //
            onSubmit={ctrl.onSubmit}
            patchValues={ctrl.data}
            loading={ctrl.isUpdating}
         />
      </div>
   );
}
