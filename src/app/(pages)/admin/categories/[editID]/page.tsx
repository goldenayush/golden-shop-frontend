"use client";
import React from "react";
import CategoryForm from "../../components/CategoryForm";

export default function CategoryEditPage(props: any) {
   return (
      <div className="p-7">
         <CategoryForm id={props?.params?.editID} />
      </div>
   );
}
