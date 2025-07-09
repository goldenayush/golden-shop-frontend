import { Select, TextField } from "@/shared/ui";
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

const priceOptions = [
   { label: "Equal", value: "equal" },
   { label: "NOT Equal", value: "not_equal" },
   { label: "GREATER", value: "greater" },
   { label: "GREATER OR Equal", value: "greater_or_equal" },
   { label: "SMALLER", value: "smaller" },
   { label: "Equal OR SMALLER", value: "equal_or_smaller" },
];
const defaultOptions = [
   { label: "IN", value: "IN" },
   { label: "Not In", value: "NOT_IN" },
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
                  name="condition.orderTotal"
               />
               <ErrorMessage component="small" className="field-error" name="condition.orderTotal" />
            </div>
            <div className="col-span-12">
               <Field
                  as={TextField}
                  type="number"
                  label="Minimum purchase qty"
                  placeholder="Enter Minimum purchase qty"
                  name="condition.orderQty"
               />
               <ErrorMessage component="small" className="field-error" name="condition.orderQty" />
            </div>
            <div className="col-span-12">
               <FieldArray
                  name="condition.requiredProducts"
                  render={(arrayHelper) => {
                     const requiredProductsList = formik?.values?.condition?.requiredProducts || [];
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
                                    <tr>
                                       <th scope="col" className="p-2">Key</th>
                                       <th scope="col" className="p-2">Operator</th>
                                       <th scope="col" className="p-2">Value</th>
                                       <th scope="col" className="p-2">Minimum quantity</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {requiredProductsList?.map((item: any, index: number) => (
                                       <tr key={`required_products_item-${index}`}>
                                          <td className="p-2">
                                             <Select //
                                                placeholder="Select"
                                                options={keys}
                                                value={item?.key || ""}
                                                onChange={(e) => {
                                                   formik.setFieldValue(`condition.requiredProducts.${index}.key`, e.target.value);
                                                   formik.setFieldValue(`condition.requiredProducts.${index}.value`, []);
                                                }}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             <Field //
                                                as={Select}
                                                placeholder="Select"
                                                name={`condition.requiredProducts.${index}.operator`}
                                                options={item?.key !== "price" ? defaultOptions : priceOptions}
                                                required
                                             />
                                          </td>
                                          <td className="p-2">
                                             {item?.key === "price" ? (
                                                <Field
                                                   as={TextField}
                                                   type="number"
                                                   placeholder="Enter this price"
                                                   name={`condition.requiredProducts.${index}.value`}
                                                   required
                                                />
                                             ) : (
                                                <SelectKeyAttributes
                                                   disabled={!item?.key}
                                                   multiple
                                                   selcted={item?.value || []}
                                                   keyName={item?.key}
                                                   title={`Choose ${item?.key}`}
                                                   setValue={(values) => {
                                                      const updatedValues = values?.map((element) => ({
                                                         id: element?.id,
                                                      })); formik.setFieldValue(`condition.requiredProducts.${index}.value`, updatedValues);
                                                   }}
                                                // setValue={(values) => {
                                                //    const updatedValues = values?.map((element) => element?.id || "");
                                                //    formik.setFieldValue(
                                                //       `condition.requiredProducts.${index}.value`,
                                                //       values?.map((element) => element?.id).filter(Boolean)
                                                //    );
                                                // }}
                                                />
                                             )}
                                          </td>
                                          <td className="p-2">
                                             <Field
                                                type="number"
                                                style={{ width: "80px" }}
                                                as={TextField}
                                                placeholder="Enter"
                                                name={`condition.requiredProducts.${index}.qty`}
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
   orderTotal: Yup.number().min(0, "Minimum purchase amount cannot be negative").required("Minimum purchase amount is required"),
   orderQty: Yup.number().min(0, "Minimum purchase qty cannot be negative").required("Minimum purchase qty is required"),
   requiredProducts: Yup.array(),
});
