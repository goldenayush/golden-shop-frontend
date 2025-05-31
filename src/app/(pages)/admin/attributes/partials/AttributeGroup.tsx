import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { TextField } from "@/shared/ui";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Select from "react-select";

type Props = {
   setFieldValue: (field: string, value: any) => void;
   values: string[];
};
export default function AttributeGroup({ values, setFieldValue }: Props) {
   const [groupName, setGroupName] = useState("");
   const dispatch = useAppDispatch();
   const { getGroups, createGroup } = useAppSelector((state) => state.admin.attribute);

   const onCreateGroup = (groupName: string) => {
      if (!groupName) return;
      dispatch(adminAttributeService.createGroup.api({ groupName }))
         .unwrap()
         .then(() => setGroupName(""));
   };

   useEffect(() => {
      dispatch(adminAttributeService.getGroups.api());
      return () => {};
   }, []);

   return (
      <div className="border-t border-gray-300 py-2 mt-3">
         <span className="uppercase text-[12px] font-semibold block mb-2">Attribute Group</span>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select
               isLoading={getGroups.isLoading}
               isMulti
               hideSelectedOptions
               value={getGroups?.data
                  ?.filter((option) => values?.includes(option.id))
                  ?.map((group) => ({
                     label: group?.groupName,
                     value: group?.id,
                  }))}
               options={getGroups?.data?.map((group) => ({
                  label: group?.groupName,
                  value: group?.id,
               }))}
               onChange={(list) => {
                  let li = list?.map((list: any) => list?.value);
                  setFieldValue("groupIds", li);
               }}
            />
            <div>
               <TextField //
                  name="name"
                  placeholder="Create a new group"
                  value={groupName}
                  disabled={createGroup.isLoading}
                  suffixIcon={
                     createGroup.isLoading ? (
                        <AiOutlineLoading3Quarters //
                           className="spin text-blue-200"
                           size={20}
                        />
                     ) : (
                        <IoIosAddCircleOutline //
                           onClick={() => {
                              onCreateGroup(groupName);
                           }}
                           className="cursor-pointer text-blue-400"
                           size={22}
                        />
                     )
                  }
                  onChange={(e) => setGroupName(e.target.value)}
               />
            </div>
         </div>
      </div>
   );
}
