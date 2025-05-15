"use client";
import { Card, Modal, Table } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useAttributesController from "./attributes.controller";
import { TextField } from "@/shared/ui";
import { IoClose } from "react-icons/io5";

export default function AttributesPage() {
   const ctrl = useAttributesController();
   return (
      <div className="p-7">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-semibold">Attributes</h3>
            <Link href={"/admin/attributes/create-attribute"} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               New Attribute
            </Link>
         </div>
         <div>
            <Card className="bg-white">
               <div className="flex items-center justify-between p-4">
                  <input //
                     type="text"
                     className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                     placeholder="Search"
                  />
                  <div>
                     <Link href="/admin/attributes" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>
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
                     { label: "Attribute Name", key: "name", sort: true }, //
                     { label: "groups", key: "groups" },
                     { label: "type", key: "type", sort: true },
                     { label: "Is Required?", key: "isRequired", sort: true },
                     { label: "Is Filterable?", key: "isFilterable", sort: true },
                  ]}
                  dataList={ctrl.attributes.map((item) => ({
                     id: item.id,
                     name: (
                        <Link href={`/admin/attributes/${item?.id}`} className="text-[14px] font-semibold hover:underline">
                           {item?.name}
                        </Link>
                     ),
                     groups: (
                        <>
                           <button
                              type="button"
                              className="text-blue-500 cursor-pointer hover:underline capitalize"
                              onClick={() => {
                                 ctrl.modalRef?.current?.setIsOpen(true);
                              }}>
                              {item.groups}
                           </button>
                           <Modal ref={ctrl.modalRef} size="lg" closeable>
                              <div className="p-4">
                                 <div className="flex items-center justify-between mb-4">
                                    <span className="text-[16px] font-semibold">Editing Default</span>
                                    <IoClose //
                                       className="cursor-pointer"
                                       size={22}
                                       onClick={() => ctrl.modalRef?.current?.setIsOpen(false)}
                                    />
                                 </div>
                                 <div>
                                    <TextField />
                                 </div>
                                 <hr className="border-t border-gray-300 my-5" />
                                 <div className="flex justify-end gap-2 mt-3">
                                    <button
                                       type="button"
                                       className="bg-[#d72c0d] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer"
                                       onClick={() => ctrl.modalRef?.current?.setIsOpen(false)}>
                                       Cancel
                                    </button>
                                    <button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                                       Save
                                    </button>
                                 </div>
                              </div>
                           </Modal>
                        </>
                     ),
                     type: item.type,
                     isRequired: item.isRequired ? "Yes" : "No",
                     isFilterable: item.isFilterable ? "Yes" : "No",
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
