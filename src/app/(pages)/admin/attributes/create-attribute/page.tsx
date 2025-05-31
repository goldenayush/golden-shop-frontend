"use client";
import React from "react";
import AttributeForm from "../partials/AttributeForm";
import useCreateAttributeController from "./create-attribute.controller";
import { PageHeader } from "@/shared/components";

export default function CreateAttributePage() {
   const ctrl = useCreateAttributeController();
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/attributes"
            heading="Create a new attribute"
         />
         <AttributeForm //
            onSubmit={ctrl.onSubmit}
            loading={ctrl.isCreating}
         />
      </div>
   );
}
