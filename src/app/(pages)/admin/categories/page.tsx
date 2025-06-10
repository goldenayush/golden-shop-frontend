"use client";
import React from "react";
import useCategoriesController from "./categories.controller";
import Link from "next/link";
import { Card, PageHeader, Table } from "@/shared/components";
import { GoDotFill } from "react-icons/go";

export default function CategoriesPage() {
   const ctrl = useCategoriesController();

   return (
      <div className="p-7">
         <PageHeader //
            heading="Categories"
            action={{
               title: "New Category",
               link: "/admin/categories/create-category",
            }}
         />
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                     value={ctrl.debounce.searchKey}
                     onChange={ctrl.debounce.onSearchChange}
                  />
                  <div>
                     <Link href="/admin/categories" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>
               <Table //
                  loading={ctrl.fetchCategories.isLoading}
                  checkable
                  checkEventList={[
                     {
                        label: "Delete",
                        loading: ctrl.deleteMultipleCategory.isLoading,
                        event: ctrl.onSeleteMultipleCategory, //
                     },
                  ]}
                  colums={[
                     { label: "Category Name", key: "name", sort: true }, //
                     { label: "Status", key: "status", sort: true }, //
                     { label: "Include In Menu", key: "includeInNav", sort: true },
                  ]}
                  dataList={ctrl.fetchCategories?.data?.map((data) => {
                     const breadcrumbs = ctrl.fetchCategories?.data
                        ?.filter((el) => data?.id !== el?.parentId)
                        .map((el) => el?.CategoryDescription.name)
                        .join(" > ");

                     return {
                        id: data.id,
                        name: (
                           <Link href={`/admin/categories/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {ctrl.getBreadcrumbs(data?.id, ctrl.fetchCategories?.data)}
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
                        includeInNav: (
                           <span className="text-[14px]">
                              {/*  */}
                              {data.includeInNav ? "Yes" : "No"}
                           </span>
                        ),
                     };
                  })}
                  onSort={(param) => {
                     ctrl.setParam(param);
                  }}
                  pagination={{
                     page: ctrl?.fetchCategories?.pagination?.page,
                     totalPages: 4,
                     total: 20,
                     limit: ctrl?.fetchCategories?.pagination?.limit,
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
