"use client";
import React from "react";
import { Card, Table } from "@/shared/components";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { FaCaretUp } from "react-icons/fa";
import { Dropdown } from "@/shared/ui";
import useProductsController from "./products.controller";

export default function AdminProductsPage() {
   const ctrl = useProductsController();
   return (
      <div className="p-7">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-semibold">Products</h3>
            <Link href={"/admin/products/create-product"} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               New Products
            </Link>
         </div>
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                     <input //
                        type="text"
                        value={ctrl.searchKey}
                        className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                        placeholder="Search"
                        onChange={ctrl.onSearchChange}
                     />
                     <div>
                        <Dropdown //
                           options={[
                              { value: "1", label: "enabled" }, //
                              { value: "0", label: "disabled" }, //
                           ]}
                           Component={(props) => (
                              <span className="flex items-center gap-2 border-b px-2 border-gray-300">
                                 <span className="text-xs font-semibold capitalize">{props.value ? props.value : "Status"}</span>
                                 <FaCaretUp size={10} style={{ rotate: props.isShow ? "180deg" : "0deg" }} />
                              </span>
                           )}
                           OptionComponent={(props) => (
                              <span className="text-xs font-semibold capitalize">
                                 {/*  */}
                                 {props.label}
                                 {/*  */}
                              </span>
                           )}
                           onChange={(value) => {
                              ctrl.setParam("status", value);
                           }}
                        />
                     </div>
                     <div>
                        <Dropdown //
                           options={[
                              { value: "simple", label: "simple" }, //
                              { value: "configurable", label: "configurable" }, //
                           ]}
                           Component={(props) => (
                              <span className="flex items-center gap-2 border-b px-2 border-gray-300">
                                 <span className="text-xs font-semibold capitalize">{props.value ? props.value : "Product Type"}</span>
                                 <FaCaretUp size={10} style={{ rotate: props.isShow ? "180deg" : "0deg" }} />
                              </span>
                           )}
                           OptionComponent={(props) => (
                              <span className="text-xs font-semibold capitalize">
                                 {/*  */}
                                 {props.label}
                              </span>
                           )}
                           onChange={(value) => {
                              ctrl.setParam("type", value);
                           }}
                        />
                     </div>
                  </div>
                  <div>
                     <Link href="/admin/products" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>

               {/*--------------table--------------------*/}
               <Table
                  checkable
                  checkEventList={[
                     {
                        label: "Disable",
                        event: (params) => console.log(params), //
                     },
                     {
                        label: "Enable",
                        event: (params) => console.log(params), //
                     },
                     {
                        label: "Delete",
                        event: (params) => console.log(params), //
                     },
                  ]}
                  colums={[
                     { key: "thumbnail", label: "THUMBNAIL" }, //
                     { key: "name", label: "NAME", sort: true },
                     { key: "price", label: "PRICE", sort: true },
                     { key: "sku", label: "SKU" },
                     { key: "stock", label: "STOCK", sort: true },
                     { key: "status", label: "STATUS", sort: true },
                  ]}
                  dataList={ctrl.products?.map((data) => {
                     return {
                        id: data.id,
                        thumbnail: (
                           <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                              <img src={data?.thumbnail} alt="img" className="w-full" />
                           </div>
                        ),
                        name: (
                           <Link href={`/admin/products/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.name}
                           </Link>
                        ),
                        price: <span className="text-[14px]">₹{data?.price}</span>,
                        sku: <span className="text-[14px]">{data?.sku}</span>,
                        stock: <span className="text-[14px]">{data?.stock}</span>,
                        status: (
                           <span className="text-[14px]">
                              {data?.status === "active" ? ( //
                                 <GoDotFill size={20} color="#aee9d1" />
                              ) : (
                                 <GoDotFill size={20} color="#cecece" />
                              )}
                           </span>
                        ),
                     };
                  })}
                  onSort={(params) => {
                     ctrl.queryString(params);
                  }}
                  onPagination={(param) => console.log(param)}
               />
            </Card>
         </div>
      </div>
   );
}
