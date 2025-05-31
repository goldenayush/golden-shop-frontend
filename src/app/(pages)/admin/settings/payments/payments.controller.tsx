import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminPaymentSettingService } from "@/services/admin/admin-payment-setting.service";
import React, { useEffect, useState } from "react";

export default function usePaymentsController() {
   const dispatch = useAppDispatch();
   const { addPaymentSettings, getPaymentSettings } = useAppSelector((state) => state.admin.paymentSetting);
   const [fields, setFields] = useState({
      stripe: {
         stripePaymentStatus: "true",
         stripeDislayName: "",
         stripePublishableKey: "",
         stripeSecretKey: "",
         stripeWebhookSecretKey: "",
         stripePaymentMode: "capture",
      },
      paypal: {
         paypalPaymentStatus: "true",
         paypalDislayName: "",
         paypalClientId: "",
         paypalClientSecret: "",
         paypalEnvironment: "sandbox", // or "live"
         paypalPaymentMode: "capture",
      },
      razorpay: {
         razorpayPaymentStatus: "true",
         razorpayDislayName: "",
         razorpayPublishableKey: "",
         razorpaySecretKey: "",
         razorpayEnvironment: "live",
         razorpayWebhookSecretKey: "",
      },
      phonepe: {
         phonepePaymentStatus: "true",
         phonepeDislayName: "",
         phonepeKey: "",
         phonepeMerchantId: "",
         phonepeKeyId: "",
      },
      cod: {
         codPaymentStatus: "true",
         codDislayName: "",
      },
   });

   const onSubmit = async (data: any) => {
      try {
         const payload = [];
         const allFields = {
            ...data?.stripe, //
            ...data?.paypal,
            ...data?.razorpay,
            ...data?.phonepe,
            ...data?.cod,
         };
         for (const key in allFields) {
            payload.push({ name: key, value: allFields[key], isJson: false });
         }
         await dispatch(
            adminPaymentSettingService.addPaymentSettings.api({
               settings: payload,
            })
         ).unwrap();
      } catch (error) {
         console.log(error);
         return;
      }
   };

   useEffect(() => {
      dispatch(adminPaymentSettingService.getPaymentSettings.api());
      return () => {};
   }, []);

   useEffect(() => {
      if (getPaymentSettings?.data?.length) {
         const patchValue: any = {
            stripe: {},
            paypal: {},
            razorpay: {},
            phonepe: {},
            cod: {},
         };

         for (const element of getPaymentSettings.data) {
            const name = element.name.toLowerCase();
            switch (true) {
               case name.startsWith("stripe"):
                  patchValue.stripe[element.name] = element.value;
                  patchValue.stripe.isJson = String(element.isJson);
                  break;
               case name.startsWith("paypal"):
                  patchValue.paypal[element.name] = element.value;
                  patchValue.paypal.isJson = String(element.isJson);
                  break;
               case name.startsWith("razorpay"):
                  patchValue.razorpay[element.name] = element.value;
                  patchValue.razorpay.isJson = String(element.isJson);
                  break;
               case name.startsWith("phonepe"):
                  patchValue.phonepe[element.name] = element.value;
                  patchValue.phonepe.isJson = String(element.isJson);
                  break;
               case name.startsWith("cod"):
                  patchValue.cod[element.name] = element.value;
                  patchValue.cod.isJson = String(element.isJson);
                  break;
               default:
                  break;
            }
         }
         setFields(patchValue);
      }
      return () => {};
   }, [getPaymentSettings.data]);

   useEffect(() => {
      const originalOverflow = document.body.style.overflowY;
      document.body.style.overflowY = "hidden";
      return () => {
         document.body.style.overflowY = originalOverflow;
      };
   }, []);

   return {
      onSubmit,
      fields,
      isSaving: addPaymentSettings.isLaoding,
      isFetching: getPaymentSettings.isLaoding,
   };
}
