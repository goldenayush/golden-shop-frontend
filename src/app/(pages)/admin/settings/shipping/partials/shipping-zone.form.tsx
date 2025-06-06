import { TextFieldFormik } from "@/libs/formik";
import { Card, Location, Modal } from "@/shared/components";
import { Button, Label, TextField } from "@/shared/ui";
import { IShippingZone } from "@/types/shipping-zone.type";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

type Props = {
   onSubmit: (body: any, cd: () => void) => void;
   patchValue?: IShippingZone;
   loading?: boolean;
   Component: React.ComponentType<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;
};
export default function ShippingZoneForm({ loading, patchValue, onSubmit, Component }: Props) {
   const modalRef = useRef<any>(null);
   const [fields, setFields] = useState({
      name: "",
      country: "",
      shippingZoneProvince: [] as string[],
   });

   useEffect(() => {
      if (patchValue) {
         const province = patchValue.shippingZoneProvince;
         setFields({
            id: patchValue.id,
            name: patchValue.name,
            country: patchValue.country,
            shippingZoneProvince: province.map((s) => s.province.split("-")[1]),
         } as any);
      }
      return () => {};
   }, [patchValue]);

   return (
      <>
         <Component onClick={() => modalRef.current.setIsOpen(true)} />
         <Modal size="lg" ref={modalRef}>
            <Formik //
               enableReinitialize={Boolean(patchValue)}
               initialValues={fields}
               validationSchema={Yup.object().shape({
                  name: Yup.string().required("This field can not be empty"),
               })}
               onSubmit={(e) => onSubmit(e, () => modalRef.current.setIsOpen(false))}>
               {(formik) => (
                  <Form>
                     <Card heading="Create a shipping zone" className="p-4">
                        <div className="py-5">
                           <TextFieldFormik //
                              label={<span className="text-[12px] uppercase font-semibold block mb-3">Zone name</span>}
                              placeholder="Enter zone name"
                              name="name"
                           />
                        </div>
                        <hr className="border-t border-gray-200 block" />
                        <div className="py-5">
                           <span className="text-[12px] uppercase font-semibold block mb-3">Country</span>
                           <Field as={Location.Countries} name="country" />
                        </div>
                        <hr className="border-t border-gray-200 block" />
                        <div className="py-5">
                           <span className="text-[12px] uppercase font-semibold block mb-3">Provinces/States</span>
                           <Field //
                              as={Location.States}
                              multi
                              countryCode={formik.values.country}
                              onChange={(values: any[]) => {
                                 const codes = values?.map((ele) => ele.value);
                                 formik.setFieldValue("shippingZoneProvince", codes);
                              }}
                              value={formik?.values?.shippingZoneProvince || []}
                           />
                        </div>
                        <hr className="border-t border-gray-200 block" />
                        <div className="mt-5 flex justify-end gap-2">
                           <button
                              type="button"
                              onClick={() => modalRef.current.setIsOpen(false)}
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
