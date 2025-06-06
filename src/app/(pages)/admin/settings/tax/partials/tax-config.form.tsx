"use client";
import { useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { Loading } from "@/shared/components";
import { Button, Select } from "@/shared/ui";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

type Props = {
   onSubmit: (values: any) => void;
   patchValues?: any;
   loading?: boolean;
};

const taxConfigCalculationAddressOption = [
   {
      label: "shipping address",
      value: "shipping address",
   }, //
   {
      label: "billing address",
      value: "billing address",
   }, //
   {
      label: "store address",
      value: "store address",
   },
];
export default function TaxConfigForm({ onSubmit, patchValues, loading }: Props) {
   const { getTaxClasses } = useAppSelector((state) => state.admin.adminTaxSetting);

   const [fields, setFields] = useState({
      tax: {
         taxConfigClass: "",
         taxConfigCalculationAddress: "",
      },
   });

   useEffect(() => {
      if (patchValues?.length) {
         const patchValue: any = {
            tax: {},
         };
         for (const element of patchValues) {
            const name = element.name.toLowerCase();
            switch (true) {
               case name.startsWith("taxconfig"):
                  patchValue.tax[element.name] = element.value;
                  patchValue.tax.isJson = String(element.isJson);
                  break;
               default:
                  break;
            }
         }
         setFields(patchValue);
      }
      return () => {};
   }, [patchValues]);

   return (
      <Formik enableReinitialize={Boolean(patchValues)} initialValues={fields} onSubmit={onSubmit}>
         <Form className="p-4">
            <h5 className="text-[12px] uppercase font-semibold block mb-3">Basic configuration</h5>
            <div className="grid grid-cols-2 gap-2">
               <div>
                  <Field
                     as={Select}
                     label="Shipping tax class"
                     placeholder="None"
                     name="tax.taxConfigClass"
                     options={getTaxClasses.data.map((ele) => ({
                        label: ele.name,
                        value: ele.name,
                     }))}
                  />
               </div>
               <div>
                  <Field as={Select} label="Base calculation address" name="tax.taxConfigCalculationAddress" placeholder="None" options={taxConfigCalculationAddressOption} />
               </div>
            </div>
            <hr className="border-t border-gray-300 my-3" />
            <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
               Save
            </Button>
         </Form>
      </Formik>
   );
}
