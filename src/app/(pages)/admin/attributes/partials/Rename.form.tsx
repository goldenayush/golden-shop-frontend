import { Modal } from "@/shared/components";
import { Button, TextField } from "@/shared/ui";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
   loading?: boolean;
   onSubmit: (fields: { name: string }) => void;
   title: string;
   patchValue?: string;
};
export default function RenameModalForm({ onSubmit, title, loading, patchValue }: Props) {
   const modalRef = useRef<any>(null);
   const [fields, setFields] = useState({
      name: "",
   });
   const onRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
         ...fields,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <>
         <button type="button" className="text-blue-500 cursor-pointer hover:underline capitalize" onClick={() => modalRef?.current?.setIsOpen(true)}>
            {title}
         </button>
         <Modal ref={modalRef} size="lg" closeable>
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(fields);
                  modalRef?.current?.setIsOpen(false);
               }}
               className="p-4">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[16px] font-semibold">Editing Default</span>
                  <IoClose //
                     className="cursor-pointer"
                     size={22}
                     onClick={() => modalRef?.current?.setIsOpen(false)}
                  />
               </div>
               <div>
                  <TextField //
                     name="name"
                     onChange={onRenameChange}
                     value={fields?.name || patchValue}
                  />
               </div>
               <hr className="border-t border-gray-300 my-5" />
               <div className="flex justify-end gap-2 mt-3">
                  <button type="button" className="bg-[#d72c0d] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     Cancel
                  </button>
                  <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                     Save
                  </Button>
               </div>
            </form>
         </Modal>
      </>
   );
}
