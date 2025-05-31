"use client";
import React from "react";
import useWidgetsController from "./widgets.controller";
import Link from "next/link";
import { Card, Modal, PageHeader, Table } from "@/shared/components";
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";

export default function WidgetsPage() {
   const ctrl = useWidgetsController();
   return (
      <div className="p-[20px]">
         <PageHeader //
            heading="Widgets"
            extra={
               <>
                  <button onClick={() => ctrl.modalRef.current?.setIsOpen(true)} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     New Widget
                  </button>
                  <Modal size="lg" ref={ctrl.modalRef}>
                     <div className="py-3">
                        <div className="flex justify-between items-center px-[20px]">
                           <h3 className="text-[16px] font-semibold">Select type</h3>
                           <button className="cursor-pointer" onClick={() => ctrl.modalRef.current?.setIsOpen(false)}>
                              <IoClose size={20} />
                           </button>
                        </div>
                        <div className="flex justify-between gap-2 py-[20px] px-[20px]">
                           <button
                              type="button"
                              className="border w-full text-[11px] p-[10px] border-gray-300 font-semibold cursor-pointer rounded-sm"
                              onClick={() => ctrl.menuLink("/admin/widgets/collection-products")}>
                              Collection Products
                           </button>
                           <button
                              type="button"
                              className="border w-full text-[11px] p-[10px] border-gray-300 font-semibold cursor-pointer rounded-sm"
                              onClick={() => ctrl.menuLink("/admin/widgets/text-block")}>
                              Text block
                           </button>
                           <button
                              type="button"
                              className="border w-full text-[11px] p-[10px] border-gray-300 font-semibold cursor-pointer rounded-sm"
                              onClick={() => ctrl.menuLink("/admin/widgets/basic-menu")}>
                              Menu
                           </button>
                        </div>
                        <div className="flex justify-end pt-[20px] items-center border-t px-[20px] border-gray-300">
                           <button
                              type="button"
                              className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer"
                              onClick={() => ctrl.modalRef.current?.setIsOpen(false)}>
                              Cancel
                           </button>
                        </div>
                     </div>
                  </Modal>
               </>
            }
         />
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                     <input //
                        type="text"
                        className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                        placeholder="Search"
                     />
                  </div>
                  <div>
                     <Link href="/admin/widgets" className="text-[14px] text-blue-500 hover:underline" replace>
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
                     { key: "name", label: "NAME", sort: true },
                     { key: "type", label: "TYPE", sort: true },
                     { key: "status", label: "STATUS", sort: true },
                  ]}
                  dataList={ctrl.widgets?.map((data) => {
                     const linkTypes: any = {
                        Menu: "basic-menu",
                        "Collection products": "collection-products",
                        "Text block": "text-block",
                     };
                     return {
                        id: data.id,
                        name: (
                           <Link href={`/admin/widgets/${linkTypes[data?.type]}?id=${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.name}
                           </Link>
                        ),
                        type: <span className="text-[14px]">{data?.type}</span>,
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
                  onSort={(params) => {}}
                  onPagination={(param) => console.log(param)}
               />
            </Card>
         </div>
      </div>
   );
}
