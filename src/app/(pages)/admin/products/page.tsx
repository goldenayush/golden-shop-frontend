"use client";
import React from "react";
import { Card, PageHeader, Table } from "@/shared/components";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { FaCaretUp } from "react-icons/fa";
import { Dropdown } from "@/shared/ui";
import useProductsController from "./products.controller";

export default function AdminProductsPage() {
   const ctrl = useProductsController();
   return (
      <div className="p-3 md:p-7">
         <PageHeader
            heading="Products"
            action={{
               title: "New Products",
               link: "/admin/products/create-product",
            }}
         />
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <div className="grid grid-cols-12 items-center gap-4">
                     <div className="col-span-12 md:col-span-4">
                        <input //
                           type="text"
                           className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                           placeholder="Search"
                           value={ctrl.debounce.searchKey}
                           onChange={ctrl.debounce.onSearchChange}
                        />
                     </div>
                     <div className="col-span-12 md:col-span-8 flex items-center gap-3">
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
                           onChange={(value) => ctrl.setParam({ status: value })}
                        />
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
                           onChange={(value) => ctrl.setParam({ productType: value })}
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
                  loading={ctrl.getProducts.isLoading}
                  checkable
                  checkEventList={[
                     {
                        loading: ctrl?.updateStatusProduct.isLoading,
                        label: "Disable",
                        event: (params) => ctrl.onUpdateStatusProduct(params, false), //
                     },
                     {
                        loading: ctrl?.updateStatusProduct.isLoading,
                        label: "Enable",
                        event: (params) => ctrl.onUpdateStatusProduct(params, true), //
                     },
                     {
                        loading: ctrl?.deleteProduct.isLoading,
                        label: "Delete",
                        event: (params) => ctrl.onDeleteProduct(params), //
                     },
                  ]}
                  colums={[
                     { key: "singleImage", label: "THUMBNAIL" }, //
                     { key: "name", label: "NAME", sort: true },
                     { key: "price", label: "PRICE", sort: true },
                     { key: "sku", label: "SKU" },
                     { key: "manageStock", label: "STOCK", sort: true },
                     { key: "status", label: "STATUS", sort: true },
                  ]}
                  dataList={ctrl.getProducts?.data?.map((data) => {
                     return {
                        id: data.id,
                        singleImage: (
                           <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                              <img //
                                 crossOrigin="anonymous"
                                 src={data?.productImages?.[0]?.listingImage}
                                 alt="img"
                                 className="w-full"
                              />
                           </div>
                        ),
                        name: (
                           <Link href={`/admin/products/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.productDescription?.name}
                           </Link>
                        ),
                        price: <span className="text-[14px]">₹{data?.price}</span>,
                        sku: <span className="text-[14px]">{data?.sku}</span>,
                        manageStock: <span className="text-[14px]">{data?.productInventory?.qty}</span>,
                        status: (
                           <span className="text-[14px]">
                              {data?.status ? ( //
                                 <GoDotFill size={20} color="#aee9d1" />
                              ) : (
                                 <GoDotFill size={20} color="#cecece" />
                              )}
                           </span>
                        ),
                     };
                  })}
                  onSort={(params) => ctrl.setParam(params)}
                  pagination={{
                     page: 1,
                     totalPages: 3,
                     total: 112,
                     limit: 12,
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
