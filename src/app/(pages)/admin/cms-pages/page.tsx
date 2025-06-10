"use client";
import React from "react";
import useCmsController from "./cms.controller";
import { Card, PageHeader, Table } from "@/shared/components";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

export default function CmsPage() {
   const ctrl = useCmsController();
   return (
      <div className="p-7">
         <PageHeader
            heading="Cms Pages"
            action={{
               title: "New Page",
               link: "/admin/cms-pages/create-page",
            }}
         />
         <Card className="bg-white">
            {/*--------------filter--------------------*/}
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
               <div className="flex items-center gap-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                     value={ctrl.debounce.searchKey}
                     onChange={ctrl.debounce.onSearchChange}
                  />
               </div>
               <div>
                  <Link href="/admin/cms-pages" className="text-[14px] text-blue-500 hover:underline" replace>
                     Clear Filter
                  </Link>
               </div>
            </div>
            <Table //
               loading={ctrl.getCmsPages.isLoading}
               checkable
               checkEventList={[
                  {
                     loading: ctrl.updateCmsPageStatus.isLoading,
                     label: "Disable",
                     event: (ids: string[]) => ctrl.onUpdateStatusCmsPage({ status: false, ids }), //
                  },
                  {
                     loading: ctrl.updateCmsPageStatus.isLoading,
                     label: "Enable",
                     event: (ids: string[]) => ctrl.onUpdateStatusCmsPage({ status: true, ids }),
                  },
                  {
                     loading: ctrl.deleteCmsPage.isLoading,
                     label: "Delete",
                     event: ctrl.onDeleteCmsPage, //
                  },
               ]}
               colums={[
                  { label: "Name", key: "name", sort: true }, //
                  { label: "Status", key: "status", sort: true },
               ]}
               dataList={ctrl.getCmsPages?.data?.map((data) => ({
                  id: data.id,
                  name: (
                     <Link href={`/admin/cms-pages/${data?.cmsPageDescription?.cmsPageId}`} className="text-[14px] font-semibold hover:underline">
                        {data?.cmsPageDescription?.name || "N/A"}
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
                  ctrl.setParam(param);
               }}
               pagination={{
                  totalPages: ctrl.getCmsPages.pagination?.totalPages,
                  page: ctrl.getCmsPages.pagination?.page,
                  limit: ctrl.getCmsPages.pagination?.limit,
                  total: ctrl.getCmsPages.pagination?.total,
                  onPagination(param) {
                     ctrl.setParam(param);
                  },
               }}
            />
         </Card>
      </div>
   );
}
