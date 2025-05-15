import { TextField } from "@/shared/ui";
import Link from "next/link";
import React from "react";

export default function AddProduct() {
   return (
      <div>
         <TextField placeholder="Search Products" type="text" />
         <div className="flex items-center justify-between mt-3">
            <span className="text-gray-800 text-[14px]">
               <i>23 items</i>
            </span>
            <div className="flex gap-2">
               <button className="text-[14px] text-blue-600 cursor-pointer">Previous</button>
               <button className="text-[14px] text-blue-600 cursor-pointer">Next</button>
            </div>
         </div>
         {[1, 2, 3, 4, 5].map((_) => (
            <div className="flex items-center justify-between py-2 border-b border-gray-300">
               <div className="flex items-center gap-3">
                  <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                     <img src="http://admin.mrvcreations.in/assets/catalog/5955/1162/acceseries39-thumb.png" alt="img" className="w-full p-[2px]" />
                  </div>
                  <Link href={`/admin/products/1`} className="text-[14px] font-semibold hover:underline">
                     Laddu Gopal Jewelry Set
                  </Link>
               </div>
               <button type="button" className="text-[14px] text-red-500 cursor-pointer">
                  Remove
               </button>
            </div>
         ))}
      </div>
   );
}
