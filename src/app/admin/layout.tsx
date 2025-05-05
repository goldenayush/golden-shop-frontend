"use client";
import { AiFillDashboard } from "react-icons/ai";
import { FaBucket } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaTag } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import Link from "next/link";
import React, { JSX } from "react";
import { BsBoxFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa6";
import { IoExtensionPuzzle } from "react-icons/io5";
import { RiFile2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

const navitems = [
   {
      groupName: "Quick links",
      list: [
         { title: "Dashboard", path: "/admin/dashboard", icon: AiFillDashboard },
         { title: "New Product", path: "/admin/new-product", icon: FaBucket },
         { title: "New Coupon", path: "/admin/new-coupon", icon: RiCoupon3Fill },
      ],
   },
   {
      groupName: "Catalog",
      list: [
         { title: "Product", path: "/admin/products", icon: AiFillDashboard },
         { title: "categories", path: "/admin/categories", icon: FaLink },
         { title: "collections", path: "/admin/collections", icon: FaTag },
         { title: "attributes", path: "/admin/attributes", icon: FaHashtag },
      ],
   },
   {
      groupName: "Sale",
      list: [{ title: "orders", path: "/admin/orders", icon: BsBoxFill }],
   },
   {
      groupName: "Promotion",
      list: [{ title: "Coupous", path: "/admin/coupous", icon: FaGift }],
   },
   {
      groupName: "cms",
      list: [
         { title: "pages", path: "/admin/pages", icon: RiFile2Fill },
         { title: "widgets", path: "/admin/widgets", icon: IoExtensionPuzzle },
      ],
   },
];

type Props = Readonly<{ children: React.ReactNode }>;
export default function AdminLayout({ children }: Props) {
   return (
      <main className="flex h-screen">
         <Navbar />
         <aside className="w-[250px] flex-shrink-0 bg-gray-50 h-full relative">
            <div //
               className="overflow-y-auto"
               style={{ height: "calc(100vh - 61px)" }}>
               <div className="h-[65px]" />
               {navitems.map((nav, idx) => (
                  <div key={`link-group-${idx}`} className="px-3">
                     <span className="text-[11px] uppercase block my-[10px] font-medium">{nav.groupName}</span>
                     <ul>
                        {nav.list.map((item, idx) => (
                           <React.Fragment key={`link-${idx}`}>
                              <Item path={item.path} icon={<item.icon size={15} />} title={item.title} />
                           </React.Fragment>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
            <div className="p-3 bg-white w-full">
               <Link href="/admin/setting/store" className="flex items-center gap-3 ">
                  <IoSettingsSharp /> <span className="text-[11px] uppercase block my-[10px] font-medium">Setting</span>
               </Link>
            </div>
         </aside>
         <div className="bg-[#f6f6f7fc] h-full w-full overflow-y-auto">
            <div className="h-[65px]" />
            {children}
         </div>
      </main>
   );
}

type ItmeProps = {
   icon: JSX.Element;
   title: string;
   path: string;
};

const Item = ({ icon, title, path }: ItmeProps) => {
   const pathname = usePathname();
   const isActivePath = pathname.includes(path) ? { background: "#edeeef" } : {};
   return (
      <li>
         <Link style={isActivePath} className="flex items-center gap-3 rounded-[4px] py-[10px] px-2 hover:bg-[#edeeef]" href={path}>
            {icon} <span className="text-[14px] font-semibold capitalize">{title}</span>
         </Link>
      </li>
   );
};

const styles = {
   navbar: {
      boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.15)",
   },
};
