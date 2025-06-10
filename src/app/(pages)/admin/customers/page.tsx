"use client";
import { Card, PageHeader, Table } from "@/shared/components";
import { Dropdown } from "@/shared/ui";
import Link from "next/link";
import React from "react";
import { FaCaretUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import useCustomersController from "./customers.controller";

export default function CustomersPage() {
   const ctrl = useCustomersController();
   return (
      <div className="p-7">
         <PageHeader heading="Customers" />
         <div>
            <Card className="bg-white">
               {/*--------------filter--------------------*/}
               <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                     <input //
                        type="text"
                        className="border border-gray-300 rounded-sm text-[12px] px-3 py-1 placeholder:text-[12px] placeholder:font-semibold"
                        placeholder="Search"
                        value={ctrl.debounce.searchKey}
                        onChange={ctrl.debounce.onSearchChange}
                     />
                     <div>
                        <Dropdown //
                           options={[
                              { value: "true", label: "enabled" }, //
                              { value: "false", label: "disabled" }, //
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
                     </div>
                  </div>
                  <div>
                     <Link href="/admin/customers" className="text-[14px] text-blue-500 hover:underline" replace>
                        Clear Filter
                     </Link>
                  </div>
               </div>

               {/*--------------table--------------------*/}
               <Table
                  loading={ctrl.getCustomers.isLoading}
                  checkable
                  checkEventList={[
                     {
                        loading: ctrl.updateCustomerStatus.isLoading,
                        label: "Disable",
                        event: (ids: string[]) => ctrl.onUpdateCustomerStatus({ status: false, ids }), //
                     },
                     {
                        loading: ctrl.updateCustomerStatus.isLoading,
                        label: "Enable",
                        event: (ids: string[]) => ctrl.onUpdateCustomerStatus({ status: true, ids }),
                     },
                  ]}
                  colums={[
                     { key: "fullName", label: "Full Name", sort: true }, //
                     { key: "email", label: "Email", sort: true },
                     { key: "status", label: "Status" },
                     { key: "createdAt", label: "Created At", sort: true },
                  ]}
                  dataList={ctrl.getCustomers?.data?.map((data) => {
                     return {
                        id: data.id,
                        fullName: (
                           <Link href={`/admin/customers/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.fullName || "N/A"}
                           </Link>
                        ),
                        email: <span className="text-[14px]">{data?.email}</span>,

                        status: (
                           <span className="text-[14px]">
                              {data?.status ? ( //
                                 <GoDotFill size={20} color="#aee9d1" />
                              ) : (
                                 <GoDotFill size={20} color="#cecece" />
                              )}
                           </span>
                        ),
                        createdAt: (
                           <span className="text-[14px]">
                              {/*  */}
                              {new Date(data?.createdAt)?.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                           </span>
                        ),
                     };
                  })}
                  onSort={(params) => ctrl.setParam(params)}
                  pagination={{
                     totalPages: ctrl.getCustomers?.pagination?.totalPages,
                     page: ctrl.getCustomers?.pagination?.page,
                     limit: ctrl.getCustomers?.pagination?.limit,
                     total: ctrl.getCustomers?.pagination?.total,
                     onPagination(page) {
                        ctrl.setParam(page);
                     },
                  }}
               />
            </Card>
         </div>
      </div>
   );
}
