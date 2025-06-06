"use client";
import { TextFieldFormik } from "@/libs/formik";
import ErrorMessageFormik from "@/libs/formik/components/error-message.formik";
import { Card, Location, Modal } from "@/shared/components";
import { Button, Label, Switch } from "@/shared/ui";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

type Props = {
   onSubmit: (value: any, onModalClose: () => void) => void;
   Component: React.ComponentType<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;
   patchValues?: any;
   loading?: boolean;
};
export default function TaxRateForm({ onSubmit, Component, patchValues, loading }: Props) {
   const taxRateFormRef = useRef<any>(null);
   const [fields, setFields] = useState({
      name: null,
      country: null,
      province: null,
      postcode: null,
      rate: null,
      priority: null,
      isCompound: false,
   });

   useEffect(() => {
      if (patchValues) {
         setFields(patchValues);
      }
      return () => {};
   }, [patchValues]);

   return (
      <>
         <Component onClick={() => taxRateFormRef.current?.setIsOpen(true)} />
         <Modal ref={taxRateFormRef} size="lg">
            <Formik
               enableReinitialize={Boolean(patchValues)}
               initialValues={fields}
               validationSchema={TaxFormSchema}
               onSubmit={(value) =>
                  onSubmit(value, () => {
                     taxRateFormRef.current?.setIsOpen(false);
                  })
               }>
               {(formik) => (
                  <Form>
                     <Card className="py-4">
                        <h3 className="text-[16px] font-semibold mb-3 px-4">Create a tax class</h3>
                        <div className="grid grid-cols-12 gap-2 font-normal p-4">
                           <div className="col-span-12">
                              <span className="text-[12px] uppercase font-semibold block">Basic</span>
                           </div>
                           <div className="col-span-6">
                              <TextFieldFormik label="Name" name="name" placeholder="Name" />
                           </div>
                           <div className="col-span-6">
                              <TextFieldFormik label="Rate" name="rate" placeholder="Rate" />
                           </div>
                           <div className="col-span-12 mt-3">
                              <span className="text-[12px] uppercase font-semibold block">Setup shipping cost</span>
                           </div>
                           <div className="col-span-4">
                              <Label>Country</Label>
                              <Field
                                 as={Location.Countries} //
                                 name="country"
                                 placeholder="Country"
                              />
                              <ErrorMessageFormik name="country" />
                           </div>
                           <div className="col-span-4">
                              <Label>Province</Label>
                              <Field
                                 as={Location.States} //
                                 countryCode={formik?.values?.country || null}
                                 name="province"
                                 placeholder="Province"
                              />
                              <ErrorMessageFormik name="province" />
                           </div>
                           <div className="col-span-4">
                              <TextFieldFormik name="postcode" label="Postcode" placeholder="Postcode" />
                           </div>
                           <div className="col-span-12">
                              <span className="block font-normal text-[14px] mb-1">Is compound</span>
                              <Switch
                                 eleSize="sm"
                                 value={formik.values.isCompound as any}
                                 checked={formik.values.isCompound}
                                 onChange={(e) => {
                                    formik.setFieldValue("isCompound", e.target.checked);
                                 }}
                              />
                           </div>
                           <div className="col-span-6">
                              <TextFieldFormik type="number" label="Priority" name="priority" placeholder="Priority" />
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
                           <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                              Save
                           </Button>
                        </div>
                     </Card>
                  </Form>
               )}
            </Formik>
         </Modal>
      </>
   );
}

const TaxFormSchema = Yup.object().shape({
   name: Yup.string().required("This field can not be empty"),
   rate: Yup.number().required("This field can not be empty").min(0),
   country: Yup.string().required("This field can not be empty"),
   province: Yup.string().required("This field can not be empty"),
   postcode: Yup.string().required("This field can not be empty"),
   priority: Yup.number().required("This field can not be empty"),
   isCompound: Yup.boolean(),
});
