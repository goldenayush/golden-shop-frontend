"use client";
import { Card, Loading, PageHeader } from "@/shared/components";
import Link from "next/link";
import React from "react";
import useSingleCustomerController from "./single-customer.controller";

export default function SingleCustomerPage() {
   const ctrl = useSingleCustomerController();

   if (ctrl.getSingleCustomer.isLoading) {
      return <Loading className="h-[70vh] text-3xl" />;
   }

   const customer = ctrl.getSingleCustomer.data;

   if (!customer) {
      return null;
   }

   return (
      <div className="p-7">
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
               <PageHeader backLink="/admin/customers" heading={`Editing ${customer?.fullName}`} />
            </div>
            <div className="col-span-12 lg:col-span-8">
               <Card heading={<span className="px-3">Order History</span>} className="py-3">
                  {true ? (
                     <div className="overflow-x-auto">
                        <div className="w-[600px] md:w-full bg-white">
                           {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                              <React.Fragment key={`user-order-${idx}`}>
                                 <div className="flex justify-between px-3">
                                    <div className="text-[14px]">
                                       <Link href="/admin/orders/1" className="text-blue-600 cursor-pointer font-semibold hover:underline">
                                          #1123445
                                       </Link>
                                    </div>
                                    <div className="text-[14px]">Feb 18, 2025</div>
                                    <div className="text-[14px]">Paid</div>
                                    <div className="text-[14px]">Pending</div>
                                    <div className="text-[14px]">₹280.00</div>
                                 </div>
                                 <hr className="border-t border-gray-300 my-4" />
                              </React.Fragment>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <div className="px-3 mb-3">
                        <span className="text-[14px]">Customer does not have any order yet.</span>
                     </div>
                  )}
               </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
               <Card className="py-3">
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Full Name</div>
                     <div className="text-[14px]">{customer?.fullName}</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Email</div>
                     <div className="text-[14px]">{customer?.email}</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Group</div>
                     <div className="text-[14px]">{customer?.groupId || "--"}</div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="px-3">
                     <div className="text-[12px] uppercase font-semibold mb-1">Status</div>
                     <div className="text-[14px]">{customer?.status ? "Enabled" : "Disabled"}</div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}
