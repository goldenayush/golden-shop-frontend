"use clinet";
import { Card, PageHeader } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useSingleCustomerController from "./single-customer.controller";

export default function SingleCustomerPage() {
   const ctrl = useSingleCustomerController();
   return (
      <div className="p-7">
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
               <PageHeader backLink="/admin/customers" heading="Editing [user]" />
            </div>
            <div className="col-span-12 lg:col-span-8">
               <Card heading={<span className="px-3">Order History</span>} className="py-3">
                  <div className="overflow-x-auto">
                     <div className="w-[600px] md:w-full bg-white">
                        {ctrl.meOrders?.map((order, idx) => {
                           const showHr = ctrl.meOrders?.length - 1 > idx;
                           return (
                              <React.Fragment key={`meOrder-${idx}`}>
                                 <div className="flex justify-between px-3">
                                    <div className="text-[14px]">
                                       <Link href="/admin/orders/1" className="text-blue-600 cursor-pointer font-semibold hover:underline">
                                          #{order.order_number}
                                       </Link>
                                    </div>
                                    <div className="text-[14px]">Feb 18, 2025</div>
                                    <div className="text-[14px]">{order.payment_status}</div>
                                    <div className="text-[14px]">{order.order_status}</div>
                                    <div className="text-[14px]">₹{order.price}.00</div>
                                 </div>
                                 {showHr && <hr className="border-t border-gray-300 my-4" />}
                              </React.Fragment>
                           );
                        })}
                     </div>
                  </div>
               </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
               <Card className="py-3">
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Full Name</div>
                     <div className="text-[14px]">alex costa</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Email</div>
                     <div className="text-[14px]">tina@gmail.com</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Group</div>
                     <div className="text-[14px]">Default</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Status</div>
                     <div className="text-[14px]">Enabled</div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}
