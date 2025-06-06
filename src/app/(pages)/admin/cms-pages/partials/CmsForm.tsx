"use client";
import React, { useEffect, useState } from "react";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";
import { Card, Editor, PageHeader } from "@/shared/components";
import { Button, Label, Switch } from "@/shared/ui";
import { Field, Form, Formik } from "formik";
import { ICmsPage } from "@/types/admin-cms.type";

type Props = {
   loading?: boolean;
   onSubmit: (values: any) => void;
   patchValues?: ICmsPage;
};
export default function CmsForm({ loading, onSubmit, patchValues }: Props) {
   const [fields, setFields] = useState({
      name: "",
      content: "",
      status: false,
      seo: {
         urlKey: "",
         metaTitle: "",
         metaKeywords: "",
         metaDescription: "",
      },
   });

   useEffect(() => {
      if (patchValues) {
         setFields({
            id: patchValues.id,
            name: patchValues?.cmsPageDescription?.name || "",
            content: patchValues?.cmsPageDescription?.content || "",
            status: patchValues.status,
            seo: {
               urlKey: patchValues?.cmsPageDescription?.urlKey || "",
               metaTitle: patchValues?.cmsPageDescription?.metaTitle || "",
               metaKeywords: patchValues?.cmsPageDescription?.metaKeywords || "",
               metaDescription: patchValues?.cmsPageDescription?.metaDescription || "",
            },
         } as any);
      }
      return () => {};
   }, [patchValues]);

   return (
      <>
         <Formik //
            enableReinitialize={Boolean(patchValues)}
            initialValues={fields}
            onSubmit={onSubmit}>
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
                           <Label>content</Label>
                           <Editor //
                              value={formik.values?.content}
                              setValue={(value) => {
                                 formik.setFieldValue("content", value);
                              }}
                           />
                        </div>
                     </Card>
                     <Card heading="Search engine optimize" className="p-4 mt-3">
                        <div className="mb-2">
                           <TextFieldFormik name="seo.urlKey" label="Url key" id="urlKey" />
                        </div>
                        <div className="mb-2">
                           <TextFieldFormik name="seo.metaTitle" label="Meta title" id="metaTitle" />
                        </div>
                        <div className="mb-2">
                           <TextFieldFormik name="seo.metaKeywords" label="Meta keywords" id="metaKeywords" />
                        </div>
                        <div className="mb-2">
                           <TextareaFormik rows={4} name="seo.metaDescription" label="Meta content" id="metaDescription" />
                        </div>
                     </Card>
                     <hr className="my-5 border-t-1 border-[#e1e3e5]" />
                     <div className="flex justify-between items-center">
                        {/* Cancel button  */}
                        <Button type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer">
                           Cancel
                        </Button>
                        {/* Save button  */}
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                           Save
                        </Button>
                     </div>
                  </Form>
               );
            }}
         </Formik>
      </>
   );
}
