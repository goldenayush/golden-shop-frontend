"use client";
import { Card, Table, PageHeader } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useCollectionsController from "./collections.controller";

export default function CollectionsPage() {
   const ctrl = useCollectionsController();
   return (
      <div className="py-7 px-4 w-full md:w-[70%] mx-auto">
         <PageHeader //
            heading="Collections"
            action={{
               link: "/admin/collections/create-collection",
               title: "New Collection",
            }}
         />
         <div>
            <Card className="bg-white">
               <div className="flex items-center justify-between p-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                     onChange={ctrl.debounce.onSearchChange}
                     value={ctrl.debounce.searchKey}
                  />
                  <div>
                     <Link href="/admin/collections" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>
               <Table
                  loading={ctrl.isFetching}
                  checkable
                  checkEventList={[
                     {
                        label: "Delete",
                        event(param) {
                           ctrl.onDelateAttributes(param);
                        },
                     }, //
                  ]}
                  colums={[
                     { label: "ID", key: "id" }, //
                     { label: "Collection Name", key: "name", sort: true },
                     { label: "Code", key: "code", sort: true },
                  ]}
                  dataList={ctrl?.data?.map((item) => ({
                     id: item.id,
                     name: (
                        <Link href={`/admin/collections/${item?.id}`} className="text-[14px] font-semibold hover:underline">
                           {item.name}
                        </Link>
                     ),
                     code: item.code,
                  }))}
                  onSort={(param) => {
                     ctrl.setParam(param);
                  }}
                  pagination={{
                     page: 1,
                     totalPages: 1,
                     total: 1,
                     limit: 1,
                     onPagination(param) {
                        ctrl.setParam(param);
                     },
                  }}
               />
            </Card>
         </div>
      </div>
   );
}
