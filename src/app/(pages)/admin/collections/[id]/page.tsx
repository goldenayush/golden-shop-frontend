"use client";
import { useParams } from "next/navigation";
import React from "react";
import CollectionForm from "../../components/CollectionForm";

export default function CollectionSinglePage() {
   const params = useParams<{ id: string }>();
   return (
      <div className="py-7 w-full md:w-[70%] mx-auto">
         <CollectionForm id={params.id} />
      </div>
   );
}
