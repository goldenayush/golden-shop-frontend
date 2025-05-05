"use client";
import { Card, Editor, Modal } from "@/shared/components";
import { Button, Label, Radio, Select, Textarea, TextField } from "@/shared/ui";
import React, { JSX, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { Field, Form, Formik } from "formik";
import { useFileUpload } from "@/shared/hooks";

type Props = {
   heading: string;
};
export default function ProductForm({ heading }: Props) {
   const { files, handleFileChange, deleteFile } = useFileUpload();
   const fields = {
      name: "samsung s24",
      sku: 500,
      price: 80000,
      weight: 20,
      category: "Laddu Gopal > Pagdi",
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
   const categories = [
      { name: "Laddu Gopal > Accessories" }, //
      { name: "Laddu Gopal > Pagdi" },
      { name: "Laddu Gopal > Poshak" },
      { name: "Laddu Gopal" },
   ];
   const modalRef = useRef<any>(null);

   return (
      <Formik enableReinitialize initialValues={initialValues} onSubmit={(props) => console.log(props)}>
         {(formik) => {
            return (
               <Form>
                  <h2 className="text-[20px] font-semibold mb-3">{heading}</h2>
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
                              </div>
                              {/* Category */}
                              <div className="col-span-12">
                                 <Label>Category</Label>
                                 {formik.values.category ? ( //
                                    <div className="flex justify-between items-center border p-3 rounded-sm border-[#e5e7eb]">
                                       <span className="text-sm text-gray-500">{formik.values.category}</span>
                                       <button //
                                          type="button"
                                          className="text-xs text-blue-400 font-semibold cursor-pointer"
                                          onClick={() => {
                                             modalRef.current.setIsOpen(true);
                                          }}>
                                          Change
                                       </button>
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
                                    <button //
                                       type="button"
                                       onClick={() => modalRef.current.setIsOpen(true)}
                                       className="text-blue-500 cursor-pointer">
                                       Select category
                                    </button>
                                 )}
                                 <Modal ref={modalRef} title="Select Categories" size="lg" className="p-5">
                                    <div>
                                       <input type="text" className="border w-full border-gray-400 p-2 rounded-sm placeholder:text-[14px]" placeholder="Search Categories" />
                                    </div>
                                    <div className="mt-3">
                                       {categories?.map((category, idx) => (
                                          <React.Fragment //
                                             key={`product-category-${idx}`}>
                                             <div //
                                                className="flex justify-between items-center py-3">
                                                <span className="text-sm text-gray-500">{category.name}</span>
                                                <button //
                                                   role="button"
                                                   className="py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold"
                                                   onClick={() => {
                                                      formik.setFieldValue("category", category.name);
                                                      modalRef.current.setIsOpen(false);
                                                   }}>
                                                   Select
                                                </button>
                                             </div>
                                             {Boolean(categories.length - 1 > idx) && (
                                                <hr //
                                                   className="border-b border-[#e1e3e5]"
                                                />
                                             )}
                                          </React.Fragment>
                                       ))}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between ">
                                       <div className="flex items-center gap-2">
                                          <span className="text-[14px] text-gray-500">4 of 4</span>
                                          <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                                             <MdArrowBackIosNew size={12} />
                                          </button>
                                          <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                                             <MdArrowForwardIos size={12} />
                                          </button>
                                       </div>
                                       <button //
                                          type="button"
                                          className="py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold"
                                          onClick={() => {
                                             modalRef.current.setIsOpen(false);
                                          }}>
                                          Close
                                       </button>
                                    </div>
                                 </Modal>
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
                           <div></div>
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
                                       <Field //
                                          as={Select}
                                          name="attributes.ocassion"
                                          placeholder="Please Select"
                                          options={[
                                             { value: "diwali", label: "diwali" },
                                             { value: "holi", label: "holi" },
                                          ]}
                                       />
                                    }
                                 />
                                 <ItemGrid
                                    title="Ocassion"
                                    item={
                                       <Field //
                                          as={Select}
                                          name="attributes.size"
                                          placeholder="Please Select"
                                          options={[
                                             { value: "1", label: "1" },
                                             { value: "2", label: "2" },
                                          ]}
                                       />
                                    }
                                 />
                                 <ItemGrid
                                    title="Material"
                                    item={
                                       <Field //
                                          as={Select}
                                          name="attributes.material"
                                          placeholder="Please Select"
                                          options={[
                                             { value: "cotton", label: "cotton" },
                                             { value: "net", label: "net" },
                                          ]}
                                       />
                                    }
                                 />
                                 <ItemGrid
                                    title="Color"
                                    item={
                                       <Field //
                                          as={Select}
                                          name="attributes.color"
                                          placeholder="Please Select"
                                          options={[
                                             { value: "red", label: "red" },
                                             { value: "black", label: "black" },
                                          ]}
                                       />
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
