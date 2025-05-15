import React, { useRef } from "react";

const attributes = [
   {
      id: "1",
      name: "Ocassion",
      groups: "default",
      type: "select",
      isRequired: true,
      isFilterable: true,
   }, //
   {
      id: "2",
      name: "Size",
      groups: "default",
      type: "select",
      isRequired: true,
      isFilterable: true,
   },
   {
      id: "3",
      name: "Material",
      groups: "default",
      type: "select",
      isRequired: true,
      isFilterable: true,
   },
   {
      id: "4",
      name: "Color",
      groups: "default",
      type: "select",
      isRequired: true,
      isFilterable: true,
   },
];

export default function useAttributesController() {
   const modalRef = useRef<any>(null);
   return { attributes, modalRef };
}
