"use client";
import { TextareaFormik, TextFieldFormik } from "@/libs/formik";
import { Card, Editor } from "@/shared/components";
import { useFileUpload } from "@/shared/hooks";
import { Button, Label, Radio, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import * as Yup from "yup";
import { FaArrowUp } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import Link from "next/link";

export default function CategoryForm({ id }: { id?: string }) {
   const { files, handleFileChange, deleteFile, uploadFiles } = useFileUpload({});
   const initialValues = {
      general: {
         name: "accessories",
         parent_category: "Laddu Gopal",
         description:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis a quasi voluptas animi recusandae, accusantium deserunt laborum laboriosam ullam possimus beatae ex magnam minima totam quas sapiente quos saepe?</p>",
      },
      seo: {
         url_key: "abs",
         url_title: "Main",
         meta_keywords: "Prod",
         meta_description: "kjskdksadksad sadsajhdjsad",
      },
      status: "1",
      isInStore: "1",
      show_products: "1",
   };
   return (
      <div>
         <div className="flex items-center gap-3 mb-3">
            <button type="button" className="border p-2 rounded-sm cursor-pointer border-[#8c9196] text-[#6c7277]">
               <IoArrowBack size={22} />
            </button>
            <h2 className="text-[20px] font-semibold">{id ? "Editing [Accessories]" : "Create a new product"}</h2>
         </div>
         <Formik //
            initialValues={initialValues}
            onSubmit={(e) => console.log(e)}
            validationSchema={Yup.object().shape({
               general: Yup.object().shape({
                  name: Yup.string().required("This field can not be empty"),
               }),
               seo: Yup.object().shape({
                  url_key: Yup.string().required("This field can not be empty"),
                  url_title: Yup.string(),
                  meta_keywords: Yup.string(),
                  meta_description: Yup.string(),
               }),
            })}>
            {(formik) => (
               <Form className="grid grid-cols-12 gap-3">
                  <div className="col-span-8">
                     {/* General */}
                     <Card heading="General" className="p-4 mb-4">
                        <div className="mb-2">
                           <TextFieldFormik name="general.name" label="Name" id="name" />
                        </div>
                        <div className="mb-2">
                           <Label>Parent category</Label>
                           {/* selected  category*/}
                           <div className="border border-gray-300 p-2 flex items-center gap-3 rounded-sm">
                              <span className="text-[14px] text-gray-600">Laddu Gopal</span>
                              <button type="button" className="cursor-pointer text-[14px] text-blue-800 hover:underline">
                                 Change
                              </button>
                              <button type="button" className="cursor-pointer text-[14px] text-red-800 hover:underline">
                                 Unlink
                              </button>
                           </div>
                           {/* selected  category*/}
                           <div className="border border-gray-300 p-2 gap-4 rounded-sm">
                              <div className="flex items-center gap-2">
                                 <button type="button">
                                    <FiPlus size={13} />
                                 </button>
                                 <button type="button" className="text-[14px] font-semibold cursor-pointer">
                                    Laddu Gopal
                                 </button>
                              </div>
                              <ul className="mt-1">
                                 <li className="flex items-center gap-3 pl-3">
                                    <FiPlus size={13} />
                                    <button type="button" className="text-[14px] cursor-pointer">
                                       Accessories
                                    </button>
                                 </li>
                                 <li className="flex items-center gap-3 pl-3">
                                    <FiPlus size={13} />
                                    <button type="button" className="text-[14px] cursor-pointer">
                                       Pagdi
                                    </button>
                                 </li>
                                 <li className="flex items-center gap-3 pl-3">
                                    <FiMinus size={13} />
                                    <button type="button" className="text-[14px] cursor-pointer">
                                       Poshak
                                    </button>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div>
                           <Label>Description</Label>
                           <Editor //
                              value={formik.values?.general.description}
                              setValue={(value) => {
                                 formik.setFieldValue("general.description", value);
                              }}
                           />
                        </div>
                     </Card>
                     {/* Products */}
                     <Card
                        heading="Products"
                        className="p-4 mb-4"
                        more={
                           <button type="button" className="text-[14px] text-blue-600 cursor-pointer hover:underline">
                              Add products
                           </button>
                        }>
                        <TextField placeholder="Search Products" type="text" />
                        <div className="flex items-center justify-between mt-3">
                           <span className="text-gray-800 text-[14px]">
                              <i>23 items</i>
                           </span>
                           <div className="flex gap-2">
                              <button className="text-[14px] text-blue-600 cursor-pointer">Previous</button>
                              <button className="text-[14px] text-blue-600 cursor-pointer">Next</button>
                           </div>
                        </div>
                        {[1, 2, 3, 4, 5].map((_) => (
                           <div className="flex items-center justify-between py-2 border-b border-gray-300">
                              <div className="flex items-center gap-3">
                                 <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                                    <img src="http://admin.mrvcreations.in/assets/catalog/5955/1162/acceseries39-thumb.png" alt="img" className="w-full p-[2px]" />
                                 </div>
                                 <Link href={`/admin/products/1`} className="text-[14px] font-semibold hover:underline">
                                    Laddu Gopal Jewelry Set
                                 </Link>
                              </div>
                              <button type="button" className="text-[14px] text-red-500 cursor-pointer">
                                 Remove
                              </button>
                           </div>
                        ))}
                     </Card>
                     {/* Search engine optimize */}
                     <Card heading="Search engine optimize" className="p-4">
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
                  </div>
                  <div className="col-span-4">
                     {/* Category banner */}
                     <Card
                        heading="Category banner"
                        className="col-span-4 p-4 mb-4"
                        more={
                           files?.[0] && (
                              <div className="flex items-center gap-2">
                                 <label htmlFor="category-banner-change" className="text-sm font-normal text-blue-500 hover:underline  cursor-pointer">
                                    <input type="file" onChange={handleFileChange} id="category-banner-change" accept="image/*" hidden />
                                    change
                                 </label>
                                 <button className="text-sm font-normal text-red-500 hover:underline  cursor-pointer" onClick={() => deleteFile(0)}>
                                    Remove
                                 </button>
                              </div>
                           )
                        }>
                        {files?.[0] ? (
                           <img src={URL.createObjectURL(files[0])} alt="file" className="w-full" />
                        ) : (
                           <label htmlFor="category-banner" className="min-h-[170px] border-2 rounded-sm border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                              <input type="file" accept="image/*" onChange={handleFileChange} id="category-banner" hidden />
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
                              name="isInStore"
                              onChange={(e) => formik.setFieldValue("isInStore", e.target.value)}
                              value="0"
                              checked={formik.values.isInStore === "0"}
                           />
                           <div className="mb-1" />
                           <Radio //
                              label="Yes"
                              name="isInStore"
                              onChange={(e) => formik.setFieldValue("isInStore", e.target.value)}
                              value="1"
                              checked={formik.values.isInStore === "1"}
                           />
                        </div>
                        <hr className="border-t border-gray-300 my-5" />
                        <div>
                           <Label className="uppercase text-xs block font-semibold mb-3">Show Products?</Label>
                           <Radio //
                              label="No"
                              name="show_products"
                              onChange={(e) => formik.setFieldValue("show_products", e.target.value)}
                              value="0"
                              checked={formik.values.show_products === "0"}
                           />
                           <div className="mb-1" />
                           <Radio //
                              label="Yes"
                              name="show_products"
                              onChange={(e) => formik.setFieldValue("show_products", e.target.value)}
                              value="1"
                              checked={formik.values.show_products === "1"}
                           />
                        </div>
                     </Card>
                  </div>
                  <div className="col-span-12">
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
               </Form>
            )}
         </Formik>
      </div>
   );
}
