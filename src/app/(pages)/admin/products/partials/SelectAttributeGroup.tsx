"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { Loading } from "@/shared/components";
import { Select, TextField } from "@/shared/ui";
import { Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

export default function SelectAttributeGroup() {
   const dispatch = useAppDispatch();
   const [selectedGroup, setGroup] = useState([]);
   const { getGroups } = useAppSelector((state) => state.admin.attribute);
   const formik = useFormikContext();
   const groupId: string = (formik.values as any)?.groupId;

   useEffect(() => {
      dispatch(adminAttributeService.getGroups.api());
      return () => { };
   }, []);

   useEffect(() => {
      if (groupId && getGroups?.data?.length) {
         const selected: any = getGroups?.data?.find((item) => item?.id === groupId);
         setGroup(selected?.AttributeGroupAttribute);
      }
      return () => { };
   }, [groupId, getGroups.data]);

   if (getGroups.isLoading) {
      return <Loading className="h-[200px]" />;
   }

   return (
      <>
         <Field
            as={Select}
            placeholder="Please Select"
            name="groupId"
            options={getGroups?.data?.map((group) => ({
               value: group.id,
               label: group.groupName,
            }))}
         />
         <hr className="my-5 border-t-1 border-[#e1e3e5]" />
         <div>
            <span className="text-[13px] uppercase block mb-3">Attributes</span>
            <div className="border-b-1 border-[#e1e3e5]">
               {selectedGroup?.map((ele: any, idx) => (
                  <CustomInput //
                     key={`input-${idx}`}
                     idx={idx}
                     data={ele}
                  />
               ))}
            </div>
         </div>
      </>
   );
}
const ItemGrid = ({ title, item }: { title: string; item: JSX.Element | string }) => {
   return (
      <div className="flex items-center border-t-1 border-x-1 border-[#e1e3e5]">
         <div className="flex-[35%] p-2">
            <span className="text-[14px]">{title}</span>
         </div>
         <div className="flex-[65%] p-2 border-l-1 border-[#e1e3e5]">{item}</div>
      </div>
   );
};

const CustomInput = ({ idx, data }: { idx: number; data: any }) => {
   const formik = useFormikContext();
   const inputType = data?.attribute?.type;
   const isRequired = data?.attribute?.isRequired;
   const title = data?.attribute?.attributeName;
   const options = data?.attribute?.attributeOption;
   const attributeId = data?.attributeId;

   useEffect(() => {
      if (attributeId) {
         formik.setFieldValue(`ProductAttributeValueIndex.${idx}.attributeId`, attributeId);
      }
      return () => { };
   }, [attributeId]);

   switch (inputType) {
      case "text":
         return (
            <ItemGrid
               title={title}
               item={
                  <Field //
                     as={TextField}
                     name={`ProductAttributeValueIndex.${idx}.optionText`}
                     placeholder="Please Select"
                     required={isRequired}
                  />
               }
            />
         );
      case "textArea":
         return (
            <ItemGrid
               title={title}
               item={
                  <Field //
                     as={TextField}
                     name={`ProductAttributeValueIndex.${idx}.optionText`}
                     required={isRequired}
                  />
               }
            />
         );
      case "select":
      case "multiSelect":
         return (
            <ItemGrid
               title={title}
               item={
                  <Select
                     value={(formik.values as any)?.ProductAttributeValueIndex?.[idx]?.optionText || ""}
                     placeholder="Please Select"
                     name={`ProductAttributeValueIndex.${idx}.optionText`}
                     options={options?.map((ele: any) => ({
                        label: ele?.optionText,
                        value: ele?.optionText,
                     }))}
                     required={isRequired}
                     onChange={(e) => {
                        const selectedOption = options.find((opt: any) => opt.optionText === e.target.value);
                        formik.setFieldValue(`ProductAttributeValueIndex.${idx}.optionId`, selectedOption?.id);
                        formik.setFieldValue(`ProductAttributeValueIndex.${idx}.optionText`, e.target.value);
                     }}
                  />
               }
            />
         );
      default:
         return "";
   }
};
