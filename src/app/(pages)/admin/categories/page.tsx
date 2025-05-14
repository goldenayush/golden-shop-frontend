"use client";
import React from "react";
import useCategoriesController from "./categories.controller";
import Link from "next/link";
import { Card, Table } from "@/shared/components";
import { GoDotFill } from "react-icons/go";

export default function CategoriesPage() {
   const ctrl = useCategoriesController();
   return (
      <div className="p-7">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-semibold">Categories</h3>
            <Link href={"/admin/categories/create-product"} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               New Category
            </Link>
         </div>
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                  />
                  <div>
                     <Link href="/admin/categories" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>
               <Table //
                  checkable
                  checkEventList={[
                     {
                        label: "Delete",
                        event: (param: any[]) => console.log(param), //
                     },
                  ]}
                  colums={[
                     { label: "Category Name", key: "category_name", sort: true }, //
                     { label: "Status", key: "status", sort: true }, //
                     { label: "Include In Menu", key: "include_in_menu", sort: true },
                  ]}
                  dataList={ctrl.categories.map((data) => ({
                     id: data.id,
                     category_name: (
                        <Link href={`/admin/categories/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                           {data?.category_name}
                        </Link>
                     ),
                     status: (
                        <span className="text-[14px]">
                           {data?.status === "active" ? ( //
                              <GoDotFill size={20} color="#aee9d1" />
                           ) : (
                              <GoDotFill size={20} color="#cecece" />
                           )}
                        </span>
                     ),
                     include_in_menu: (
                        <span className="text-[14px]">
                           {/*  */}
                           {data?.include_in_menu ? "Yes" : "No"}
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
      </div>
   );
}
