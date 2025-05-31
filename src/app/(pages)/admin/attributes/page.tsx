"use client";
import { Card, PageHeader, Table } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useAttributesController from "./attributes.controller";
import RenameModalForm from "./partials/Rename.form";

export default function AttributesPage() {
   const ctrl = useAttributesController();
   return (
      <div className="p-7">
         <PageHeader //
            heading="Attributes"
            action={{ link: "/admin/attributes/create-attribute", title: "New Attribute" }}
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
                     <Link href="/admin/attributes" className="text-[14px] text-blue-500 hover:underline" replace>
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
                     { label: "Attribute Name", key: "attributeName", sort: true }, //
                     { label: "groups", key: "groups" },
                     { label: "type", key: "type", sort: true },
                     { label: "Is Required?", key: "isRequired", sort: true },
                     { label: "Is Filterable?", key: "isFilterable", sort: true },
                  ]}
                  dataList={ctrl.data.map((item) => {
                     const attributeGroup = item?.AttributeGroupAttribute?.[0].attributeGroup;
                     return {
                        id: item.id,
                        attributeName: (
                           <Link href={`/admin/attributes/${item?.id}`} className="text-[14px] font-semibold hover:underline">
                              {item?.attributeName}
                           </Link>
                        ),
                        groups: (
                           <RenameModalForm //
                              patchValue={attributeGroup?.groupName}
                              loading={ctrl.renameGroup.isLoading}
                              title={attributeGroup?.groupName}
                              onSubmit={(fields) => {
                                 ctrl.onRenameGroup({
                                    ...fields,
                                    attributeGroupId: attributeGroup?.id,
                                    itemId: item?.id,
                                 });
                              }}
                           />
                        ),
                        type: item.type,
                        isRequired: item.isRequired ? "Yes" : "No",
                        isFilterable: item.isFilterable ? "Yes" : "No",
                     };
                  })}
                  onSort={(param) => {
                     ctrl.setParam(param);
                  }}
                  pagination={{
                     currentPage: ctrl.pagination?.currentPage,
                     totalPages: ctrl.pagination?.totalPages,
                     totalRecords: ctrl.pagination?.totalCount,
                     limit: ctrl.pagination?.limit,
                     onPagination(param: any) {
                        ctrl.setParam(param);
                     },
                  }}
               />
            </Card>
         </div>
      </div>
   );
}
