"use client"
import { ErrorMessage, FieldArray } from "formik";
import React, { cloneElement, isValidElement } from "react";

type Props = {
   name: string;
   dataArray: any[];
   fields: any;
};
export function FormikTable({ name, dataArray, fields }: Props) {
   return (
      <FieldArray
         name={name}
         render={(arrayHelpers) => {
            return (
               <div>
                  <button //
                     type="button"
                     onClick={() => arrayHelpers.push({ quantity: 1 })}>
                     + add
                  </button>
                  <div className="relative overflow-x-auto">
                     <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                           {Object.keys(fields).map((item) => (
                              <th scope="col" className="px-6 py-2">
                                 {item}
                              </th>
                           ))}
                           <th scope="col" className="px-6 py-2">
                              Action
                           </th>
                        </thead>
                        <tbody>
                           {dataArray?.map((item, idx) => (
                              <tr key={`types-${idx}`}>
                                 {Object.keys(fields).map((field) => {
                                    const A = fields[field]?.["Component"];
                                    const fieldName = `${name}.${idx}.${fields[field].name}`;
                                    const Component = isValidElement(A) ? cloneElement(A, { name: fieldName } as any) : null;
                                    return (
                                       <td className="px-6 py-2">
                                          {Component}
                                          <ErrorMessage name={fieldName} />
                                       </td>
                                    );
                                 })}
                                 <td className="px-6 py-2">
                                    <button className="font-medium text-red-600 hover:underline cursor-pointer" onClick={() => arrayHelpers.remove(idx)}>
                                       Delete
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            );
         }}
      />
   );
}
