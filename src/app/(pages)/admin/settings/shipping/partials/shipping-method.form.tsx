"use client";
import { Card } from "@/shared/components";
import { Button, Radio, Switch, TextField } from "@/shared/ui";
import React, { useState } from "react";

type Props = {
   onClose?: () => void;
};
export default function ShippingMethodForm({ onClose }: Props) {
   const [shippingCostType, setShippingCostType] = useState("");
   const [condition, setCondition] = useState("");
   const [showCondition, setShowCondition] = useState(false);
   return (
      <Card heading={<span className="pl-5">Create a shipping zone</span>} className="py-4">
         <div className="px-5 flex items-end gap-3 w-full mt-7">
            <div>
               <span className="text-[12px] uppercase font-semibold block mb-3">Method name</span>
               <TextField //
                  placeholder="Method name"
                  className="min-w-[250px]"
                  suffixIcon={<button className="text-blue-500 text-[14px] cursor-pointer">Edit</button>}
               />
            </div>
            <Button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               Save
            </Button>
         </div>
         <div className="px-5 my-4">
            <span className="block text-[14px]">Status</span>
            <Switch eleSize="sm" />
         </div>
         <hr className="border-t border-gray-200 block" />
         <div className="px-5 my-4">
            <span className="text-[12px] uppercase font-semibold block mb-3">Setup shipping cost</span>
            <div className="grid grid-cols-1 gap-2">
               <Radio //
                  label="Flat rate"
                  name="setup_shipping_cost"
                  value="flat_rate"
                  onChange={(e) => setShippingCostType(e.target.value)}
               />
               <Radio //
                  label="Price based rate"
                  name="setup_shipping_cost"
                  value="price_based"
                  onChange={(e) => setShippingCostType(e.target.value)}
               />
               <Radio //
                  label="Weight based rate"
                  name="setup_shipping_cost"
                  value="weight_based"
                  onChange={(e) => setShippingCostType(e.target.value)}
               />
               <Radio //
                  label="API calculate"
                  name="setup_shipping_cost"
                  value="api_calculate"
                  onChange={(e) => setShippingCostType(e.target.value)}
               />
            </div>
            <div className="mt-3">
               {/* Flat rate */}
               {shippingCostType === "flat_rate" && (
                  <TextField //
                     placeholder="Shipping cost"
                  />
               )}

               {/* Price based rate */}
               {shippingCostType === "price_based" && (
                  <table className="min-w-full rounded-lg text-[14px]">
                     <thead className="border-b border-gray-300">
                        <tr>
                           <th className="text-left py-2 px-4">Min Price</th>
                           <th className="text-left py-2 px-4">Shipping Cost</th>
                           <th className="text-left py-2 px-4">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th className="text-left py-2 px-4 font-normal">
                              <TextField placeholder="Min Price" />
                           </th>
                           <th className="text-left py-2 px-4 font-normal">
                              <TextField placeholder="Shipping Cost" />
                           </th>
                           <th className="text-left py-2 px-4">
                              <button className="text-[14px] text-red-500 font-normal cursor-pointer">Delete</button>
                           </th>
                        </tr>
                        <tr>
                           <th colSpan={7} scope="col" className="text-start mb-3">
                              <button type="button" className="text-blue-500 font-normal cursor-pointer">
                                 + Add Line
                              </button>
                           </th>
                        </tr>
                     </tbody>
                  </table>
               )}

               {/* Weight based rate */}
               {shippingCostType === "weight_based" && (
                  <table className="min-w-full rounded-lg text-[14px]">
                     <thead className="border-b border-gray-300">
                        <tr>
                           <th className="text-left py-2 px-4">Min Weight</th>
                           <th className="text-left py-2 px-4">Shipping Cost</th>
                           <th className="text-left py-2 px-4">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th className="text-left py-2 px-4 font-normal">
                              <TextField placeholder="Min Weight" />
                           </th>
                           <th className="text-left py-2 px-4 font-normal">
                              <TextField placeholder="Shipping Cost" />
                           </th>
                           <th className="text-left py-2 px-4">
                              <button type="button" className="text-[14px] text-red-500 font-normal cursor-pointer">
                                 Delete
                              </button>
                           </th>
                        </tr>
                        <tr>
                           <th colSpan={7} scope="col" className="text-start mb-3">
                              <button type="button" className="text-blue-500 font-normal cursor-pointer">
                                 + Add Line
                              </button>
                           </th>
                        </tr>
                     </tbody>
                  </table>
               )}

               {/* api_calculate */}
               {shippingCostType === "api_calculate" && (
                  <TextField //
                     placeholder="Calculate API endpoint"
                     instruction="This API will be called to calculate shipping cost. It supposed to return a number"
                  />
               )}
            </div>
            <div className="mt-3">
               {!showCondition ? (
                  <button type="button" className="text-blue-500 text-[14px] cursor-pointer my-3" onClick={() => setShowCondition(true)}>
                     Add condition
                  </button>
               ) : (
                  <div>
                     <button type="button" className="text-blue-500 text-[14px] cursor-pointer" onClick={() => setShowCondition(false)}>
                        Remove condition
                     </button>
                     <div className="grid grid-cols-1 gap-2 mt-2">
                        <Radio //
                           label="Based on order price"
                           name="condition"
                           value="price"
                           onChange={(e) => setCondition(e.target.value)}
                        />
                        <Radio //
                           label="Based on order weight"
                           name="condition"
                           value="weight"
                           onChange={(e) => setCondition(e.target.value)}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-2 mt-3">
                        <div>
                           <TextField //
                              label={`Minimum order ${condition}`}
                              placeholder={`Minimum order ${condition}`}
                           />
                        </div>
                        <div>
                           <TextField //
                              label={`Maximum order ${condition}`}
                              placeholder={`Minimum order ${condition}`}
                           />
                        </div>
                     </div>
                  </div>
               )}

               <hr className="border-t border-gray-200 block" />
               <div className="mt-5 flex justify-end gap-2">
                  <button type="button" onClick={onClose} className="bg-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-300">
                     Cancel
                  </button>
                  <button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     Save
                  </button>
               </div>
            </div>
         </div>
      </Card>
   );
}
