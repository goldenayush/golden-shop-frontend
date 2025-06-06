"use client";
import { TextFieldFormik } from "@/libs/formik";
import { Card, Modal } from "@/shared/components";
import { Button, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import React, { useRef } from "react";

type Props = {
   onSubmit: (value: any, onModalClose: () => void) => void;
   Component: React.ComponentType<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;
   loading?: boolean;
};

export default function TaxClassForm({ Component, onSubmit, loading }: Props) {
   const taxClassFormRef = useRef<any>(null);
   return (
      <>
         <Component //
            type="button"
            onClick={() => taxClassFormRef.current?.setIsOpen(true)}
         />
         <Modal ref={taxClassFormRef} size="lg">
            <Card className="py-4">
               <Formik
                  initialValues={{ name: "" }}
                  onSubmit={(values) => {
                     onSubmit(values, () => {
                        taxClassFormRef.current?.setIsOpen(false);
                     });
                  }}>
                  {(props) => (
                     <Form>
                        <div className="px-3">
                           <h3 className="text-[16px] font-semibold mb-3">Create a tax class</h3>
                           <TextFieldFormik //
                              label={<span className="text-[12px] uppercase font-semibold block mb-3">Tax class name</span>}
                              placeholder="Enter tax class name"
                              name="name"
                           />
                        </div>
                        <hr className="my-5 border-t-1 border-[#e1e3e5]" />
                        <div className="mt-5 flex justify-end gap-2 px-3">
                           <button
                              type="button"
                              onClick={() => taxClassFormRef.current?.setIsOpen(false)}
                              className="bg-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-300">
                              Cancel
                           </button>
                           <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                              Save
                           </Button>
                        </div>
                     </Form>
                  )}
               </Formik>
            </Card>
         </Modal>
      </>
   );
}
