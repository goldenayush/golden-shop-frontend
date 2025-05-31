import { Card, Modal } from "@/shared/components";
import { TextField } from "@/shared/ui";
import React, { useRef } from "react";

type Props = {
   btnText: string | JSX.Element;
};
export default function TaxClassForm({ btnText }: Props) {
   const taxClassFormRef = useRef<any>(null);
   return (
      <>
         <button type="button" onClick={() => taxClassFormRef.current?.setIsOpen(true)} className="cursor-pointer">
            {btnText}
         </button>
         <Modal ref={taxClassFormRef} size="lg">
            <Card className="py-4">
               <div className="px-3">
                  <h3 className="text-[16px] font-semibold mb-3">Create a tax class</h3>
                  <TextField label={<span className="text-[12px] uppercase font-semibold block mb-3">Tax class name</span>} placeholder="Enter tax class name" />
               </div>
               <hr className="my-5 border-t-1 border-[#e1e3e5]" />
               <div className="mt-5 flex justify-end gap-2 px-3">
                  <button
                     type="button"
                     onClick={() => taxClassFormRef.current?.setIsOpen(false)}
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
