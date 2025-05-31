import React from "react";
import { Card, PageHeader } from "@/shared/components";
import { ImRadioChecked } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import useSingleOrderController from "./single-order.controller";
import { Badge } from "@/shared/ui";
import { FaRegCircle } from "react-icons/fa";

export default function SingleOrderPage() {
   const ctrl = useSingleOrderController();
   return (
      <div className="p-7">
         <PageHeader
            backLink="/admin/orders"
            heading={
               <span className="flex gap-3">
                  Editing #10001{" "}
                  <Badge //
                     title="New"
                     bg="#E4E5E7"
                     color="#202223"
                     iconBefore={<FaRegCircle size={10} />}
                  />
               </span>
            }
            extra={
               <button type="button" className="bg-[#d72c0d] hover:bg-[#bc2200] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                  Cancel Order
               </button>
            }
         />
         <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
               {/* Pending */}
               <Card
                  className="p-4 mt-4"
                  heading={
                     <span className="flex item-center gap-3">
                        <ImRadioChecked size={25} className="border-4 border-gray-100 rounded-full" />
                        <span>Pending</span>
                     </span>
                  }>
                  <div className="flex items-center">
                     <div className="basis-[60px]">
                        <span className="relative">
                           <img src="http://admin.mrvcreations.in/assets/catalog/1955/8330/img-gopal5-thumb.png" alt="ing" height={38} width={38} className="border border-gray-300" />
                           <span className="text-[12px] bg-gray-100 w-[20px] h-[20px] flex justify-center items-center rounded-full absolute -top-2 right-1">1</span>
                        </span>
                     </div>
                     <div className="basis-[50%]">
                        <span className="block text-[14px]">
                           <span className="font-semibold">Kanha Red Poshak</span>
                        </span>
                        <span className="block text-[14px] text-[#687280]">
                           <span className="font-semibold">SKU</span>: K-2
                        </span>
                        <span className="block text-[14px]">
                           <span className="font-semibold">Size</span>: 6
                        </span>
                        <span className="block text-[14px]">
                           <span className="font-semibold">Color</span>: Orange
                        </span>
                     </div>
                     <div className="basis-[20%] text-end">
                        <span className="block text-[14px]">₹270.00 x 1</span>
                     </div>
                     <div className="basis-[20%] text-end">
                        <span className="block text-[14px]">₹270.00</span>
                     </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200 mt-3 flex justify-end gap-2">
                     <button type="button" className="bg-[#008060] hover:bg-[#006E52] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                        Edit Tracking Info
                     </button>
                     <button type="button" className="bg-[#008060] hover:bg-[#006E52] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                        Mark Delivered
                     </button>
                     <button type="button" className="bg-[#008060] hover:bg-[#006E52] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                        Track shipment
                     </button>
                     <button type="button" className="bg-[#008060] hover:bg-[#006E52] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                        Ship Items
                     </button>
                  </div>
               </Card>
               {/* Paid - Phone */}
               <Card
                  className="p-4 mt-3"
                  heading={
                     <span className="flex item-center gap-2">
                        <ImRadioChecked size={25} className="border-4 border-gray-100 rounded-full" />
                        <span>Paid - Cash On Delivery</span>
                     </span>
                  }>
                  <div className="flex flex-row text-[#202223]">
                     <div className="basis-64 capitalize">
                        <span className="text-[14px] block mb-2">Subtotal</span>
                        <span className="text-[14px] block mb-2">Shipping</span>
                        <span className="text-[14px] block mb-2">Discount</span>
                        <span className="text-[14px] block mb-2">Tax</span>
                        <span className="text-[14px] block mb-2">Total</span>
                     </div>
                     <div className="basis-64">
                        <span className="text-[14px] block mb-2">1 items</span>
                        <span className="text-[14px] block mb-2">TestMethod</span>
                     </div>
                     <div className="basis-128 text-end">
                        <span className="text-[14px] block mb-2">₹270.00</span>
                        <span className="text-[14px] block mb-2">₹32.00</span>
                        <span className="text-[14px] block mb-2">₹0.00</span>
                        <span className="text-[14px] block mb-2">₹0.00</span>
                        <span className="text-[14px] block mb-2">₹302.00</span>
                     </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200 mt-3 text-end">
                     <button type="button" className="bg-[#008060] hover:bg-[#006E52] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                        Capture
                     </button>
                  </div>
               </Card>
               {/* Activities */}
               <div>
                  <h3 className="text-[16px] font-semibold mt-5">Activities</h3>
                  <hr className="border-t border-gray-300 my-4" />
                  {[1, 2].map((_, idx) => (
                     <div key={`sefg12d-${idx}`} className="border-l-2 border-[#e1e3e5] h-[130px] relative">
                        <div className="flex items-center absolute w-full bottom-2 left-[-10px] ">
                           <GoDotFill color="#8c9196" size={20} className="p-[2px] bg-[#F6F6F7] absolute top-9" />
                           <div className="flex-[1_1_auto] px-10">
                              <span className="text-[14px] block text-[#8c9196] mb-3">Mar 18</span>
                              <span className="text-[14px]">Order created</span>
                              <span className="block italic text-[#8c919] text-[12px]">Customer was notified</span>
                           </div>
                           <span className="text-[14px] block text-[#8c9196]">8:13 AM</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="col-span-4">
               {/* Customer notes */}
               <Card className="p-4 mt-4" heading="Customer notes">
                  <p className="mt-4 text-[14px] text-[#8c9196]">No notes from customer</p>
               </Card>
               {/* Customer */}
               <Card className="mt-4">
                  <div className="p-3">
                     <h3 className="text-[16px] font-semibold">Customer</h3>
                     <p className="mt-4 text-[14px] text-blue-500  hover:underline cursor-pointer">alex jon</p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Contact information</span>
                     <p className="text-[14px] text-blue-500  hover:underline cursor-pointer mt-3">ritesh.g@goldeneagle.ai</p>
                     <p className="text-[14px]">9783664664</p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Shipping Address</span>
                     <p className="text-[14px] mt-3 block">
                        alvarado tom <br />
                        time square <br />
                        452121, indore <br />
                        Madhya Pradesh, India <br />
                        9746778336
                     </p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Billing address</span>
                     <p className="text-[14px] mt-3 block">
                        alvarado tom <br />
                        time square <br />
                        452121, indore <br />
                        Madhya Pradesh, India <br />
                        9746778336
                     </p>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}
