import { Radio, Select, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import SelectKeyAttributes from "../../../components/SelectKeyAttributes";
import { CreateCoupon } from "@/types/coupons.type";

type Props = {
   formik: FormikProps<CreateCoupon>;
};

const discountTypes = [
   { id: "fixed_discount_to_entire_order", name: "Fixed discount to entire order" },
   { id: "percentage_discount_to_entire_order", name: "Percentage discount to entire order" },
   { id: "fixed_discount_to_specific_products", name: "Fixed discount to specific products" },
   { id: "percentage_discount_to_specific_products", name: "Percentage discount to specific products" },
   { id: "buy_x_get_y", name: "Buy X get Y" },
];

const priceOptions = [
   { label: "Equal", value: "EQUAL" },
   { label: "NOT Equal", value: "NOT_EQUAL" },
   { label: "GREATER", value: "GREATER" },
   { label: "GREATER OR Equal", value: "GREATER_OR_EQUAL" },
   { label: "SMALLER", value: "SMALLER" },
   { label: "Equal OR SMALLER", value: "EQUAL_OR_SMALLER" },
];
const defaultOptions = [
   { label: "In", value: "IN" },
   { label: "Not In", value: "NOT IN" },
];

const keys = [
   { label: "Collection", value: "collection" },
   { label: "Attribute Group", value: "attribute_group" },
   { label: "SKU", value: "sku" },
   { label: "Price", value: "price" },
];

export default function DiscountType({ formik }: Props) {
   return (
      <>
         {/* styles */}
         <style jsx>{`
            td,
            th {
               border: 1px solid #e1e3e5;
            }
         `}</style>
         {/* ui */}
         {discountTypes?.map((type, idx) => {
            return (
               <div className="mb-2" key={`discount-type-${idx}`}>
                  <Radio //
                     label={type?.name}
                     name="discountType.name"
                     value={type.id}
                     checked={formik?.values?.discountType === type?.id}
                     onChange={() => {
                        formik.setFieldValue("discountType.name", type.id);
                        formik.setFieldValue("targetProducts.products", []);
                     }}

                  />
               </div>
            );
         })}
         <ErrorMessage component="small" className="field-error" name="discountType" />
         {/* targetProducts */}
         {["fixed_discount_to_specific_products", "percentage_discount_to_specific_products"].includes(formik?.values?.discountType) && (
            <div>
               <h3 className="py-2 font-semibold">Target products</h3>
               <div className="flex items-center gap-1 text-[14px]">
                  <span>Maximum</span>{" "}
                  <Field //
                     as={TextField}
                     eleSize="sm"
                     style={{ width: "40px" }}
                     placeholder="10"
                     name="targetProducts.maxQty"
                  />
                  <span>quantity of products are matched below conditions (All)</span>
               </div>
               <ErrorMessage component="small" className="field-error" name="targetProducts.maxQty" />
            </div>
         )}
         <div className="mt-3">
            <FieldArray
               name="targetProducts.products"
               render={({ remove, push }) => {
                  const list = formik?.values?.targetProducts?.products || [];

                  switch (formik?.values?.discountType) {
                     case "fixed_discount_to_specific_products":
                     case "percentage_discount_to_specific_products":
                        return (
                           <>
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                 <thead className="text-sm font-semibold text-gray-700 capitalize">
                                    <tr>
                                       <th scope="col" className="p-2">Key</th>
                                       <th scope="col" className="p-2">Operator</th>
                                       <th scope="col" className="p-2">Value</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {list?.map((item: any, idx: number) => {
                                       return (
                                          <tr key={`discount-type-list-${idx}`} className="bg-white">
                                             <td className="p-2">
                                                <Select //
                                                   required
                                                   placeholder="Select"
                                                   options={keys}
                                                   value={item?.key || ""}
                                                   onChange={(e) => {
                                                      formik.setFieldValue(`targetProducts.products.${idx}.key`, e.target.value);
                                                      formik.setFieldValue(`targetProducts.products.${idx}.value`, []);
                                                   }}
                                                />
                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`targetProducts.products.${idx}.key`}
                                                />
                                             </td>
                                             <td className="p-2">
                                                <Field //
                                                   required
                                                   as={Select}
                                                   placeholder="Select"
                                                   name={`targetProducts.products.${idx}.operator`}
                                                   options={item?.key !== "price" ? defaultOptions : priceOptions}
                                                />
                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`targetProducts.products.${idx}.operator`}
                                                />
                                             </td>
                                             <td className="p-2">
                                                {item?.key === "price" ? (
                                                   <Field //
                                                      required
                                                      as={TextField}
                                                      placeholder="Enter the price"
                                                      name={`targetProducts.products.${idx}.value`}
                                                   />
                                                ) : (
                                                   <>

                                                      <SelectKeyAttributes //
                                                         disabled={!item?.key}
                                                         multiple
                                                         selcted={item?.value}
                                                         title={`Choose ${item?.key}`}
                                                         keyName={item?.key}
                                                         setValue={(values) => {

                                                            const updatedValues = values?.map((element) =>
                                                               element?.value || "");
                                                            formik.setFieldValue(`targetProducts.products.${idx}.value`, updatedValues);
                                                         }}
                                                      />
                                                   </>

                                                )}

                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`targetProducts.products.${idx}.value`}
                                                />
                                             </td>
                                             <td className="p-2">
                                                <button //
                                                   type="button"
                                                   className="rounded-sm cursor-pointer text-xs text-red-600 font-semibold"
                                                   onClick={() => remove(idx)}>
                                                   <FaMinus />
                                                </button>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                              <button type="button" className="py-1 rounded-sm cursor-pointer mb-3 text-sm flex items-center gap-2 mt-3" onClick={() => push({})}>
                                 <MdAdd /> Add product
                              </button>
                           </>
                        );
                     case "buy_x_get_y":
                        return (
                           <>
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                 <thead className="text-sm font-semibold text-gray-700 capitalize">
                                    <tr>
                                       <th scope="col" className="p-2">Sku</th>
                                       <th scope="col" className="p-2">Buy Qty</th>
                                       <th scope="col" className="p-2">Get Qty</th>
                                       <th scope="col" className="p-2">Max Y</th>
                                       <th scope="col" className="p-2">Discount</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {list?.map((item: any, idx: number) => {
                                       return (
                                          <tr key={`23sgfr-${idx}`}>
                                             <td className="p-2">
                                                {/* <SelectKeyAttributes
                                                   selcted={item?.sku ? [item?.sku] : []}
                                                   title="Choose SKU"
                                                   keyName="sku"
                                                   setValue={(values) => {
                                                      console.log("Item.sku:", item.sku, values);
                                                      const skuId = values[0]?.id || "";
                                                      //  console.log("Selected SKU ID:", item.sku);
                                                      let x = [...list, { id: skuId }]
                                                      formik.setFieldValue(
                                                         `buyxGety.${idx}.sku`,
                                                         skuId
                                                      )
                                                   }
                                                   }
                                                /> */}

                                                <SelectKeyAttributes //
                                                   selcted={item?.sku ? [item?.sku] : []}
                                                   title="Choose SKU"
                                                   keyName="sku"
                                                   setValue={(values) => {

                                                      formik.setFieldValue(
                                                         `buyxGety.${idx}.id`, //
                                                         values[0]?.id
                                                      );
                                                      formik.setFieldValue(
                                                         `buyxGety.${idx}.name`, //
                                                         values[0]?.name
                                                      );
                                                      formik.setFieldValue(
                                                         `buyxGety.${idx}.value`, //
                                                         values[0]?.value
                                                      );
                                                   }}
                                                />







                                             </td>
                                             <td className="p-2">
                                                <Field
                                                   type="number"
                                                   as={TextField}
                                                   placeholder="Buy Qty"
                                                   name={`buyxGety.${idx}.buyQty`}
                                                   required
                                                />
                                             </td>
                                             <td className="p-2">
                                                <Field
                                                   type="number"
                                                   as={TextField}
                                                   placeholder="Get Qty"
                                                   name={`buyxGety.${idx}.getQty`}
                                                   required
                                                />
                                             </td>
                                             <td className="p-2">
                                                <Field
                                                   type="number"
                                                   as={TextField}
                                                   placeholder="Max Y"
                                                   name={`buyxGety.${idx}.maxY`}
                                                   required
                                                />
                                             </td>
                                             <td className="p-2">
                                                <Field
                                                   type="number"
                                                   as={TextField}
                                                   placeholder="Discount"
                                                   name={`buyxGety.${idx}.discount`}
                                                   required
                                                />
                                             </td>
                                             <td className="p-2">
                                                <button type="button" className="rounded-sm cursor-pointer text-xs text-red-600 font-semibold" onClick={() => remove(idx)}>
                                                   <FaMinus />
                                                </button>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                              <button type="button" className="py-1 rounded-sm cursor-pointer mb-3 text-sm flex items-center gap-2 mt-3" onClick={() => push({})}>
                                 <MdAdd /> Add product
                              </button>
                           </>
                        );
                     default:
                        return null;
                  }
               }}
            />
         </div>
         {/* targetProducts */}
      </>
   );
}

export const discountTypeSchemas = Yup.object().shape({
   discountType: Yup.string().required("Discount type is required"),
   targetProducts: Yup.object().shape({
      maxQty: Yup.number()
         .typeError("Max quantity must be a number")
         .when("$discountType", {
            is: (val: any) => ["fixed_discount_to_specific_products", "percentage_discount_to_specific_products"].includes(val),
            then: (schema) => schema.required("Max quantity is required").integer("Must be an integer").min(0, "At least 0"),
            otherwise: (schema) => schema.notRequired(),
         }),
      products: Yup.array(),
   }),
   buyxGety: Yup.array(),
});
