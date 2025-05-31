"use client";
import { FaBucket } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { FaLink, FaUserFriends } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa6";
import { IoExtensionPuzzle } from "react-icons/io5";
import { RiFile2Fill } from "react-icons/ri";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

const navitems = [
   {
      groupName: "Quick links",
      list: [
         { title: "Dashboard", path: "/admin/dashboard", icon: AiFillHome },
         { title: "New Product", path: "/admin/products/create-product", icon: FaBucket },
         { title: "New Coupon", path: "/admin/coupons/create-coupon", icon: FaGift },
      ],
   },
   {
      groupName: "Catalog",
      list: [
         { title: "Products", path: "/admin/products", icon: FaBucket },
         { title: "categories", path: "/admin/categories", icon: FaLink },
         { title: "collections", path: "/admin/collections", icon: FaTag },
         { title: "attributes", path: "/admin/attributes", icon: FaHashtag },
      ],
   },
   {
      groupName: "Sale",
      list: [
         { title: "orders", path: "/admin/orders", icon: BsBoxFill }, //
      ],
   },
   {
      groupName: "Customer",
      list: [
         { title: "Customers", path: "/admin/customers", icon: FaUserFriends }, //
      ],
   },
   {
      groupName: "Promotion",
      list: [
         { title: "coupons", path: "/admin/coupons", icon: FaGift }, //
      ],
   },
   {
      groupName: "cms",
      list: [
         { title: "pages", path: "/admin/cms-pages", icon: RiFile2Fill },
         { title: "widgets", path: "/admin/widgets", icon: IoExtensionPuzzle },
      ],
   },
];

type Props = {
   offCanvasRef: React.MutableRefObject<any>;
};
export default function DashboadLinks({ offCanvasRef }: Props) {
   return (
      <div //
         className="overflow-y-auto admin-navigation"
         style={{ height: "calc(100vh - 61px)" }}>
         <div className="h-[65px] hidden md:block" />
         {navitems.map((nav, idx) => (
            <div key={`link-group-${idx}`} className="px-3">
               <span className="text-[11px] uppercase block my-[10px] font-medium">{nav.groupName}</span>
               <ul>
                  {nav.list.map((item, idx) => (
                     <React.Fragment key={`link-${idx}`}>
                        <Item //
                           path={item.path}
                           icon={<item.icon size={15} />}
                           title={item.title}
                           event={() => offCanvasRef.current?.toggle(false)}
                        />
                     </React.Fragment>
                  ))}
               </ul>
            </div>
         ))}
      </div>
   );
}

type ItmeProps = {
   icon: JSX.Element;
   title: string;
   path: string;
   event: () => void;
};

const Item = ({ icon, title, path, event }: ItmeProps) => {
   const pathname = usePathname();
   const isActivePath = pathname.includes(path) ? { background: "#edeeef" } : {};
   return (
      <li onClick={event}>
         <Link style={isActivePath} className="flex items-center gap-3 rounded-[4px] py-[10px] px-2 hover:bg-[#edeeef]" href={path}>
            {icon} <span className="text-[14px] font-semibold capitalize">{title}</span>
         </Link>
      </li>
   );
};
