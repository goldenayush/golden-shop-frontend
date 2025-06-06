"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { redirect, usePathname } from "next/navigation";
import Footer from "./components/Footer";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { authAdminService } from "@/services/admin/admin-auth.service";
import DashboadLinks from "./components/DashboadLinks";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { Loading, OffCanvas } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";

type Props = Readonly<{ children: React.ReactNode }>;
export default function AdminLayout({ children }: Props) {
   const offCanvasRef = useRef<any>(null);
   const pathname = usePathname();
   const dispatch = useAppDispatch();
   const { session } = useAppSelector((state) => state.admin.auth);
   const isToken = session.data?.accessToken || session.data?.refreshToken;
   const screen = useMediaQuery();

   useEffect(() => {
      dispatch(authAdminService.adminSession.api());
      return () => {};
   }, []);

   if (session.isLoading) {
      return <Loading className="border-transparent h-screen text-4xl" />;
   }

   if (pathname.includes("/auth")) {
      return children;
   }

   if (!isToken) {
      return redirect("/admin/auth/login");
   }

   return (
      <main className="flex">
         <Navbar offCanvasRef={offCanvasRef} />
         <OffCanvas ref={offCanvasRef} isFragment={screen.md}>
            <aside className="w-[240px] flex-shrink-0 bg-gray-50 h-screen relative">
               <DashboadLinks offCanvasRef={offCanvasRef} />
               <div className="p-3 bg-white w-full">
                  <Link href="/admin/settings/store" className="flex items-center gap-3 ">
                     <IoSettingsSharp /> <span className="text-[11px] uppercase block my-[10px] font-medium">Setting</span>
                  </Link>
               </div>
            </aside>
         </OffCanvas>
         <div className="bg-[#f6f6f7fc] w-full">
            <div className="h-screen overflow-y-auto pt-[65px]">
               {children}
               <Footer />
            </div>
         </div>
      </main>
   );
}
