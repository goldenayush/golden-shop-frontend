"use client";
import { Card, Editor } from "@/shared/components";
import { Button, Label, Radio, Select, UploadGallery } from "@/shared/ui";
import React, { JSX, useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextFieldFormik } from "@/libs/formik";
import SelectAttributeGroup from "./SelectAttributeGroup";
import CategorySelector from "./CategorySelector";
import ProductVariant from "./ProductVariant";
import { IProduct } from "@/types/product.type";

type Props = {
   onSubmit: (body: any) => void;
   loading?: boolean;
   patchValues?: IProduct | null;
};

export default function ProductForm({ onSubmit, loading, patchValues }: Props) {
   const refUpload = useRef<any>(null);
   const [fields, setFields] = useState({
      type: "",
      visibility: "1",
      sku: "",
      price: null,
      weight: null,
      status: "1",
      categoryId: "",
      groupId: "",
      productDescription: {
         name: "",
         description: "",
         urlKey: "", //validate
         metaTitle: "",
         metaDescription: "",
         metaKeywords: "",
         shortDescription: "",
      },
      productInventory: {
         manageStock: "1",
         stockAvailability: "1",
         qty: null, //validate
      },
      ProductAttributeValueIndex: [],
      productImages: [],
   });

   const submit = (body: typeof fields) => {
      const { visibility, status, productInventory, ...rest } = body;
      const iamges = refUpload.current?.files;

      const paylaod = {
         ...rest,
         visibility: !!+visibility,
         status: !!+status,
         productInventory: {
            ...productInventory,
            manageStock: !!+productInventory.manageStock,
            stockAvailability: !!+productInventory.stockAvailability,
         },
         productImages: iamges,
      };
      onSubmit(paylaod);
   };

   useEffect(() => {
      if (patchValues) {
         setFields({
            id: patchValues.id,
            type: patchValues?.type,
            visibility: String(+patchValues?.visibility),
            sku: patchValues?.sku,
            price: patchValues?.price,
            weight: patchValues?.weight,
            status: String(+patchValues?.status),
            categoryId: patchValues?.categoryId,
            groupId: patchValues?.groupId,
            productDescription: patchValues?.productDescription,
            productInventory: {
               manageStock: String(+patchValues?.productInventory?.manageStock),
               stockAvailability: String(+patchValues?.productInventory?.stockAvailability),
               qty: patchValues?.productInventory?.qty,
            },
            ProductAttributeValueIndex: patchValues?.ProductAttributeValueIndex || [],
         } as any);
      }
      return () => { };
   }, [patchValues]);

   return (
      <Formik //
         enableReinitialize={Boolean(patchValues)}
         initialValues={fields}
         validationSchema={validationSchema}
         onSubmit={submit}>
         {(formik) => {
            return (
               <Form>
                  <div className="grid grid-cols-12 gap-3">
                     <div className="col-span-12 lg:col-span-8">
                        {/* General */}
                        <Card className="p-4" heading="General">
                           <div className="grid grid-cols-12 gap-3">
                              {/* name */}
                              <div className="col-span-12">
                                 <TextFieldFormik label="Name" id="name" name="productDescription.name" placeholder="Name" />
                              </div>
                              {/* SKU */}
                              <div className="col-span-12 md:col-span-4">
                                 <TextFieldFormik type="text" label="SKU" id="SKU" name="sku" placeholder="SKU" />
                              </div>
                              {/* price */}
                              <div className="col-span-12 md:col-span-4">
                                 <TextFieldFormik type="number" label="Price" id="price" name="price" placeholder="Price" suffixIcon="INR" />
                              </div>
                              {/* Weight */}
                              <div className="col-span-12 md:col-span-4">
                                 <TextFieldFormik type="number" label="Weight" id="weight" name="weight" placeholder="Weight" suffixIcon="kg" />
                              </div>
                              {/* Category */}
                              <div className="col-span-12">
                                 <CategorySelector
                                    ids={
                                       formik.values.categoryId //
                                          ? [formik.values.categoryId]
                                          : []
                                    }
                                    getValue={(values) => {
                                       formik.setFieldValue("categoryId", values[0]);
                                    }}
                                 />
                              </div>
                              {/* type */}
                              <div className="col-span-12">
                                 <Field //
                                    as={Select}
                                    label="Type"
                                    name="type"
                                    placeholder="Select Type"
                                    options={[{ value: "physical", label: "physical" }]}
                                 />
                              </div>
                              {/* Editor */}
                              <div className="col-span-12">
                                 <Label>Description</Label>
                                 <Editor //
                                    value={formik.values?.productDescription?.description}
                                    setValue={(value) => {
                                       formik.setFieldValue("productDescription.description", value);
                                    }}
                                 />
                              </div>
                           </div>
                        </Card>
                        {/* Media */}
                        <Card className="p-4 mt-3" heading="Media">
                           <UploadGallery //
                              ref={refUpload}
                              initialvalue={patchValues?.productImages || []}
                              size="md"
                              id="main-product"
                           />
                        </Card>
                        {/* Search engine optimize */}
                        <Card className="p-4 mt-3" heading="Search engine optimize">
                           {/* Url key */}
                           <div className="mb-3">
                              <TextFieldFormik label="Url key" id="urlKey" name="productDescription.urlKey" />
                           </div>
                           {/* Meta title */}
                           <div className="mb-3">
                              <TextFieldFormik label="Meta title" id="metaTitle" name="productDescription.metaTitle" />
                           </div>
                           {/* Meta keywords */}
                           <div className="mb-3">
                              <TextFieldFormik label="Meta keywords" id="metaKeywords" name="productDescription.metaKeywords" />
                           </div>
                           {/* Meta description */}
                           <div className="mb-3">
                              <TextFieldFormik label="Meta description" id="metaDescription" name="productDescription.metaDescription" className="h-[100px]" />
                           </div>
                        </Card>
                        {Boolean(patchValues) && (
                           <ProductVariant //
                              productId={patchValues?.id}
                              variantId={patchValues?.variantId}
                           />
                        )}
                     </div>
                     <div className="col-span-12 lg:col-span-4">
                        {/* Product status */}
                        <Card className="p-4" heading="Product status">
                           <div>
                              <span className="text-[14px] block mb-3">Status</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Disabled</span>}
                                 name="status"
                                 id="disabled"
                                 value="0"
                                 checked={formik.values.status === "0"}
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Enabled</span>}
                                 name="status"
                                 id="enabled"
                                 value="1"
                                 checked={formik.values.status === "1"}
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
                                 value="0"
                                 checked={formik.values.visibility === "0"}
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Visible</span>}
                                 name="visibility"
                                 id="visibility"
                                 value="1"
                                 checked={formik.values.visibility === "1"}
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
                                 name="productInventory.manageStock"
                                 id="No"
                                 checked={formik.values.productInventory.manageStock === "0"}
                                 value="0"
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Yes</span>}
                                 name="productInventory.manageStock"
                                 checked={formik.values.productInventory.manageStock === "1"}
                                 id="Yes"
                                 value="1"
                              />
                           </div>
                           <hr className="my-2 border-t-1 border-[#e1e3e5]" />
                           <div>
                              <span className="text-[14px] block my-3">Stock availability</span>
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">No</span>}
                                 name="inventory.stockAvailability"
                                 id="stockAvailability_on"
                                 checked={formik.values.productInventory.stockAvailability === "0"}
                                 value="0"
                              />
                              <div className="mb-1" />
                              <Field //
                                 as={Radio}
                                 label={<span className="text-[14px] text-[#202223]">Yes</span>}
                                 name="productInventory.stockAvailability"
                                 id="stockAvailability_yes"
                                 checked={formik.values.productInventory.stockAvailability === "1"}
                                 value="1"
                              />
                           </div>
                           <hr className="my-2 border-t-1 border-[#e1e3e5]" />
                           <TextFieldFormik type="number" label="Quantity" id="quantity" name="productInventory.qty" placeholder="Quantity" />
                        </Card>
                        {/* Attribute group */}
                        <Card className="p-4 mt-3" heading="Attribute group">
                           <SelectAttributeGroup />
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
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
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

const validationSchema = Yup.object().shape({
   sku: Yup.string().required("This field can not be empty"),
   price: Yup.number().typeError("Price must be a number.").required("This field can not be empty").positive("Price must be greater than zero."),
   weight: Yup.number().typeError("Weight must be a number.").required("This field can not be empty").positive("Weight must be greater than zero."),

   productDescription: Yup.object().shape({
      name: Yup.string().required("This field can not be empty"),
      urlKey: Yup.string().required("This field can not be empty"),
   }),

   productInventory: Yup.object().shape({
      qty: Yup.number().typeError("Quantity must be a number.").required("This field can not be empty").min(0, "This field can not be empty"),
   }),
});
