"use client";
import React from "react";
import ProductForm from "../partials/ProductForm";
import singleProductController from "./single-product.controller";
import { Loading, PageHeader } from "@/shared/components";

export default function SingleProductPage() {
   const ctrl = singleProductController();
   if (ctrl.isfetching) {
      return <Loading className="h-[200px]" />;
   }
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/products"
            heading={`Editing ${ctrl.data?.productDescription?.name}`}
         />
         <ProductForm //
            onSubmit={ctrl.onSubmit}
            patchValues={ctrl.data}
            loading={ctrl.isUpdating}
         />
      </div>
   );
}
