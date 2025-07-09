import { TextFieldFormik } from "@/libs/formik";
import { Card } from "@/shared/components";
import { Button, Label, Radio, TextField } from "@/shared/ui";
import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import AttributeGroup from "./AttributeGroup";
import { IAttribute } from "@/types/attribute.types";

type Props = {
   onSubmit: (data: any) => Promise<void>;
   loading?: boolean;
   patchValues?: IAttribute | null;
};
export default function AttributeForm({ onSubmit, loading, patchValues }: Props) {
   const [fields, setFields] = useState({
      attributeName: "",
      attributeCode: "",
      type: "",
      groupIds: [] as string[],
      isRequired: 0,
      isFilterable: 0,
      displayOnFrontEnd: 0,
      sortOrder: "",
   });

   useEffect(() => {
      if (patchValues) {
         const attributeOption = patchValues?.attributeOption;
         setFields({
            attributeName: patchValues?.attributeName,
            attributeCode: patchValues?.attributeCode,
            type: patchValues?.type,
            groupIds: patchValues?.AttributeGroupAttribute?.map((x) => x?.attributeGroupId),
            isRequired: Number(patchValues?.isRequired),
            isFilterable: Number(patchValues?.isFilterable),
            displayOnFrontEnd: Number(patchValues?.displayOnFrontEnd),
            sortOrder: patchValues?.sortOrder as any,
            ...(attributeOption ? { attributeOption } : {}),
         });
      }
      return () => { };
   }, [patchValues]);

   return (
      <Formik //
         enableReinitialize={Boolean(patchValues)}
         initialValues={fields}
         onSubmit={onSubmit}>
         {(formik) => (
            <Form className="grid grid-cols-12 gap-3">
               <div className="col-span-12 lg:col-span-8">
                  <Card heading="General" className="p-4">
                     <div className="mb-2">
                        <TextFieldFormik label="Name" name="attributeName" id="attributeName" />
                     </div>
                     <div className="mb-2">
                        <TextFieldFormik label="Attribute code" name="attributeCode" id="attributeCode" />
                     </div>
                     <div>
                        <Label>Type</Label>
                        <div className="mt-2">
                           {["text", "select", "multiSelect", "textArea"].map((item) => (
                              <div className="mb-1" key={item}>
                                 <Radio //
                                    label={item}
                                    name="type"
                                    value={item}
                                    onChange={(e) => {
                                       formik.setFieldValue("type", e.target.value);
                                    }}
                                    checked={formik.values.type === item}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                     {["multiSelect", "select"].includes(formik.values.type) && (
                        <>
                           <hr className="border-t border-gray-300 my-3" />
                           <FieldArray //
                              name="attributeOption"
                              render={(arrayHelpers) => {
                                 const options: string[] = (formik.values as any)?.attributeOption || [];
                                 return (
                                    <>
                                       <Label className="uppercase text-[12px] font-semibold block mb-2">Attribute options</Label>
                                       {options.map((_, idx) => (
                                          <div key={`attribute-option-${idx}`} className="flex items-center gap-5 mb-1">
                                             <TextFieldFormik //
                                                name={`attributeOption.${idx}.optionText`}
                                                id={`attributeOption-${idx}`}
                                                style={{ width: "250px" }}
                                             />
                                             <button type="button" className="text-[14px] text-red-500 cursor-pointer hover:underline" onClick={() => arrayHelpers.remove(idx)}>
                                                Remove option
                                             </button>
                                          </div>
                                       ))}
                                       <button type="button" className="text-[14px] text-blue-500 cursor-pointer hover:underline" onClick={() => arrayHelpers.push("")}>
                                          Add option
                                       </button>
                                    </>
                                 );
                              }}
                           />
                        </>
                     )}
                     <AttributeGroup //
                        setFieldValue={formik.setFieldValue}
                        values={formik.values?.groupIds}
                     />
                  </Card>
               </div>
               <div className="col-span-12 lg:col-span-4">
                  <Card heading="Setting" className="p-4">
                     <div>
                        <Label className="text-xs block font-semibold mb-3">Is Required?</Label>
                        <Radio //
                           label="Not required"
                           name="isRequired"
                           onChange={(e) => formik.setFieldValue("isRequired", +e.target.value)}
                           value="0"
                           checked={formik.values.isRequired === 0}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Required"
                           name="isRequired"
                           onChange={(e) => formik.setFieldValue("isRequired", +e.target.value)}
                           value="1"
                           checked={formik.values?.isRequired === 1}
                        />
                        <hr className="border-t border-gray-300 my-5" />
                     </div>
                     <div>
                        <Label className="text-xs block font-semibold mb-3">Is Filterable?</Label>
                        <Radio //
                           label="No"
                           name="isFilterable"
                           onChange={(e) => formik.setFieldValue("isFilterable", +e.target.value)}
                           value="0"
                           checked={formik.values.isFilterable === 0}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Yes"
                           name="isFilterable"
                           onChange={(e) => formik.setFieldValue("isFilterable", +e.target.value)}
                           value="1"
                           checked={formik.values.isFilterable === 1}
                        />
                        <hr className="border-t border-gray-300 my-5" />
                     </div>
                     <div>
                        <Label className="text-xs block font-semibold mb-3">Show to customers?</Label>
                        <Radio //
                           label="No"
                           name="displayOnFrontEnd"
                           onChange={(e) => formik.setFieldValue("displayOnFrontEnd", +e.target.value)}
                           value="0"
                           checked={formik.values.displayOnFrontEnd === 0}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Yes"
                           name="displayOnFrontEnd"
                           onChange={(e) => formik.setFieldValue("displayOnFrontEnd", +e.target.value)}
                           value="1"
                           checked={formik.values.displayOnFrontEnd === 1}
                        />
                        <hr className="border-t border-gray-300 my-5" />
                     </div>
                     <div>
                        <TextFieldFormik //
                           label="Sort order"
                           name="sortOrder"
                           id="sortOrder"
                        />
                     </div>
                  </Card>
               </div>
               <div className="col-span-12">
                  <hr className="mb-3 border-t-1 border-[#e1e3e5]" />
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
               </div>
            </Form>
         )}
      </Formik>
   );
}
