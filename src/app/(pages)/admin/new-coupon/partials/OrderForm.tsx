import { Select, TextField } from "@/shared/ui";
import { ErrorMessage, Field, FieldArray, FormikProps } from "formik";
import React from "react";
import SelectKeyAttributes from "../../components/SelectKeyAttributes";
import * as Yup from "yup";
import { ICouponfields } from "../new-coupon.controller";
import { FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

type Props = {
   formik: FormikProps<ICouponfields>;
};

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
export default function OrderConditions({ formik }: Props) {
   return (
      <>
         <style jsx>{`
            td,
            th {
               border: 1px solid #e1e3e5;
            }
         `}</style>
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
               <Field
                  as={TextField} //
                  label="Minimum purchase amount"
                  placeholder="Enter minimum purchase amount"
                  name="order_conditions.min_purchase_amount"
               />
               <ErrorMessage component="small" className="field-error" name="order_conditions.min_purchase_amount" />
            </div>
            <div className="col-span-12">
               <Field
                  as={TextField} //
                  label="Minimum purchase qty"
                  placeholder="Enter Minimum purchase qty"
                  name="order_conditions.min_purchase_qty"
               />
               <ErrorMessage component="small" className="field-error" name="order_conditions.min_purchase_qty" />
            </div>
            <div className="col-span-12">
               <FieldArray
                  name="order_conditions.list"
                  render={(arrayHelper) => {
                     const orderConditionsList = formik?.values?.order_conditions?.list || [];
                     return (
                        <>
                           <button //
                              type="button"
                              className="py-1 rounded-sm cursor-pointer mb-3 text-sm flex items-center gap-2 mt-3"
                              onClick={() => arrayHelper.push({})}>
                              <MdAdd />
                              Add product
                           </button>
                           <div className="relative overflow-x-auto">
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
                                    <th scope="col" className="p-2">
                                       Minimum quantity
                                    </th>
                                    <th></th>
                                 </thead>
                                 <tbody>
                                    {orderConditionsList?.map((item: any, index: number) => (
                                       <tr key={`order_conditions_item-${index}`}>
                                          <td className="p-2">
                                             <Select //
                                                placeholder="Select"
                                                options={keys}
                                                value={(orderConditionsList?.[index] as any)?.key || ""}
                                                onChange={(e) => {
                                                   formik.setFieldValue(`order_conditions.list.${index}.key`, e.target.value);
                                                   formik.setFieldValue(`order_conditions.list.${index}.values`, []);
                                                }}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={Select}
                                                placeholder="Select"
                                                name={`order_conditions.list.${index}.operator`}
                                                options={item?.key !== "price" ? defaultOptions : priceOptions}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             {item?.key === "price" ? (
                                                <Field
                                                   as={TextField} //
                                                   placeholder="Enter this price"
                                                   name={`order_conditions.list.${index}.values`}
                                                   required
                                                />
                                             ) : (
                                                <SelectKeyAttributes
                                                   disabled={!item?.key}
                                                   multiple
                                                   selcted={item?.values || []}
                                                   keyName={item?.key}
                                                   title={`Choose ${item?.key}`}
                                                   setValue={(values) => {
                                                      const updatedValues = values?.map((element) => ({
                                                         id: element?.id || "",
                                                         name: element?.name || "",
                                                         value: element?.value || "",
                                                      }));
                                                      formik.setFieldValue(`order_conditions.list.${index}.values`, updatedValues);
                                                   }}
                                                />
                                             )}
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                style={{ width: "80px" }}
                                                as={TextField}
                                                placeholder="Enter"
                                                name={`order_conditions.list.${index}.min_quantity`}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <button type="button" className="text-red-500 font-semibold cursor-pointer" onClick={() => arrayHelper.remove(index)}>
                                                <FaMinus />
                                             </button>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </>
                     );
                  }}
               />
            </div>
         </div>
      </>
   );
}

export const orderConditionsSchemas = Yup.object().shape({
   min_purchase_amount: Yup.number().min(0, "Minimum purchase amount cannot be negative").required("Minimum purchase amount is required"),
   min_purchase_qty: Yup.number().min(0, "Minimum purchase qty cannot be negative").required("Minimum purchase qty is required"),
   list: Yup.array(),
});
