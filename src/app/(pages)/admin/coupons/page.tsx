"use client";
import React from "react";
import useCouponsController from "./coupons.controller";
import Link from "next/link";
import { Card, PageHeader, Table } from "@/shared/components";
import { Dropdown } from "@/shared/ui";
import { FaCaretUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export default function CouponsPage() {
   const ctrl = useCouponsController();
   return (
      <div className="p-7">
         <PageHeader
            heading="Coupons"
            action={{
               link: "/admin/coupons/create-coupon",
               title: "New Coupons",
            }}
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
                     <div>
                        <Dropdown //
                           options={[
                              { value: "1", label: "Free shipping" }, //
                              { value: "0", label: "No free shipping" }, //
                           ]}
                           Component={(props) => (
                              <span className="flex items-center gap-2 border-b px-2 border-gray-300 w-[150px] justify-between">
                                 <span className="text-xs font-semibold capitalize">{props.value ? props.value : "Free shipping?"}</span>
                                 <FaCaretUp size={10} style={{ rotate: props.isShow ? "180deg" : "0deg" }} />
                              </span>
                           )}
                           OptionComponent={(props) => (
                              <span className="text-xs font-semibold capitalize">
                                 {/*  */}
                                 {props.label}
                              </span>
                           )}
                           onChange={(value) => {}}
                        />
                     </div>
                  </div>
                  <div>
                     <Link href="/admin/coupons" className="text-[14px] text-blue-500 hover:underline" replace>
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
                     { key: "code", label: "Coupon Code", sort: true }, //
                     { key: "start_date", label: "Start Date" },
                     { key: "end_date", label: "End Date" },
                     { key: "status", label: "Status", sort: true },
                     { key: "used_times", label: "Used Times", sort: true },
                  ]}
                  dataList={ctrl.coupons?.map((data) => {
                     return {
                        id: data.id,
                        code: (
                           <Link href={`/admin/coupons/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                              {data?.code}
                           </Link>
                        ),
                        start_date: <span className="text-[14px]">{data?.start_date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>,
                        end_date: <span className="text-[14px]">{data?.end_date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>,
                        status: (
                           <span className="text-[14px]">
                              {data?.status === 1 ? ( //
                                 <GoDotFill size={20} color="#aee9d1" />
                              ) : (
                                 <GoDotFill size={20} color="#cecece" />
                              )}
                           </span>
                        ),
                        used_times: <span className="text-[14px]">{data?.used_times}</span>,
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
