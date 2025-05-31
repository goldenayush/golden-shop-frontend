"use client";
import { Card, PageHeader } from "@/shared/components";
import { Button, Radio, TextField } from "@/shared/ui";
import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Select from "react-select";
import { useParams } from "next/navigation";

const options = [
   { label: "All", value: "all" }, //
   { label: "catalog search page", value: "catalog search page" },
   { label: "categroy page", value: "categroy page" },
   { label: "product single page", value: "product single page" },
   { label: "cart page", value: "cart page" },
   { label: "checkout page", value: "checkout page" },
   { label: "checkout success page", value: "checkout success page" },
   { label: "static page", value: "static page" },
   { label: "home page", value: "home page" },
   { label: "not found", value: "not found" },
   { label: "static asset", value: "static asset" },
   { label: "home page", value: "home page" },
];

export default function CollectionWidgetForm() {
   const { id } = useParams();
   const collections = [1, 2, 3, 4];
   return (
      <div className="p-7">
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
               <PageHeader //
                  backLink="/admin/widgets"
                  heading={id ? "Editing [Accessories]" : "Create a new widget"}
               />
            </div>
            <div className="col-span-8">
               <Card heading="Collection products widget setting" className="p-4">
                  <div className="mt-8 px-4">
                     <div className="mb-4">
                        <TextField //
                           label={<span className="uppercase text-[12px] font-semibold mb-2 block">Select a collection</span>}
                           placeholder="Search collections"
                        />
                     </div>
                     {collections.map((_, idx) => {
                        const isHr = collections.length - 1 > idx;
                        return (
                           <React.Fragment key={`CollectionWidget-${idx}`}>
                              <div className="flex justify-between items-center">
                                 <div className="text-[14px]">Accessories</div>
                                 <button type="submit" className="text-[14px] py-[7px] px-[16px] border border-gray-300 rounded-sm font-semibold cursor-pointer">
                                    Select
                                 </button>
                              </div>
                              {isHr && <hr className="border-t border-gray-300 my-2" />}
                           </React.Fragment>
                        );
                     })}
                     <div className="mt-2 max-w-[210px]">
                        <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">Number of products to display</span>} />
                     </div>
                     <div className="flex items-center gap-2 mt-6 mb-4">
                        <span className="text-[14px] text-gray-800">4 of 4</span>
                        <button type="button" className="border border-gray-300 text-gray-300 p-1 cursor-pointer">
                           <MdArrowBackIosNew size={12} />
                        </button>
                        <button type="button" className="border border-gray-300 text-gray-300 p-1 cursor-pointer">
                           <MdArrowForwardIos size={12} />
                        </button>
                     </div>
                  </div>
               </Card>
            </div>
            <div className="col-span-4">
               <Card className="p-4">
                  <div>
                     <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">name</span>} placeholder="Name" />
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div>
                     <span className="uppercase text-[12px] font-semibold block mb-3">Status</span>
                     <Radio label="Disabled" />
                     <div className="my-2" />
                     <Radio label="Enabled" />
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">Area</span>} placeholder="Type area and press Enter..." />
                  <hr className="border-t border-gray-300 my-4" />
                  <Select
                     isMulti
                     hideSelectedOptions
                     options={options}
                     onChange={(list) => {
                        let li = list?.map((list) => list?.value);
                        console.log(li);
                     }}
                  />
                  <hr className="border-t border-gray-300 my-4" />
                  <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">Sort Order</span>} placeholder="Sort order" />
               </Card>
            </div>
            <div className="col-span-12">
               <hr className="mb-3 border-t-1 border-[#e1e3e5]" />
               <div className="flex justify-between items-center">
                  <div>
                     <Button type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer">
                        Cancel
                     </Button>
                  </div>
                  <div>
                     <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                        Save
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
