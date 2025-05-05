import React from "react";
import Search from "./Search";

export default function Navbar() {
   return (
      <nav className="w-full fixed top-0 z-10 bg-white" style={styles.navbar}>
         <div className="flex justify-between px-3 py-[8px]">
            <div className="flex items-center gap-2">
               <img src="/icons/stack.svg" alt="logo" className="block w-[30px]" />
               <h1 className="font-semibold">EVERSHOP</h1>
            </div>
            <div>
               <Search />
            </div>
            <div>
               <button className="bg-[#82ca9d] h-[40px] w-[40px] flex justify-center items-center rounded-full border-[3px] border-[#4c8f65] cursor-pointer">
                  <span className="text-sm font-semibold">RG</span>
               </button>
            </div>
         </div>
      </nav>
   );
}

const styles = {
   navbar: {
      boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.15)",
   },
};
