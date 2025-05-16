"use client";
import React from "react";
import useCmsController from "./cms.controller";
import { Card, Table } from "@/shared/components";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

export default function CmsPage() {
   const ctrl = useCmsController();
   return (
      <div className="p-7">
         <h3 className="text-[20px] font-semibold mb-4">Cms Pages</h3>
         <Card className="bg-white">
            {/*--------------filter--------------------*/}
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
               <div className="flex items-center gap-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                  />
               </div>
               <div>
                  <Link href="/admin/cms-pages" className="text-[14px] text-blue-500 hover:underline" replace>
                     Clear Filter
                  </Link>
               </div>
            </div>
            <Table //
               checkable
               checkEventList={[
                  {
                     label: "Disable",
                     event: (param: any[]) => console.log(param), //
                  },
                  {
                     label: "Enable",
                     event: (param: any[]) => console.log(param), //
                  },
                  {
                     label: "Delete",
                     event: (param: any[]) => console.log(param), //
                  },
               ]}
               colums={[
                  { label: "Name", key: "name", sort: true }, //
                  { label: "Status", key: "status", sort: true },
               ]}
               dataList={ctrl.pages.map((data) => ({
                  id: data.id,
                  name: (
                     <Link href={`/admin/cms-pages/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                        {data?.name}
                     </Link>
                  ),
                  status: (
                     <span className="text-[14px]">
                        {data?.status ? ( //
                           <GoDotFill size={20} color="#aee9d1" />
                        ) : (
                           <GoDotFill size={20} color="#cecece" />
                        )}
                     </span>
                  ),
               }))}
               onSort={(param) => {
                  console.log(param);
               }}
               onPagination={() => {}}
            />
         </Card>
      </div>
   );
}
