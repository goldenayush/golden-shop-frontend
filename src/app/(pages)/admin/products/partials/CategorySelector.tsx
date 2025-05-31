"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCategoryService } from "@/services/admin/admin-category.service";
import { Loading, Modal } from "@/shared/components";
import { Label } from "@/shared/ui";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type Props = {
   muilt?: boolean;
   ids: string[];
   getValue?: (values: string[]) => void;
};

export default function CategorySelector({ muilt, ids, getValue }: Props) {
   const modalRef = useRef<any>(null);
   const { fetchCategories } = useAppSelector((state) => state.admin.category);
   const [selectedIds, setIds] = useState(ids || []);
   const dispatch = useAppDispatch();

   const onSelect = (id: string) => {
      if (muilt) {
         setIds((prev) => {
            const x = [...prev, id];
            getValue && getValue(x);
            return x;
         });
      } else {
         setIds(() => {
            const x = [id];
            getValue && getValue(x);
            return x;
         });
      }
   };

   const onRemove = (selectID: string) => {
      setIds(selectedIds.filter((id) => id !== selectID));
   };

   useEffect(() => {
      dispatch(adminCategoryService.fetchCategories.api(""));
      return () => {};
   }, []);

   const getBreadcrumbs = (categoryId: string, categories: any[]) => {
      const trail = [];
      let current = categories.find((cat) => cat?.id === categoryId);

      while (current) {
         trail.unshift(current?.CategoryDescription?.name || "Unnamed");
         current = current?.parentId ? categories?.find((cat) => cat?.id === current?.parentId) : null;
      }
      return trail.join(" > ");
   };

   useEffect(() => {
      if (ids?.length) {
         setIds(ids);
      }
      return () => {};
   }, [ids]);

   if (fetchCategories.isLoading) {
      return <Loading className="h-[100px]" />;
   }
   return (
      <div>
         <Label>Category</Label>
         {!!selectedIds?.length ? (
            <div className="flex items-center border p-3 rounded-sm border-[#e5e7eb] gap-4">
               <button //
                  type="button"
                  className="text-sm text-gray-500 disabled:text-gray-500">
                  {fetchCategories?.data
                     ?.filter((d) => selectedIds?.includes(d.id))
                     .map((item) => {
                        return getBreadcrumbs(item?.id, fetchCategories?.data);
                     })}
               </button>
               <button //
                  type="button"
                  className="text-[14px] text-blue-400 font-normal cursor-pointer"
                  onClick={() => modalRef.current.setIsOpen(true)}>
                  Change
               </button>
               <button //
                  type="button"
                  className="text-[14px] text-red-400 font-normal cursor-pointer"
                  onClick={() => setIds([])}>
                  Unassign
               </button>
            </div>
         ) : (
            <button type="button" className="text-sm text-blue-500 hover:underline cursor-pointer disabled:text-gray-500" onClick={() => modalRef.current.setIsOpen(true)}>
               Select Categories
            </button>
         )}

         <Modal ref={modalRef} title="Select Categories" size="lg" className="p-5">
            <div>
               <input type="text" className="border w-full border-gray-400 p-2 rounded-sm placeholder:text-[14px]" placeholder="Search Categories" />
            </div>
            {fetchCategories?.data?.map((category, idx) => (
               <React.Fragment>
                  <div className="flex justify-between items-center py-3">
                     <span className="text-sm text-gray-500">{category.CategoryDescription.name}</span>
                     {selectedIds?.includes(category?.id) ? (
                        <button //
                           type="button"
                           className="py-3 px-7 bg-[#008060] border rounded-sm text-sm cursor-pointer font-semibold text-white"
                           onClick={() => onRemove(category?.id)}>
                           <FaCheck />
                        </button>
                     ) : (
                        <button //
                           type="button"
                           className="py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold text-black"
                           onClick={() => onSelect(category?.id)}>
                           Select
                        </button>
                     )}
                  </div>
                  {Boolean(fetchCategories?.data?.length - 1 > idx) && <hr className="border-b border-[#e1e3e5]" />}
               </React.Fragment>
            ))}
            <div className="mt-4 flex items-center justify-between ">
               <div className="flex items-center gap-2">
                  <span className="text-[14px] text-gray-500">4 of 4</span>
                  <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                     <MdArrowBackIosNew size={12} />
                  </button>
                  <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                     <MdArrowForwardIos size={12} />
                  </button>
               </div>
               <button //
                  type="button"
                  className="py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold"
                  onClick={() => modalRef.current.setIsOpen(false)}>
                  Close
               </button>
            </div>
         </Modal>
      </div>
   );
}
