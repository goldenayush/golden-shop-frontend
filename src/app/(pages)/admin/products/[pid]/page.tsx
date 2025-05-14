"use client";
import React from "react";
import ProductForm from "../../components/ProductForm";

export default function Page(props: any) {
   return (
      <div className="p-7">
         <ProductForm pid={props?.params?.pid} />
      </div>
   );
}
