
"use client";
import React from "react";
import useOrdersController from "./orders.controller";
import { Card, Loading, PageHeader, Table } from "@/shared/components";
import Link from "next/link";
import { Badge, Dropdown } from "@/shared/ui";
import { FaCaretUp, FaCircle, FaRegCircle } from "react-icons/fa";

export default function OrdersPage() {
   const { orders, isLoading, setParam, debounce } = useOrdersController();
   if (isLoading) return <Loading />;
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
                     value={debounce?.searchKey}
                     onChange={debounce?.onSearchChange}
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
                        onChange={(value) => setParam({ status: value })}
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
                        onChange={(value) => setParam({ productType: value })}
                     />
                  </div>
               </div>
               <div>
                  <Link href="/admin/orders" className="text-[14px] text-blue-500 hover:underline" replace>
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
               dataList={(orders ?? []).map((data: any) => ({
                  id: data.id,
                  order_number: (
                     <Link href={`/admin/orders/${data?.id}`} className="text-[14px] font-semibold hover:underline">
                        #{data?.id}
                     </Link>
                  ),
                  date: (
                     <span className="text-[14px]">
                        {/* <span>{data.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span> */}
                        {new Date(data?.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                     </span>
                  ),
                  customer_email: (
                     <span className="text-[14px]">
                        <span>{data.customerEmail
                        }</span>
                     </span>
                  ),
                  shipment_status: (
                     <>
                        {data?.shipment_status !== "pending" ? (
                           <Badge //
                              title={data?.shipmentStatus}
                              bg="#aee9d1"
                              color="#202223"
                              iconBefore={<FaCircle size={10} color="#007f5f" />}
                           />
                        ) : (
                           <Badge //
                              title={data?.shipmentStatus}
                              bg="#E4E5E7"
                              color="#202223"
                              iconBefore={<FaRegCircle size={10} />}
                           />
                        )}
                     </>
                  ),
                  payment_status: (
                     <>
                        {data?.paymentStatus === "paid" ? (
                           <Badge //
                              title={data?.paymentStatus}
                              bg="#aee9d1"
                              color="#202223"
                              iconBefore={<FaCircle size={10} color="#007f5f" />}
                           />
                        ) : (
                           <Badge //
                              title={data?.paymentStatus}
                              bg="#E4E5E7"
                              color="#202223"
                              iconBefore={<FaRegCircle size={10} />}
                           />
                        )}
                     </>
                  ),
                  total: <span className="text-[14px]">₹{data?.grandTotal}</span>,
               }))}
               onSort={(param) => setParam(param)}
               pagination={{
                  page: 1,
                  totalPages: 3,
                  total: 112,
                  limit: 12,
                  onPagination(param) {
                     setParam(param);
                  },
               }}
            />
         </Card>
      </div>
   );
}
