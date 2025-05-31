"use client";
import { Card, Loading, Location } from "@/shared/components";
import { Button, Select, Textarea, TextField } from "@/shared/ui";
import React from "react";
import useStoreController from "./store.controller";
import { Field, Form, Formik } from "formik";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";

export default function StorePage() {
   const ctrl = useStoreController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-xl" />;
   }

   return (
      <Formik enableReinitialize initialValues={ctrl.fields} onSubmit={ctrl.onSubmit}>
         {(formik) => (
            <Form>
               <Card>
                  <div className="p-3">
                     <h5 className="text-[12px] uppercase font-semibold block mb-3">Store Information</h5>
                     <div>
                        <TextFieldFormik //
                           label="Store Name"
                           placeholder="Store Name"
                           name="store.storeName"
                        />
                     </div>
                     <div className="mt-4">
                        <TextareaFormik //
                           name="store.storeDescription"
                           label="Store Description"
                           placeholder="Store Description"
                        />
                     </div>
                  </div>
                  <hr className="border-t border-gray-200 block" />
                  <div className="p-3">
                     <h5 className="text-[12px] uppercase font-semibold block mb-3">Contact Information</h5>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div>
                           <TextFieldFormik //
                              label="Store Phone Number"
                              placeholder="Store Phone Number"
                              name="store.storePhoneNumber"
                           />
                        </div>
                        <div>
                           <TextFieldFormik //
                              label="Store Email"
                              placeholder="Store Email"
                              name="store.storeEmail"
                           />
                        </div>
                     </div>
                  </div>
                  <hr className="border-t border-gray-200 block" />
                  <div className="p-3">
                     <h5 className="text-[12px] uppercase font-semibold block mb-3">Address</h5>
                     <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                           <Field
                              as={Location.Countries} //
                              label="Country"
                              placeholder="Select country"
                              name="store.storeCountry"
                           />
                        </div>
                        <div className="col-span-12">
                           <TextFieldFormik //
                              label="Address"
                              placeholder="Address"
                              name="store.storeAddress"
                           />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                           <Field
                              as={Location.States} //
                              label="Province"
                              placeholder="Province"
                              name="store.storeProvince"
                              countryCode={formik.values.store.storeCountry}
                           />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                           <Field
                              as={Location.Cities} //
                              label="City"
                              placeholder="Province"
                              name="store.storeCity"
                              countryCode={formik.values.store.storeCountry}
                              stateCode={formik.values.store.storeProvince}
                           />
                           {/* <TextFieldFormik //
                              label="City"
                              name="store.storeCity"
                              placeholder="City"
                           /> */}
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                           <TextFieldFormik //
                              name="store.storePostalCode"
                              label="PostalCode"
                              placeholder="Postal Code"
                           />
                        </div>
                     </div>
                  </div>
               </Card>
               <div className="mt-3">
                  <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={ctrl.isSaving}>
                     Save
                  </Button>
               </div>
            </Form>
         )}
      </Formik>
   );
}
