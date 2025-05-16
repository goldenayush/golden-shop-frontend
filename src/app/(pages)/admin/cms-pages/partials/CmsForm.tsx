"use client";
import React, { useState } from "react";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";
import { Card, Editor } from "@/shared/components";
import { Button, Label, Switch } from "@/shared/ui";
import { Field, Form, Formik } from "formik";
import { IoArrowBack } from "react-icons/io5";

const fields = {
   name: "about",
   description: "<h1>description</h1>",
   status: true,
   seo: {
      url_key: "/about",
      url_title: "about url_title",
      meta_keywords: "about keywords",
      meta_description: "about description",
   },
};

export default function CmsForm({ id }: { id?: string }) {
   const [initialValues, setInitialValues] = useState(fields);
   return (
      <div className="p-7">
         <div className="flex items-center gap-3 mb-3">
            <button type="button" className="border p-2 rounded-sm cursor-pointer border-[#8c9196] text-[#6c7277]">
               <IoArrowBack size={22} />
            </button>
            <h2 className="text-[20px] font-semibold">
                {id ? "Editing [About]" : "Create a new page"}
            </h2>
         </div>
         <Formik initialValues={initialValues} onSubmit={(e) => console.log(e)}>
            {(formik) => {
               return (
                  <Form>
                     <Card heading="General" className="p-4">
                        <div className="mb-4">
                           <TextFieldFormik label="Name" name="name" />
                        </div>
                        <div className="mb-4">
                           <Field //
                              as={Switch}
                              eleSize="sm"
                              label="Status"
                              name="status"
                              checked={formik?.values?.status}
                           />
                        </div>
                        <div>
                           <Label>Description</Label>
                           <Editor //
                              value={formik.values?.description}
                              setValue={(value) => {
                                 formik.setFieldValue("description", value);
                              }}
                           />
                        </div>
                     </Card>
                     <Card heading="Search engine optimize" className="p-4 mt-3">
                        <div className="mb-2">
                           <TextFieldFormik name="seo.url_key" label="Url key" id="url_key" />
                        </div>
                        <div className="mb-2">
                           <TextFieldFormik name="seo.url_title" label="Meta title" id="url_title" />
                        </div>
                        <div className="mb-2">
                           <TextFieldFormik name="seo.meta_keywords" label="Meta keywords" id="meta_keywords" />
                        </div>
                        <div className="mb-2">
                           <TextareaFormik rows={4} name="seo.meta_description" label="Meta description" id="meta_description" />
                        </div>
                     </Card>
                  </Form>
               );
            }}
         </Formik>
         <hr className="my-5 border-t-1 border-[#e1e3e5]" />
         <div className="flex justify-between items-center">
            {/* Cancel button  */}
            <div>
               <Button type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer">
                  Cancel
               </Button>
            </div>
            {/* Save button  */}
            <div>
               <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                  Save
               </Button>
            </div>
         </div>
      </div>
   );
}
