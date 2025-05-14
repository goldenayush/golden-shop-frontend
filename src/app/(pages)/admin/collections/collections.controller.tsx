import React from "react";

const collections = [
   { id: "1", collection_name: "Accessories", code: "accessories-products" }, //
   { id: "2", collection_name: "Best Sellers", code: "bestsellers" },
   { id: "3", collection_name: "Krishna Products", code: "krishnahomepage" },
   { id: "4", collection_name: "Featured Products", code: "homepage" },
];
export default function useCollectionsController() {
   return { collections };
}
