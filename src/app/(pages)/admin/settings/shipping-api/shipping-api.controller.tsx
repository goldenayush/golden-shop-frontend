import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminShippingSettingService } from "@/services/admin/admin-shipping-setting.service";
import { useEffect, useState } from "react";

export default function useShippingApiController() {
   const dispatch = useAppDispatch();
   const { saveShippingApiSetting, getShippingApiSetting } = useAppSelector((state) => state.admin.adminShippingSetting);
   const [fields, setFields] = useState({
      api: {
         apiShippingStatus: "true",
         apiShippingUser: "",
         apiShippingPassword: "",
      },
   });

   const onSubmit = async (data: any) => {
      const payload = [];
      const allFields = {
         ...data?.api,
      };
      for (const key in allFields) {
         payload.push({ name: key, value: allFields[key], isJson: false });
      }
      await dispatch(
         adminShippingSettingService.saveShippingApiSetting.api({
            settings: payload,
         })
      ).unwrap();
   };

   useEffect(() => {
      dispatch(adminShippingSettingService.getShippingApiSetting.api());
      return () => {};
   }, []);

   useEffect(() => {
      if (getShippingApiSetting?.data?.length) {
         const patchValue: any = {
            api: {},
         };

         for (const element of getShippingApiSetting.data) {
            const name = element.name.toLowerCase();
            switch (true) {
               case name.startsWith("apishipping"):
                  console.log(element);
                  patchValue.api[element.name] = element.value;
                  patchValue.api.isJson = String(element.isJson);
                  break;
               default:
                  break;
            }
         }
         setFields(patchValue);
      }
      return () => {};
   }, [getShippingApiSetting.data]);

   return {
      isFetching: getShippingApiSetting.isLoading, //
      isSaving: saveShippingApiSetting.isLoading,
      fields,
      onSubmit,
   };
}
