"use client";
import { Card, Loading } from "@/shared/components";
import { Select } from "@/shared/ui";
import React from "react";
import TaxClassForm from "./partials/tax-class.form";
import TaxRateForm from "./partials/tax-rate.form";
import useTaxController from "./tax.controller";
import TaxConfigForm from "./partials/tax-config.form";

export default function TexPage() {
   const ctrl = useTaxController();
   return (
      <>
         <Card>
            <div className="p-4">
               <h5 className="text-[12px] uppercase font-semibold block mb-3">Tax</h5>
               <p className="text-[14px]">Configure the tax classes that will be available to your customers at checkout.</p>
            </div>
            <hr className="border-t border-gray-300" />
            {ctrl?.getTaxConfig.isLoading ? (
               <Loading className="h-[150px] border-white text-xl" />
            ) : (
               <TaxConfigForm //
                  loading={ctrl.saveTaxConfig.isLoading}
                  onSubmit={ctrl.onSaveTaxConfig}
                  patchValues={ctrl.getTaxConfig.data}
               />
            )}
         </Card>

         <Card className="mt-4 pt-4" heading={<span className="pl-4">Tax classes</span>}>
            {ctrl?.getTaxClasses.isLoading ? (
               <Loading //
                  className="border-white h-[150px] text-xl"
               />
            ) : (
               <div className="px-4 mb-3">
                  {ctrl?.getTaxClasses?.data?.length ? (
                     <div>
                        {ctrl?.getTaxClasses?.data.map((data) => (
                           <React.Fragment key={data?.id}>
                              <h5 className="text-[12px] uppercase font-semibold block mb-3">{data?.name}</h5>

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
                                       {data?.taxRate?.map((tax) => (
                                          <tr>
                                             <th className="text-left py-2 px-4 font-normal">{tax.name}</th>
                                             <th className="text-left py-2 px-4 font-normal">{tax.rate}%</th>
                                             <th className="text-left py-2 px-4 font-normal">{tax.isCompound ? "Yes" : "No"}</th>
                                             <th className="text-left py-2 px-4 font-normal">{tax.priority}</th>
                                             <th className="text-left py-2 px-4 flex gap-3">
                                                <TaxRateForm
                                                   patchValues={tax}
                                                   loading={ctrl.updateRateTax.isLoading}
                                                   onSubmit={ctrl.onupdateRateTax}
                                                   Component={(props) => (
                                                      <button {...props} className="text-[14px] text-blue-500 font-normal">
                                                         Edit
                                                      </button>
                                                   )}
                                                />
                                                <button //
                                                   type="button"
                                                   className="text-[14px] text-red-500 font-normal cursor-pointer"
                                                   onClick={() => ctrl.ondeleteRateTax(tax.id)}>
                                                   Delete
                                                </button>
                                             </th>
                                          </tr>
                                       ))}
                                       <tr>
                                          <th colSpan={7} scope="col" className="text-start">
                                             <TaxRateForm
                                                loading={ctrl.createRateTax.isLoading}
                                                onSubmit={(values, onModalClose) => {
                                                   ctrl.oncreateRateTax(
                                                      {
                                                         ...values,
                                                         taxClassId: data?.id,
                                                      },
                                                      onModalClose
                                                   );
                                                }}
                                                Component={(props) => (
                                                   <button {...props} className="text-blue-500 font-normal">
                                                      + Add Line
                                                   </button>
                                                )}
                                             />
                                          </th>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                              <hr className="border-t border-gray-200 block my-3" />
                           </React.Fragment>
                        ))}
                     </div>
                  ) : (
                     <div />
                  )}
               </div>
            )}
            <hr className="border-t border-gray-200 block my-3" />
            <div className="px-4 pb-4">
               <TaxClassForm
                  loading={ctrl.createTaxClass.isLoading}
                  onSubmit={ctrl.onCreateTaxClass}
                  Component={(props) => (
                     <button {...props} className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold">
                        Create new tax class
                     </button>
                  )}
               />
            </div>
         </Card>
      </>
   );
}
