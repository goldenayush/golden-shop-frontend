import { Card, Modal } from "@/shared/components";
import { Switch, TextField } from "@/shared/ui";
import React, { useRef } from "react";

type Props = {
   btnText: string | JSX.Element;
};
export default function TaxRateForm({ btnText }: Props) {
   const taxRateFormRef = useRef<any>(null);
   return (
      <>
         <button onClick={() => taxRateFormRef.current?.setIsOpen(true)}>{btnText}</button>
         <Modal ref={taxRateFormRef} size="lg">
            <Card className="py-4">
               <h3 className="text-[16px] font-semibold mb-3 px-4">Create a tax class</h3>
               <div className="grid grid-cols-12 gap-2 font-normal p-4">
                  <div className="col-span-12">
                     <span className="text-[12px] uppercase font-semibold block">Basic</span>
                  </div>
                  <div className="col-span-6">
                     <TextField label="Name" placeholder="Name" />
                  </div>
                  <div className="col-span-6">
                     <TextField label="Rate" placeholder="Rate" />
                  </div>
                  <div className="col-span-12 mt-3">
                     <span className="text-[12px] uppercase font-semibold block">Setup shipping cost</span>
                  </div>
                  <div className="col-span-4">
                     <TextField label="Country" placeholder="Country" />
                  </div>
                  <div className="col-span-4">
                     <TextField label="Provinces" placeholder="Provinces" />
                  </div>
                  <div className="col-span-4">
                     <TextField label="Postcode" placeholder="Postcode" />
                  </div>
                  <div className="col-span-12">
                     <span className="block font-normal text-[14px] mb-1">Is compound</span>
                     <Switch eleSize="sm" />
                  </div>
                  <div className="col-span-6">
                     <TextField label="Priority" placeholder="Priority" />
                  </div>
               </div>
               <hr className="border-t-1 border-[#e1e3e5]" />
               <div className="mt-5 flex justify-end gap-2 px-3">
                  <button
                     type="button"
                     onClick={() => taxRateFormRef.current?.setIsOpen(false)}
                     className="bg-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-300">
                     Cancel
                  </button>
                  <button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     Save
                  </button>
               </div>
            </Card>
         </Modal>
      </>
   );
}
