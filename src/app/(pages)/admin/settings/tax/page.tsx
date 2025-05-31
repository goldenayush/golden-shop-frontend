"use client";
import { Card } from "@/shared/components";
import { Select } from "@/shared/ui";
import React from "react";
import TaxClassForm from "./partials/tax-class.form";
import TaxRateForm from "./partials/tax-rate.form";

export default function TexPage() {
   return (
      <>
         <Card>
            <div className="p-4">
               <h5 className="text-[12px] uppercase font-semibold block mb-3">Tax</h5>
               <p className="text-[14px]">Configure the tax classes that will be available to your customers at checkout.</p>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="p-4">
               <h5 className="text-[12px] uppercase font-semibold block mb-3">Basic configuration</h5>
               <div className="grid grid-cols-2 gap-2">
                  <div>
                     <Select
                        label="Shipping tax class"
                        placeholder="None"
                        options={[
                           {
                              label: "Proportional allocation based on cart items",
                              value: "-1",
                           }, //
                           {
                              label: "Higest tax rate based on cart items",
                              value: "0",
                           }, //
                           {
                              label: "Taxable Goods",
                              value: "1",
                           }, //
                        ]}
                     />
                  </div>
                  <div>
                     <Select
                        label="Shipping tax class"
                        placeholder="None"
                        options={[
                           {
                              label: "Shipping address",
                              value: "shippingAddress",
                           }, //
                           {
                              label: "Billing address",
                              value: "billingAddress",
                           }, //
                           {
                              label: "Store address",
                              value: "storeAddress",
                           }, //
                        ]}
                     />
                  </div>
               </div>
               <hr className="border-t border-gray-300 my-3" />
               <button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                  Save
               </button>
            </div>
         </Card>
         <Card className="mt-4 pt-4" heading={<span className="pl-4">Tax classes</span>}>
            <div className="px-4 mb-3">
               <h5 className="text-[12px] uppercase font-semibold block mb-3">Taxable Goods</h5>
               <div className="border p-2 border-gray-300">
                  <table className="min-w-full rounded-lg text-[14px] mb-3">
                     <thead>
                        <tr>
                           <th className="text-left py-2 px-4">Name</th>
                           <th className="text-left py-2 px-4">Rate</th>
                           <th className="text-left py-2 px-4">Compound</th>
                           <th className="text-left py-2 px-4">Priority</th>
                           <th className="text-left py-2 px-4">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th className="text-left py-2 px-4 font-normal">Tax</th>
                           <th className="text-left py-2 px-4 font-normal"> 0%</th>
                           <th className="text-left py-2 px-4 font-normal">No</th>
                           <th className="text-left py-2 px-4 font-normal">0</th>
                           <th className="text-left py-2 px-4 flex gap-3">
                              <TaxRateForm
                                 btnText={
                                    <>
                                       <span className="text-[14px] text-blue-500 font-normal">Edit</span>
                                    </>
                                 }
                              />
                              <button className="text-[14px] text-red-500 font-normal cursor-pointer">Delete</button>
                           </th>
                        </tr>
                        <tr>
                           <th colSpan={7} scope="col" className="text-start">
                              <TaxRateForm
                                 btnText={
                                    <>
                                       <span className="text-blue-500 font-normal">+ Add Line</span>
                                    </>
                                 }
                              />
                           </th>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <hr className="border-t border-gray-200 block my-3" />
            <div className="px-4 pb-4">
               <TaxClassForm
                  btnText={
                     <>
                        <span className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold"> Create new tax class</span>
                     </>
                  }
               />
            </div>
         </Card>
      </>
   );
}
