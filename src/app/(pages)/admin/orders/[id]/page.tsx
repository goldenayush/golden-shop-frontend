"use client"
import React, { useState } from "react";
import { Card, PageHeader } from "@/shared/components";
import { ImRadioChecked } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import useSingleOrderController from "./single-order.controller";
import { Badge } from "@/shared/ui";
import { FaRegCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { formatDateTime } from "@/shared/functions/format-date-time";

export default function SingleOrderPage() {
   const params = useParams();
   const { orderById, cancelOrder } = useSingleOrderController();

   const [showCancelModal, setShowCancelModal] = useState(false);
   const [cancelReason, setCancelReason] = useState("");
   const [cancelError, setCancelError] = useState("");

   const handleCancelOrder = () => {
      setShowCancelModal(true);
   };

   const handleModalCancel = () => {
      setShowCancelModal(false);
      setCancelReason("");
      setCancelError("");
   };

   const handleModalConfirm = () => {
      // if (cancelReason.trim() === "") {
      //    setCancelError("Please provide a reason for cancellation.");
      //    return;
      // }
      cancelOrder();
      setShowCancelModal(false);
      setCancelReason("");
      setCancelError("");
   };


   return (
      <div className="p-7">
         {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
               <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
                  <button
                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                     onClick={handleModalCancel}
                     aria-label="Close"
                  >
                     &times;
                  </button>
                  <h2 className="text-lg font-semibold mb-4"> Are you sure you want to cancel this order?</h2>
                  {/* <label className="block text-sm mb-2">Reason for cancellation</label> */}
                  {/* <textarea
                     className="w-full border border-gray-300 rounded p-2 mb-2 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#008060]"
                     value={cancelReason}
                     onChange={e => {
                        setCancelReason(e.target.value);
                        if (cancelError) setCancelError("");
                     }}
                  />
                  {cancelError && (
                     <div className="text-red-600 text-sm mb-4">{cancelError}</div>
                  )} */}
                  <div className="flex justify-end gap-3 mt-2">
                     <button
                        className="border border-gray-300 rounded px-5 py-2 text-gray-700 bg-white hover:bg-gray-100"
                        onClick={handleModalCancel}
                        type="button"
                     >
                        Cancel
                     </button>
                     <button
                        className="bg-[#008060] hover:bg-[#006E52] text-white rounded px-5 py-2 font-semibold"
                        onClick={handleModalConfirm}
                        type="button"
                     >
                        Cancel Order
                     </button>
                  </div>
               </div>
            </div>
         )}
         <PageHeader
            backLink="/admin/orders"
            heading={
               <span className="flex gap-3">
                  Editing {orderById?.id}{" "}
                  <Badge //
                     title="New"
                     bg="#E4E5E7"
                     color="#202223"
                     iconBefore={<FaRegCircle size={10} />}
                  />
               </span>
            }
            extra={
               <button onClick={handleCancelOrder} type="button" className="bg-[#d72c0d] hover:bg-[#bc2200] py-[7px] px-[16px] rounded-[3px] text-[14px] text-white cursor-pointer">
                  Cancel Order
               </button>
            }
         />
         <div className="grid grid-cols-12 gap-2">
            {/* ==================left side===================== */}
            {orderById?.OrderItem?.map((item: any) => (
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
                              <span className="font-semibold">{item.productName}</span>
                           </span>
                           <span className="block text-[14px] text-[#687280]">
                              <span className="font-semibold">SKU</span>:
                              {item.productSku}
                           </span>
                           <span className="block text-[14px]">
                              <span className="font-semibold">Size</span>:
                           </span>
                           <span className="block text-[14px]">
                              <span className="font-semibold">Color</span>:
                           </span>
                        </div>
                        <div className="basis-[20%] text-end">
                           <span className="block text-[14px]">{item?.product?.price} x {item?.qty}</span>
                        </div>
                        <div className="basis-[20%] text-end">
                           <span className="block text-[14px]">₹{(item?.product?.price || 0) * (item?.qty || 0)}</span>
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
                           <span className="text-[14px] block mb-2">{item?.qty} items</span>
                           <span className="text-[14px] block mb-2">TestMethod</span>
                        </div>
                        <div className="basis-128 text-end">
                           <span className="text-[14px] block mb-2">{(item?.product?.price || 0) * (item?.qty || 0)}</span>
                           <span className="text-[14px] block mb-2">{item?.shippingTaxAmount || 0}</span>
                           <span className="text-[14px] block mb-2">{item?.discountAmount}</span>
                           <span className="text-[14px] block mb-2">{orderById?.totalTaxAmount}</span>
                           <span className="text-[14px] block mb-2">{orderById?.subTotal}</span>
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
                                 {(() => {
                                    const f = formatDateTime(orderById?.updatedAt); return (
                                       <>
                                          <span className="text-[14px] block text-[#8c9196] mb-1">{f.date}</span>
                                          <span className="text-[14px] block text-[#8c9196] mb-3">{f.time}</span>
                                       </>
                                    );
                                 })()}
                                 <span className="text-[14px]">Order created</span>
                                 <span className="block italic text-[#8c919] text-[12px]">Customer was notified</span>
                              </div>
                              {/* Remove hardcoded time */}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
            {/* ==================right side===================== */}
            <div className="col-span-4">
               {/* Customer notes */}
               <Card className="p-4 mt-4" heading="Customer notes">
                  <p className="mt-4 text-[14px] text-[#8c9196]">No notes from customer</p>
               </Card>
               {/* Customer */}
               <Card className="mt-4">
                  <div className="p-3">
                     <h3 className="text-[16px] font-semibold">Customer</h3>
                     <p className="mt-4 text-[14px] text-blue-500  hover:underline cursor-pointer">{orderById?.customerFullName}</p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Contact information</span>
                     <p className="text-[14px] text-blue-500  hover:underline cursor-pointer mt-3">{orderById?.customerEmail}</p>
                     <p className="text-[14px]">
                        {orderById?.shippingAddress?.telephone}</p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Shipping Address</span> <br />
                     <p className="text-[14px] mt-3 block">
                        {orderById?.shippingAddress?.address1}
                        <br />
                        {orderById?.shippingAddress?.address2}
                        <br />
                        {orderById?.shippingAddress?.postcode
                        },{orderById?.shippingAddress?.city} <br />
                        {orderById?.shippingAddress?.province}, {orderById?.shippingAddress?.country} <br />
                        {orderById?.shippingAddress?.telephone}
                     </p>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                     <span className="text-[12px] uppercase font-semibold">Billing address</span>
                     <p className="text-[14px] mt-3 block">
                        {orderById?.billingAddress?.address1} <br />
                        {orderById?.billingAddress?.address2} <br />
                        {orderById?.billingAddress?.postcode}, {orderById?.billingAddress?.city} <br />
                        {orderById?.billingAddress?.province}, {orderById?.billingAddress?.country} <br />
                        {orderById?.billingAddress?.telephone}
                     </p>
                  </div>
               </Card>
            </div>
         </div >
      </div >
   );
}
