import { TextFieldFormik } from "@/libs/formik";
import { Card, Editor } from "@/shared/components";
import { Button, Label } from "@/shared/ui";
import { Form, Formik } from "formik";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import * as Yup from "yup";
import AddProduct from "./AddProduct";
import SelectKeyAttributes from "./SelectKeyAttributes";

type Props = {
   id?: string;
};
export default function CollectionForm({ id }: Props) {
   return (
      <Formik //
         initialValues={{ name: "", unique_id: "", description: "" }}
         onSubmit={(values) => console.log(values)}
         validationSchema={Yup.object().shape({
            name: Yup.string().required("This field can not be empty"),
            unique_id: Yup.string().required("This field can not be empty"),
            description: Yup.string(),
         })}>
         {(formik) => (
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
                     {id ? "Editing [Accessories]" : "Create a new collectiont"}
                     {/*  */}
                  </h2>
               </div>
               <Card heading="General" className="p-3">
                  <div className="mb-3">
                     <TextFieldFormik name="name" label="Name" placeholder="Featured Products" />
                  </div>
                  <div className="mb-3">
                     <TextFieldFormik name="unique_id" label="Unique Id" placeholder="Enter Unique Id" />
                  </div>
                  <div>
                     <Label>Description</Label>
                     <Editor //
                        value={formik.values?.description}
                        setValue={(value) => {
                           formik.setFieldValue("description", value);
                        }}
                     />
                  </div>
               </Card>
               <Card
                  heading="Products"
                  className="p-3 mt-4"
                  more={
                     <SelectKeyAttributes //
                        selcted={[]}
                        title="Add products"
                        onlyTitle
                        keyName="collections"
                        setValue={(value) => {
                           console.log(value);
                        }}
                     />
                  }>
                  <AddProduct />
               </Card>
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
         )}
      </Formik>
   );
}
