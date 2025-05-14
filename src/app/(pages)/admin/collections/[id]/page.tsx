"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function CollectionSinglePage() {
   const params = useParams<{ id: string }>();
   return <div>Collection Single Page {params.id}</div>;
}
