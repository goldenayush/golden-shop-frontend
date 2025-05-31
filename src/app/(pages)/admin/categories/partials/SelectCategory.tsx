import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCategoryService } from "@/services/admin/admin-category.service";
import { Loading } from "@/shared/components";
import { ICategory } from "@/types/category.type";
import React, { useEffect, useMemo, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Label } from "recharts";

type Props = {
   setCategory: (id: string | null) => void;
   parentId?: string;
};

// Recursive category tree item
function CategoryNode({ category, expandedIds, toggleExpand, setCategory }: { category: any; expandedIds: Set<string>; toggleExpand: (id: string) => void; setCategory: (id: string | null) => void }) {
   const isExpanded = expandedIds.has(category.id);

   return (
      <li className="ml-4 mt-1">
         <div className="flex items-center gap-2">
            {category.children?.length > 0 && (
               <button type="button" onClick={() => toggleExpand(category.id)}>
                  {isExpanded ? <FiMinus size={13} /> : <FiPlus size={13} />}
               </button>
            )}
            <button type="button" className="text-[14px] cursor-pointer" onClick={() => setCategory(category.id)}>
               {category.CategoryDescription?.name}
            </button>
         </div>

         {/* Recursive children rendering */}
         {isExpanded && category.children?.length > 0 && (
            <ul className="ml-4">
               {category.children.map((child: any) => (
                  <CategoryNode key={child.id} category={child} expandedIds={expandedIds} toggleExpand={toggleExpand} setCategory={setCategory} />
               ))}
            </ul>
         )}
      </li>
   );
}

export default function SelectCategory({ setCategory, parentId }: Props) {
   const [categories, setCategories] = useState<ICategory[]>([]);
   const [loading, setLoading] = useState(true);
   const dispatch = useAppDispatch();
   const isSelected = useMemo(() => {
      if (!parentId) return null;

      function findCategoryPath(categories: any[], targetId: string, path: any[] = []): any[] | null {
         for (const category of categories) {
            const newPath = [...path, category];
            if (category.id === targetId) {
               return newPath;
            }
            if (category.children?.length) {
               const result = findCategoryPath(category.children, targetId, newPath);
               if (result) return result;
            }
         }
         return null;
      }
      const path = findCategoryPath(categories, parentId);
      if (!path) return "Unknown";
      return path.map((cat) => cat.CategoryDescription?.name).join(" > ");
   }, [parentId, categories]);

   const getCategoriesTree = async () => {
      try {
         setLoading(true);
         const data = await dispatch(adminCategoryService.getCategoriesTree.api()).unwrap();
         setCategories(data?.data);
      } catch (error) {
         setCategories([]);
      } finally {
         setLoading(false);
      }
   };

   const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

   useEffect(() => {
      getCategoriesTree();
   }, [dispatch]);

   const toggleExpand = (id: string) => {
      setExpandedIds((prev) => {
         const newSet = new Set(prev);
         if (newSet.has(id)) {
            newSet.delete(id);
         } else {
            newSet.add(id);
         }
         return newSet;
      });
   };
   if (loading) {
      return <Loading />;
   }

   if (!categories.length) return null;

   return (
      <React.Fragment>
         <Label>Parent category</Label>
         {isSelected ? (
            <>
               <div className="border border-gray-300 p-2 flex items-center gap-3 rounded-sm">
                  <span className="text-[14px] text-gray-600">{isSelected}</span>
                  <button type="button" className="cursor-pointer text-[14px] text-blue-800 hover:underline" onClick={() => setCategory(null)}>
                     Change
                  </button>
                  <button type="button" className="cursor-pointer text-[14px] text-red-800 hover:underline" onClick={() => setCategory(null)}>
                     Unlink
                  </button>
               </div>
            </>
         ) : (
            <div className="border border-gray-300 p-2 rounded-sm">
               <ul>
                  {categories.map((category: any) => (
                     <CategoryNode //
                        key={category.id}
                        category={category}
                        expandedIds={expandedIds}
                        toggleExpand={toggleExpand}
                        setCategory={setCategory}
                     />
                  ))}
               </ul>
            </div>
         )}
      </React.Fragment>
   );
}
