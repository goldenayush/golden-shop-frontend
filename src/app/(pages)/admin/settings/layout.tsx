"use client";
import { Card } from "@/shared/components";
import Link from "next/link";
import React from "react";
import { FaStore, FaTruck } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { RiListSettingsFill, RiSecurePaymentFill } from "react-icons/ri";

const navigationLinks = [
   {
      title: "Store Setting",
      path: "/admin/settings/store",
      discription: "Configure your store information",
   },
   {
      title: "Payment Setting",
      path: "/admin/settings/payments",
      discription: "Configure the available payment methods",
   },
   {
      title: "Shipping Setting",
      path: "/admin/settings/shipping",
      discription: "Where you ship, shipping methods and delivery fee",
   },
   {
      title: "Shipping API Setting",
      path: "/admin/settings/shipping-api",
      discription: "Where you ship, shipping methods and delivery fee , shipping rocket",
   },
   {
      title: "Tax Setting",
      path: "/admin/settings/tax",
      discription: "Configure tax classes and tax rates",
   },
];
type Props = Readonly<{ children: React.ReactNode }>;
export default function SettingsLayout({ children }: Props) {
   return (
      <div className="grid grid-cols-12 gap-3 py-[20px] px-[15px] md:px-[30px]">
         <div className="col-span-12 lg:col-span-4">
            <div className="flex justify-around gap-2 bg-white p-3 rounded-md md:hidden">
               <Link href="/admin/settings/store">
                  <FaStore className="mx-auto" size={23} />
                  <span className="text-[12px] text-center block">Store</span>
               </Link>
               <Link href="/admin/settings/payments">
                  <RiSecurePaymentFill className="mx-auto" size={23} />
                  <span className="text-[12px] text-center block">Payment</span>
               </Link>
               <Link href="/admin/settings/shipping">
                  <FaTruck className="mx-auto" size={23} />
                  <span className="text-[12px] text-center block">Shipping</span>
               </Link>
               <Link href="/admin/settings/shipping-api">
                  <RiListSettingsFill className="mx-auto" size={23} />
                  <span className="text-[12px] text-center block">Shipping API</span>
               </Link>
               <Link href="/admin/settings/tax">
                  <MdCalculate className="mx-auto" size={23} />
                  <span className="text-[12px] text-center block">Tax</span>
               </Link>
            </div>
            <Card className="hidden md:block">
               {navigationLinks?.map((link, idx) => {
                  const hideHR = navigationLinks?.length - 1 === idx;
                  return (
                     <React.Fragment key={`setting-link-${idx}`}>
                        <div className="p-[20px]">
                           <Link href={link?.path} className="text-[12px] uppercase hover:underline font-semibold">
                              {link?.title}
                           </Link>
                           <p className="text-[14px]">{link?.discription}</p>
                        </div>
                        <hr className="border-t border-gray-300" />
                     </React.Fragment>
                  );
               })}
            </Card>
         </div>
         <div className="col-span-12 lg:col-span-8">
            <div>{children}</div>
         </div>
      </div>
   );
}
