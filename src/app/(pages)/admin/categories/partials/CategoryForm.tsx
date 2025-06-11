"use client";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";
import { Card, Editor } from "@/shared/components";
import { useFileUpload } from "@/shared/hooks";
import { Button, Label, Radio, TextField } from "@/shared/ui";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FaArrowUp } from "react-icons/fa";
import SelectKeyAttributes from "../../components/SelectKeyAttributes";
import AddProduct from "../../components/AddProduct";
import Link from "next/link";
import SelectCategory from "./SelectCategory";

type CategoryFormProps = {
   patchValues?: any;
   onSubmit: (body: any) => Promise<void>;
   submitting?: boolean;
};

export default function CategoryForm({ onSubmit, patchValues, submitting }: CategoryFormProps) {
   const [initialValues, setInitialValues] = useState({
      name: "",
      description: "",
      urlKey: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      includeInNav: "1",
      status: "1",
      showProducts: "1",
      image: "",
   });

   useEffect(() => {
      if (patchValues) {
         const parentId = patchValues?.parentId;
         setInitialValues({
            ...(Boolean(parentId) ? { parentId: parentId || "" } : {}),
            name: patchValues?.CategoryDescription?.name || "",
            description: patchValues?.CategoryDescription?.description || "",
            urlKey: patchValues?.CategoryDescription?.urlKey || "",
            metaTitle: patchValues?.CategoryDescription?.metaTitle || "",
            metaKeywords: patchValues?.CategoryDescription?.metaKeywords || "",
            metaDescription: patchValues?.CategoryDescription?.metaDescription || "",
            includeInNav: String(Number(patchValues?.includeInNav)),
            status: String(Number(patchValues?.status)),
            showProducts: String(Number(patchValues?.showProducts)),
            image: patchValues?.CategoryDescription?.image,
         } as any);
      }
      return () => {};
   }, [patchValues]);

   return (
      <Formik //
         enableReinitialize={Boolean(patchValues)}
         initialValues={initialValues}
         onSubmit={(values) => {
            const { status, includeInNav, showProducts, parentId, ...categoryDescription } = values as any;
            const body: any = {
               ...(parentId ? { parentId } : {}),
               status: Boolean(+status),
               includeInNav: Boolean(+includeInNav),
               showProducts: Boolean(+showProducts),
               categoryDescription,
            };
            onSubmit(body);
         }}
         validationSchema={Yup.object().shape({
            name: Yup.string().required("This field can not be empty"),
            urlKey: Yup.string().required("This field can not be empty"),
            metaTitle: Yup.string(),
            metaKeywords: Yup.string(),
            metaDescription: Yup.string(),
         })}>
         {(formik) => (
            <Form className="grid grid-cols-12 gap-3">
               <div className="col-span-12 lg:col-span-8">
                  {/* General */}
                  <Card heading="General" className="p-4 mb-4">
                     <div className="mb-2">
                        <TextFieldFormik name="name" label="Name" id="name" />
                     </div>
                     <div className="mb-2">
                        <SelectCategory
                           parentId={(formik.values as any)?.parentId}
                           setCategory={(id) => {
                              if (id !== null && id !== undefined) {
                                 formik.setFieldValue("parentId", id);
                              } else {
                                 const { parentId, ...rest } = formik.values as any;
                                 formik.setValues(rest);
                              }
                           }}
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
                  {/* Products */}
                  <Card heading="Products" className="p-4 mb-4" more={<SelectKeyAttributes title="Add products" onlyTitle keyName="collections" setValue={(value) => console.log(value)} />}>
                     <AddProduct />
                  </Card>
                  {/* Search engine optimize */}
                  <Card heading="Search engine optimize" className="p-4">
                     <div className="mb-2">
                        <TextFieldFormik name="urlKey" label="Url key" id="urlKey" />
                     </div>
                     <div className="mb-2">
                        <TextFieldFormik name="metaTitle" label="Meta title" id="metaTitle" />
                     </div>
                     <div className="mb-2">
                        <TextFieldFormik name="metaKeywords" label="Meta keywords" id="metaKeywords" />
                     </div>
                     <div className="mb-2">
                        <TextareaFormik rows={4} name="metaDescription" label="Meta description" id="metaDescription" />
                     </div>
                  </Card>
               </div>
               <div className="col-span-12 lg:col-span-4">
                  {/* Category banner */}
                  <Card
                     heading="Category banner"
                     className="col-span-4 p-4 mb-4"
                     more={
                        formik?.values?.image && (
                           <div className="flex items-center gap-2">
                              <label htmlFor="category-banner-change" className="text-sm font-normal text-blue-500 hover:underline cursor-pointer">
                                 <input //
                                    type="file"
                                    id="category-banner-change"
                                    accept="image/*"
                                    onChange={(e) => {
                                       const file = e.target?.files?.[0];
                                       formik.setFieldValue("image", file);
                                    }}
                                    hidden
                                 />
                                 change
                              </label>
                              <button type="button" className="text-sm font-normal text-red-500 hover:underline  cursor-pointer" onClick={() => formik.setFieldValue("image", "")}>
                                 Remove
                              </button>
                           </div>
                        )
                     }>
                     {formik?.values?.image ? (
                        <React.Fragment>
                           {typeof formik?.values?.image === "object" ? ( //
                              <img src={URL.createObjectURL(formik?.values?.image)} alt="file" className="w-full" />
                           ) : (
                              <img crossOrigin="anonymous" src={formik?.values?.image} alt="file" className="w-full" />
                           )}
                        </React.Fragment>
                     ) : (
                        <label htmlFor="category-banner" className="min-h-[170px] border-2 rounded-sm border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                           <input //
                              type="file"
                              name="image"
                              accept="image/*"
                              id="category-banner"
                              onChange={(e) => {
                                 const file = e.target?.files?.[0];
                                 formik.setFieldValue("image", file);
                              }}
                              hidden
                           />
                           <div>
                              <span className="text-white bg-[#5c5f62] h-[38px] w-[38px] rounded-full flex  justify-center items-center mx-auto my-2">
                                 <FaArrowUp size={19} />
                              </span>
                              <a className="border text-[14px] font-semibold p-2 rounded-sm border-gray-400 text-gray-800 block mx-auto text-center">Add image</a>
                              <small className="text-xs block text-center mt-3 text-gray-500">click to upload an image</small>
                           </div>
                        </label>
                     )}
                  </Card>
                  {/* Status Include In Store Menu,Show Products */}
                  <Card className="p-4">
                     <div>
                        <Label className="uppercase text-xs block font-semibold mb-3">Status</Label>
                        <Radio //
                           label="Disabled"
                           name="status"
                           onChange={(e) => formik.setFieldValue("status", e.target.value)}
                           value="0"
                           checked={formik.values.status === "0"}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Enabled"
                           name="status"
                           onChange={(e) => formik.setFieldValue("status", e.target.value)}
                           value="1"
                           checked={formik.values.status === "1"}
                        />
                     </div>
                     <hr className="border-t border-gray-300 my-5" />
                     <div>
                        <Label className="uppercase text-xs block font-semibold mb-3">Include In Store Menu</Label>
                        <Radio //
                           label="No"
                           name="includeInNav"
                           onChange={(e) => formik.setFieldValue("includeInNav", e.target.value)}
                           value="0"
                           checked={formik.values.includeInNav === "0"}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Yes"
                           name="includeInNav"
                           onChange={(e) => formik.setFieldValue("includeInNav", e.target.value)}
                           value="1"
                           checked={formik.values.includeInNav === "1"}
                        />
                     </div>
                     <hr className="border-t border-gray-300 my-5" />
                     <div>
                        <Label className="uppercase text-xs block font-semibold mb-3">Show Products?</Label>
                        <Radio //
                           label="No"
                           name="showProducts"
                           onChange={(e) => formik.setFieldValue("showProducts", e.target.value)}
                           value="0"
                           checked={formik.values.showProducts === "0"}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Yes"
                           name="showProducts"
                           onChange={(e) => formik.setFieldValue("showProducts", e.target.value)}
                           value="1"
                           checked={formik.values.showProducts === "1"}
                        />
                     </div>
                  </Card>
               </div>
               <div className="col-span-12 lg:col-span-12">
                  <hr className="my-5 border-t-1 border-[#e1e3e5]" />
                  <div className="flex justify-between items-center">
                     {/* Cancel button  */}
                     <div>
                        <Link href="/admin/categories" type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer" replace>
                           Cancel
                        </Link>
                     </div>
                     {/* Save button  */}
                     <div>
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={submitting}>
                           Save
                        </Button>
                     </div>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}
