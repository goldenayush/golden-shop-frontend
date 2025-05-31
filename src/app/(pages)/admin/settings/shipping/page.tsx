"use client";
import { Card, Modal } from "@/shared/components";
import { Button } from "@/shared/ui";
import React, { useRef } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import ShippingZoneForm from "./partials/shipping-zone.form";
import ShippingMethodForm from "./partials/shipping-method.form";

export default function ShippingPage() {
   const shippingZoneModalRef = useRef<any>(null);
   const shippingMethodModalRef = useRef<any>(null);

   return (
      <Card className="py-4">
         <div className="p-4">
            <h5 className="text-[12px] uppercase font-semibold block mb-3">Shipping</h5>
            <p className="text-[14px]">Choose where you ship and how much you charge for shipping.</p>
         </div>
         <hr className="border-t border-gray-300" />
         <React.Fragment>
            <div className="p-4">
               <div className="flex items-center gap-3 mb-3">
                  <button type="button" className="text-[12px] uppercase font-semibold">
                     UP Bihar
                  </button>
                  <button type="button" className="text-[12px] uppercase font-semibold text-blue-400 cursor-pointer" onClick={() => shippingZoneModalRef.current.setIsOpen(true)}>
                     Edit Zone
                  </button>
                  <button type="button" className="text-[12px] uppercase font-semibold text-red-400 cursor-pointer">
                     Remove Zone
                  </button>
               </div>
               <div className="flex items-center gap-6 py-5 border border-gray-300">
                  <div className="w-[50px]">
                     <RiMapPin2Fill size={25} color="#008060" className="mx-auto" />
                  </div>
                  <div>
                     <span className="text-[14px] font-semibold">India</span>
                     <p className="text-[14px]">Delhi, Haryana, Chandigarh</p>
                  </div>
               </div>
               <div className="border border-gray-300 p-3">
                  <table className="min-w-full rounded-lg text-[14px]">
                     <thead className="border-b border-gray-300">
                        <tr>
                           <th className="text-left py-2 px-4">Method</th>
                           <th className="text-left py-2 px-4">Status</th>
                           <th className="text-left py-2 px-4">Cost</th>
                           <th className="text-left py-2 px-4">Condition</th>
                           <th className="text-left py-2 px-4">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="py-2 px-4">Free shipping above 1000</td>
                           <td className="py-2 px-4">Enabled</td>
                           <td className="py-2 px-4">
                              <MdOutlineSettings size={22} className="text-blue-500 cursor-pointer" onClick={() => shippingMethodModalRef.current.setIsOpen(true)} />
                           </td>
                           <td className="py-2 px-4">{`1 <= price <= 1000`}</td>
                           <td className="py-2 px-4 flex gap-3">
                              <button type="button" className="text-[14px] text-blue-500 cursor-pointer" onClick={() => shippingMethodModalRef.current.setIsOpen(true)}>
                                 Edit
                              </button>
                              <button type="button" className="text-[14px] text-red-500 cursor-pointer">
                                 Delete
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <Modal size="lg" ref={shippingMethodModalRef}>
                     <ShippingMethodForm //
                        onClose={() => shippingMethodModalRef.current.setIsOpen(false)}
                     />
                  </Modal>
                  <button type="button" className="text-[#2c6ecb] text-[14px] cursor-pointer" onClick={() => shippingMethodModalRef.current.setIsOpen(true)}>
                     + Add Method
                  </button>
               </div>
            </div>
            <hr className="border-t border-gray-300" />
         </React.Fragment>
         <Modal size="lg" ref={shippingZoneModalRef}>
            <ShippingZoneForm //
               onClose={() => shippingZoneModalRef.current.setIsOpen(false)}
            />
         </Modal>
         <div className="px-4 pt-4">
            <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" onClick={() => shippingZoneModalRef.current.setIsOpen(true)}>
               Create new shipping zone
            </Button>
         </div>
      </Card>
   );
}
