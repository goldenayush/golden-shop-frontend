"use client";
import { Card, Loading, Modal } from "@/shared/components";
import { Button } from "@/shared/ui";
import React, { useRef } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import ShippingZoneForm from "./partials/shipping-zone.form";
import ShippingMethodForm from "./partials/shipping-method.form";
import useShippingController from "./shipping.controller";
import { truncate } from "@/shared/pipes";

export default function ShippingPage() {
   const ctrl = useShippingController();

   return (
      <Card className="py-4">
         <div className="p-4">
            <h5 className="text-[12px] uppercase font-semibold block mb-3">Shipping</h5>
            <p className="text-[14px]">Choose where you ship and how much you charge for shipping.</p>
         </div>
         <hr className="border-t border-gray-300" />
         {ctrl.getShippingZones.isLoading || ctrl.createShippingZone.isLoading ? (
            <Loading className="h-[200px]" />
         ) : (
            <React.Fragment>
               {ctrl.getShippingZones?.data?.length ? ( //
                  <React.Fragment>
                     {ctrl.getShippingZones?.data?.map((data) => (
                        <React.Fragment key={data?.id}>
                           <div className="p-4">
                              <div className="flex items-center gap-3 mb-3">
                                 <button type="button" className="text-[12px] uppercase font-semibold">
                                    {data?.name}
                                 </button>
                                 <ShippingZoneForm
                                    onSubmit={(value, cb) => ctrl.onUpdateShippingZone(value, cb, data)}
                                    patchValue={data}
                                    Component={(props) => (
                                       <button {...props} type="button" className="text-[12px] uppercase font-semibold text-blue-400 cursor-pointer">
                                          Edit Zone
                                       </button>
                                    )}
                                 />

                                 <Button type="button" className="text-[12px] uppercase font-semibold text-red-400 cursor-pointer" onClick={() => ctrl.onDeleteShippingZone(data.id)}>
                                    Remove Zone
                                 </Button>
                              </div>
                              <div className="flex items-center gap-6 py-5 border border-gray-300">
                                 <div className="w-[50px]">
                                    <RiMapPin2Fill size={25} color="#008060" className="mx-auto" />
                                 </div>
                                 <div>
                                    <span className="text-[14px] font-semibold">{data.countryName}</span>
                                    <p className="text-[14px]">{truncate(data.shippingZoneProvince.map((s) => s.stateName).join(" , "), 40)}</p>
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
                                       {data?.shippingZoneMethod?.map((method) => (
                                          <tr key={method.id}>
                                             <td className="py-2 px-4">{method?.name}</td>
                                             <td className="py-2 px-4">{method?.isEnabled ? "Enabled" : "Disabled"}</td>
                                             <td className="py-2 px-4">
                                                {method.cost ? (
                                                   `₹${method.cost}`
                                                ) : (
                                                   <ShippingMethodForm //
                                                      loading={ctrl.updateMethoodZones.isLoading}
                                                      patchValue={method}
                                                      onSubmit={(body, callback) => {
                                                         ctrl.onUpdateMethoodZone(
                                                            {
                                                               zoneId: data.id,
                                                               ...body,
                                                            },
                                                            callback
                                                         );
                                                      }}
                                                      Component={(props) => (
                                                         <MdOutlineSettings //
                                                            {...(props as any)}
                                                            size={22}
                                                            className="text-blue-500 cursor-pointer"
                                                         />
                                                      )}
                                                   />
                                                )}
                                             </td>
                                             {!method.conditionType && ( //
                                                <td className="py-2 px-4">None</td>
                                             )}
                                             {method.conditionType === "priceBased" && ( //
                                                <td className="py-2 px-4">{`${method.min} <= price <= ${method.max}`}</td>
                                             )}
                                             {method.conditionType === "weightBased" && ( //
                                                <td className="py-2 px-4">{`${method.min} <= weight <= ${method.max}`}</td>
                                             )}

                                             <td className="py-2 px-4 flex gap-3">
                                                <ShippingMethodForm //
                                                   loading={ctrl.updateMethoodZones.isLoading}
                                                   patchValue={method}
                                                   onSubmit={(body, callback) => {
                                                      ctrl.onUpdateMethoodZone(
                                                         {
                                                            zoneId: data.id,
                                                            ...body,
                                                         },
                                                         callback
                                                      );
                                                   }}
                                                   Component={(props) => (
                                                      <button {...props} type="button" className="text-[14px] text-blue-500 cursor-pointer">
                                                         Edit
                                                      </button>
                                                   )}
                                                />
                                                <button
                                                   type="button"
                                                   className="text-[14px] text-red-500 cursor-pointer"
                                                   onClick={() => {
                                                      ctrl.onDeleteMethoodZones(method.id);
                                                   }}>
                                                   Delete
                                                </button>
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                                 <ShippingMethodForm //
                                    loading={ctrl.createMethoodZone.isLoading}
                                    onSubmit={(body, callback) => {
                                       ctrl.onCreateMethoodZone(
                                          {
                                             zoneId: data.id,
                                             ...body,
                                          },
                                          callback
                                       );
                                    }}
                                    Component={(props) => (
                                       <button {...props} type="button" className="text-[#2c6ecb] text-[14px] cursor-pointer">
                                          + Add Method
                                       </button>
                                    )}
                                 />
                              </div>
                           </div>
                           <hr className="border-t border-gray-300" />
                        </React.Fragment>
                     ))}
                  </React.Fragment>
               ) : (
                  <div className="p-4">Please Create shipping zone</div>
               )}
            </React.Fragment>
         )}

         <ShippingZoneForm //
            onSubmit={ctrl.onSubmit}
            loading={ctrl.createShippingZone.isLoading}
            Component={(props) => (
               <div className="px-4 pt-4">
                  <Button {...props} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     Create new shipping zone
                  </Button>
               </div>
            )}
         />
      </Card>
   );
}
