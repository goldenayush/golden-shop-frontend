"use client";
import { Card, Editor } from "@/shared/components";
import { Button, Label, Radio, Select, Textarea, TextField } from "@/shared/ui";
import React, { JSX, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFileUpload } from "@/shared/hooks";
import SelectKeyAttributes from "./SelectKeyAttributes";
import { IoArrowBack } from "react-icons/io5";
import * as Yup from "yup";

type Props = {
   pid?: string;
};
export default function ProductForm({ pid }: Props) {
   const { files, handleFileChange, deleteFile } = useFileUpload({ multi: true });
   const fields = {
      name: "samsung s24",
      sku: 500,
      price: 80000,
      weight: 20,
      category: {
         name: "",
         id: "",
         value: "",
      },
      tax_class: "Zero",
      description: "<h1>Product Description</h1>",
      media: [
         { url: "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg" },
         { url: "https://images.pexels.com/photos/8950026/pexels-photo-8950026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }, //
      ],
      url_key: "/admin/new-product",
      meta_title: "meta title Product",
      meta_keywords: "meta keywords Product",
      meta_description: "meta description Product",
      status: "disabled",
      visibility: "",
      manage_stock: 20,
      stock_availability: "",
      quantity: 12,
      attribute_group: "",
      attributes: {
         color: "red",
         material: "net",
         ocassion: "holi",
         size: "1",
      },
   };
   const [initialValues, setInitialValues] = useState(fields);
   return (
      <Formik //
         enableReinitialize
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={(props) => console.log(props)}>
         {(formik) => {
            return (
               <Form>
                  <div className="flex items-center gap-3 mb-3">
                     <button
                        type="button"
                        className="border p-2 rounded-sm cursor-pointer border-[#8c9196]
                              text-[#6c7277]">
                        <IoArrowBack size={22} />
                     </button>
                     <h2 className="text-[20px] font-semibold">
                        {/*  */}
                        {pid ? "Editing [Laddu Gopal Jewelry Set]" : "Create a new product"}
                        {/*  */}
                     </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-3">
                     <div className="col-span-8">
                        {/* General */}
                        <Card className="p-4" heading="General">
                           <div className="grid grid-cols-12 gap-3">
                              {/* name */}
                              <div className="col-span-12">
                                 <Field //
                                    as={TextField}
                                    label="Name"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                 />
                                 <ErrorMessage //
                                    component="small"
                                    className="field-error"
                                    name="name"
                                 />
                              </div>
                              {/* SKU */}
                              <div className="col-span-4">
                                 <Field //
                                    as={TextField}
                                    type="number"
                                    label="SKU"
                                    id="SKU"
                                    name="sku"
                                    placeholder="SKU"
                                 />
                                 <ErrorMessage //
                                    component="small"
                                    className="field-error"
                                    name="sku"
                                 />
                              </div>
                              {/* price */}
                              <div className="col-span-4">
                                 <Field //
                                    as={TextField}
                                    type="number"
                                    label="Price"
                                    id="price"
                                    name="price"
                                    placeholder="Price"
                                 />
                                 <ErrorMessage //
                                    component="small"
                                    className="field-error"
                                    name="price"
                                 />
                              </div>
                              {/* Weight */}
                              <div className="col-span-4">
                                 <Field //
                                    as={TextField}
                                    type="number"
                                    label="Weight"
                                    id="weight"
                                    name="weight"
                                    placeholder="Weight"
                                 />
                                 <ErrorMessage //
                                    component="small"
                                    className="field-error"
                                    name="weight"
                                 />
                              </div>
                              {/* Category */}
                              <div className="col-span-12">
                                 <Label>Category</Label>
                                 {formik.values.category?.name ? ( //
                                    <div className="flex justify-between items-center border p-3 rounded-sm border-[#e5e7eb]">
                                       <span className="text-sm text-gray-500">{formik?.values?.category?.name}</span>
                                       <SelectKeyAttributes
                                          title="Change"
                                          onlyTitle
                                          selcted={[formik?.values?.category as any]}
                                          keyName="categories"
                                          setValue={(values) => {
                                             formik.setFieldValue(
                                                "category.id", //
                                                values[0]?.id
                                             );
                                             formik.setFieldValue(
                                                "category.name", //
                                                values[0]?.name
                                             );
                                             formik.setFieldValue(
                                                "category.label", //
                                                values[0]?.value
                                             );
                                          }}
                                       />
                                       <button //
                                          type="button"
                                          className="text-xs text-red-400 font-semibold cursor-pointer"
                                          onClick={() => {
                                             formik.setFieldValue("category", "");
                                          }}>
                                          Unassign
                                       </button>
                                    </div>
                                 ) : (
                                    <SelectKeyAttributes //
                                       title="Select Categories"
                                       onlyTitle
                                       selcted={[formik?.values?.category]}
                                       keyName="categories"
                                       setValue={(values) => {
                                          formik.setFieldValue(
                                             "category.id", //
                                             values[0]?.id
                                          );
                                          formik.setFieldValue(
                                             "category.name", //
                                             values[0]?.name
                                          );
                                          formik.setFieldValue(
                                             "category.label", //
                                             values[0]?.value
                                          );
                                       }}
                                    />
                                 )}
                              </div>
                              {/* tax_class */}
                              <div className="col-span-12">
                                 <Field //
                                    as={Select}
                                    label="Tax class"
                                    name="tax_class"
                                    placeholder="Select Tax Class"
                                    options={[
                                       { value: "Standard", label: "Standard" },
                                       { value: "Reduced", label: "Reduced" },
                                       { value: "Zero", label: "Zero" },
                                       { value: "TaxFree", label: "Tax-Free" },
                                       { value: "Digital", label: "Digital" },
                                       { value: "Luxury", label: "Luxury" },
                                       { value: "Shipping", label: "Shipping" },
                                       { value: "International", label: "International" },
                                    ]}
                                 />
                              </div>
                              {/* Editor */}
                              <div className="col-span-12">
                                 <Label>Description</Label>
                                 <Editor //
                                    value={formik.values?.description}
                                    setValue={(value) => {
                                       formik.setFieldValue("description", value);
                                    }}
                                 />
                              </div>
                           </div>
                        </Card>
                        {/* Media */}
                        <Card className="p-4 mt-3" heading="Media">
                           <div className="grid grid-cols-12 gap-3">
                              {files?.map((item, idx) => {
                                 return (
                                    <div key={`file-${idx}`} className="col-span-4 border-1 border-[#e1e1e1] relative">
                                       <RiDeleteBin6Line //
                                          color="#d72c0d"
                                          size={20}
                                          className="absolute top-2 right-2 cursor-pointer"
                                          onClick={() => deleteFile(idx)}
                                       />
                                       <img src={URL.createObjectURL(item)} alt="img" className="w-full block object-cover h-[200px]" />
                                    </div>
                                 );
                              })}
                              <label htmlFor="mediaUpload" className="col-span-4 border-[2px] border-[#e1e1e1] border-dashed p-5 flex justify-center items-center min-h-[200px] cursor-pointer">
                                 <input //
                                    type="file"
                                    id="mediaUpload"
                                    onChange={handleFileChange}
                                    multiple
                                    hidden
                                 />
                                 <FaCamera size={24} color="#058c8c" />
                              </label>
                           </div>
                        </Card>
                        {/* Search engine optimize */}
                        <Card className="p-4 mt-3" heading="Search engine optimize">
                           {/* Url key */}
                           <div className="mb-3">
                              <Field //
                                 as={TextField}
                                 label="Url key"
                                 id="url_key"
                                 name="url_key"
                              />
                              <ErrorMessage //
                                 component="small"
                                 className="field-error"
                                 name="url_key"
                              />
                           </div>
                           {/* Meta title */}
                           <div className="mb-3">
                              <Field //
                                 as={TextField}
                                 label="Meta title"
                                 id="meta_title"
                                 name="meta_title"
                              />
                           </div>
                           {/* Meta keywords */}
                           <div className="mb-3">
                              <Field //
                                 as={TextField}
                                 label="Meta keywords"
                                 id="meta_keywords"
                                 name="meta_keywords"
                              />
                           </div>
                           {/* Meta description */}
                           <div className="mb-3">
                              <Field //
                                 as={Textarea}
                                 label="Meta description"
                                 id="meta_description"
                                 name="meta_description"
                                 className="h-[100px]"
                              />
                           </div>
                        </Card>
                     </div>
                     <div className="col-span-4">
                        {/* Product status */}
                        <Card className="p-4" heading="Product status">
                           <div>
                              <span className="text-[14px] block mb-3">Status</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Disabled</span>}
                                 name="status"
                                 id="disabled"
                                 value="disabled"
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Enabled</span>}
                                 name="status"
                                 id="enabled"
                                 value="enabled"
                              />
                           </div>
                           <hr className="my-2 border-t-1 border-[#e1e3e5]" />
                           <div>
                              <span className="text-[14px] block my-3">Visibility</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Not visible</span>}
                                 name="visibility"
                                 id="not-visibility"
                                 value={false}
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Visible</span>}
                                 name="visibility"
                                 id="visibility"
                                 value={true}
                              />
                           </div>
                        </Card>
                        {/* Inventory */}
                        <Card className="p-4 mt-3" heading="Inventory">
                           <div>
                              <span className="text-[14px] block mb-3">Manage stock?</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">No</span>}
                                 name="manage_stock"
                                 id="No"
                                 value={false}
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Yes</span>}
                                 name="manage_stock"
                                 id="Yes"
                                 value={true}
                              />
                           </div>
                           <hr className="my-2 border-t-1 border-[#e1e3e5]" />
                           <div>
                              <span className="text-[14px] block my-3">Stock availability</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">No</span>}
                                 name="stock_availability"
                                 id="stock_availability_on"
                                 value={false}
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Yes</span>}
                                 name="stock_availability"
                                 id="stock_availability_yes"
                                 value={true}
                              />
                           </div>
                           <hr className="my-2 border-t-1 border-[#e1e3e5]" />
                           <Field //
                              as={TextField}
                              type="number"
                              label="Quantity"
                              id="quantity"
                              name="quantity"
                              placeholder="Quantity"
                           />
                           <ErrorMessage //
                              component="small"
                              className="field-error"
                              name="quantity"
                           />
                        </Card>
                        {/* Attribute group */}
                        <Card className="p-4 mt-3" heading="Attribute group">
                           <Field //
                              as={Select}
                              name="attribute_group"
                              placeholder="Please Select"
                              options={[
                                 { value: "py", label: "python" },
                                 { value: "js", label: "java script" },
                              ]}
                           />
                           <hr className="my-5 border-t-1 border-[#e1e3e5]" />
                           <div>
                              <span className="text-[13px] uppercase block mb-3">Attributes</span>
                              <div className="border-b-1 border-[#e1e3e5]">
                                 <ItemGrid
                                    title="Size"
                                    item={
                                       <>
                                          <Field //
                                             as={Select}
                                             name="attributes.ocassion"
                                             placeholder="Please Select"
                                             options={[
                                                { value: "diwali", label: "diwali" },
                                                { value: "holi", label: "holi" },
                                             ]}
                                          />
                                          <ErrorMessage //
                                             component="small"
                                             className="field-error"
                                             name="attributes.ocassion"
                                          />
                                       </>
                                    }
                                 />
                                 <ItemGrid
                                    title="Ocassion"
                                    item={
                                       <>
                                          <Field //
                                             as={Select}
                                             name="attributes.size"
                                             placeholder="Please Select"
                                             options={[
                                                { value: "1", label: "1" },
                                                { value: "2", label: "2" },
                                             ]}
                                          />
                                          <ErrorMessage //
                                             component="small"
                                             className="field-error"
                                             name="attributes.size"
                                          />
                                       </>
                                    }
                                 />
                                 <ItemGrid
                                    title="Material"
                                    item={
                                       <>
                                          <Field //
                                             as={Select}
                                             name="attributes.material"
                                             placeholder="Please Select"
                                             options={[
                                                { value: "cotton", label: "cotton" },
                                                { value: "net", label: "net" },
                                             ]}
                                          />
                                          <ErrorMessage //
                                             component="small"
                                             className="field-error"
                                             name="attributes.material"
                                          />
                                       </>
                                    }
                                 />
                                 <ItemGrid
                                    title="Color"
                                    item={
                                       <>
                                          <Field //
                                             as={Select}
                                             name="attributes.color"
                                             placeholder="Please Select"
                                             options={[
                                                { value: "red", label: "red" },
                                                { value: "black", label: "black" },
                                             ]}
                                          />
                                          <ErrorMessage //
                                             component="small"
                                             className="field-error"
                                             name="attributes.color"
                                          />
                                       </>
                                    }
                                 />
                              </div>
                           </div>
                        </Card>
                     </div>
                  </div>
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
               </Form>
            );
         }}
      </Formik>
   );
}

const ItemGrid = ({ title, item }: { title: string; item: JSX.Element | string }) => {
   return (
      <div className="flex items-center border-t-1 border-x-1 border-[#e1e3e5]">
         <div className="flex-[35%] p-2">
            <span className="text-[14px]">{title}</span>
         </div>
         <div className="flex-[65%] p-2 border-l-1 border-[#e1e3e5]">{item}</div>
      </div>
   );
};

const validationSchema = Yup.object().shape({
   name: Yup.string().required("Product name is required"),
   sku: Yup.number().required("SKU is required"),
   price: Yup.number().required("Price is required"),
   weight: Yup.number().required("Weight is required"),
   url_key: Yup.string().required("URL key is required"),
   status: Yup.string().required("status is required"),
   visibility: Yup.string().oneOf(["visible", "hidden", "catalog", "search"], "Invalid visibility"),
   quantity: Yup.number().min(0, "Quantity cannot be negative").required(),

   attribute_group: Yup.string(),

   attributes: Yup.object().shape({
      color: Yup.string().required("Color is required"),
      material: Yup.string().required("Material is required"),
      ocassion: Yup.string().required("Occasion is required"),
      size: Yup.string().required("Size is required"),
   }),
});
