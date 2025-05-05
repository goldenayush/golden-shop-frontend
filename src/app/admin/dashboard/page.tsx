"use client";
import { Card } from "@/shared/components";
import Link from "next/link";
import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#aee9d1", "#fed3d1", "#a4e8f2"];

const chartData = [
   { name: "Completed", value: 60 },
   { name: "Cancelled", value: 20 },
   { name: "Others", value: 10 },
];
const saleStatisticsData = [
   {
      total: 0,
      count: "0",
      time: "Dec 31",
   },
   {
      total: 0,
      count: "0",
      time: "Jan 31",
   },
   {
      total: "5095.0000",
      count: "14",
      time: "Feb 28",
   },
   {
      total: "4115.0000",
      count: "8",
      time: "Mar 31",
   },
   {
      total: 0,
      count: "0",
      time: "Apr 30",
   },
   {
      total: 0,
      count: "0",
      time: "May 31",
   },
];

export default function Dashboard() {
   return (
      <div className="p-4">
         <h2 className="text-[20px] font-semibold mb-3">Dashboard</h2>
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-8">
               {/* Sale Statistics */}
               <Card
                  className="p-4 mb-3"
                  heading="Sale Statistics"
                  more={
                     <div className="flex gap-2">
                        <a className="text-[#2c6ecb] cursor-pointer text-[14px] hover:underline">Daily</a>
                        <a className="text-[#2c6ecb] cursor-pointer text-[14px] hover:underline">Weekly</a>
                        <a className="text-[#2c6ecb] cursor-pointer text-[14px] hover:underline">Monthly</a>
                     </div>
                  }>
                  <ResponsiveContainer width="100%" height={300}>
                     <AreaChart
                        data={saleStatisticsData}
                        margin={{
                           top: 5,
                           right: 0,
                           left: -25,
                           bottom: 5,
                        }}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                     </AreaChart>
                  </ResponsiveContainer>
               </Card>
               {/* Lifetime Sales */}
               <Card className="p-4" heading="Best Sellers" more={<a className="text-[#2c6ecb] cursor-pointer text-[14px] hover:underline">All products</a>}>
                  {[1, 2, 3].map((_, idx) => (
                     <React.Fragment key={`best-sellers-${idx}`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="border border-[#e1e3e5] rounded-[3px] w-[60px] p-1">
                                 <img src="http://admin.mrvcreations.in/assets/catalog/3542/8636/img-gopal7-thumb.png" alt="img" className="w-full" />
                              </div>
                              <Link href="/" className="text-[14px] font-semibold hover:underline">
                                 Kahna Unique Pagdi
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
            {/* Best Sellers */}
            <div className="col-span-4">
               <Card heading="Lifetime Sales" className="p-4">
                  <div className="grid grid-cols-1 gap-2">
                     <div className="flex space-x-3 items-center">
                        <Dot color="#a4e8f2" />
                        <div className="self-center text-[14px]">2 orders</div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">12 lifetime sale</div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">3% of orders completed</div>
                     </div>
                     <div className="flex space-x-3 items-center">
                        <Dot color="#aee9d1" />
                        <div className="self-center text-[14px]">12% of orders cancelled</div>
                     </div>
                  </div>
                  <div style={{ height: "200px" }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie data={chartData} labelLine={false} fill="#8884d8" dataKey="value" label>
                              {chartData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}

const Dot = ({ color }: { color: string }) => {
   return <div className="h-[10px] w-[10px] rounded-full" style={{ background: color }} />;
};
