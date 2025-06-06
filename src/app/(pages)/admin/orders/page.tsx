"use client";
import React from "react";
import useOrdersController from "./orders.controller";
import { Card, PageHeader, Table } from "@/shared/components";
import Link from "next/link";
import { Badge, Dropdown } from "@/shared/ui";
import { FaCaretUp, FaCircle, FaRegCircle } from "react-icons/fa";

export default function OrdersPage() {
   const ctrl = useOrdersController();
   console.log(ctrl.orders);
   return (
      <div className="p-7">
         <PageHeader heading="Orders" />
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
                           { value: "pending", label: "Pending" },
                           { value: "paid", label: "Paid" },
                           { value: "canceled", label: "Canceled" },
                           { value: "authorized", label: "Authorized" },
                           { value: "failed", label: "Failed" },
                           { value: "refunded", label: "Refunded" },
                           { value: "partial_refunded", label: "Partial Refunded" },
                        ]}
                        Component={(props) => (
                           <span className="flex items-center gap-2 border-b px-2 border-gray-300 w-[130px] justify-between">
                              <span className="text-xs font-semibold capitalize">{props.value ? props.value : "Payment status"}</span>
                              <FaCaretUp size={10} style={{ rotate: props.isShow ? "180deg" : "0deg" }} />
                           </span>
                        )}
                        OptionComponent={(props) => (
                           <div className="text-xs font-semibold capitalize block py-1">
                              {/*  */}
                              {props.label}
                              {/*  */}
                           </div>
                        )}
                        onChange={(value) => {}}
                     />
                  </div>
                  <div>
                     <Dropdown //
                        options={[
                           { value: "pending", label: "Pending" },
                           { value: "processing", label: "Processing" },
                           { value: "shipped", label: "Shipped" },
                           { value: "delivered", label: "Delivered" },
                           { value: "canceled", label: "Canceled" },
                           { value: "refunded", label: "Refunded" },
                        ]}
                        Component={(props) => (
                           <span className="flex items-center gap-2 border-b px-2 border-gray-300 w-[130px] justify-between">
                              <span className="text-xs font-semibold capitalize">{props.value ? props.value : "Shipment status"}</span>
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
                  <Link href="/admin/products" className="text-[14px] text-blue-500 hover:underline" replace>
                     Clear Filter
                  </Link>
               </div>
            </div>
            <Table //
               checkable
               checkEventList={[
                  {
                     label: "Mark as shipped",
                     event: (param: any[]) => console.log(param), //
                  },
               ]}
               colums={[
                  { label: "Order Number", key: "order_number", sort: true }, //
                  { label: "Date", key: "date", sort: true }, //
                  { label: "Customer Email", key: "customer_email", sort: true },
                  { label: "Shipment Status", key: "shipment_status", sort: true },
                  { label: "Payment Status", key: "payment_status", sort: true },
                  { label: "Total", key: "total", sort: true },
               ]}
               dataList={ctrl.orders.map((data) => ({
                  id: data.id,
                  order_number: (
                     <Link href={`/admin/orders/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                        #{data?.order_number}
                     </Link>
                  ),
                  date: (
                     <span className="text-[14px]">
                        <span>{data.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                     </span>
                  ),
                  customer_email: (
                     <span className="text-[14px]">
                        <span>{data?.customer_email}</span>
                     </span>
                  ),
                  shipment_status: (
                     <>
                        {data?.shipment_status !== "pending" ? (
                           <Badge //
                              title={data?.shipment_status}
                              bg="#aee9d1"
                              color="#202223"
                              iconBefore={<FaCircle size={10} color="#007f5f" />}
                           />
                        ) : (
                           <Badge //
                              title={data?.shipment_status}
                              bg="#E4E5E7"
                              color="#202223"
                              iconBefore={<FaRegCircle size={10} />}
                           />
                        )}
                     </>
                  ),
                  payment_status: (
                     <>
                        {data?.payment_status === "paid" ? (
                           <Badge //
                              title={data?.payment_status}
                              bg="#aee9d1"
                              color="#202223"
                              iconBefore={<FaCircle size={10} color="#007f5f" />}
                           />
                        ) : (
                           <Badge //
                              title={data?.payment_status}
                              bg="#E4E5E7"
                              color="#202223"
                              iconBefore={<FaRegCircle size={10} />}
                           />
                        )}
                     </>
                  ),
                  total: <span className="text-[14px]">₹{data?.total}</span>,
               }))}
               onSort={(param) => {
                  console.log(param);
               }}
            />
         </Card>
      </div>
   );
}
