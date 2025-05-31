"use client";
import React from "react";
import ProductForm from "../partials/ProductForm";
import useCreateProductController from "./create-product.controller";
import { PageHeader } from "@/shared/components";
// import { PageHeader } from "@/shared/components";

export default function CreateProductPage() {
   const ctrl = useCreateProductController();
   return (
      <div className="p-7">
         <PageHeader //
            backLink="/admin/products"
            heading="Create a new product"
         />
         <ProductForm onSubmit={ctrl.onSubmit} loading={ctrl.isCreating} />
      </div>
   );
}
