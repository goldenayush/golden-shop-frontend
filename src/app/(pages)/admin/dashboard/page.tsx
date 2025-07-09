"use client";
import { Card, PageHeader } from "@/shared/components";
import Link from "next/link";
import React, { useState } from "react";
import {
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   AreaChart,
   Area,
   PieChart,
   Pie,
   Cell,
} from "recharts";
import useDashboardControllers from "./dashboard.controllers";
import { transformToPieChartData } from "@/shared/hooks/transformToPieChartData";

const COLORS = ["#aee9d1", "#fed3d1", "#a4e8f2"];
type ViewType = "daily" | "weekly" | "monthly";

export default function Dashboard() {
   const { dailySalesData, weeklySalesData, monthlySalesData, totalSalesData } = useDashboardControllers();
   const pieData = transformToPieChartData(totalSalesData);
   const [activeView, setActiveView] = useState<ViewType>("daily");

   const getActiveData = () => {
      switch (activeView) {
         case "daily":
            return dailySalesData;
         case "weekly":
            return weeklySalesData;
         case "monthly":
            return monthlySalesData;
         default:
            return dailySalesData;
      }
   };

   const handleViewChange = (view: ViewType) => {
      setActiveView(view);
   };

   function allPieValuesZero(pieData: { label: string; value: number }[]) {
      return pieData.length > 0 && pieData.every(item => item.value === 0);
   }

   return (
      <div className="p-7">
         <PageHeader heading="Dashboard" />
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-8">
               {/* Sale Statistics */}
               <Card
                  className="p-4 mb-3"
                  heading="Sale Statistics"
                  more={
                     <div className="flex gap-2">
                        <a
                           className={`text-[#2c6ecb] cursor-pointer text-[14px] hover:underline ${activeView === "daily"}`}
                           onClick={() => handleViewChange("daily")}>
                           Daily
                        </a>
                        <a
                           className={`text-[#2c6ecb] cursor-pointer text-[14px] hover:underline ${activeView === "weekly"}`}
                           onClick={() => handleViewChange("weekly")}>
                           Weekly
                        </a>
                        <a
                           className={`text-[#2c6ecb] cursor-pointer text-[14px] hover:underline ${activeView === "monthly"}`}
                           onClick={() => handleViewChange("monthly")}>
                           Monthly
                        </a>
                     </div>
                  }
               >
                  <ResponsiveContainer width="100%" height={300}>
                     <AreaChart
                        data={getActiveData()}
                        margin={{
                           top: 5,
                           right: 0,
                           left: -25,
                           bottom: 5,
                        }}
                     >
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area
                           type="monotone"
                           dataKey="value"
                           stackId="1"
                           stroke="#8884d8"
                           fill="#8884d8"
                        />
                        <Area
                           type="monotone"
                           dataKey="count"
                           stackId="1"
                           stroke="#82ca9d"
                           fill="#82ca9d"
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </Card>
               {/* Best Sellers */}
               <Card
                  className="p-4"
                  heading="Best Sellers"
                  more={
                     <Link href="/admin/products" className="text-[#2c6ecb] cursor-pointer text-[14px] hover:underline">
                        All products
                     </Link>
                  }
               >
                  {[1, 2, 3].map((_, idx) => (
                     <React.Fragment key={`best-sellers-${idx}`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                                 <img
                                    src="http://admin.mrvcreations.in/assets/catalog/3542/8636/img-gopal7-thumb.png"
                                    alt="img"
                                    className="w-full"
                                 />
                              </div>
                              <Link
                                 href="/"
                                 className="text-[14px] font-semibold hover:underline"
                              >
                                 Kanha Unique Pagdi
                              </Link>
                           </div>
                           <div>
                              <span className="text-[14px]">₹599.00</span>
                           </div>
                           <div>
                              <span className="text-[14px]">16 sold</span>
                           </div>
                        </div>
                        <hr className="my-2 border-t border-[#e1e3e5]" />
                     </React.Fragment>
                  ))}
               </Card>
            </div>
            {/* Lifetime Sales */}
            <div className="col-span-12 lg:col-span-4">
               <Card heading="Lifetime Sales" className="p-4">
                  <div className="grid grid-cols-1 gap-2">
                     <div className="flex space-x-3 items-center">
                        <Dot color="#a4e8f2" />
                        <div className="self-center text-[14px]">{totalSalesData?.orders} orders</div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">{totalSalesData?.total} total</div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">
                           {totalSalesData?.completedPercentage} of orders completed
                        </div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">
                           {totalSalesData?.cancelledPercentage}% of orders cancelled
                        </div>
                     </div>
                  </div>
                  <div style={{ height: "200px" }}>
                     {allPieValuesZero(pieData) ? (
                        <div
                           style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#888",
                           }}
                        >
                           No data to display
                        </div>

                     ) : (

                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={pieData}
                                 labelLine={false}
                                 dataKey="value"
                                 label
                              >
                                 {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                 ))}
                              </Pie>
                           </PieChart>
                        </ResponsiveContainer>
                     )}
                  </div>
               </Card>
            </div>
         </div >
      </div >
   );
}

const Dot = ({ color }: { color: string }) => {
   return (
      <div
         className="h-[10px] w-[10px] rounded-full"
         style={{ background: color }}
      />
   );
};
