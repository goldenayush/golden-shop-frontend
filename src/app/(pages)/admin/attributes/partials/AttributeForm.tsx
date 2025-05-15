import { TextFieldFormik } from "@/libs/formik";
import { Card } from "@/shared/components";
import { Button, Label, Radio, TextField } from "@/shared/ui";
import { FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import Select from "react-select";

const fields = {
   name: "",
   attribute_code: "",
   type: "",
   attribute_group: [],
   isRequired: 0,
   isFilterable: 0,
   isShowCustomer: 0,
   sort_order: "",
};

export default function AttributeForm({ id }: { id?: string }) {
   const [groupName, setGroupName] = useState("");
   const [groupOptions, setGroupOptions] = useState<{ label: string; value: string }[]>([]);
   return (
      <Formik initialValues={fields} onSubmit={(value) => console.log(value)}>
         {(formik) => (
            <Form className="grid grid-cols-12 gap-3 p-7">
               <div className="col-span-12">
                  <div className="flex items-center gap-3 mb-3">
                     <button type="button" className="border p-2 rounded-sm cursor-pointer border-[#8c9196] text-[#6c7277]">
                        <IoArrowBack size={22} />
                     </button>
                     <h2 className="text-[20px] font-semibold">{id ? "Editing [Size]" : "Create a new attribute"}</h2>
                  </div>
               </div>
               <div className="col-span-8">
                  <Card heading="General" className="p-4">
                     <div className="mb-2">
                        <TextFieldFormik label="Name" name="name" id="name" />
                     </div>
                     <div className="mb-2">
                        <TextFieldFormik label="Attribute code" name="attribute_code" id="attribute_code" />
                     </div>
                     <div>
                        <Label>Type</Label>
                        <div className="mt-2">
                           {["text", "select", "multiselect", "textarea"].map((item) => (
                              <div className="mb-1">
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
                     {["multiselect", "select"].includes(formik.values.type) && (
                        <>
                           <hr className="border-t border-gray-300 my-3" />
                           <FieldArray //
                              name="attribute_options"
                              render={(arrayHelpers) => {
                                 const options: string[] = (formik.values as any)?.attribute_options || [];
                                 return (
                                    <>
                                       <Label className="uppercase text-[12px] font-semibold block mb-2">Attribute options</Label>
                                       {options.map((_, idx) => (
                                          <div className="flex items-center gap-5 mb-1">
                                             <TextFieldFormik //
                                                name={`attribute_options.${idx}`}
                                                id={`attribute_options-${idx}`}
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
                     <div className="border-t border-gray-300 py-2 mt-3">
                        <span className="uppercase text-[12px] font-semibold block mb-2">Attribute Group</span>
                        <div className="grid grid-cols-2 gap-2">
                           <Select
                              isMulti
                              hideSelectedOptions
                              options={groupOptions}
                              onChange={(list) => {
                                 let li = list?.map((list) => list?.value);
                                 formik.setFieldValue("attribute_group", li);
                              }}
                           />
                           <div>
                              {" "}
                              <TextField //
                                 name="name"
                                 placeholder="Create a new group"
                                 value={groupName}
                                 suffixIcon={
                                    <IoIosAddCircleOutline //
                                       onClick={() => {
                                          setGroupOptions([...groupOptions, { label: groupName, value: groupName }]);
                                          setGroupName("");
                                       }}
                                       className="cursor-pointer text-blue-400"
                                       size={20}
                                    />
                                 }
                                 onChange={(e) => {
                                    setGroupName(e.target.value);
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </Card>
               </div>
               <div className="col-span-4">
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
                           name="isShowCustomer"
                           onChange={(e) => formik.setFieldValue("isShowCustomer", +e.target.value)}
                           value="0"
                           checked={formik.values.isShowCustomer === 0}
                        />
                        <div className="mb-1" />
                        <Radio //
                           label="Yes"
                           name="isShowCustomer"
                           onChange={(e) => formik.setFieldValue("isShowCustomer", +e.target.value)}
                           value="1"
                           checked={formik.values.isShowCustomer === 1}
                        />
                        <hr className="border-t border-gray-300 my-5" />
                     </div>
                     <div>
                        <TextFieldFormik //
                           label="Sort order"
                           name="sort_order"
                           id="sort_order"
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
                        <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
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
