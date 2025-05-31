import { Card } from "@/shared/components";
import { Label, TextField } from "@/shared/ui";
import React from "react";
import Select from "react-select";

type Props = {
   onClose?: () => void;
};
export default function ShippingZoneForm({ onClose }: Props) {
   return (
      <Card heading="Create a shipping zone" className="p-4">
         <div className="py-5">
            <TextField //
               label={<span className="text-[12px] uppercase font-semibold block mb-3">Zone name</span>}
               placeholder="Enter zone name"
            />
         </div>
         <hr className="border-t border-gray-200 block" />
         <div className="py-5">
            <span className="text-[12px] uppercase font-semibold block mb-3">Country</span>
            <Select
               hideSelectedOptions
               options={[
                  { label: "india", value: "india" }, //
                  { label: "egypt", value: "egypt" },
               ]}
            />
         </div>
         <hr className="border-t border-gray-200 block" />
         <div className="py-5">
            <span className="text-[12px] uppercase font-semibold block mb-3">Provinces/States</span>
            <Select
               isMulti
               hideSelectedOptions
               options={[
                  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
                  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
                  { label: "Assam", value: "Assam" },
                  { label: "Bihar", value: "Bihar" },
                  { label: "Chhattisgarh", value: "Chhattisgarh" },
                  { label: "Goa", value: "Goa" },
                  { label: "Gujarat", value: "Gujarat" },
                  { label: "Haryana", value: "Haryana" },
                  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
                  { label: "Jharkhand", value: "Jharkhand" },
                  { label: "Karnataka", value: "Karnataka" },
                  { label: "Kerala", value: "Kerala" },
                  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
                  { label: "Maharashtra", value: "Maharashtra" },
                  { label: "Manipur", value: "Manipur" },
                  { label: "Meghalaya", value: "Meghalaya" },
                  { label: "Mizoram", value: "Mizoram" },
                  { label: "Nagaland", value: "Nagaland" },
                  { label: "Odisha", value: "Odisha" },
                  { label: "Punjab", value: "Punjab" },
                  { label: "Rajasthan", value: "Rajasthan" },
                  { label: "Sikkim", value: "Sikkim" },
                  { label: "Tamil Nadu", value: "Tamil Nadu" },
                  { label: "Telangana", value: "Telangana" },
                  { label: "Tripura", value: "Tripura" },
                  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
                  { label: "Uttarakhand", value: "Uttarakhand" },
                  { label: "West Bengal", value: "West Bengal" },
               ]}
               onChange={(param) => {
                  console.log(param);
               }}
            />
         </div>
         <hr className="border-t border-gray-200 block" />
         <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-300">
               Cancel
            </button>
            <button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               Save
            </button>
         </div>
      </Card>
   );
}
