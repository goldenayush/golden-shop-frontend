"use clent";
import React, { useRef, useState } from "react";
import Search from "./Search";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { authAdminService } from "@/services/admin/admin-auth.service";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import { Modal } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";
import { IoCloseSharp, IoSearch } from "react-icons/io5";

export default function Navbar({ offCanvasRef }: { offCanvasRef: React.MutableRefObject<any> }) {
   const dispatch = useAppDispatch();
   const modalRef = useRef<any>(null);
   const { logout, session } = useAppSelector((state) => state.admin.auth);
   const [hide, toggle] = useState(false);
   const screen = useMediaQuery();

   const user = session.data?.user;
   return (
      <nav className="w-full fixed top-0 z-10 bg-white" style={styles.navbar}>
         <div className="flex justify-between px-3 py-[8px]">
            <div className="flex items-center gap-2">
               <RiMenu3Line //
                  size={25}
                  onClick={() => offCanvasRef.current?.toggle(true)}
                  className="block md:hidden"
               />
               <img //
                  src="https://www.mrvcreations.in/images/Laddu-gopal-logo.png"
                  alt="logo"
                  className="block h-[47px] w-[115px]"
               />
            </div>
            <div>
               {screen.md ? (
                  <Search />
               ) : (
                  <Modal ref={modalRef} size="full" placement="top">
                     <div className="p-3 h-screen">
                        <div className="flex items-center justify-between mb-3">
                           <h2 className="text-xl">Search</h2>
                           <IoCloseSharp size={20} className="cursor-pointer text-red-500" onClick={() => modalRef.current?.setIsOpen(false)} />
                        </div>
                        <Search />
                     </div>
                  </Modal>
               )}
            </div>
            <div className="flex items-center gap-3">
               <IoSearch //
                  className="block md:hidden"
                  size={20}
                  onClick={() => modalRef.current?.setIsOpen(true)}
               />
               <button className="bg-[#82ca9d] h-[40px] w-[40px] flex justify-center items-center rounded-full border-[3px] border-[#4c8f65] cursor-pointer" onClick={() => toggle(!hide)}>
                  <span className="text-sm font-semibold uppercase">
                     {user?.full_name?.split(" ")?.[0]?.[0]}
                     {user?.full_name?.split(" ")?.[1]?.[0]}
                  </span>
               </button>
               {hide && (
                  <div className="absolute right-4 top-[115%] w-[230px] bg-white shadow p-[20px]">
                     <ul>
                        <li className="text-[14px] mb-2">
                           Hello <span className="text-[#008060]">{user?.full_name}!</span>
                        </li>
                        <li>
                           <button //
                              type="button"
                              className="text-[14px] text-red-400 cursor-pointer flex items-center gap-2"
                              onClick={() => dispatch(authAdminService.logout.api())}>
                              {logout.isLoading && <AiOutlineLoading3Quarters className="spin" />} Logout
                           </button>
                        </li>
                     </ul>
                  </div>
               )}
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
