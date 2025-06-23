"use client";
import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//=store=>(next)
const reduxMiddleware: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("!")) {
      console.log("dispatched : ", action?.type);
      toast.success(`${action?.payload?.message || "sucessfull.."}`, {
         progress: undefined,
      });
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("!")) {
      console.log("dispatched : ", action?.type);
      toast.error(`${action?.payload?.message || "rejected.."}`, {
         progress: undefined,
      });
   }
   return next(action);
};
export default reduxMiddleware;
