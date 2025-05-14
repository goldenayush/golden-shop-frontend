"use client";
import { Card, Table } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useCollectionsController from "./collections.controller";

export default function CollectionsPage() {
   const ctrl = useCollectionsController();
   return (
      <div className="py-7  w-full md:w-[70%] mx-auto">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-semibold">Collections</h3>
            <Link href={"/admin/categories/create-product"} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               New Collection
            </Link>
         </div>
         <div>
            <Card className="bg-white">
               <Table
                  checkable
                  checkEventList={[
                     {
                        label: "Delete",
                        event(param) {
                           console.log(param);
                        },
                     }, //
                  ]}
                  colums={[
                     { label: "ID", key: "id" }, //
                     { label: "Collection Name", key: "collection_name", sort: true },
                     { label: "Code", key: "code", sort: true },
                  ]}
                  dataList={ctrl.collections.map((item) => ({
                     id: item.id,
                     collection_name: (
                        <Link href={`/admin/collections/${item?.id}`} className="text-[14px] font-semibold hover:underline">
                           {item?.collection_name}
                        </Link>
                     ),
                     code: item.code,
                  }))}
                  onSort={(param) => {
                     console.log(param);
                  }}
                  onPagination={() => {}}
               />
            </Card>
         </div>
      </div>
   );
}
