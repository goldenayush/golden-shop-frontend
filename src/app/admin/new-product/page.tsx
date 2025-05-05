import React from "react";
import ProductForm from "../components/ProductForm";

export default function NewProductPage() {
   return (
      <div className="p-4">
         <ProductForm heading="Create a new product" />
      </div>
   );
}
