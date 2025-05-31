import { Radio, Select, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";

import { FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { ICouponfields } from "../CouponForm";
import SelectKeyAttributes from "../../../components/SelectKeyAttributes";

type Props = {
   formik: FormikProps<ICouponfields>;
};

const discountTypes = [
   { id: 1, name: "Fixed discount to entire order" },
   { id: 2, name: "Percentage discount to entire order" },
   { id: 3, name: "Fixed discount to specific products" },
   { id: 4, name: "Percentage discount to specific products" },
   { id: 5, name: "Buy X get Y" },
];

const priceOptions = [
   { label: "Equal", value: "equal" },
   { label: "NOT Equal", value: "not_equal" },
   { label: "GREATER", value: "greater" },
   { label: "GREATER OR Equal", value: "greater_or_equal" },
   { label: "SMALLER", value: "smaller" },
   { label: "Equal OR SMALLER", value: "equal_or_smaller" },
];
const defaultOptions = [
   { label: "In", value: "In" },
   { label: "Not In", value: "Not In" },
];

const keys = [
   {
      label: "categories", //
      value: "categories",
   },
   {
      label: "collections", //
      value: "collections",
   },
   {
      label: "attribute groups",
      value: "attribute_groups",
   },
   {
      label: "sku",
      value: "sku",
   },
   {
      label: "price",
      value: "price",
   },
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
                     name="discount_type.name"
                     value={type.id}
                     checked={+formik?.values?.discount_type?.name === type?.id}
                     onChange={() => {
                        formik.setFieldValue("discount_type.name", type.id);
                        formik.setFieldValue("discount_type.list", []);
                     }}
                  />
               </div>
            );
         })}
         <ErrorMessage component="small" className="field-error" name="discount_type.name" />
         {/* target_products */}
         {[3, 4].includes(+formik?.values?.discount_type?.name) && (
            <div>
               <h3 className="py-2 font-semibold">Target products</h3>
               <div className="flex items-center gap-1 text-[14px]">
                  <span>Maximum</span>{" "}
                  <Field //
                     as={TextField}
                     eleSize="sm"
                     style={{ width: "40px" }}
                     placeholder="10"
                     name="discount_type.target_products"
                  />
                  <span>quantity of products are matched bellow conditions(All)</span>
               </div>
               <ErrorMessage component="small" className="field-error" name="discount_type.target_products" />
            </div>
         )}
         <div className="mt-3">
            <FieldArray
               name="discount_type.list"
               render={({ remove, push }) => {
                  const list = formik?.values?.discount_type?.list || [];
                  switch (+formik?.values?.discount_type?.name) {
                     case 3:
                     case 4:
                        return (
                           <>
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                 <thead className="text-sm font-semibold text-gray-700 capitalize">
                                    <th scope="col" className="p-2">
                                       Key
                                    </th>
                                    <th scope="col" className="p-2">
                                       Operator
                                    </th>
                                    <th scope="col" className="p-2">
                                       Value
                                    </th>
                                    <th></th>
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
                                                   value={(formik.values.discount_type.list?.[idx] as any)?.key || ""}
                                                   onChange={(e) => {
                                                      formik.setFieldValue(`discount_type.list.${idx}.key`, e.target.value);
                                                      formik.setFieldValue(`discount_type.list.${idx}.values`, []);
                                                   }}
                                                />
                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`discount_type.list.${idx}.key`}
                                                />
                                             </td>
                                             <td className="p-2">
                                                <Field //
                                                   required
                                                   as={Select}
                                                   placeholder="Select"
                                                   name={`discount_type.list.${idx}.operator`}
                                                   options={item?.key !== "price" ? defaultOptions : priceOptions}
                                                />
                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`discount_type.list.${idx}.operator`}
                                                />
                                             </td>
                                             <td className="p-2">
                                                {item?.key === "price" ? (
                                                   <Field //
                                                      required
                                                      as={TextField}
                                                      placeholder="Enter the price"
                                                      name={`discount_type.list.${idx}.values`}
                                                   />
                                                ) : (
                                                   <SelectKeyAttributes //
                                                      disabled={!item?.key}
                                                      multiple
                                                      selcted={item?.values}
                                                      title={`Choose ${item?.key}`}
                                                      keyName={item?.key}
                                                      setValue={(values) => {
                                                         const updatedValues = values?.map((element) => ({
                                                            id: element?.id || "",
                                                            name: element?.name || "",
                                                            value: element?.value || "",
                                                         }));
                                                         formik.setFieldValue(`discount_type.list.${idx}.values`, updatedValues);
                                                      }}
                                                   />
                                                )}
                                                <ErrorMessage //
                                                   component="small"
                                                   className="field-error"
                                                   name={`discount_type.list.${idx}.value`}
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
                     case 5:
                        return (
                           <>
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                 <thead className="text-sm font-semibold text-gray-700 capitalize">
                                    <th scope="col" className="p-2">
                                       Sku
                                    </th>
                                    <th scope="col" className="p-2">
                                       X
                                    </th>
                                    <th scope="col" className="p-2">
                                       Y
                                    </th>
                                    <th scope="col" className="p-2">
                                       Max of Y
                                    </th>
                                    <th scope="col" className="p-2">
                                       Discount percent
                                    </th>
                                    <th></th>
                                 </thead>
                                 <tbody>
                                    {list?.map((item: any, idx: number) => (
                                       <tr key={`23sgfr-${idx}`}>
                                          <td className="p-2">
                                             <SelectKeyAttributes //
                                                selcted={item?.sku ? [item?.sku] : []}
                                                title="Choose SKU"
                                                keyName="sku"
                                                setValue={(values) => {
                                                   formik.setFieldValue(
                                                      `discount_type.list.${idx}.sku.id`, //
                                                      values[0]?.id
                                                   );
                                                   formik.setFieldValue(
                                                      `discount_type.list.${idx}.sku.name`, //
                                                      values[0]?.name
                                                   );
                                                   formik.setFieldValue(
                                                      `discount_type.list.${idx}.sku.value`, //
                                                      values[0]?.value
                                                   );
                                                }}
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={TextField}
                                                placeholder="Buy qtu"
                                                name={`discount_type.list.${idx}.buy_qtu`}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={TextField}
                                                placeholder="Get qtu"
                                                name={`discount_type.list.${idx}.get_qtu`}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={TextField}
                                                placeholder="Max of Y"
                                                name={`discount_type.list.${idx}.max_y`}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={TextField}
                                                placeholder="Discount percent"
                                                name={`discount_type.list.${idx}.discount_percent`}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <button type="button" className="rounded-sm cursor-pointer text-xs text-red-600 font-semibold" onClick={() => remove(idx)}>
                                                <FaMinus />
                                             </button>
                                          </td>
                                       </tr>
                                    ))}
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
         {/* target_products */}
      </>
   );
}

export const discountTypeSchemas = Yup.object().shape({
   name: Yup.string().required("name is required"),
   target_products: Yup.number()
      .typeError("target_products must be a number")
      .when("name", {
         is: (val: any) => [3, 4].includes(+val),
         then: (schema) => schema.required("target_products is required").integer("target_products must be an integer").min(0, "target_products must be at least 0"),
         otherwise: (schema) => schema.notRequired(),
      })
      .integer("target_products must be an integer")
      .min(0, "target_products must be at least 0"),
   list: Yup.array(),
});
