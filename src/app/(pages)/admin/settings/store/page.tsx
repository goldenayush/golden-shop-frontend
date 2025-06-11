"use client";
import { Card, Loading, Location } from "@/shared/components";
import { Button } from "@/shared/ui";
import React from "react";
import useStoreController from "./store.controller";
import { Field, Form, Formik } from "formik";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";
import { FaCloudUploadAlt, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function StorePage() {
   const ctrl = useStoreController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-xl" />;
   }

   return (
      <Formik enableReinitialize initialValues={ctrl.fields} onSubmit={ctrl.onSubmit}>
         {(formik) => (
            <Form>
               <Card className="mb-3">
                  <div className="p-3">
                     <h5 className="text-[12px] uppercase font-semibold block mb-3">Store Logo</h5>
                     <div className="flex justify-between items-center mt-3">
                        {formik?.values?.store?.storeLogo && (
                           <img //
                              src={typeof formik.values.store.storeLogo === "object" ? URL.createObjectURL(formik.values.store.storeLogo) : formik.values.store.storeLogo}
                              alt="logo"
                              className="w-[150px] h-[70px] object-contain"
                              crossOrigin="anonymous"
                           />
                        )}
                        <div className="flex gap-3">
                           <input
                              type="file"
                              id="logo-upload"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                 formik.setFieldValue("store.storeLogo", e.target?.files?.[0]);
                              }}
                           />
                           {formik?.values?.store?.storeLogo ? (
                              <label htmlFor="logo-upload">
                                 <FaRegEdit className="text-blue-600" size={20} />
                              </label>
                           ) : (
                              <label htmlFor="logo-upload" className="flex items-center text-sm gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                 <FaCloudUploadAlt size={20} />
                                 <span>Upload logo</span>
                              </label>
                           )}
                           {formik?.values?.store?.storeLogo && (
                              <MdDeleteOutline
                                 className="text-red-600"
                                 size={20}
                                 onClick={() => {
                                    formik.setFieldValue("store.storeLogo", "");
                                 }}
                              />
                           )}
                        </div>
                     </div>
                  </div>
               </Card>
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
