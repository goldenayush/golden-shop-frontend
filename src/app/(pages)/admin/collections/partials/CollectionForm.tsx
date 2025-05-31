import { TextFieldFormik } from "@/libs/formik";
import { Card, Editor } from "@/shared/components";
import { Button, Label } from "@/shared/ui";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AddProduct from "../../components/AddProduct";
import SelectKeyAttributes from "../../components/SelectKeyAttributes";
import { ICollection } from "@/types/collection.type";

type Props = {
   onSubmit: (values: any) => void;
   loading?: boolean;
   patchValues?: ICollection;
};
export default function CollectionForm({ patchValues, onSubmit, loading }: Props) {
   const [fields, setFields] = useState({
      name: "",
      code: "",
      description: "",
   });

   useEffect(() => {
      if (patchValues) {
         setFields({
            id: patchValues.id,
            name: patchValues.name,
            code: patchValues.code,
            description: patchValues.description,
         } as any);
      }
      return () => {};
   }, [patchValues]);

   return (
      <Formik //
         enableReinitialize={Boolean(patchValues)}
         initialValues={fields}
         onSubmit={onSubmit}
         validationSchema={Yup.object().shape({
            name: Yup.string().required("This field can not be empty"),
            code: Yup.string().required("This field can not be empty"),
            description: Yup.string(),
         })}>
         {(formik) => (
            <Form>
               <Card heading="General" className="p-3">
                  <div className="mb-3">
                     <TextFieldFormik name="name" label="Name" placeholder="Featured Products" />
                  </div>
                  <div className="mb-3">
                     <TextFieldFormik name="code" label="Unique Id" placeholder="Enter Unique Id" />
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
                     <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                        Save
                     </Button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}
