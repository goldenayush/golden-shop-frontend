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
                           onChange={(value) => {}}
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
                  ]}
                  colums={[
                     { key: "fullname", label: "Full Name", sort: true }, //
                     { key: "email", label: "Email", sort: true },
                     { key: "status", label: "Status" },
                     { key: "created_at", label: "Created At", sort: true },
                  ]}
                  dataList={ctrl.customers?.map((data) => {
                     return {
                        id: data.id,
                        fullname: (
                           <Link href={`/admin/customers/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.fullname}
                           </Link>
                        ),
                        email: <span className="text-[14px]">{data?.email}</span>,

                        status: (
                           <span className="text-[14px]">
                              {data?.status === 1 ? ( //
                                 <GoDotFill size={20} color="#aee9d1" />
                              ) : (
                                 <GoDotFill size={20} color="#cecece" />
                              )}
                           </span>
                        ),
                        created_at: <span className="text-[14px]">{data?.created_at.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>,
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
